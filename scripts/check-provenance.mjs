#!/usr/bin/env node
/**
 * Fails when a regulatory reference has outlived its own review date.
 *
 * ## Why this exists
 *
 * Every file under `bitscorecowork/reference/` ends with a provenance block naming the
 * bitscore.in registry it mirrors, the date it was verified at source, and the date it
 * should next be checked. Before this script those dates were prose: a comment nobody
 * reads, in a file nobody opens unless they are already editing it.
 *
 * That failed exactly as you would expect. The 0.6.0 audit found five instruments missing
 * from these references, and **three of them had been issued before the previous
 * verification date** — so they were not new, they had simply never been seen. The check
 * being performed was "has anything changed since August?", which cannot find an
 * instrument that was already there in August.
 *
 * A date in a comment is not a control. This turns it into one.
 *
 * ## What it does not do
 *
 * It cannot tell you whether a reference is *correct* — only whether anyone has claimed to
 * look recently. Passing means the claim is current, not that the claim is true. When it
 * fails, the fix is to re-read the regulator's own index (not to diff against the last
 * reading, and not to copy from the site) and then stamp the date you actually read it.
 * Bumping `next-review` without re-reading converts a useful failure into a false pass, and
 * is worse than deleting this script.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';

const REFERENCE_DIR = 'bitscorecowork/reference';
const NAME = 'check-provenance';

/** Days before `next-review` at which the report starts saying so out loud. */
const WARN_WITHIN_DAYS = 21;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Today, at UTC midnight.
 *
 * `CHECK_PROVENANCE_TODAY` overrides it so the script can be tested against a date without
 * waiting for one. It is deliberately not read from anything CI sets: an override that a
 * scheduled job could supply by accident would let this pass forever.
 */
function today() {
  const override = process.env.CHECK_PROVENANCE_TODAY;
  if (override) {
    if (!ISO_DATE.test(override)) {
      console.error(`${NAME}: CHECK_PROVENANCE_TODAY must be YYYY-MM-DD, got "${override}".`);
      process.exit(2);
    }
    return new Date(`${override}T00:00:00Z`);
  }
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

const DAY_MS = 86_400_000;
const daysBetween = (from, to) => Math.round((to - from) / DAY_MS);

/**
 * Pulls the trailing HTML comment out of a reference.
 *
 * Anchored to the end of the file because that is where the convention puts it, and a block
 * in the middle of a document is far more likely to be an example being described than the
 * file's own provenance — `README.md` quotes one verbatim.
 */
function parseProvenance(text) {
  const match = text.match(/<!--\s*provenance\s*\n([\s\S]*?)-->\s*$/);
  if (!match) return null;

  const fields = {};
  for (const line of match[1].split('\n')) {
    const field = line.match(/^\s*([a-z-]+)\s*:\s*(.+?)\s*$/);
    if (field) fields[field[1]] = field[2];
  }
  return fields;
}

const files = readdirSync(REFERENCE_DIR)
  .filter((f) => f.endsWith('.md'))
  .sort();

if (files.length === 0) {
  console.error(`${NAME}: no references found under ${REFERENCE_DIR}/. Has the tree moved?`);
  process.exit(1);
}

const now = today();
const failures = [];
const rows = [];

for (const file of files) {
  const path = join(REFERENCE_DIR, file);
  const provenance = parseProvenance(readFileSync(path, 'utf8'));

  if (!provenance) {
    failures.push(`${file}: no provenance block. Every reference ends with one — see README.`);
    continue;
  }

  for (const field of ['mirrors', 'verified', 'next-review']) {
    if (!provenance[field]) failures.push(`${file}: provenance block is missing "${field}".`);
  }
  if (!provenance.verified || !provenance['next-review']) continue;

  const malformed = ['verified', 'next-review'].filter((f) => !ISO_DATE.test(provenance[f]));
  if (malformed.length > 0) {
    failures.push(`${file}: ${malformed.join(' and ')} must be YYYY-MM-DD.`);
    continue;
  }

  const verified = new Date(`${provenance.verified}T00:00:00Z`);
  const review = new Date(`${provenance['next-review']}T00:00:00Z`);

  // A verification date in the future is a typo, and it is the typo that would hide a stale
  // reference for as long as it took anyone to notice.
  if (verified > now) {
    failures.push(`${file}: verified ${provenance.verified} is in the future.`);
    continue;
  }
  if (review <= verified) {
    failures.push(
      `${file}: next-review ${provenance['next-review']} is not after verified ${provenance.verified}.`,
    );
    continue;
  }

  const remaining = daysBetween(now, review);
  rows.push({ file, verified: provenance.verified, review: provenance['next-review'], remaining });

  if (remaining < 0) {
    // Naming what the file mirrors matters here: most of these are re-verified against a
    // regulator's index, but `attribution-patterns.md` is read against the live Bitsight API.
    // A failure message that sends someone to the wrong source produces the wrong fix.
    failures.push(
      `${file}: next-review was ${provenance['next-review']}, ${-remaining} days ago ` +
        `(last verified ${provenance.verified}). Re-read it against ${provenance.mirrors}, ` +
        `then stamp the date you actually read it.`,
    );
  }
}

if (failures.length > 0) {
  console.error(`${NAME} — ${failures.length} problem${failures.length === 1 ? '' : 's'}\n`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  console.error(
    '\n  For a regulatory reference, re-verification enumerates the regulator\'s own index — it does\n' +
      '  not diff against the last reading, and it does not copy from bitscore.in. The indexes to walk\n' +
      '  are in README.md under "Keeping the regulatory references current". Bumping a date without\n' +
      '  re-reading turns a useful failure into a false pass, and is worse than deleting this check.',
  );
  process.exit(1);
}

const soonest = rows.reduce((a, b) => (a.remaining < b.remaining ? a : b));
const due = rows.filter((r) => r.remaining <= WARN_WITHIN_DAYS);

console.log(
  `${NAME}: ${rows.length} references, all within their review date. ` +
    `Soonest due is ${basename(soonest.file)} on ${soonest.review} (${soonest.remaining} days).`,
);
for (const row of due) {
  console.log(`  → ${row.file}: due ${row.review}, ${row.remaining} days away.`);
}
