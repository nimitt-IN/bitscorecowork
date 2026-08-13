# BitScoreCoWork — Help Guide

How to trigger each of the sixteen skills, what to have ready, and how to read API errors.

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
- "Map this to the RBI Cybersecurity Directions 2026."

**Example prompt**
> "Build a regmap evidence pack for our org against NIST CSF 2.0 and ISO 27001:2022, as an .xlsx —
> it's going to our external auditor."

**Expected inputs:** the **subject** (your org, one vendor, or the portfolio), the **framework(s)**,
and who's going to read it. If you already have an internal control mapping, share it — yours will
be used instead of the generic reference.

### Picking RBI

Choosing RBI changes the flow. Before pulling any data, the skill asks **which RBI instrument
applies** to the entity. The Cybersecurity, Technology: Risk, Resilience and Assurance Framework
Directions, 2026 are **seven parallel instruments**, all issued 31 July 2026 and in force
immediately — one per entity class, each repealing the earlier circulars for its class:

| Entity class | Reference |
| --- | --- |
| Commercial Banks | [RBI/DoS/2026-27/410](https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=13643) |
| Small Finance Banks | [RBI/DoS/2026-27/419](https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=13634) |
| Payments Banks | [RBI/DoS/2026-27/428](https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=13625) |
| Urban Co-operative Banks | [RBI/DoS/2026-27/437](https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=13616) |
| All India Financial Institutions | [RBI/DoS/2026-27/456](https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=13597) |
| Non-Banking Financial Companies | [RBI/DoS/2026-27/461](https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=13592) |
| Credit Information Companies | [RBI/DoS/2026-27/470](https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=13583) |

Regional Rural Banks and Local Area Banks have none in this family. Outsourcing is a separate track
either way. It will ask rather than decide — applicability is your compliance team's call.

It then **invites you to add your own material**, with a chapter-by-chapter checklist: Board-approved
strategy and minutes, the Cybersecurity Policy and IT Governance Framework, CISO appointment, the
IT/IS risk register and asset inventory, VA and PT reports, patch and MFA coverage, DR drill results
with RTO/RPO, CSOC scope and SIEM coverage, incident-response policy and DAKSH submissions, IS Audit
reports, prior RBI inspection findings, and any control mapping you already maintain.

**None of it is required.** Say *"just the Bitsight data"* and you get a Bitsight-only pack — more
"not evidenced" rows, and a coverage statement explaining why. What you do supply is **recorded, not
assessed**: RBI rows carry an evidence-source column (*Bitsight-observed* / *client-supplied* /
*not evidenced*) so the two never blur, and a supplied document never upgrades a Bitsight row.
References are chapter-level; read paragraph numbers off the published text.

> ⚖️ **This is an evidence pack, not an assessment.** It reports what is *evidenced*, *partially
> evidenced*, or *not evidenced by this data* — never "compliant". It does not rule on whether a
> regime applies to you. Framework references are indicative; your compliance team confirms them.

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

## Skill 11 — `entity-scope`

**Use it for:** settling *"those IPs aren't ours"* — validating the attributed footprint before
anyone acts on the findings.

**Trigger phrases**
- "Those IPs aren't ours."
- "Validate our Bitsight digital footprint."
- "Why is this domain attributed to us?"
- "Help us dispute an asset with Bitsight."

**Example prompt**
> "Review the footprint for GUID `a1b2c3d4-…`. We sold our logistics arm in March 2025 and we think a
> lot of what's showing is theirs. Give me an inventory and a dispute submission."

**Expected inputs:** the **GUID**, and — more usefully — your **corporate history**: acquisitions,
divestments (with dates), franchisee or dealer estates, and which entities are rated separately. Also
**who can sign off** on the inventory. You get every asset categorised as **keep / dispute / shared
responsibility** with the evidence, plus a submission draft.

> ⚠️ **A disputed asset is not a removed asset.** This plugin is read-only and Bitsight exposes no
> dispute API — you file through the platform or your account team, Bitsight adjudicates, and your
> rating doesn't move while it's pending. The skill will also push back where "not ours" doesn't hold:
> an acquired company's estate is your estate, and a cloud hostname proves nothing about who deployed
> the workload.

---

## Skill 12 — `incident-notify`

**Use it for:** the regulatory notifications you owe after an incident, and the clocks they run on.

**Trigger phrases**
- "We've had an incident — what do we have to report?"
- "Draft our CERT-In report."
- "DPDP breach intimation."
- "What are our notification deadlines?"

**Example prompt**
> "We noticed unauthorised access to a customer-facing app at 09:40 IST today. We're a listed NBFC in
> the Middle Layer and customer personal data is likely involved. What do we owe and by when?"

**Expected inputs:** **when you noticed it** (the single most important fact), your **entity type**
(commercial bank / SFB / Payments Bank / co-operative / NBFC and its SBR layer / SEBI-regulated /
insurer), whether you're **listed**, and whether **personal data** is in scope. You get an escalation
matrix with real IST deadlines, a fact-gathering checklist, per-instrument drafts and a timeline log.

> ⚠️ **The clock runs from noticing, not from confirming.** "We're still investigating" does not pause
> six hours. And a listed entity owes **SEBI LODR Reg. 30(6)** disclosure to the exchanges *in
> parallel* with its technical filings — **within twelve hours**, not the twenty-four usually quoted,
> because a cyber incident emanates from within the entity. On a twelve-hour limb it can fall due
> before some of the technical filings. Reg. 27(2)(ba) then puts the incident in the **quarterly**
> corporate governance report regardless of materiality.

> ⚖️ **Drafts only, nothing is filed.** The skill will not decide whether an incident is reportable,
> whether an instrument applies to you, or whether an event is material — those are your legal and
> compliance team's calls. Clocks are source-cited and marked **Primary** or **Secondary** by whether
> the published text was read directly; confirm the Secondary ones before filing.

---

## Skill 13 — `tabletop`

**Use it for:** a board or executive crisis exercise built from your own real attack surface.

**Trigger phrases**
- "Run a tabletop exercise for the board."
- "War-game a breach with the leadership team."
- "Build a cyber crisis simulation."

**Example prompt**
> "Build a 90-minute board tabletop for GUID `a1b2c3d4-…`. We're a listed private-sector bank. Focus
> on the escalation path and the regulatory clocks. Facilitator guide and post-exercise report please."

**Expected inputs:** **who's in the room** (board / exec / technical — don't blend them), **how long**,
**what you're testing** (two objectives is plenty), your **regulatory position**, and anything
**off-limits**. You get a scenario seeded from your weakest observed vectors, a timed inject list,
decision points, live regulatory clocks, media questions, a facilitator guide and a report template.

> ⚠️ **Every artefact is stamped `EXERCISE — NOT A REAL INCIDENT`** — header, footer, and inside any
> simulated notification. A convincing fake breach disclosure that leaves the room causes a real
> problem. External parties are anonymised, and roles are titles rather than named people so the
> exercise doesn't become a performance review.

---

## Skill 14 — `peer-index`

**Use it for:** where you sit against your sector, by rating and by risk vector.

**Trigger phrases**
- "Where do we sit against the other private-sector banks?"
- "How do we compare to our peers?"
- "Sector benchmarking."
- "Are we above or below the industry average?"

**Example prompt**
> "Benchmark us against the other private-sector banks in our portfolio, and against Bitsight's
> finance industry percentiles. Vector-level detail — the board will ask where we're weakest."

**Expected inputs:** the **subject GUID**, and which comparison you want: **Bitsight industry
percentiles** (the statistically defensible one), a **named peer list**, or a **portfolio segment**.
Also **who reads it**, which sets the confidentiality mode.

> ⚠️ **Your portfolio is not your sector.** A cohort built from portfolio rows is a convenience sample
> — it contains only whoever you happen to monitor, and a competitor's absence tells you nothing about
> them. The skill states `n` and the selection basis every time, uses Bitsight's own industry
> percentiles for the "where do we sit" claim, and **anonymises named peers by default** for anything
> leaving the security team.

---

## Skill 15 — `watchtower`

**Use it for:** a recurring digest of what actually changed since the last review.

**Trigger phrases**
- "What changed since last week?"
- "Run our portfolio monitoring digest."
- "Weekly vendor risk update."
- "Set up recurring Bitsight monitoring."

**Example prompt**
> "Run the weekly watchtower digest against last Monday's snapshot. Our payments and payroll vendors
> are the critical ones."

**Expected inputs:** the **previous snapshot** if you have one (the skill writes a
`watchtower-snapshot-YYYY-MM-DD` file to your working folder each run), the **review window**, and
**which vendors are critical**. You get a short digest triaged into **act now / watch / ignore** —
with the ignores justified, which is the point: a digest nobody trusts to filter gets skipped, and
then the one that mattered gets skipped too.

> ⚠️ **The first run has no baseline, so it has no delta.** It will say so and write the snapshot
> rather than reporting a quiet week. The snapshot holds confidential third-party data — don't share
> it and don't commit it to a repository. Pair with the `schedule` skill to run it weekly.

---

## Skill 16 — `assurance-pack`

**Use it for:** answering a customer's security questionnaire, DDQ, or the security section of an RFP.

**Trigger phrases**
- "Answer this security questionnaire."
- "Fill in the customer DDQ."
- "A client wants proof of our security posture."
- "Respond to the security section of this RFP."

**Example prompt**
> "Here's a prospect's security questionnaire. They'll be holding our customer data. Answer what our
> Bitsight evidence supports and tell me what I need to get from internal teams."

**Expected inputs:** **the actual questionnaire** (paste or attach it — answering a generic template
when a specific one exists wastes the work), **who's asking and what the deal involves**, the
**deadline and required format**, and any **previous responses** so the answers stay consistent. Every
answer is dispositioned as *evidenced*, *partially evidenced*, *not evidenced by this data*, or
*requires internal input* with a named owner.

> ⚖️ **This is an outbound commercial document, so the constraints are tighter.** It will never write
> "compliant" or "certified" about you, never overstate to win a deal, and **never attach your
> itemised findings** — a list of your own open issues sent to a prospect is a target map. Posture,
> trend and grades only, and it flags what a competent reader will infer about you before it goes out.

---

## API-error troubleshooting

| What you see | HTTP | Meaning | What to do |
| --- | --- | --- | --- |
| "No Bitsight API token is set…" | — | You haven't provided a token yet this session | Paste your Bitsight token when prompted; Claude stores it via `bitsight_set_token`. |
| "…token was rejected as invalid or expired…" | **401** | The pasted token is invalid, expired, or revoked | Get a valid token (Bitsight → Settings → Account → User Preferences) and paste it again when asked. |
| "…not available to this token's subscription…" | **403** | **Your token is valid** — that endpoint just isn't in your Bitsight subscription. Finding summaries, assets and insights are the ones most often gated | Nothing to fix. The skill continues without that source and tells you what's missing. Don't re-paste the token; if you need the data, ask your Bitsight account team about entitlement. |
| "Not found…" | **404** | Bad GUID / portfolio ID, or not in this token's portfolio | Re-confirm the identifier. Use `bitsight_search_portfolio_company` to look up a GUID; companies outside your portfolio must be added in the Bitsight platform first. |
| "Rate limited…" | **429** | Too many requests too quickly | The skills back off and retry automatically; if it persists, wait ~a minute and retry. |
| "No data returned" | — | Nothing matched your query/filter | Accepted as-is — the skills will **not** invent data. Broaden the filter or re-check the scope. |
| "Input should be a valid number…" | **422** | A severity *category* was sent where a number belongs | Severity filters are numeric: `severity_gte` 9 = severe, 8 = material and above, 6 = moderate and above, 1 = everything. The skills do this for you. |
| A risk vector reads zero findings but grades badly | **200** | A risk-vector slug Bitsight doesn't recognise returns an *empty set*, not an error — so it looks like a clean company | From 0.3.0 the server resolves the Critical Vulnerability Management slug automatically. If you hit it elsewhere, trust `bitsight_get_findings_summary` over a filtered pull. |
| Server won't start | — | Node.js missing/old | Ensure Node.js 18+ is installed. No `npm install` needed. |

---

## Quick reference — which skill do I want?

- One company (usually *ours*) → **`mycompany`**
- Everyone we monitor → **`myportfolio`**
- Only what changed since last time → **`watchtower`**
- Slides for leadership → **`boardpack`**
- How do we compare to our sector? → **`peer-index`**
- Should we sign with this vendor? → **`vendor-brief`**
- What do we fix, in what order? → **`remediation-roadmap`**
- Who's exposed to this CVE? → **`cve-sweep`**
- Evidence for an auditor or a framework → **`regmap`**
- Answers for a customer's questionnaire → **`assurance-pack`**
- What's it worth in money? → **`quantify`**
- Are these assets even ours? → **`entity-scope`**
- We've had an incident — what must we report? → **`incident-notify`**
- Rehearse a crisis with the board → **`tabletop`**
- Findings + assessment plan (no testing) → **`vapt-plan`**
- Full test-engagement plan + templates for testers → **`security-test-plan`**

**Common chains.** `myportfolio` → `vendor-brief` on whatever it flags → `remediation-roadmap` for
the conditions you impose. Or `cve-sweep` → `vendor-brief` on the worst-exposed critical vendor →
`boardpack` if it needs to go up. Or `regmap` → `remediation-roadmap` for the gaps it surfaces →
`quantify` to fund the work.

**Chains through the newer skills.** `entity-scope` → `vapt-plan` or `security-test-plan`, so you
scope a test against assets you've confirmed are yours. `watchtower` weekly → `vendor-brief` on
anything it puts in *act now*. `boardpack` → `peer-index`, because "how do we compare?" is the board's
first question. `tabletop` → `incident-notify`, so the notification drafts exist before the real
incident rather than being improvised during it. `assurance-pack` → `remediation-roadmap` for whatever
the customer's questionnaire exposed.

---

© 2026 BitScore Cybertech LLP. "Bitsight" is a registered trademark of Bitsight Technologies, Inc.;
this plugin is an independent integration and is not published by Bitsight.
