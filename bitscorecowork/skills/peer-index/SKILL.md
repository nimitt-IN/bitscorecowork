---
name: peer-index
description: >
  Benchmark one organization against its sector — where it sits by rating and by
  risk vector against an industry percentile band and against a named peer cohort.
  Use when the user asks "where do we sit against other private-sector banks",
  "how do we compare to our peers", "sector benchmarking", "are we above or below
  the industry average", "rank these NBFCs by rating", or wants comparative
  positioning (as opposed to a single company's own posture, which is `mycompany`).
metadata:
  version: "0.5.0"
---

# peer-index — sector and peer benchmarking

Answer *"where do we actually sit?"* with a defensible comparison: Bitsight's own industry percentile
bands for the statistical claim, a named cohort for the recognisable one, and vector-level detail so
the answer is actionable rather than just a position.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication-first, never persist the token, the 250–900 tier/color bands, the shared error
handling, no discrimination, India context).

## The limitation to state every single time

**A portfolio is not a sector.** What a Bitsight token can see is what its subscription entitles it to
see — usually the vendors and counterparties the organisation chose to monitor. A cohort assembled
from portfolio rows is a **convenience sample**, not the sector: it over-represents whoever the user
happens to track, and it cannot tell you about anyone they don't.

So the two comparisons in this skill carry different weight, and the output must keep them apart:

- **Bitsight's industry statistics** — `industry_average`, `industry_percentile`, and the percentile
  bands and distribution from the industries endpoint — are computed across Bitsight's rated
  population. **This is the defensible claim** and it carries the "where do we sit" answer.
- **A named peer cohort** is recognisable, concrete and persuasive to a board — and statistically it
  is n-of-whatever-you-could-see. Report it with **n stated and the selection basis stated**, always.

Note also that Bitsight industries are broad. `finance` is a slug; *"Indian private-sector banks"* is
not. A cohort at that resolution is named by the user or drawn from the portfolio, and must be
labelled as constructed rather than presented as a Bitsight-defined sector.

**A missing peer is not a signal.** If a competitor isn't in the cohort, that says something about the
subscription, nothing about them.

## The distribution, which decides what "above average" is worth

Benchmarking outputs go wrong in a predictable direction: they present a comfortable position as an
achievement. Three population facts keep that honest, and at least the first two belong in every pack
(global rules §3):

- **Roughly 60% of rated entities are Advanced.** Advanced is the **modal band**, not the top decile.
  "We are Advanced" means "we are with the majority", and a deck that frames it as outperformance is
  wrong in the direction the reader wants to believe. Where the subject is Advanced, the percentile is
  the number that carries information — say where inside the band they sit.
- **The mean rating is 720**, which sits in Intermediate. So a 730 is above the average and still not
  Advanced, and those two facts about the same score point in opposite directions. State both.
- **Ratings are rounded down in tens.** A ten-point gap between the subject and a peer may be one
  point wide. Do not build a narrative on a single increment, and do not rank a cohort as though the
  ordering within a shared band were meaningful.

Where the industry percentile is available from Bitsight, it beats all of this — it is computed across
the rated population rather than reasoned from it. Use these when the percentile is absent, and to
sanity-check a conclusion that feels too flattering.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if
   not authenticated, ask the user to paste their Bitsight API token and call `bitsight_set_token`
   (never echo it back). Proceed only once a token is set. (See global rules §1.)

2. **Resolve the subject.** GUID if given; `summaries["my-company"]` from `bitsight_get_portfolio` for
   the user's own organization; otherwise `bitsight_search_portfolio_company`. Say which company you
   resolved to.

3. **Define the cohort, and be explicit about how.** Ask which comparison the user actually wants —
   they are different questions:
   - **Industry position** — against Bitsight's rated population for the subject's industry slug. The
     statistically grounded answer; needs no cohort.
   - **Named peers** — a list the user supplies ("the other private-sector banks", or specific names).
     Resolve each via `bitsight_search_portfolio_company`. **Any that aren't in the portfolio can't be
     included** — say which are missing and why, rather than silently returning a smaller cohort.
   - **Portfolio segment** — everyone in the portfolio sharing an industry slug or tier, via
     `bitsight_get_portfolio` with `industry_slug`. Convenient, and the most obviously
     convenience-sampled of the three.

   Then ask **who reads it**, because it decides the confidentiality mode in step 7.

4. **Pull the subject's own position.**
   - `bitsight_get_company_details` with **`include_industry_comparison: true`** — the rating, the
     1-year history, the per-vector grades, and `industry_average` / `industry_percentile`. Read the
     current rating from `ratings[0].rating` (global rules §3); if `rating_details` comes back null,
     report the vectors as unavailable rather than absent, and note that the vector-level comparison —
     the most useful part of this skill — is limited as a result.
   - `bitsight_get_industry_benchmark` with the subject's **`industry_slug`** (the top-level field from
     company details, not the `industry` display string) — the 1-year industry history, the 10th/90th
     percentile bands, and the company distribution. This is the reference set.

5. **Pull the cohort.** For each peer, `bitsight_get_company_details` with
   `include_industry_comparison: true`, and `bitsight_get_findings_summary` where the comparison needs
   open-issue counts rather than grades alone. Page fully through any portfolio pull. Note each peer's
   `rating_date` — comparing a fresh rating against a stale one is a real distortion on a small cohort.

6. **Build the comparison, vector-first.** The overall number places them; the vectors tell them what
   to do:
   - **Position** — the subject's rating, tier band and colour, against the industry average and its
     percentile, with the 10th/90th bands so "690" has a shape around it.
   - **Trend against the sector** — over 12 months. A company improving while its sector improves
     faster is losing ground at a rising score, and that is invisible in a point-in-time comparison.
   - **Vector-level standing** — the heart of it. Where is the subject ahead of the cohort, where
     behind, and where is it **bottom-quartile on a vector that matters for its sector**? *"Mid-pack
     overall, bottom of the cohort on Critical Vulnerability Management"* is a finding. A single
     percentile is not.
   - **The spread** — is the cohort tightly clustered or widely dispersed? Being 20 points below the
     average means something different in each case.
   - **A bottom-line read** that weighs position, trend and vector concentration together.

   State `n`, the selection basis, and the pull date on the same page as the numbers — not in a
   footnote.

7. **Choose the confidentiality mode, and say which one you used.** Peer ratings are third parties'
   confidential security posture under Bitsight's Terms of Service (global rules §8):
   - **Anonymised — the default for anything leaving the security team.** Peer A, Peer B, Peer C, with
     the cohort described generically ("eight private-sector banks in the portfolio"). The subject's
     position, the distribution and the vector standing all survive anonymisation intact.
   - **Named — internal use only**, where the user needs to act on a specific relationship. Mark the
     output accordingly and say it should not be forwarded.

   If the user asks for a named cohort in a board deck or anything customer-facing, flag the ToS
   position once, then follow their instruction — it is their subscription and their call.

8. **Offer the output format:** Markdown by default; `.xlsx` via the `xlsx` skill for a comparison
   matrix the team will re-run; `.pptx` via the `pptx` skill if it is going to a board — though for a
   full board narrative, `boardpack` is the better skill and this becomes one section of it. Save to
   the user's working folder and present it. Date it — ratings move daily and a benchmark is a
   point-in-time claim.

9. **Offer next steps:** `remediation-roadmap` for the vectors where the subject trails the cohort,
   `boardpack` if the comparison is the argument for funding, or `vendor-brief` if a peer in the
   cohort is also a vendor and the comparison surfaced something about them.

## Guardrails

- **Never say a company is "more secure" or "less secure" than another.** It is an externally
  observed rating at a point in time. Say the rating is higher, the trend is stronger, the vector
  grade is better — and let the reader draw the conclusion.
- **Never present a constructed cohort as the sector.** State `n` and the selection basis every time
  the cohort is quoted. A ranking against six peers presented as "where we sit in Indian banking" is
  the failure mode this skill exists to prevent.
- **Never infer anything from a peer's absence.** They may not be in the subscription.
- **Never blend the two comparisons.** Bitsight's industry percentile and a portfolio cohort's average
  are different populations; a reader must be able to tell which claim rests on which.
- **Never invent a peer's rating, percentile or trend.** If a company isn't resolvable, it is out of
  the cohort and the output says so.
- Peer data is confidential and often about competitors. Don't forward it, don't put a named cohort
  into anything customer-facing without the user's explicit instruction, and never share it with the
  peers themselves.
- No discrimination in cohort construction or commentary (global rules §6) — cohorts are built on
  sector, size, regulatory class and business model, never on any protected attribute.

## Error handling

Follow the shared table in the global rules: 401 → re-prompt and stop; **403 → the token is valid but the endpoint isn't in this subscription: carry on without it and name the gap** (never re-prompt for a token); 404 → the peer
isn't in this token's portfolio, drop it from the cohort and say so; 429 → back off and retry; empty
result → if the industry endpoint returns nothing for the slug, check the slug came from the
top-level `industry_slug` field rather than the display string before concluding the sector has no
data, and report the cohort comparison alone with the limitation stated.
