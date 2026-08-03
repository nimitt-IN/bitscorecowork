---
name: security-test-plan
description: >
  From Bitsight attack-surface data, generate a full VAPT or Breach-and-Attack-
  Simulation (BAS) engagement plan and reporting scaffold for BitScore's licensed
  testers to execute manually. Use when the user asks to "build a security test
  plan", "create a VAPT engagement plan", "scope a BAS exercise", "write a
  penetration-test plan", "MITRE ATT&CK scenario plan", or wants a complete
  test-plan + RoE + reporting template. Plan and template only — no working
  exploit code and no live execution.
metadata:
  version: "0.3.0"
---

# security-test-plan — engagement plan & reporting scaffold (planning only)

From Bitsight attack-surface data, produce a **complete VAPT / Breach-and-Attack-Simulation
engagement plan and report scaffold** for BitScore's licensed testers to execute manually. This
skill delivers the **plan, methodology, RoE template, and reporting template** only — **no working
exploit code and no live execution.**

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md).**
Section 5 (the **authorization gate**) and Section 7 (IT Act, 2000) are mandatory here.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if
   not authenticated, ask the user to paste their Bitsight API token and call `bitsight_set_token`
   (never echo it back), then continue. (See global rules §1.)

2. **Authorization gate — hard-refuse out-of-scope assets before producing asset-specific content.**
   - Collect **written authorization** from an entitled approver plus **rules of engagement**:
     in-scope assets, windows, exclusions, contacts/escalation, data-handling constraints, and any
     "do-not-touch" systems.
   - **Hard-refuse any asset not explicitly in scope** — decline and explain if asked to add one.
   - State plainly: **unauthorized access to or scanning of a computer resource is an offence under
     the Information Technology Act, 2000 (India) (esp. §§43, 66).** This skill produces planning and
     reporting artifacts only; it runs nothing.
   - Without authorization/RoE, stop at a generic (asset-agnostic) plan and RoE template.

3. **Ask scope and engagement type:**
   - **Scope:** all / selective / **by Bitsight asset criticality** (`importance`).
   - **Engagement type:** **VAPT** (vulnerability assessment + manual penetration testing) or
     **BAS** (breach-and-attack simulation of adversary behaviors).

4. **Fetch attack-surface / asset data** (in-scope only):
   - `bitsight_search_portfolio_company` to resolve a name → GUID if needed.
   - `bitsight_get_assets` for the internet-facing inventory (domains, IP ranges, importance).
   - `bitsight_get_findings` (paginated; filter by `risk_vector` / **`severity_gte`**, which takes a
     number — `severity_gte: 8` for material and severe, the scenarios worth a tester's day) and
     `bitsight_get_findings_summary` for the risk-vector/severity picture that seeds scenarios.
     Thresholds and the vector vocabulary are in global rules §3a; vulnerability findings sit under
     `critical_vulnerability_management`.

5. **Produce the engagement plan + report scaffold:**

   **A. Scoped test plan** — objective, authorized scope (assets only from the RoE), assumptions,
   constraints, timeline/windows, roles, and explicit out-of-scope + stop conditions.

   **B. Phase-by-phase methodology** — e.g. reconnaissance → enumeration → vulnerability validation
   → (for VAPT) controlled manual testing / (for BAS) simulated adversary emulation →
   post-engagement cleanup → reporting. Describe **what** each phase covers and its safety rails;
   do **not** include working exploit code or step-by-step exploitation commands.

   **C. MITRE ATT&CK-mapped scenario list** — scenarios seeded by the observed Bitsight risk vectors
   (e.g. exposed services → Initial Access; weak TLS → relevant technique), each as a **description
   only** with its ATT&CK tactic/technique ID and the in-scope asset it targets. No payloads, no
   executable procedures.

   **D. Rules-of-Engagement template** — a fill-in RoE the client signs: authorization statement,
   scope table, windows, exclusions, emergency contacts, data-handling, and legal acknowledgement
   referencing the IT Act, 2000.

   **E. Executive summary template** — headline posture, risk themes, "Why It Matters", top
   recommendations (blanks for the tester to complete post-execution).

   **F. Findings / reporting template** — per-finding structure (title, affected asset, Bitsight
   risk-vector mapping, severity/CVSS placeholder, evidence placeholder, business impact,
   remediation, retest status). Band parent-company ratings using the global-rules tier colors where
   relevant.

6. **Boundaries — restate in the output:** planning and reporting scaffolds only. No working
   exploits, no live scanning, no execution. Licensed BitScore testers execute manually, separately,
   under the signed RoE.

7. **India context & data care:** flag CERT-In incident-reporting/log-retention expectations and any
   DPDP obligations if the engagement will touch personal data, deferring the determination to
   compliance/legal. Keep all data confidential; don't persist it to files or share it beyond the
   task without the user's intent — and never write the API token into any template or report.

## Error handling

Per the global-rules table: 401 → re-prompt for the token and stop; **403 → valid token, unentitled endpoint: continue without that source and say what's missing** (never re-prompt); 404 → bad GUID, re-confirm;
429 → back off and retry; empty result → state plainly that no assets/findings were returned and do
not fabricate any.
