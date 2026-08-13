---
name: vapt-plan
description: >
  Fetch Bitsight attack-surface / findings data and produce a vulnerability-
  assessment plan and a prioritized findings report — identification only, no
  exploitation. Use when the user asks to "build a VAPT plan", "do a vulnerability
  assessment plan from Bitsight", "map our attack surface findings", "prioritized
  findings report", or wants a scoped VA plan and findings mapped to Bitsight risk
  vectors. Planning/reporting only — it never scans or exploits anything.
metadata:
  version: "0.4.2"
---

# vapt-plan — vulnerability-assessment plan & findings (identification only)

Turn Bitsight attack-surface data into a **vulnerability-assessment plan** and a **prioritized
findings report**. This skill **identifies and plans only** — no exploit development, no
exploitation, no live scanning.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md).**
Section 5 (the **authorization gate**) and Section 7 (IT Act, 2000) are mandatory here.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if
   not authenticated, ask the user to paste their Bitsight API token and call `bitsight_set_token`
   (never echo it back), then continue. (See global rules §1.)

2. **Authorization gate — do this before producing any asset-specific content.**
   - Collect **written authorization** from someone entitled to grant it, and the **rules of
     engagement**: in-scope assets, testing windows, explicitly excluded systems, contacts, and how
     sensitive/personal data is to be handled.
   - **Refuse any asset not explicitly in scope.** If the user asks to include an asset without
     authorization, decline and explain why.
   - State plainly: **unauthorized access to or scanning of a computer resource is an offence under
     the Information Technology Act, 2000 (India) (esp. §§43, 66).** This skill produces a *plan and
     findings from already-observed Bitsight data* — it performs no active testing itself.
   - If authorization/RoE is not provided, stop at a generic methodology and do not tie findings to
     specific assets.

3. **Fetch attack-surface / asset data** (for in-scope companies/assets only):
   - Resolve the company via `bitsight_search_portfolio_company` if you only have a name.
   - `bitsight_get_assets` — the internet-facing asset inventory (domains, IP ranges, importance).
   - `bitsight_get_findings` — individual findings (exposed/insecure services, unpatched software,
     weak TLS, open ports, misconfigurations) with affected assets and evidence. Page through
     results; filter by `risk_vector`, `severity_gte`, or `affects_rating` as scope dictates.
     **`severity_gte` takes a number, never a category word** — start at `severity_gte: 8` for the
     material-and-severe worklist and widen only if it comes back thin. Global rules §3a has the
     thresholds. For vulnerability findings the vector is `critical_vulnerability_management`.
   - `bitsight_get_findings_summary` for the risk-vector/severity rollup — the authoritative
     categorical counts, and the cross-check that a filtered pull didn't silently return nothing.

4. **Confirm scope selection:** all IPs + domains, a selective subset, or **by Bitsight asset
   criticality** (`importance`). Restrict everything downstream to the authorized, in-scope set.
   **If the user disputes that an asset is theirs, stop and run `entity-scope` first.** Planning an
   assessment against an asset that turns out to belong to someone else is the expensive version of
   an attribution error, and the authorization in step 2 cannot cover an asset the user doesn't own.

5. **Produce the deliverable — two parts:**

   **A. Vulnerability-assessment plan (methodology)**
   - Objective and confirmed scope (authorized assets only), with the RoE summarized.
   - Assessment approach: passive/external validation of Bitsight-observed issues, planned
     non-destructive verification steps, tooling categories (identification only), and windows.
   - Explicit out-of-scope list and stop conditions.

   **B. Prioritized findings report**
   - One row/entry per finding, **mapped to its Bitsight risk vector** and severity.
   - Affected asset(s), evidence/observation, and why it matters.
   - Priority ranking (weigh severity × asset importance × exposure), with the tier/color context
     of the parent company from the global-rules bands where relevant.
   - **Remediation guidance** per finding (concrete, actionable), and quick-win vs. structural fixes.
   - A summary table: counts by risk vector and by severity.

6. **Boundaries — restate in the output:** this is identification and planning only. No exploit
   code, no proof-of-concept exploitation, no live scanning is included or implied. Execution, if
   any, is performed separately by authorized, licensed testers under the agreed RoE.

7. **India context & data care:** note CERT-In log-retention/6-hour incident-reporting expectations
   and any DPDP implications if findings touch personal data, deferring the actual determination to
   the user's compliance/legal team. Treat all findings as confidential; don't write them to files
   or share them beyond the task without the user's intent.

## Error handling

Per the global-rules table: 401 → re-prompt for the token and stop; **403 → valid token, unentitled endpoint: continue without that source and say what's missing** (never re-prompt); 404 → bad GUID, re-confirm;
429 → back off and retry (mind pagination over large finding sets); empty result → state there are
no matching findings/assets and do not fabricate any.
