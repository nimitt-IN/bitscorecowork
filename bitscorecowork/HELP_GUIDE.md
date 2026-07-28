# BitScoreCoWork — Help Guide

How to trigger each of the five skills, what to have ready, and how to read API errors.

An asset by **BitScore Cybertech LLP** — [bitscore.in](https://bitscore.in).

> **Before your first run — authentication:** the plugin asks for your Bitsight API token the first
> time you use any skill in a session, holds it **in memory only**, and asks again every time it
> starts. Just paste the token when prompted. No skill pulls data until a token is set, and none of
> them ever write your token to a file, log, or report. Say **"clear my token"** to forget it
> mid-session. (For headless/scheduled runs you can skip the prompt — see the README's unattended
> mode.)

---

## The rating scale every skill uses

Bitsight scores run **250–900** (currently achievable 300–820), always in multiples of 10. Every
skill maps a score to this exact band + color:

| Tier | Score | Color | Risk |
| --- | --- | --- | --- |
| **Basic** | 250–630 | 🔴 Red | High |
| **Intermediate** | 640–730 | 🟠 Orange | Medium |
| **Advanced** | 740–900 | 🟢 Green | Low |

---

## Skill 1 — `mycompany`

**Use it for:** your *own* organization's current rating and risk-vector breakdown.

**Trigger phrases**
- "Check our Bitsight rating."
- "What's our security score right now?"
- "Pull my company's Bitsight rating and weakest areas."

**Example prompt**
> "Pull our Bitsight rating for company GUID `a1b2c3d4-…` and give me an executive summary."

**Expected inputs:** your **Company GUID** (or a name/domain to resolve). It will ask whether to
cross-reference extra context (audit notes, links, uploaded docs) and which layout you want:
Executive Summary / Bulleted Technical Breakdown / Raw Data Object.

---

## Skill 2 — `myportfolio`

**Use it for:** ratings across every company in a managed portfolio, with high-risk vendors flagged.

**Trigger phrases**
- "Pull ratings for our whole portfolio."
- "Which vendors are high risk?"
- "Rank our third parties by Bitsight rating."

**Example prompt**
> "Pull all vendor ratings for portfolio `PF-1234`, prioritize our top-10 critical suppliers, and
> give me a high-risk flag report."

**Expected inputs:** your **Portfolio GUID/ID**. It will ask which vendors/assets to prioritize and
the output format: Matrix Table / High-Risk Flag Report / Comparative Stack Ranking. It pages through
the whole portfolio and surfaces every Basic-tier (🔴) vendor as high risk.

---

## Skill 3 — `boardpack`

**Use it for:** an executive/board briefing deck from Bitsight data, with an optional 1-page brief.

**Trigger phrases**
- "Build a board pack on our security ratings."
- "Make a quarterly cyber-risk deck for leadership."
- "Executive briefing on vendor risk this quarter."

**Example prompt**
> "Build a 12-slide board pack on our portfolio's Bitsight posture this quarter, add a 1-page exec
> summary, and generate it as a .pptx."

**Expected inputs:** framing context (recent news, specifics, tone), deck length (**5-slide core** or
**12-slide deep dive**), whether you want the **1-page companion**, and output format (Markdown slides
or generated `.pptx`/`.docx`).

---

## Skill 4 — `vapt-plan` (findings only)

**Use it for:** a vulnerability-assessment plan + prioritized findings report from Bitsight attack-
surface data. **Identification and planning only — no exploitation, no scanning.**

**Trigger phrases**
- "Build a VAPT plan from our Bitsight attack surface."
- "Give me a prioritized findings report mapped to risk vectors."
- "Map our external findings and how to fix them."

**Example prompt**
> "Using Bitsight findings for GUID `a1b2c3d4-…`, build a vulnerability-assessment plan and a
> prioritized findings report for our authorized in-scope IPs only."

**Expected inputs:** the target **GUID** (or name), your **scope** (all IPs+domains / selective / by
asset criticality), and — required before any asset-specific output — **written authorization + rules
of engagement.** Out-of-scope assets are refused.

---

## Skill 5 — `security-test-plan` (planning & reporting only)

**Use it for:** a full VAPT/BAS **engagement plan and reporting scaffold** for BitScore's licensed
testers to execute manually. **No working exploit code, no live execution.**

**Trigger phrases**
- "Create a VAPT engagement plan."
- "Scope a breach-and-attack-simulation exercise."
- "Give me a pentest plan with MITRE ATT&CK scenarios and a reporting template."

**Example prompt**
> "From Bitsight data for GUID `a1b2c3d4-…`, build a BAS engagement plan: scope by asset criticality,
> ATT&CK-mapped scenario descriptions, an RoE template, and a findings report template."

**Expected inputs:** the target **GUID**, **scope** (all / selective / by criticality), **engagement
type** (VAPT or BAS), and **written authorization + RoE.** Any asset not explicitly in scope is
hard-refused.

> ⚖️ **Legal note (skills 4 & 5):** unauthorized access to or scanning of a computer resource is an
> offence under the **Information Technology Act, 2000 (India)** (§§43, 66). These skills only plan
> and report; execution is done separately by authorized, licensed testers under the signed RoE.

---

## API-error troubleshooting

| What you see | HTTP | Meaning | What to do |
| --- | --- | --- | --- |
| "No Bitsight API token is set…" | — | You haven't provided a token yet this session | Paste your Bitsight token when prompted; Claude stores it via `bitsight_set_token`. |
| "…token was rejected (401/403)…" | **401 / 403** | The pasted token is invalid, expired, revoked, or under-privileged | Get a valid token (Bitsight → Settings → Account → User Preferences) and paste it again when asked. |
| "Not found…" | **404** | Bad GUID / portfolio ID, or not in this token's portfolio | Re-confirm the identifier. Use `bitsight_search_portfolio_company` to look up a GUID; companies outside your portfolio must be added in the Bitsight platform first. |
| "Rate limited…" | **429** | Too many requests too quickly | The skills back off and retry automatically; if it persists, wait ~a minute and retry. |
| "No data returned" | — | Nothing matched your query/filter | Accepted as-is — the skills will **not** invent data. Broaden the filter or re-check the scope. |
| Server won't start | — | Node.js missing/old | Ensure Node.js 18+ is installed. No `npm install` needed. |

---

## Quick reference — which skill do I want?

- One company (usually *ours*) → **`mycompany`**
- Everyone we monitor → **`myportfolio`**
- Slides for leadership → **`boardpack`**
- Findings + assessment plan (no testing) → **`vapt-plan`**
- Full test-engagement plan + templates for testers → **`security-test-plan`**

---

© 2026 BitScore Cybertech LLP. "Bitsight" is a registered trademark of Bitsight Technologies, Inc.;
this plugin is an independent integration and is not published by Bitsight.
