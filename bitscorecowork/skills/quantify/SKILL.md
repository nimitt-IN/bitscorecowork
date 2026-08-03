---
name: quantify
description: >
  Translate Bitsight posture into an indicative financial exposure estimate — a
  transparent, assumption-driven range in the user's currency, with every input
  shown. Use when the user asks "what's this worth in rupees", "quantify our
  cyber risk", "financial exposure from our security posture", "build the
  business case for security spend", or wants a rating expressed as money for a
  board, budget or insurance conversation.
metadata:
  version: "0.3.0"
---

# quantify — indicative financial exposure from Bitsight posture

Boards fund money, not scores. This skill turns Bitsight posture into a **defensible, fully
transparent estimate of financial exposure** — a range, with every assumption on the page.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication-first, never persist the token, the 250–900 tier/color bands, the shared error
handling, no discrimination, India context). Section 10 (**modelled estimates**) is the governing
rule for this entire skill.

## Disclose this before you produce anything

**This is not Bitsight Financial Quantification.** Bitsight sells a Financial Quantification (FQ)
product that models loss exposure using its own historical cyber-loss dataset and Monte Carlo
simulation. **This skill has no access to it** — the plugin wraps the Security Ratings API, and FQ
output is not available through it.

So say this to the user, up front, before collecting inputs:

> This produces an **indicative estimate** built from your Bitsight posture plus figures you supply.
> It is **not** Bitsight's Financial Quantification output. If your organization licenses FQ, the
> authoritative number is in the Bitsight platform and you should use that one — particularly for
> anything going to an insurer or a regulator. What this gives you is a transparent, arguable
> estimate where every assumption is visible and adjustable.

Never label the output as a Bitsight figure, never call it FQ, and never let it be presented as
vendor-produced. If the user says they do license FQ, point them there first and ask whether they
still want the indicative version.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if
   not authenticated, ask the user to paste their Bitsight API token and call `bitsight_set_token`
   (never echo it back). Proceed only once a token is set. (See global rules §1.)

2. **Make the disclosure above.** Then confirm the user wants to continue.

3. **Pull the posture.**
   - `bitsight_get_company_details` with `include_industry_comparison: true` — rating, band, trend,
     per-vector grades, industry percentile.
   - `bitsight_get_findings_summary` — open findings by vector and severity. Use its categorical
     counts as the model input; if you need the underlying findings, pull them with a numeric
     `severity_gte` (8 = material and above) per global rules §3a.
   - `bitsight_get_industry_benchmark` — where the sector sits, so relative posture is grounded.
   - `bitsight_get_alerts` over the last 12 months — a deteriorating trend is itself an input.

4. **Collect the firmographics from the user.** These drive the answer far more than the rating
   does, so gather them explicitly and never guess:
   - **Annual revenue** and reporting currency (default ₹ / INR unless told otherwise).
   - **Sector**, and whether it's regulated (BFSI, insurance, healthcare).
   - **Volume and type of sensitive records** held — personal data of data principals, cardholder
     data, health records.
   - **Existing cyber insurance** — cover limit, retention/deductible.
   - **Material dependency** — the cost of a day of downtime in the critical process, if known.

   If the user can't supply one of these, say what you're substituting and where the substitute came
   from. Never quietly invent a figure.

5. **Build the estimate.** Three scenarios, never a single number:
   - **Typical** — a contained incident: response and forensics, notification, some downtime.
   - **Severe** — material breach: extended downtime, regulatory engagement, legal costs, customer
     remediation, reputational impact.
   - **Extreme** — tail event: prolonged outage, litigation, contract and customer loss.

   For each, show the **components** (incident response, forensics, notification, legal and
   regulatory, downtime, customer remediation, reputational/churn) as a line-item table with the
   arithmetic visible. Then apply posture as a **modifier**, not as the base: a Basic-tier rating and
   a rising finding count push likelihood up; an Advanced rating with a flat trend pushes it down.
   State the modifier and its basis explicitly.

   **Show the working.** Every number must trace to either a Bitsight data point, a figure the user
   supplied, or a stated assumption. A reader must be able to change one input and see what moves.

6. **Add a sensitivity section.** Rank the inputs by how much they move the answer — usually record
   volume and downtime cost dominate, and the rating itself matters less than executives expect. Say
   that plainly; it's the most useful thing in the output and it keeps the estimate honest about
   what it does and doesn't know.

7. **Write the assumptions and limitations section — mandatory, and not in a footnote.**
   - This is an indicative estimate, not an actuarial calculation, not Bitsight FQ, and not a basis
     for setting insurance limits on its own.
   - Bitsight measures externally observable signals; it does not see internal controls, and posture
     correlates with breach likelihood but does not determine it.
   - Every user-supplied figure is listed, with a note that the output is only as good as its inputs.
   - Loss figures are scenario constructions, not predictions, and no confidence interval is claimed.

8. **Offer the output format:** `.xlsx` via the `xlsx` skill when the user will want to adjust inputs
   themselves (usually the right answer — this output is meant to be argued with), `.docx` or slides
   via `boardpack` for a leadership audience, Markdown for review.

9. **Offer next steps:** `remediation-roadmap` to turn the exposure into a funded work plan (the
   natural follow-on — this skill sizes the problem, that one sequences the fix), or `boardpack` to
   put it in front of leadership.

## Guardrails

- **Never present a single point number** without its range and its assumptions. If the user asks
  for "just the number", give the range and say why a point estimate would be misleading.
- **Never call this a Bitsight figure**, never imply Bitsight produced or endorsed it, and never
  use "Financial Quantification" or "FQ" as a label for this output.
- **This is not investment, insurance, or actuarial advice.** For insurance limits, coverage
  decisions or capital allocation, the user needs their broker, actuary or insurer — say so where
  the conversation heads that way.
- **No false precision.** Round to a sensible order of magnitude; "₹4–11 crore" is honest, "₹7.34
  crore" from these inputs is not.
- Don't quantify a **third party's** exposure and present it as theirs — you don't have their
  firmographics. Quantify the user's exposure *through* that vendor instead, using the user's own
  figures, and label it that way.
- Never fabricate an industry loss statistic or breach-cost benchmark to anchor a scenario. If you
  cite a published figure, name the source and its year; if you have none, build from the user's own
  numbers and say that's what you did.

## Error handling

Follow the shared table in the global rules: 401 → re-prompt and stop; **403 → the token is valid but the endpoint isn't in this subscription: carry on without it and name the gap** (never re-prompt for a token); 404 → re-confirm the
GUID; 429 → back off and retry; empty result → say the posture data wasn't available and either
proceed on user-supplied inputs alone (labelled as such) or stop — never invent posture data to
complete a model.
