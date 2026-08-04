# BitScoreCoWork — v0.4.0

An asset by **BitScore Cybertech LLP** — [bitscore.in](https://bitscore.in), authorised India
partner for [Bitsight](https://www.bitsight.com/).

Pull and analyze **Bitsight Security Ratings** from inside your Claude Cowork environment, then turn
them into executive-ready reporting and **scoped, authorization-gated** security-testing plans —
without leaving Claude.

Built for BitScore's enterprise customers who are Bitsight subscribers: quick rating lookups for
your own organization, portfolio-wide vendor/third-party monitoring, recurring change digests,
footprint validation and attribution disputes, vendor due-diligence briefs, remediation roadmaps,
CVE exposure sweeps, framework evidence packs, customer questionnaire responses, sector benchmarking,
indicative financial exposure estimates, board briefings, board-level crisis simulations, the
time-bound Indian regulatory notifications an incident triggers, and VAPT/BAS *planning* artifacts
your licensed testers execute manually.

---

## What's inside

**MCP server — `bitsight`** (zero external dependencies; Node.js 18+ only). Wraps the Bitsight
Security Ratings REST API (`https://api.bitsighttech.com/ratings`) as read-only tools:

| Tool | Purpose |
| --- | --- |
| `bitsight_auth_status` / `bitsight_set_token` / `bitsight_clear_token` | Session auth — the plugin asks for your token each time it starts and holds it in memory only |
| `bitsight_search_portfolio_company` | Resolve a company name/domain to its Bitsight GUID |
| `bitsight_get_company_details` | Rating, 1-year history, risk-vector grades, industry comparison |
| `bitsight_get_findings_summary` | Open findings by risk vector and severity |
| `bitsight_get_findings` | Individual findings (attack-surface issues) with affected assets |
| `bitsight_get_assets` | Internet-facing assets (domains, IP ranges) with importance |
| `bitsight_get_portfolio` | List/filter monitored companies (paginated) |
| `bitsight_get_alerts` | Recent rating changes and risk events |
| `bitsight_get_rating_change_insights` | What drove a significant rating change |
| `bitsight_get_industry_benchmark` | Industry ratings, or one industry's 1-year history with percentile bands |
| `bitsight_list_threats` | Bitsight's threat catalog — resolve a CVE to its threat GUID |
| `bitsight_get_threat_companies` | Which portfolio companies are observably affected by a threat |
| `bitsight_get_threat_evidence` | The observed assets behind one threat-company pairing |

Everything is **read-only** — nothing here can modify your Bitsight portfolio or run an active scan.

**Skills**

| Skill | Trigger it by asking… | What you get |
| --- | --- | --- |
| **mycompany** | "check *our* Bitsight rating" | Your organization's rating, tier band, risk vectors |
| **myportfolio** | "pull all our vendors' ratings" | Portfolio-wide ratings, color-banded, high-risk flagged |
| **boardpack** | "build a board pack on our ratings" | Executive slide deck (+ optional 1-page brief) |
| **vendor-brief** | "should we onboard this vendor?" | Due-diligence brief, go/no-go call, contract clauses, re-review date |
| **remediation-roadmap** | "how do we get from 690 to 740?" | Prioritized 30/60/90-day fix plan with owners and effort |
| **cve-sweep** | "who's exposed to CVE-XXXX?" | Portfolio exposure list, evidence, triage order, outreach drafts |
| **regmap** | "map this to NIST CSF / ISO 27001 / the RBI Directions" | Framework evidence pack — evidenced / partially / not evidenced |
| **quantify** | "what's our exposure in rupees?" | Indicative financial exposure range with every assumption shown |
| **vapt-plan** | "build a VAPT / vulnerability-assessment plan" | Findings report + assessment plan (identification only) |
| **security-test-plan** | "create a VAPT/BAS engagement plan" | Full test plan, RoE, ATT&CK scenarios, report scaffold |
| **entity-scope** | "those IPs aren't ours" | Signed-off asset inventory + attribution-dispute submission |
| **incident-notify** | "we've had an incident — what must we report?" | Escalation matrix with IST deadlines + per-instrument notification drafts |
| **tabletop** | "run a board tabletop exercise" | Scenario, timed injects, regulatory clocks, facilitator guide, report template |
| **peer-index** | "where do we sit against other private-sector banks?" | Industry-percentile position + peer cohort, vector by vector |
| **watchtower** | "what changed since last week?" | Recurring delta digest, triaged act now / watch / ignore |
| **assurance-pack** | "answer this customer security questionnaire" | Outbound answers dispositioned by what the evidence supports |

See [`HELP_GUIDE.md`](HELP_GUIDE.md) for example prompts, expected inputs, and troubleshooting.

**Bundled references** — the skills read these rather than repeating them:
[`bitscore-global-rules.md`](reference/bitscore-global-rules.md) (binding on all sixteen),
[`regulatory-map.md`](reference/regulatory-map.md) (risk vector → framework control areas),
[`incident-reporting-map.md`](reference/incident-reporting-map.md) (source-cited notification clocks),
and [`attribution-patterns.md`](reference/attribution-patterns.md) (why an asset is attributed, and
what a dispute needs).

---

## What's new in 0.4.0

**Six new skills, taking the plugin from ten to sixteen.** The first ten all answer some version of
*"what does Bitsight say?"*. These six answer questions the platform raises but doesn't close.

**`entity-scope`** takes on the first objection in every ratings deployment — *"those IPs aren't
ours"* — and the one that stalls the most pilots. It pages the full observed footprint, categorises
every asset against an eight-part attribution taxonomy in the new
[`attribution-patterns.md`](reference/attribution-patterns.md) reference, and produces a signed-off
inventory plus a dispute submission. It is deliberately even-handed: the strongest mis-attribution
signal available is an asset carrying **more than one** attributed company on its findings, but the
skill pushes back just as hard where "not ours" doesn't hold. An acquired entity's estate is the
group's estate. A cloud PaaS hostname proves nothing about who deployed the workload. A CDN edge
address may be disputable while the TLS configuration on it is entirely the customer's own. And a
third outcome — **shared responsibility** — catches what most customers actually have: real,
brand-bearing assets operated by someone else. Because Bitsight exposes no dispute endpoint and this
plugin is read-only, the skill says plainly that it cannot change a footprint: submissions are filed
through the platform, Bitsight adjudicates, and the rating does not move while that is pending.

**`incident-notify`** drafts the time-bound notifications an Indian entity owes after an incident,
against the new [`incident-reporting-map.md`](reference/incident-reporting-map.md) — CERT-In's six
hours, the RBI filings, SEBI CSCRF and LODR Reg. 30, IRDAI, DPDP intimation to the Data Protection
Board and to affected Data Principals, and NCIIPC. Every clock carries its reference number, issue
date, source URL and a **Primary/Secondary** marker recording whether the published text was read
directly; the CERT-In directions and the RBI 2026 Directions were read at source, and the rest are
marked for confirmation before filing. Two corrections are baked in. "RBI requires 2–6 hour reporting
for banks and NBFCs" conflates instruments that no longer travel together — a commercial bank files
to **DAKSH within six hours** under Chapter V of the 2026 Directions, while NBFCs sit under the 2023
IT Governance Master Direction and only in the Top, Upper and Middle Layers. And a **listed** entity
usually owes SEBI LODR Reg. 30 disclosure to the exchanges in parallel with its technical filings,
which is the obligation most often missed in the first six hours. The skill will not decide whether an
incident is reportable, whether an instrument applies, or whether an event is material — and it will
skip the token prompt entirely if the user is mid-incident, because an incident response is not the
moment to block on a credential.

**`tabletop`** builds a board crisis simulation from the client's own attack surface: the weakest
observed vectors become the entry point, real assets name the systems, a real portfolio vendor
supplies the supply-chain inject. The regulatory clocks run as injects, which is what makes an Indian
board exercise bite — a six-hour CERT-In deadline ticking while the room is still arguing about
whether this counts as an incident is the actual lesson. Every artefact carries
`EXERCISE — NOT A REAL INCIDENT` in the header, the footer, and inside the body of any simulated
notification, because a convincing fake breach disclosure that leaves the room causes a real problem.

**`peer-index`** answers "where do we sit against the other private-sector banks?" while refusing to
overclaim. A cohort assembled from portfolio rows is a **convenience sample** — it contains only
whoever the customer happens to monitor — so the skill uses Bitsight's own industry percentiles and
distribution bands for the statistical claim, reports any named cohort with `n` and the selection
basis stated, and anonymises peers by default for anything leaving the security team. The value is
vector-level: *mid-pack overall, bottom-quartile on Critical Vulnerability Management* is actionable
in a way a single percentile never is.

**`watchtower`** turns a quarterly pull into a weekly habit — the delta since the last run, triaged
into act now, watch and ignore. Because the plugin holds no state between sessions, it writes a dated
snapshot to the working folder and reads it back next run; that is now the one file any skill persists
by design, and global rules §8 has been extended to sanction it and to set the handling rules. The
ignore list is justified rather than merely counted, because a digest nobody trusts to filter gets
skipped — and then the one that mattered gets skipped too. A first run has no baseline, and it says so
rather than reporting a quiet week.

**`assurance-pack`** is the outbound mirror of `regmap`: answering a customer's security
questionnaire, DDQ or RFP security section from the organisation's own evidence. The constraints are
tighter than anywhere else in the plugin, because the output is commercial and a questionnaire answer
becomes a contractual representation surprisingly often. It never writes "compliant" or "certified",
never overstates to win a deal, routes anything the data can't support to *requires internal input*
with a named owner, and **never attaches itemised findings** — a list of your own open issues sent to
a prospect is a target map.

**Also in this release.** Global rules §5 now covers `tabletop`'s no-exploitation boundary and the
exercise stamp; §7 points at the incident-reporting reference and restates that applicability is the
customer's compliance team's call; §8 resolves a long-standing contradiction — it said "don't write it
to files" while every skill offered `.xlsx` and `.docx` output, and now distinguishes producing an
artefact the user asked for from persisting data on your own initiative. Existing skills gained
onward links: `vapt-plan` and `security-test-plan` route to `entity-scope` when scope is disputed,
since an authorization cannot cover an asset the customer doesn't own; `cve-sweep` routes to
`incident-notify` when an exposure turns out to have been exploited; `myportfolio` routes to
`watchtower` for anyone running it on a cadence; `boardpack` routes to `peer-index`, because "how do
we compare?" is the board's first question.

---

## What's new in 0.3.1

**Outsourcing is a separate RBI instrument, and 0.3.0 blurred it.** 0.3.0 described non-bank
entities as remaining under "the IT governance Master Direction and the outsourcing norms", which
left the impression that the 2026 cybersecurity Directions had absorbed outsourcing for the banks
they cover. Checking the text: they had not, and they say so explicitly. Their third-party
paragraphs apply *only* to IT and cybersecurity arrangements falling **outside** the
[RBI (Commercial Banks – Managing Risks in Outsourcing) Directions, 2025](https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=13139)
— RBI/DOR/2025-26/171, issued 28 November 2025, existing IT outsourcing agreements to comply by
10 April 2026. Those 2025 Directions are themselves what repealed the 2023 Master Direction on
Outsourcing of IT Services for commercial banks; NBFCs have a parallel 2025 instrument.

So a covered bank runs two tracks, and evidence files differently against each: outsourcing
governance — materiality, due diligence, audit rights reaching subcontractors, concentration, exit —
under the 2025 Directions; cybersecurity controls and supervisory reporting under the 2026
Directions. `regmap` now asks which of the two a pack is actually about before mapping vendor
oversight, and the RBI checklist separates the outsourcing artefacts from the Chapter IV ones. The
mapping reference and global rules §7 carry the distinction.

This matters because it is the kind of error that survives review: both instruments are recent, both
are RBI, both have a third-party chapter, and mapping vendor due diligence to the wrong one produces
a pack that looks right and cites the wrong authority.

---

## What's new in 0.3.0

**`regmap` maps to the RBI Directions, 2026.** The Reserve Bank of India issued the
[Reserve Bank of India (Commercial Banks – Cybersecurity, Technology: Risk, Resilience and Assurance
Framework) Directions, 2026](https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=13643) on
**31 July 2026** (RBI/DoS/2026-27/410), in force immediately. They apply to commercial banks other
than Small Finance Banks, Payments Banks and Local Area Banks, and they **repeal** the earlier
cybersecurity and IT-governance instructions for those banks. A pack that still cites the superseded
circulars is citing the wrong instrument.

The mapping reference now carries a dedicated, source-cited RBI section: which entities the
Directions cover and which they don't, the eight chapters, a risk-vector → chapter table with an
explicit *what this cannot show* column, and the portfolio and vendor activities that evidence
Chapter IV third-party oversight. References are **chapter-level by design** — paragraph numbers are
read off the published text, not out of this plugin.

**`regmap` now asks for your own material when RBI is the framework.** Bitsight evidences the
external surface of Chapter V, the detection outcomes Chapter VI's CSOC exists to produce, and
third-party monitoring under Chapter IV. Most of these Directions — Board and IT Strategy Committee,
CISO reporting line, CSOC staffing, VA/PT reports, DR drills and RTO/RPO, MFA enforcement, training,
IS Audit, DAKSH incident submissions — sit in records only the bank has. So when RBI is chosen, and
only then, the skill first asks **which RBI instrument applies** (it never rules on applicability
itself), then invites you to hand over policies, VA/PT reports, audit findings, the outsourcing
register, prior inspection findings, or an existing control mapping, with a chapter-by-chapter
checklist of what would strengthen the pack.

Nothing is required. Decline and you get a Bitsight-only pack with more "not evidenced" rows and a
coverage statement that says why. What you do supply is **recorded, never assessed**: RBI rows carry
an evidence-source column — *Bitsight-observed*, *client-supplied*, *not evidenced* — so a reader can
always tell which is which, and a supplied document never upgrades a Bitsight row. Judging your
documents against the Directions stays with your compliance team, where it belongs.

Other frameworks are untouched: NIST, ISO, SEBI, IRDAI, CERT-In and DPDP packs behave exactly as
they did in 0.2.1.

### One risk-vector name, one severity filter

**`critical_vulnerability_management` is now the only vector name in the plugin.** 0.2.1 documented
both it and the retired `patching_cadence` slug and asked the model to retry with the other if one
came back empty. Testing against the live API on 3 August 2026 showed why that was not good enough:

| `risk_vector` sent | Result |
| --- | --- |
| `critical_vulnerability_management` | HTTP 200, **0 findings** |
| `patching_cadence` | HTTP 200, **210 findings** |
| `not_a_real_vector` | HTTP 200, **0 findings** |

— on a company Bitsight grades **F** on that vector. The product renamed; the API did not. And an
unrecognised slug isn't rejected, it returns an empty set that looks exactly like a clean company.
Leaving that to a retry heuristic meant a skill could report "no vulnerability findings" for an
estate with hundreds, and be believed.

The MCP server now owns the difference. Skills, prompts and outputs use one name; the server tries
the wire slug that actually answers, falls back automatically, and rewrites the legacy slug to the
canonical one in `rating_details`, `findings_risk_vector_counts` and individual findings before any
skill sees it. When Bitsight switches the API over, one constant changes and nothing else.

**Severity is filtered with `severity_gte`, everywhere, as a number.** The API rejects
`severity=severe` with HTTP 422 — a mistake that is easy to make and returns an error rather than a
wrong answer, but only if you make it that way round. Thresholds are verified against the
categorical counts: **9** = severe, **8** = material and above, **6** = moderate and above, **1** =
everything. All ten skills now name an explicit floor appropriate to their output — 8 for
vendor-brief, regmap, vapt-plan and security-test-plan, staged 8→6 for remediation-roadmap — instead
of pulling everything and discarding client-side, which on a large estate truncates before it is
useful. Categorical counts still come from `bitsight_get_findings_summary`, which stays
authoritative.

---

## What's new in 0.2.1

**Critical Vulnerability Management replaces Patching Cadence.** Bitsight retired the Patching
Cadence risk vector on 16 July 2026 and replaced it with Critical Vulnerability Management at the
same 20% weight. This is a methodology change, not a rename: the grade is now a **severity-weighted
average time-to-remediate**, and findings live 90 days.

That inverts one piece of advice the plugin used to give. `remediation-roadmap` treated patching as
slow process work and sequenced it into days 61–90; under CVM, promptly remediating a Material or
Severe vulnerability is among the fastest ways to move a rating, so those findings now belong in the
first 30 days. The roadmap skill says so explicitly, and the slow-programme-work bucket is now
software currency and asset inventory hygiene, which genuinely do move slowly.

`regmap`'s framework mapping table, and the vector references in `mycompany` and `vendor-brief`, use
the new name. The `bitsight_get_findings` `risk_vector` parameter documents both the new
`critical_vulnerability_management` slug and the legacy `patching_cadence` one, and tells the model
to retry with the other rather than report zero findings if one comes back empty — Bitsight's public
API reference doesn't state which the endpoint accepts, so this is deliberately tolerant of either.

---

## What's new in 0.2.0

**Five new skills** — `vendor-brief`, `remediation-roadmap`, `cve-sweep`, `regmap` and `quantify`
cover the ground between pulling a rating and planning a pentest: the vendor decision, the fix list,
the CVE exposure question, the audit evidence, and the money.

**Four new read-only tools** — an industry-benchmark tool so a score is reported against its sector
rather than in a vacuum, plus the three threat tools that make CVE sweeps possible
(`/v2/threats` → affected companies → per-company evidence).

**403 no longer misreported as a bad token.** Bitsight returns 401 for an invalid token but 403 for
a *valid* token whose subscription doesn't include an endpoint — `findings/summaries`, `assets` and
`insights` are commonly gated. 0.1.1 collapsed the two, so a 403 told you to re-paste a credential
that was never the problem and abandoned the workflow. The skills now continue without that source,
name the gap, and substitute where an honest substitute exists.

**Response shapes corrected against the live API.** There is no top-level `rating` scalar on the
company object (the current rating is `ratings[0].rating`); `industry` is a display string while the
slug lives in `industry_slug`; `rating_details` returns null rather than 403 when unentitled; and
`mycompany` now resolves your own organization from the portfolio response instead of asking you for
a GUID.

Every tool in this release was exercised against a live Bitsight subscription: 18 checks passed,
0 failed, 3 gated by entitlement.

---

## Prerequisites

- **A Bitsight subscription** and a **Bitsight API token** (see setup below).
- The **Company GUID** for your organization, and/or a **Portfolio GUID/ID**, depending on which
  skills you use. The `bitsight_search_portfolio_company` tool can resolve a name/domain to a GUID
  for any company already in your monitored portfolio.
- **Node.js 18+** on the machine running Claude/Cowork (the MCP server needs no `npm install`).

---

## Setup

1. **Get a Bitsight API token.** In the Bitsight platform: Settings → Account → User Preferences →
   API Token (or ask a Bitsight admin for a Company API Token). See
   [API Token Management](https://help.bitsighttech.com/hc/en-us/articles/115014888388-API-Token-Management).

2. **Install the plugin** (accept the `.plugin` file / add the plugin directory). The `bitsight` MCP
   server starts automatically — no environment variable or other configuration is required.

3. **Provide your token when asked.** The first time you use any BitScoreCoWork skill in a session,
   the plugin asks you to paste your Bitsight API token. It's verified against Bitsight, then held
   **in memory for that session only** and used for HTTP Basic Auth against `api.bitsighttech.com`
   (token as username, blank password). **You are asked again every time the plugin starts** — the
   token is never saved.

> **Optional — unattended / scheduled runs.** To skip the prompt for headless automation, set both
> `BITSIGHT_ALLOW_ENV_TOKEN=1` and `BITSIGHT_API_TOKEN=<your-token>` in the environment the MCP
> server runs in. The server then uses the env token as a fallback. Interactive sessions should use
> the prompt flow above and leave these unset.

> **Plugin manifest location:** the manifest lives at `.claude-plugin/plugin.json` (the standard,
> installable location Claude looks for). The logical layout is still exactly as documented:
> `plugin.json`, `README.md`, `HELP_GUIDE.md`, `.mcp.json`, and `skills/…`.

---

## 🔐 Security note on key handling (read this)

- **The plugin asks for your token every time it starts** and keeps it **only in the MCP server's
  process memory for the session.** It is **never** written to disk, logs, memory files, config, or
  any generated document (report, deck, `.pptx`, `.docx`), and is discarded when the session ends.
- When you paste the token, Claude uses it solely to call `bitsight_set_token` and will **not** echo
  it back in its replies. Say "clear my token" any time to wipe it from memory mid-session
  (`bitsight_clear_token`).
- Because the token is entered in chat, treat that message as sensitive per your own data-handling
  policy. If you prefer the token never appears in the conversation at all, use the unattended
  environment-variable mode above instead.
- Rotate the token in Bitsight if you suspect exposure.

---

## Authorization & the law (testing skills)

`vapt-plan` and `security-test-plan` **require written authorization and rules of engagement** before
producing any asset-specific content, and will **refuse any asset not explicitly in scope.**

**Unauthorized access to, or scanning of, a computer resource is an offence under the Information
Technology Act, 2000 (India) (notably §§43 and 66).** These skills produce **plans, methodology, and
reporting scaffolds only** — they never perform live scanning or exploitation. Execution is carried
out separately by BitScore's licensed testers under the signed RoE.

---

## Notes on data handling & scope

- Bitsight ratings use the official **250–900** scale and reflect **externally observable signals
  only** — one input into risk management, not a substitute for full due diligence, contractual
  review, or on-site assessment.
- Bitsight data is confidential under Bitsight's Terms of Service and often concerns third parties'
  security posture. These skills summarize in-conversation and avoid writing data to files or sharing
  it unless you ask.
- **India-specific obligations** (CERT-In 6-hour incident reporting and log retention; DPDP Act, 2023
  for personal data; the RBI Cybersecurity, Technology: Risk, Resilience and Assurance Framework
  Directions, 2026 for commercial banks; RBI/SEBI/IRDAI third-party risk norms) are surfaced where
  relevant. The `regmap` skill organizes observed evidence against framework control areas, but it
  does **not** determine compliance, rule on whether a regime applies to you, or give legal advice —
  loop in your compliance/legal team.
- **Anything you hand `regmap` stays with the pack.** If you supply policies, audit reports or an
  existing control mapping for an RBI pack, that material is used to build the pack and nothing
  else — it is not written anywhere you didn't ask for, and DPDP minimisation applies to it as it
  does to findings data.

### Two things worth knowing before you rely on an output

- **`regmap` produces an evidence pack, not an assessment.** It says what is *evidenced*, *partially
  evidenced*, or *not evidenced by this data* — never "compliant". Framework references are
  indicative and must be confirmed against the current published text by your compliance team.
  Bitsight sees the external surface of a control, never its design or operation.
- **`quantify` is not Bitsight Financial Quantification.** Bitsight sells an FQ product with its own
  loss dataset and Monte Carlo model; **this plugin has no access to it**. `quantify` produces an
  indicative, fully transparent estimate from your posture plus figures you supply. If you license
  FQ, the authoritative number is in the Bitsight platform — use that one for insurers and
  regulators.
- **No rating-point forecasts.** `remediation-roadmap` sequences work and explains expected direction
  and relative magnitude. It will not tell you that a fix is worth *N* points, because Bitsight's
  algorithm is neither public nor linear and nobody can honestly claim that.

---

## Troubleshooting

| Symptom | Likely cause & fix |
| --- | --- |
| **It keeps asking for my token** | Expected — the token is held in memory only and requested once per session (each time the plugin starts). For unattended runs, use the `BITSIGHT_ALLOW_ENV_TOKEN` mode in Setup. |
| **"No Bitsight API token is set"** | Paste your token when asked; Claude stores it via `bitsight_set_token`. If it was rejected, the token is invalid/expired — get a fresh one from Bitsight. |
| **Authentication error (401)** | The token is invalid, expired, or revoked. Paste a valid token when prompted (re-check it in Bitsight → Settings → Account → User Preferences). |
| **"Not available to this token's subscription" (403)** | **Your token is fine.** That endpoint isn't included in your Bitsight subscription — commonly `findings/summaries`, `assets` or `insights`. The skills carry on without it and tell you which part of the analysis is unavailable; re-pasting the token will not help. If you need that data, it's an entitlement question for your Bitsight account team. |
| **Company / GUID not found (404)** | The GUID/portfolio ID is wrong or not in this token's portfolio. `bitsight_search_portfolio_company` only finds companies already monitored — add others via the Bitsight platform first. |
| **Rate limited (429)** | Too many calls too fast. The skills back off and retry; if it persists, wait a minute and retry. |
| **Empty result** | No matching data — the skills say so rather than inventing numbers. |
| **A vector shows zero findings but a poor grade** | Shouldn't happen from 0.3.0 on: the server resolves the Critical Vulnerability Management slug against whichever name the API currently answers. If you see it on another vector, the slug is being rejected silently (Bitsight returns 200 with an empty set, not an error) — cross-check `bitsight_get_findings_summary`, which is authoritative. |
| **"Input should be a valid number" (422)** | A severity category word was passed where a number belongs. Severity filters use `severity_gte`: 9 severe, 8 material and above, 6 moderate and above, 1 everything. |
| **Server won't start** | Ensure Node.js 18+ is available. No `npm install` is required — the server uses only Node built-ins. |

---

© 2026 BitScore Cybertech LLP. Released under the MIT License (see [`LICENSE`](LICENSE)). "Bitsight"
is a registered trademark of Bitsight Technologies, Inc.; this plugin is an independent integration
and is not published by Bitsight.
