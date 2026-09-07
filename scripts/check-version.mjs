#!/usr/bin/env node
/**
 * Fails when the plugin's version is not the same number in every place that states it.
 *
 * ## Why this exists
 *
 * A release bump touches four kinds of file: `.claude-plugin/plugin.json`,
 * `server/package.json`, the `metadata.version` of all sixteen skills, and the name of the
 * built bundle at the repo root. Nothing connects them, so they are kept in step by hand.
 *
 * During the 0.6.0 release `server/package.json` was left at 0.5.0 and caught by a grep run
 * for an unrelated reason. That is the whole argument for this file: the failure is silent,
 * it ships, and the artefact then disagrees with itself about what it is.
 *
 * `plugin.json` is treated as the source of truth because it is the one Claude reads.
 */

import { readFileSync, readdirSync } from 'node:fs';

const NAME = 'check-version';
const SEMVER = /^\d+\.\d+\.\d+$/;

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));

const expected = readJson('bitscorecowork/.claude-plugin/plugin.json').version;
if (!SEMVER.test(expected)) {
  console.error(`${NAME}: plugin.json version "${expected}" is not a bare semver.`);
  process.exit(1);
}

const problems = [];

const serverVersion = readJson('bitscorecowork/server/package.json').version;
if (serverVersion !== expected) {
  problems.push(`bitscorecowork/server/package.json: ${serverVersion}, expected ${expected}`);
}

const skills = readdirSync('bitscorecowork/skills', { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (skills.length === 0) {
  console.error(`${NAME}: no skills found. Has the tree moved?`);
  process.exit(1);
}

for (const skill of skills) {
  const path = `bitscorecowork/skills/${skill}/SKILL.md`;
  // Deliberately not a YAML parse: the front matter is hand-written and this repo has no
  // dependencies, which is a property worth keeping for a check that guards a release.
  const found = readFileSync(path, 'utf8').match(/^\s*version:\s*"?([^"\n]+)"?\s*$/m);
  if (!found) problems.push(`${path}: no metadata.version`);
  else if (found[1].trim() !== expected) {
    problems.push(`${path}: ${found[1].trim()}, expected ${expected}`);
  }
}

// The bundle is a build output, but it is committed, and its filename is the version a
// reader downloading it will believe. Exactly one may be present.
const bundles = readdirSync('.').filter((f) => f.endsWith('.plugin')).sort();
if (bundles.length === 0) {
  problems.push(`no .plugin bundle at the repo root — expected bitscorecowork-${expected}.plugin`);
} else if (bundles.length > 1) {
  problems.push(
    `${bundles.length} bundles at the repo root (${bundles.join(', ')}). ` +
      'Only the current one is kept; earlier ones live on their GitHub releases.',
  );
} else if (bundles[0] !== `bitscorecowork-${expected}.plugin`) {
  problems.push(`${bundles[0]}: expected bitscorecowork-${expected}.plugin`);
}

if (problems.length > 0) {
  const noun = problems.length === 1 ? 'file disagrees' : 'files disagree';
  console.error(`${NAME} — ${problems.length} ${noun} with plugin.json (${expected})\n`);
  for (const problem of problems) console.error(`  ✗ ${problem}`);
  console.error('\n  Rebuild the bundle after bumping: see README.md, "Building the `.plugin` from source".');
  process.exit(1);
}

console.log(`${NAME}: ${expected} in plugin.json, server/package.json, ${skills.length} skills and the bundle.`);
