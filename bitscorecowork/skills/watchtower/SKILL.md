---
name: watchtower
description: >
  Produce a recurring portfolio change digest — what moved since the last review,
  triaged into act now, watch, and ignore. Use when the user asks "what changed
  since last week", "run our portfolio monitoring digest", "any new risks in the
  portfolio", "weekly vendor risk update", "set up recurring Bitsight monitoring",
  or wants the delta since a previous run (as opposed to a full portfolio pull,
  which is `myportfolio`).
metadata:
  version: "0.4.0"
---

# watchtower — what changed in the portfolio since last time

A short, recurring digest of movement across the monitored estate, triaged so the reader knows what to
act on — and, just as importantly, what they can safely ignore.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication-first, never persist the token, the 250–900 tier/color bands, the shared error
handling, no discrimination, India context — §8 on the snapshot file in particular).

## The one rule that matters most

**A digest nobody trusts to filter gets skipped, and then the one that mattered gets skipped too.**

The value here is not completeness — `myportfolio` already does completeness. It is judgement:
separating the handful of changes that need a person from the routine noise of a rating estate that
moves every day. So the **ignore** list is not filler. **Write out why each ignored item is being
ignored**, briefly. That is what earns the reader's trust in the *act now* list, and it is what keeps
the digest being read in week twelve.

Ratings move in multiples of ten and drift constantly. A 10-point move on a non-critical vendor inside
its band is not news. Treat it as such, and say so.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if
   not authenticated, ask the user to paste their Bitsight API token and call `bitsight_set_token`
   (never echo it back). Proceed only once a token is set. (See global rules §1.)
   For scheduled or headless runs, the `BITSIGHT_ALLOW_ENV_TOKEN` unattended mode in global rules §1
   applies — that is the intended way to run this skill on a cadence.

2. **Find the baseline.** This plugin holds no state between sessions, so the delta needs a previous
   snapshot:
   - Look for the most recent `watchtower-snapshot-YYYY-MM-DD` file in the user's working folder, or
     ask them to point at one.
   - **If there is none, say so plainly and run a baseline pass instead.** Report current state, write
     the snapshot, and tell the user the next run will show movement. **Never present a first run as
     though nothing changed** — no baseline means no delta, not a quiet week.
   - If the baseline is old, say how old. A "weekly" digest against a six-week-old snapshot is a
     six-week digest, and the reader should know that.

3. **Establish the window and what matters**, on the first run and whenever it changes:
   - **The review period** — since the last snapshot, or a stated date range.
   - **Which vendors are critical.** Portfolio tiers if they exist; otherwise ask. A 30-point drop
     matters differently for a payments processor than for a stationery supplier, and triage is
     impossible without knowing which is which.
   - **The threshold for "act now"** if the user has one. Absent that, use the defaults in step 5.

4. **Pull the current state.**
   - `bitsight_get_portfolio`, **paged through fully**, for every company's current rating, tier and
     rating date. This is the delta's raw material and a partial page is a wrong digest.
   - `bitsight_get_alerts` over the window — the direct signal for what Bitsight itself flagged.
     Filter to `MATERIAL` and `DANGER` for the headline, but read `WARN` before dismissing a company
     that also moved on rating.
   - `bitsight_get_rating_change_insights` **only** for companies with a notable move (~10+ points),
     to explain the driver. Don't call it for everyone — it is entitlement-gated and it is noise on a
     company that didn't move.
   - `bitsight_get_findings_summary` for anything that lands in *act now*, so the digest can say what
     is actually wrong rather than just that a number fell.

5. **Compute the delta and triage it.** Compare current state to the snapshot: rating movements,
   tier-band crossings, companies added or removed from the portfolio, and new alerts. Then sort into
   three buckets — absent a user threshold:
   - **Act now** — a drop into **Basic tier (250–630 🔴)**; any `MATERIAL` alert; a fall of 40+ points;
     a critical vendor crossing a band downward; or a sustained decline across consecutive digests.
     Each with the driver, the affected vectors, and a suggested owner and action.
   - **Watch** — 20–40 point moves, `DANGER` alerts, a critical vendor drifting down within its band,
     or a second consecutive small decline. Not urgent, but named so the next digest can see the trend.
   - **Ignore** — routine drift, small moves within band on non-critical vendors, improvements,
     rating-date churn. **Say why**, in a line.

   **A band crossing is worth more than the point count.** Ten points that take a vendor from 640 to
   630 crosses Intermediate into Basic and changes the risk conversation; forty points inside Advanced
   usually doesn't.

   Call out **improvements** too. A vendor that fixed what was raised last quarter is worth a line —
   it tells the reader the process works, and it is the only positive signal in an otherwise
   one-directional report.

6. **Write the digest short.** This is read on a phone on a Monday:
   - **The headline** — one line. *"Two vendors need action this week; one payments provider dropped
     into Basic tier."* Or *"Nothing needs action this week"*, which is a perfectly good digest and
     should be said with confidence when it is true.
   - **Act now** — the items, with driver, impact and owner.
   - **Watch** — one line each.
   - **Ignored** — a count and the reasons, compressed. Not a list of every 10-point wobble.
   - **The window, the baseline date, and the number of companies compared.** Every time.

7. **Write the new snapshot** to the user's working folder as `watchtower-snapshot-YYYY-MM-DD` —
   company GUID, name, rating, tier and rating date per row, plus the run date. Keep it minimal: it is
   a baseline, not an archive. Tell the user it was written and what it contains.

   **This file holds confidential Bitsight data about third parties** (global rules §8). Say so once:
   it should not be shared, and it should not be committed to a repository. Don't overwrite the
   previous snapshot — the sequence is what makes multi-period trends visible.

8. **Offer the output format:** Markdown by default — this is a digest, not a document, and the
   default should stay lightweight. `.xlsx` via the `xlsx` skill only if the user wants the full delta
   table to work through. Save to the user's working folder and present it.

9. **Offer next steps:** `vendor-brief` on anything in *act now* that needs a decision,
   `cve-sweep` if an alert points at a named vulnerability, or `boardpack` if the quarter's digests
   add up to something leadership should see. If the user wants this to run on a cadence, the
   `schedule` skill sets it up — weekly is the usual right answer.

## Guardrails

- **Never report "no change" when you mean "no baseline".** The first run has no delta, and saying so
  is the difference between a useful tool and a dangerous one.
- **Never infer movement you didn't measure.** If a company is in the current pull but not the
  snapshot, it is *new to the portfolio*, not *improved*. If it is in the snapshot but not the current
  pull, it was removed or is no longer visible to this token — say which you can tell and which you
  can't.
- **The ignore list must be justified, not just counted.** An unexplained "142 changes ignored" is
  indistinguishable from not having looked.
- **Never invent a driver.** If `bitsight_get_rating_change_insights` is unavailable or returns
  nothing, report the movement without an explanation rather than reasoning backwards from the vectors
  to a plausible-sounding cause.
- **The snapshot is the one file this plugin writes by design.** It is confidential third-party data:
  not shared, not committed, not emailed. Nothing else about it changes global rules §8.
- A digest names third parties' security posture under Bitsight's Terms of Service. It circulates
  internally by design — keep it inside the organisation.

## Error handling

Follow the shared table in the global rules: 401 → re-prompt and stop; **403 → the token is valid but the endpoint isn't in this subscription: carry on without it and name the gap** (never re-prompt for a token); 404 → re-confirm the
GUID; 429 → back off and retry — a full portfolio page-through is the most rate-limit-prone call in
this plugin, so back off and complete rather than truncating; empty result → if the portfolio pull
returns nothing, say the pull failed and **do not report an empty portfolio as a quiet week**. A digest
that reports calm because the data didn't arrive is the worst output this skill can produce.
