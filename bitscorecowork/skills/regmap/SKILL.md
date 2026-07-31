---
name: regmap
description: >
  Build a framework evidence pack from Bitsight data — map risk vectors and
  findings to NIST CSF 2.0, ISO/IEC 27001:2022 and Indian regulatory obligation
  areas (RBI, SEBI, IRDAI, CERT-In, DPDP). Use when the user asks to "map our
  Bitsight data to NIST", "ISO 27001 evidence from our ratings", "show this
  against the SEBI/RBI framework", "control mapping", or wants ratings evidence
  organized for an audit, assessment or supervisory review.
metadata:
  version: "0.2.0"
---

# regmap — framework evidence pack from Bitsight data

Organize Bitsight's externally observed evidence against the control areas it speaks to, so it can
be filed in an audit pack, an internal assessment, or a supervisory response.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication-first, never persist the token, the 250–900 tier/color bands, the shared error
handling, no discrimination, India context — §7 in particular).

The mapping reference is [`../../reference/regulatory-map.md`](../../reference/regulatory-map.md).
**Read it before producing any mapping**, including its opening caveats, which apply to every row
you output.

## What this skill is, and what it is not

**It is:** an organized evidence pack. *Here is what Bitsight observes externally, here is the
control area that evidence speaks to, here is where the evidence is thin.*

**It is not:** a compliance assessment, an audit, a gap analysis of record, a certification, or
legal advice. It cannot tell the user whether they comply with anything, and it must never try.

Three words are banned from the output: **"compliant"**, **"non-compliant"**, **"certified"** — for
the user's organization or for any third party. Also avoid "meets the requirement" and "satisfies
the control", which mean the same thing in a suit. Say what is **evidenced**, what is **partially
evidenced**, and what is **not evidenced by this data**. That distinction is the entire value of the
output — an auditor can work with it, and it doesn't assert something the data can't support.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if
   not authenticated, ask the user to paste their Bitsight API token and call `bitsight_set_token`
   (never echo it back). Proceed only once a token is set. (See global rules §1.)

2. **Establish the scope.**
   - **Subject** — the user's own organization, one third party, or the portfolio as a whole (for
     evidencing third-party monitoring as a control activity in its own right).
   - **Framework(s)** — NIST CSF 2.0, ISO/IEC 27001:2022, and/or an Indian regime (RBI, SEBI,
     IRDAI, CERT-In, DPDP). Mapping to two frameworks at once is normal; more than that produces an
     unreadable table, so ask which matter.
   - **The consumer** — an internal audit team, an external auditor, a customer's assessment
     questionnaire, or a regulator-facing file. This sets the tone and the level of hedging.
   - **Whether the user has their own control mapping already.** If they do, use theirs and map into
     it — an organization's existing control IDs beat a generic reference every time.

3. **Pull the evidence.**
   - `bitsight_get_company_details` with `include_industry_comparison: true` — rating, per-vector
     grades, trend. The per-vector grades are the backbone of the mapping.
   - `bitsight_get_findings_summary` — open issues per vector, which becomes the "gaps" column.
   - `bitsight_get_findings` with `affects_rating: true` for the vectors in scope, where the pack
     needs specifics rather than grades.
   - `bitsight_get_industry_benchmark` — sector context, useful when the pack must show relative
     posture rather than an absolute claim.
   - For a **portfolio-scope** pack, `bitsight_get_portfolio` (paged fully) plus `bitsight_get_alerts`
     over the review period — together these evidence the *monitoring activity*, which is often the
     actual control being assessed.

4. **Build the mapping table.** One row per risk vector in scope:

   | Column | Content |
   | --- | --- |
   | Risk vector | As Bitsight names it |
   | Observed grade / state | The current grade, with open finding count |
   | What this evidences | The specific observable fact — not a conclusion |
   | Control area | The framework references from the mapping reference |
   | Evidence strength | **Evidenced** / **Partially evidenced** / **Not evidenced by this data** |
   | Gap / note | What's open, and what this data cannot show |

   Fill the **evidence strength** column honestly. Most rows are *partially evidenced* — Bitsight
   sees the external surface of a control, not its design or operation. A pack where everything is
   "evidenced" is not credible and will not survive an auditor.

5. **Write the coverage statement.** Every pack states, prominently and near the front:
   - Bitsight observes **externally visible signals only**. Internal controls, policies, governance,
     training, physical security, and internal segmentation are **outside** what this evidences.
   - Framework references are **indicative** and must be confirmed against the current published
     text by the user's compliance team.
   - The pack **supports** an evidence trail; it does not constitute an assessment or a compliance
     conclusion.

6. **List what this data cannot evidence.** Do this explicitly rather than leaving it implied — a
   short section naming the control families in the chosen framework that Bitsight says nothing
   about. It's what makes the pack usable: the reader learns where to look for other evidence.

7. **Offer the output format:** `.xlsx` via the `xlsx` skill for a mapping matrix an auditor will
   work through (usually the right choice), `.docx` via the `docx` skill for a narrative pack, or
   Markdown for review. Save it and present it. Date every pack — evidence is a point-in-time
   observation and rating data changes daily.

8. **Offer next steps:** `remediation-roadmap` for the gaps the pack surfaces, `vendor-brief` if a
   specific third party looks weak, or `boardpack` if the pack's conclusions need leadership airtime.

## Guardrails

- **No legal advice, no compliance determinations, no applicability rulings.** Whether a regime
  applies to this entity is a question for the user's compliance and legal team, and the output
  should say so where it comes up.
- **Never invent a control identifier or clause number.** If the mapping reference doesn't cover
  something, say the mapping is unavailable rather than producing a plausible-looking ID. A wrong
  clause number in an audit file is worse than no clause number.
- **Never overstate the evidence** to make a pack look complete. The "not evidenced" rows are doing
  real work.
- Where the pack covers a third party, it contains that party's confidential security posture under
  Bitsight's Terms of Service — don't forward it beyond the user's stated purpose.
- Where findings touch personal data (exposed credentials in particular), apply DPDP minimisation:
  report counts and categories, never credential values, and avoid naming individuals.

## Error handling

Follow the shared table in the global rules: 401/403 → re-prompt and stop; 404 → re-confirm the
GUID; 429 → back off and retry; empty result → record the row as **not evidenced by this data** and
never fill a gap with an assumption.
