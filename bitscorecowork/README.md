# BitScoreCoWork — v0.4.1

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

## What's new in 0.4.1

**Regulatory corrections — the reason to upgrade.** Two references carried positions that would have
misrouted a real filing, and both are fixed:

- **The RBI 2026 framework is seven instruments, not one.** The Directions issued on 31 July 2026 are
  parallel texts, one per entity class — commercial banks **410**, SFBs **419**, Payments Banks
  **428**, UCBs **437**, AIFIs **456**, NBFCs **461**, CICs **470** (all `RBI/DoS/2026-27/`), each
  with the same six-hour DAKSH clock but its own reporting paragraph. The plugin previously described
  410 as *the* instrument and routed everyone else to the 2023 IT Governance Master Direction, so an
  NBFC pack or notification could cite the wrong text entirely. All seven were read directly from
  rbi.org.in and are now Primary throughout.
- **NBFC Base Layer was described as out of scope; it isn't.** 461 binds every RBI-registered NBFC,
  graded by chapter — and Base Layer below ₹500 crore carries **no** DAKSH clause, only CERT-In's six
  hours. Both the old exclusion and the naive inclusion were wrong in different directions.
- **IRDAI moved to the 2026 Guidelines** (IRDAI/GA&HR/CIR/MISC/51/4/2026, 6 April 2026), which
  replaced the 2023 text the plugin still cited. IRDAI's page for the 2023 PDF is still live with no
  superseded notice — the trap is now called out in place.
- ⚠️ **The DPDP breach clock is not running, and the plugin previously implied it was.** Rule 1(4) of
  G.S.R. 846(E) puts **Rule 7 in the eighteen-month tranche — it commences 13 May 2027** — and
  G.S.R. 843(E) commences Act **section 8** on the same date. `incident-notify` no longer drafts DPDP
  intimations as live filings, and `tabletop` runs them as clearly labelled rehearsal injects. The
  two-dates trap (the 14th is only the e-gazette upload stamp) is documented alongside.
- **SEBI CSCRF is three filings, not one**, and is now Primary from circular
  SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/113: six hours to `mkt_incidents@sebi.gov.in` **and** CERT-In,
  details to the SEBI Incident Reporting Portal within 24 hours, plus a further six-hour leg to the
  exchanges/depositories for stock brokers and depository participants. Triggered by *noticing or
  being brought to notice*, not detection alone.
- **IRDAI's "24-hour step" does not exist in the 2026 Guidelines.** It was carried over from 2023. The
  2026 text (§3.6, read from the Annexure B ZIP) sets **six hours to CERT-In with a copy to IRDAI**
  and nothing further; the entity list is also wider than the usual shorthand — FRBs, TPAs, IMFs,
  ISNP, MISPs, CSCs and the IIB are all named.
- **SEBI LODR Reg. 30 is now honestly marked unverified.** SEBI serves the consolidated regulations
  through a client-rendered page whose text could not be read, so the 12/24-hour limbs are flagged as
  indicative rather than quoted with false confidence. It is the last Secondary row in the file.

**`entity-scope` gained the field that explains estate size.** Assets carry **`origin_subsidiary`**,
naming the entity an attribution came through — and the same IP is returned **once per subsidiary it
maps through**. Verified live: one address appearing six times in a single page, whole pages running
100 rows to 18 unique hosts. A Bitsight asset total is a *row* count, not a host count, and the
reference now says so and tells you to deduplicate before quoting either. `hosted_by` being routinely
null is documented too, with RDAP lookups as the checkable fallback a dispute submission needs.

Skills, tools and the taxonomy are otherwise unchanged from 0.4.0.

---

## The sixteen skills

**Six skills arrived in 0.4.0, taking the plugin from ten to sixteen.** The first ten all answer some
version of *"what does Bitsight say?"*. These six answer questions the platform raises but doesn't
close.

**`entity-scope`** takes on the first objection in every ratings deployment — *"those IPs aren't
ours"* — and the one that stalls the most pilots. It pages the full observed footprint, categorises
every asset against a nine-part attribution taxonomy in the
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

**Verified against a live Bitsight subscription on 4 August 2026: 16 checks passed, 0 failed, 0 gated
by entitlement.** Three things the live run changed:

**`bitsight_get_alerts` declared a severity enum that matches nothing.** The tool advertised
`INFO`/`WARN`/`DANGER`/`MATERIAL`; the endpoint returned `CRITICAL` and `INCREASE` on
`RATING_THRESHOLD` alerts, and each of the four declared values matched **zero** alerts. Because an
unmatched severity returns an empty set rather than an error, a filtered pull was indistinguishable
from a quiet period — which is precisely the failure `watchtower` exists to prevent, and it would
also have let `vendor-brief` report a clean 90 days on a vendor that wasn't. The enum constraint is
removed, the tool now tells you to read severity off the response and group by it, and `watchtower`,
`vendor-brief` and `boardpack` no longer filter on an assumed vocabulary.

**`hosted_by` is a better attribution signal than any hostname pattern.** Every asset carries a
`hosted_by` object naming the hosting organisation, which cleanly separated an ISP-hosted estate from
Microsoft, AWS, GoDaddy, Cloudflare and Google infrastructure. `entity-scope` now reads it first and
keeps the hostname patterns as the fallback for when the assets endpoint is unentitled.

**Multi-company attribution means two different things, and the count doesn't tell you which.** The
assumption `entity-scope` was built on held — 42 of 100 findings carried multiple attributions — but
the names revealed that most were not shared hosting at all: one domain was attributed to eleven
entities that were all the same organisation, onboarded once per cloud account and in places suffixed
`DUPLICATE`. A rule that flagged multi-attribution as shared infrastructure would have been wrong on
every one of them. So the taxonomy gained a ninth category, **entity overlap**, and a fourth outcome
alongside keep / dispute / shared responsibility. It is a portfolio-hygiene item for the account
team, explicitly not a dispute — filing it as one spends the customer's credibility on a submission
that should be a conversation.

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
