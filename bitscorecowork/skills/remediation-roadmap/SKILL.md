---
name: remediation-roadmap
description: >
  Build a sequenced plan to improve a Bitsight rating — which risk vectors to fix,
  in what order, with effort and expected direction of impact, as a 30/60/90-day
  roadmap. Use when the user asks "how do we improve our Bitsight score", "we're
  at 690, how do we get to 740", "what should we fix first", "rating improvement
  plan", or wants findings turned into a prioritized, ownable work plan.
metadata:
  version: "0.6.0"
---

# remediation-roadmap — a sequenced plan to improve a rating

Turn a rating, its risk-vector grades and its open findings into a **work plan**: what to fix, in
what order, who owns it, and what to expect from each step.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication-first, never persist the token, the 250–900 tier/color bands, the shared error
handling, no discrimination, India context). Section 10 (**modelled estimates**) governs every
forward-looking statement this skill makes.

## The one rule that matters most

**Never promise a specific number of rating points from a specific action.** Bitsight's rating
algorithm weights risk vectors, asset importance, severity and observation age in ways that are not
public and are not linear, and findings age out of the calculation on their own schedule. Anyone
quoting "fix this and gain 15 points" is guessing.

Express expected impact as **direction and relative magnitude** instead — *"largest single lever"*,
*"moderate, slow-moving"*, *"small but immediate"* — and say what it's based on: the vector's
current grade, how many findings sit under it, their severity, and how far the company is below its
industry benchmark on that vector. If the user pushes for a point forecast, explain plainly why an
honest one isn't available, and give them the sequence and the reasoning instead.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if
   not authenticated, ask the user to paste their Bitsight API token and call `bitsight_set_token`
   (never echo it back). Proceed only once a token is set. (See global rules §1.)

2. **Resolve the company and the goal.**
   - GUID via `bitsight_search_portfolio_company` if given a name or domain.
   - **Target and deadline** — "740 by the end of Q3", "out of Basic tier before the audit", or just
     "improve". If there's a driver behind the target (a customer requirement, an insurance renewal,
     a regulator-facing review), ask — it changes what to sequence first.
   - **Who can act.** A roadmap the user can't staff is worthless. Ask which teams are in play
     (infrastructure, application, IT ops, an MSP, the vendor themselves if this is a third party)
     and whether there are freeze windows.

3. **Pull the evidence.**
   - `bitsight_get_company_details` with `include_industry_comparison: true` — current rating, the
     12-month trajectory, per-vector grades, industry percentile.
   - `bitsight_get_findings_summary` — the distribution of open findings across vectors and severity.
     This is the backbone of the prioritization, and the authoritative source for categorical counts.
   - `bitsight_get_findings` with `affects_rating: true`, paged through fully — the actual work items.
     Group them by risk vector and by affected asset; a single misconfigured host often generates
     several findings and is one fix.
   - **Sequence the fetch by severity** (global rules §3a). Start with `severity_gte: 8` — material
     and severe — because that is the roadmap's first 30 days; widen to `severity_gte: 6` for the
     60/90-day tail. On a large estate a full `severity_gte: 1` pull is tens of thousands of findings
     and will truncate before it is useful.
   - For the vulnerability work specifically, use `risk_vector: "critical_vulnerability_management"`.
   - `bitsight_get_industry_benchmark` for the company's industry slug — to identify vectors where
     the company is *below* its sector, which is where the gap is both largest and most defensible
     to leadership.
   - `bitsight_get_rating_change_insights` over the last 6–12 months — if the rating already fell,
     the drivers of that fall are usually the fastest things to reverse.

4. **Prioritize.** Rank each candidate fix on four axes, and show the ranking, not just the result:
   - **Gap size** — how far below the industry benchmark this vector sits.
   - **Volume × severity** — how many findings, how bad, and on how important an asset.
   - **Effort** — from configuration changes (certificates, TLS settings, security headers, closing
     an exposed service) through to programme work (server and endpoint software currency, asset
     inventory hygiene — process problems that move slowly).
   - **Durability** — whether the fix holds. Closing one exposed port is a task; fixing the process
     that opened it is the improvement.

   In general, configuration-class vectors move fastest and process-class vectors (software currency
   and asset inventory hygiene above all) move slowest but matter most — sequence accordingly, and
   start the slow ones early rather than saving them for last.

   **Critical Vulnerability Management is the exception, and it is the important one.** Since
   16 July 2026 this vector — 20% of the rating — grades on a
   **severity-weighted average time-to-remediate**, with findings living 90 days. A Material or
   Severe vulnerability remediated promptly moves the grade substantially and quickly; a long tail
   of Minor ones barely registers. Do not treat it as slow programme work to be deferred: the
   highest-severity CVM findings belong in the first 30 days, ahead of almost everything else.

5. **Build the roadmap** as 30 / 60 / 90 days (adjust to the user's actual deadline):
   - **Days 0–30 — visible wins and the severe vulnerabilities.** Configuration-class findings on
     high-importance assets, together with the Material and Severe Critical Vulnerability Management
     findings. Both move the rating quickly, and they buy room for the slower work.
   - **Days 31–60 — the concentrated gaps.** The vectors furthest below the industry benchmark.
   - **Days 61–90 — the process work.** Software currency, asset inventory hygiene, and whatever
     keeps regenerating findings — including the remediation process itself, so that the acute CVM
     findings closed in the first month do not simply come back.
   - Each item gets: the fix, the affected assets (count, and names where the user wants detail),
     the owning team, effort (S/M/L), expected direction of impact, and a verification step.

6. **Set the measurement cadence.** Bitsight recalculates daily, but remediation does not show up
   the next morning — the observation has to be re-made from outside and the old finding has to age
   out. Tell the user to expect **weeks, not days**, before movement is visible, and to track
   findings closed as the leading indicator with the rating as the lagging one. Offer a re-measure
   checkpoint (a `mycompany` run) at 30/60/90.

7. **Offer the output format:** Markdown by default, `.xlsx` via the `xlsx` skill if it's going to be
   tracked as a work plan, `.docx` via the `docx` skill if it's a document for sign-off. Save it and
   present it.

8. **Offer next steps:** `boardpack` if the roadmap needs leadership sign-off or funding, `vapt-plan`
   if the user wants the findings validated by testers before committing effort, or `regmap` if the
   remediation needs to be evidenced against a framework.

## Guardrails

- No point-gain promises, no guaranteed dates for reaching a target score, and no claim that
  completing the roadmap will produce a particular rating. Say what improves and why; let the
  measurement speak.
- **Fixing findings is not the goal — reducing risk is.** Flag it if the shortest path to a higher
  number would not meaningfully reduce risk (for instance, decommissioning an observed asset rather
  than securing it). The user is entitled to make that trade, but not unknowingly.
- If this is a **third party's** roadmap, the user cannot execute it — frame it as what to *request*
  from the vendor, with SLAs, not as work to be done.
- Never fabricate a finding, grade, or benchmark to round out a plan.

## Error handling

Follow the shared table in the global rules: 401 → re-prompt and stop; **403 → the token is valid but the endpoint isn't in this subscription: carry on without it and name the gap** (never re-prompt for a token); 404 → re-confirm the
GUID; 429 → back off and retry (be mindful when paging large findings sets); empty result → say so
and do not invent work items.
