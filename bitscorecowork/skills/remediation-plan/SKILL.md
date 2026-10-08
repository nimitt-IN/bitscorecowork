---
name: remediation-plan
description: >
  Read Bitsight's own Risk Remediation Plan for the user's organisation or a
  subsidiary: which findings to fix first on a risk vector, how many fixes each
  grade step takes, and (for Critical Vulnerability Management) the grade Bitsight
  projects at 30, 60 and 90 days under each remediation scenario. Use when the user
  asks "what does Bitsight say we should fix first", "how many fixes to get TLS to
  a B", "show our remediation plan", "what's the fastest way to lift our web app
  grade", or wants Bitsight's fix order alongside a roadmap.
metadata:
  version: "0.8.0"
---

# remediation-plan: Bitsight's own fix order, grade by grade

`remediation-roadmap` is our plan, built from findings, benchmarks and judgement. This skill reads
**Bitsight's** plan: the order its model ranks a vector's findings in, and the grade each run of
fixes unlocks. Used together, the roadmap explains *why* and *who*, and the plan shows *which item
first* and *how many until the next grade*.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication first, never persist the token, the tier and colour bands, the shared error
handling, India context). Section 10 governs how projections are presented.

## What a plan is, and isn't

- Bitsight runs plans **on its own schedule**. This skill reads the latest completed one and never
  creates, runs or schedules a plan.
- Plans exist for **seven vectors**: TLS/SSL Certificates, TLS/SSL Configurations, Web Application
  Security, Critical Vulnerability Management, DMARC, Desktop Software, Mobile Software. Nothing else
  has one. Open Ports, Server Software and the Compromised Systems vectors go through
  `remediation-roadmap` and `bitsight_get_findings`.
- Plans cover **only the user's own organisation and its subsidiaries** (the SPM portfolio).
  A vendor answers 403. For a third party, use `vendor-brief` or `remediation-roadmap`, framed as
  what to request from the vendor.
- A grade step such as *"D (Fix to obtain C)"* is **Bitsight's model of the vector grade**, not a
  promise about the overall rating. A fix only shows once the observation is re-made or ages out.
  Never turn a grade step into rating points (global rules §10).

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if not
   authenticated, ask for the token and call `bitsight_set_token` (never echo it back). (Global rules §1.)

2. **Resolve the company.** Default to the user's own organisation: `bitsight_get_portfolio` returns
   it as `summaries['my-company']`. For a subsidiary, resolve it with
   `bitsight_search_portfolio_company`. If the user names a vendor, say plans don't cover third
   parties and offer `vendor-brief`.

3. **See which plans exist.** Call `bitsight_get_remediation_plan` with only `company_guid`. It lists
   the seven vectors with the date of each one's latest completed plan. Say which are missing; a
   missing plan is not a clean vector.

4. **Choose the vectors.** If the user named one, use it. Otherwise pull `bitsight_get_company_details`
   and take the planned vectors with the **lowest grades**, weighted by what they carry in the rating:
   Critical Vulnerability Management (20%), TLS/SSL Configurations (15%), TLS/SSL Certificates (10%),
   Web Application Security (5%), Desktop Software (3%), DMARC and Mobile Software (1% each). Two or
   three vectors are plenty for one read.

5. **Read each plan.** Call `bitsight_get_remediation_plan` with `risk_vector`. Issue the vectors
   together; they don't depend on each other.
   - **`shape: "steps"`.** Lead with `grade_steps`: for each step, the grade it reaches and
     `cumulative_fixes`, the total fixes needed to get there. That is the headline: *"12 fixes take TLS
     Certificates from F to D; 345 take it to C."* Then show the first page of `items` (evidence key,
     message or assessment, first and last seen). Page with `offset` only if the user wants the long
     tail. `Maintain to keep A` rows are upkeep, not work.
   - **`shape: "scenarios"`** (CVM). Scenario 0 is *fix nothing*. Compare it with the others at 30,
     60 and 91 days, by grade and percentile. Name the vulnerabilities behind the best scenario
     (`findings`: name, CVSS severity, host, days open). The point to land is how much a few severe
     fixes move the grade, and that doing nothing lets it drift down.

6. **Group the work.** Several items often share one host, certificate or domain, and are one fix.
   Group by `evidence_key` or host, and count fixes as an engineer would, not as rows. Say when you
   have done so.

7. **Report.**
   - **Headline per vector**: current grade, then the cheapest next step and its fix count.
   - **First fixes**: a table of the first 10 to 20 items, with the grade step each belongs to.
   - **For CVM**: the scenario comparison at 30, 60 and 90 days, attributed to Bitsight's plan.
   - **Plan date** for each vector, and the note that grades move only after re-observation, so
     expect weeks rather than days.
   - Offer `.xlsx` via the `xlsx` skill when the list will be worked as a ticket queue.

8. **Offer next steps:** `remediation-roadmap` to sequence these against the vectors that have no
   plan and to assign owners; `boardpack` if leadership needs the "fixes to the next grade" view;
   `mycompany` as the re-measure checkpoint in 30 days.

## Guardrails

- Attribute every grade step and projection to **Bitsight's Risk Remediation Plan**, with its date.
  Never blend it with our own modelled figures (global rules §10).
- No overall-rating forecasts. A CVM scenario's projected score is for **that vector**. Never add it
  to, or convert it into, the company's rating.
- Plans can hold thousands of items (TLS especially). Never claim to have reviewed every item when
  you read one page; say how many you read and how many there are.
- The evidence names hosts, IPs and certificates belonging to the user's organisation. Keep it in
  the conversation or the file the user asked for (global rules §8).

## Error handling

Follow the shared table in the global rules: 401 → re-prompt and stop; **403 → for a vendor this is
expected (plans are own-organisation only); otherwise the token is valid but the endpoint isn't in this
subscription: carry on without it and name the gap** (never re-prompt for a token); 404 → re-confirm
the GUID or plan; 429 → the server has already retried, so name what's missing; `available: false`
→ no completed plan for that vector, so use `bitsight_get_findings` and say the plan was unavailable.
