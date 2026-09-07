---
name: vendor-brief
description: >
  Produce a pre-contract due-diligence brief on a single vendor from Bitsight
  data, ending in a go / go-with-conditions / no-go recommendation, the contract
  clauses to negotiate, and a re-review date. Use when the user asks to "run due
  diligence on a vendor", "should we onboard this supplier", "vendor risk brief",
  "assess this third party before we sign", or wants one vendor assessed for an
  onboarding or renewal decision (as opposed to a whole-portfolio pull).
metadata:
  version: "0.6.0"
---

# vendor-brief — pre-contract due-diligence brief on one vendor

Turn Bitsight data on a **single** third party into a decision document: what the rating says, what
the findings say, what to demand in the contract, and a clear recommendation the business owner can
act on.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication-first, never persist the token, the 250–900 tier/color bands, the shared error
handling, no discrimination, India context).

This skill **recommends**; it does not decide. The accountable business and risk owners make the
call, and Bitsight is one input among several (questionnaires, audit reports, references,
contractual and financial due diligence).

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if
   not authenticated, ask the user to paste their Bitsight API token and call `bitsight_set_token`
   (never echo it back). Proceed only once a token is set. (See global rules §1.)

2. **Resolve the vendor.** If given a name or domain, use `bitsight_search_portfolio_company` to get
   the GUID; confirm the match with the user if more than one plausible result comes back. If the
   vendor is not in the portfolio, say so plainly — it must be added in the Bitsight platform first,
   and you cannot brief on a company you have no data for.

3. **Establish what the vendor will actually do.** This sets the bar the evidence is judged against.
   Ask, and don't skip it — the same rating means different things for a payroll processor and a
   catering supplier:
   - **What they'll access or hold** — personal data of data principals, financial data, source
     code, production systems, nothing sensitive.
   - **Business criticality** — would an outage at this vendor stop a critical process?
   - **Contract stage** — new onboarding, renewal, or an escalation on an existing vendor.
   - **Any internal risk threshold** already set (e.g. "no vendor below 700 touches customer data").
     If the user has one, judge against theirs. If not, use the defaults in step 5 and say so.

4. **Pull the evidence.**
   - `bitsight_get_company_details` with `include_industry_comparison: true` — current rating, the
     1-year history (read the **trend**, not just today's number), risk-vector grades, percentile.
   - `bitsight_get_findings_summary` — issue counts by risk vector and severity, and the
     authoritative source for the categorical counts you quote.
   - `bitsight_get_findings` with `affects_rating: true` and **`severity_gte: 8`** — material and
     severe only. A due-diligence brief is a decision document; the minor findings are noise in it,
     and on a large vendor they are tens of thousands of rows. Drop to `severity_gte: 6` only if the
     material-and-above set comes back thin. See global rules §3a for the thresholds.
     Page through rather than reporting only the first page.
   - `bitsight_get_alerts` for this company over the last 90 days — recent deterioration.
   - `bitsight_get_rating_change_insights` if the history shows a notable move, to explain the driver.
   - `bitsight_get_industry_benchmark` for the vendor's industry slug — so "690" is reported against
     its sector, not in a vacuum.
   - `bitsight_get_assets` only if the engagement is high-criticality and attack surface matters.

5. **Form the recommendation.** State the criteria before the verdict, so the reader can disagree
   with the criteria rather than guess at them. Absent a user-supplied threshold, use:
   - **Go** — Advanced tier (740+), flat or improving trend, no high-severity alerts in 90 days, no
     high-severity findings on the vectors that matter for this engagement. Judge alert severity from
     what the response actually returns — the vocabulary varies by `alert_type` and an unmatched
     severity filter comes back empty rather than erroring, so a filtered pull can look like a clean
     90 days when it isn't.
   - **Go with conditions** — Intermediate tier (640–730), *or* Advanced with a declining trend or
     concentrated weakness in a relevant vector. Name the conditions and the deadline for each.
   - **No-go (as things stand)** — Basic tier (250–630), *or* a sharp recent drop, *or* unresolved
     high-severity findings directly on the risk vectors this engagement depends on.

   Weight the vectors by what the vendor will actually do: exposed credentials and Critical
   Vulnerability Management matter more for a vendor with production access; TLS and web-application
   headers matter more for one hosting a customer-facing portal. Say which vectors you weighted and
   why.

6. **Write the brief.** Keep it to one or two pages — this gets read by a procurement or business
   owner, not an analyst:
   - **Recommendation** — the verdict, in the first line, with the two or three reasons behind it.
   - **The number in context** — rating, band + color, trend over 12 months, percentile vs its industry.
   - **What's actually wrong** — the material findings in plain language, grouped by risk vector,
     each with why it matters for *this* engagement.
   - **Conditions to impose** — specific, dated, and verifiable. "Remediate the expired certificates
     on their customer portal before go-live", not "improve security posture".
   - **Contract clauses to negotiate** — draw from: right to audit or to continued ratings
     monitoring; a security-incident notification SLA (note that the customer's own CERT-In
     reporting clock is tight, so vendor notification needs to be tighter); remediation SLAs by
     severity; sub-processor disclosure and flow-down; data-location and deletion terms where
     personal data is involved under the DPDP Act, 2023. Flag these as **positions to negotiate,
     drafted for the legal team to review** — not as legal advice or final wording.
   - **Re-review date** — tied to criticality (high: quarterly; medium: half-yearly; low: annually),
     plus continuous alerting in between.
   - **What this brief does not cover** — internal controls, policies, sub-processors, financial
     health, and anything else Bitsight cannot observe from outside.

7. **Offer the output format:** Markdown by default; `.docx` via the `docx` skill if it's going into
   a procurement file. Save to the user's working folder and present it. Don't overwrite an existing
   brief for the same vendor without confirming — keep the prior one for the audit trail.

8. **Offer next steps:** `regmap` if the brief needs to slot into a framework evidence pack,
   `remediation-roadmap` if the decision is "go with conditions" and the vendor needs a fix list, or
   `cve-sweep` if a specific CVE is the reason this review was triggered.

## Guardrails

- **Never state or imply a vendor is "secure", "compliant", or "certified".** Bitsight measures
  externally observable signals. A clean external posture is not an audit result.
- **Never invent** a rating, trend, finding, or percentile. If a call returns nothing, say the data
  wasn't available and let the recommendation reflect that reduced confidence.
- **A missing signal is not a good signal.** Say so explicitly where evidence is thin.
- This brief concerns a third party's confidential security posture under Bitsight's Terms of
  Service — summarize in-conversation, and don't send it to the vendor or anyone else unless the
  user asks. Sharing findings *with* the vendor is often the right move, but it's the user's call.

## Error handling

Follow the shared table in the global rules: 401 → re-prompt for the token and stop; **403 → valid token, unentitled endpoint: continue without that source and say what's missing** (never re-prompt); 404 → the
GUID isn't in this token's portfolio, re-confirm it; 429 → back off and retry; empty result → say so
plainly and do not fabricate.
