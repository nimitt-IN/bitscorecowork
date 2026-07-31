# BitScoreCoWork — Help Guide

How to trigger each of the ten skills, what to have ready, and how to read API errors.

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

## Skill 4 — `vendor-brief`

**Use it for:** a due-diligence brief on **one** vendor, ending in a clear recommendation.

**Trigger phrases**
- "Should we onboard this supplier?"
- "Run due diligence on <vendor> before we sign."
- "Vendor risk brief for the renewal."

**Example prompt**
> "Run a vendor brief on acme.com — they'll be processing customer PII and it's a new onboarding.
> We don't take anyone below 700 for that."

**Expected inputs:** the vendor **name/domain or GUID**, plus what they'll actually do (data
accessed, business criticality, contract stage) and any internal rating threshold you apply. You get
a **go / go-with-conditions / no-go** recommendation, the material findings in plain language,
contract clauses to negotiate (for your legal team to review), and a re-review date.

---

## Skill 5 — `remediation-roadmap`

**Use it for:** turning findings into a sequenced, ownable 30/60/90-day work plan.

**Trigger phrases**
- "How do we improve our Bitsight score?"
- "We're at 690 — how do we get to 740?"
- "What should we fix first?"

**Example prompt**
> "Build a remediation roadmap for GUID `a1b2c3d4-…`. Target is out of Basic tier before our
> October customer audit. We have an infra team and an MSP, and a change freeze in September."

**Expected inputs:** the **GUID**, your **target and deadline**, and **which teams can actually do
the work**. You get findings grouped into quick wins / concentrated gaps / process work, each with
owner, effort and expected direction of impact.

> ⚠️ **It will not quote point gains.** Bitsight's algorithm isn't public or linear, so "+15 points
> for this fix" would be a guess. You get the sequence and the reasoning instead.

---

## Skill 6 — `cve-sweep`

**Use it for:** checking a named CVE against the whole portfolio the hour the advisory lands.

**Trigger phrases**
- "Are any of our vendors exposed to CVE-2024-XXXXX?"
- "Run a CVE sweep on today's advisory."
- "Who's affected by this vulnerability?"

**Example prompt**
> "Sweep the portfolio for CVE-2024-3400, rank by criticality — our payments and payroll vendors are
> the critical ones — and draft outreach for anyone affected."

**Expected inputs:** the **CVE ID or vulnerability name**, and which vendors you consider critical
(if your portfolio tiers don't already say). You get an exposure table with evidence, a triage
order, and draft vendor outreach — **drafts only, nothing is sent.**

> ⚠️ **A miss is not an all-clear.** Bitsight reports what it observes externally. A vendor can be
> exposed and not appear — the affected system may be internal or simply not yet re-observed.

---

## Skill 7 — `regmap`

**Use it for:** organizing Bitsight evidence against framework control areas for an audit file.

**Trigger phrases**
- "Map our Bitsight data to NIST CSF."
- "ISO 27001 evidence from our ratings."
- "Show this against the SEBI framework for our review."

**Example prompt**
> "Build a regmap evidence pack for our org against NIST CSF 2.0 and ISO 27001:2022, as an .xlsx —
> it's going to our external auditor."

**Expected inputs:** the **subject** (your org, one vendor, or the portfolio), the **framework(s)**,
and who's going to read it. If you already have an internal control mapping, share it — yours will
be used instead of the generic reference.

> ⚖️ **This is an evidence pack, not an assessment.** It reports what is *evidenced*, *partially
> evidenced*, or *not evidenced by this data* — never "compliant". Framework references are
> indicative; your compliance team confirms them.

---

## Skill 8 — `quantify`

**Use it for:** expressing posture as money for a board, budget or insurance conversation.

**Trigger phrases**
- "What's our cyber exposure in rupees?"
- "Quantify the risk for the board."
- "Build the business case for this security spend."

**Example prompt**
> "Quantify our exposure. Revenue ~₹800 crore, we hold about 2 million customer records, BFSI, and
> we carry ₹50 crore of cyber cover with a ₹5 crore retention. Give me the .xlsx so I can adjust it."

**Expected inputs:** **annual revenue and currency**, **sector**, **volume of sensitive records**,
**existing insurance**, and downtime cost if you know it. You get three scenarios (typical / severe /
extreme) with line-item arithmetic, a sensitivity ranking, and a full assumptions section.

> ⚠️ **This is not Bitsight Financial Quantification.** Bitsight's FQ product is not reachable
> through this plugin's API. This is an indicative estimate from your posture plus your own figures.
> If you license FQ, use the platform's number for insurers and regulators. Not investment,
> insurance, or actuarial advice.

---

## Skill 9 — `vapt-plan` (findings only)

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

## Skill 10 — `security-test-plan` (planning & reporting only)

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

> ⚖️ **Legal note (skills 9 & 10):** unauthorized access to or scanning of a computer resource is an
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
- Should we sign with this vendor? → **`vendor-brief`**
- What do we fix, in what order? → **`remediation-roadmap`**
- Who's exposed to this CVE? → **`cve-sweep`**
- Evidence for an auditor or a framework → **`regmap`**
- What's it worth in money? → **`quantify`**
- Findings + assessment plan (no testing) → **`vapt-plan`**
- Full test-engagement plan + templates for testers → **`security-test-plan`**

**Common chains.** `myportfolio` → `vendor-brief` on whatever it flags → `remediation-roadmap` for
the conditions you impose. Or `cve-sweep` → `vendor-brief` on the worst-exposed critical vendor →
`boardpack` if it needs to go up. Or `regmap` → `remediation-roadmap` for the gaps it surfaces →
`quantify` to fund the work.

---

© 2026 BitScore Cybertech LLP. "Bitsight" is a registered trademark of Bitsight Technologies, Inc.;
this plugin is an independent integration and is not published by Bitsight.
