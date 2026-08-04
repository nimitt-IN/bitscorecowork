---
name: mycompany
description: >
  Pull the Bitsight security rating for the user's own primary organization. Use
  when the user asks to "check our Bitsight rating", "what's our security score",
  "pull my company's Bitsight rating", "how are we rated", "show our security
  rating", or wants a single organization's current Bitsight rating and risk-vector
  breakdown (as opposed to a whole-portfolio pull or a board deck).
metadata:
  version: "0.4.0"
---

# MyCompany — your organization's Bitsight security rating

Pull and explain the current Bitsight Security Rating for the user's **primary organization**,
mapped to its tier band and risk color.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication-first, never persist the token, the 250–900 tier/color bands, the shared error
handling, no discrimination, India context). The steps below assume those rules are in force.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`. If it
   returns `authenticated: false`, ask the user to paste their Bitsight API token, then call
   `bitsight_set_token` with it — never echo the token back. Proceed only once a token is set. If it
   is rejected, ask them to paste it again. (See global rules §1.)

2. **Get the Company GUID.**
   - If the user gave a GUID, use it.
   - **Otherwise resolve "our company" automatically first.** Call `bitsight_get_portfolio` and read
     `summaries["my-company"]` from the response — Bitsight returns the token owner's own
     organization GUID there. Use it, and say which company you resolved to so the user can correct
     you. This is almost always what "check *our* rating" means, and it saves asking for a GUID.
   - Only if that isn't present, prompt for the Company GUID or resolve a name/domain via
     `bitsight_search_portfolio_company`. On multiple matches, list them (name, domain, rating) and
     ask which. On zero matches, say the company isn't in this token's portfolio — don't guess.

3. **Ask about extra context to cross-reference.** Ask whether the user wants to inject additional
   context for cross-reference — internal audit notes, prior assessment reports, web links, or
   uploaded documents. If they provide some, use it to enrich interpretation (e.g. "your Q2 audit
   flagged patching — Bitsight's Critical Vulnerability Management grade agrees"). Do not let
   uploaded context override the actual API numbers.

4. **Ask the preferred layout** (pick one; default to Executive Summary if they don't care):
   - **Executive Summary** — a short narrative for leadership.
   - **Bulleted Technical Breakdown** — risk vectors, grades, findings, trend as scannable bullets.
   - **Raw Data Object** — the structured JSON as returned, lightly labeled.

5. **Pull the data:**
   - `bitsight_get_company_details` with `include_industry_comparison: true`.
   - `bitsight_get_findings_summary` for the same GUID — the authoritative categorical counts. If
     the user wants the findings behind a category, fetch them with `bitsight_get_findings` and a
     numeric `severity_gte` (9 severe, 8 material and above), never a category word: the API rejects
     `severity=severe` outright. See global rules §3a.
   - If the 1-year history shows a notable recent move (~10+ points either way), also call
     `bitsight_get_rating_change_insights` to explain the driver.

6. **Map the score to its tier + color band** using the exact buckets from the global rules
   (Basic 250–630 🔴 High / Intermediate 640–730 🟠 Medium / Advanced 740–900 🟢 Low), and present
   in the chosen layout. Always cover, at the depth the layout allows:
   - Current rating, its **tier band + color**, and industry average/percentile if fetched.
   - Trend over the last year: stable / improving / declining.
   - The 2–4 weakest risk vectors (lowest grades) — the concrete gaps.
   - Open findings count and severity breakdown.
   - A one-line driver explanation if insights were fetched.
   - A bottom-line read (strong / adequate / needs attention / high concern) that weighs band,
     trend, and findings together — not the number alone.

7. **Close** with the two standing notes from the global rules, phrased naturally: Bitsight
   reflects externally observable signals only (one input, not a full assessment), and this is
   confidential data — don't write it to a file or share it unless asked. If the request clearly
   feeds an Indian regulatory/audit cadence (RBI/SEBI/IRDAI review, CERT-In-driven review, or a
   DPDP-relevant process), note that a dated rating+findings snapshot is commonly used as
   supporting evidence — without presenting it as legal/compliance advice.

## Error handling

Follow the shared table in the global rules: 401 → re-prompt for the token and stop; **403 → valid token, unentitled endpoint: continue without that source and say what's missing** (never re-prompt);
404 → bad GUID, ask the user to re-confirm; 429 → back off and retry; empty result → say so plainly
and do not fabricate.
