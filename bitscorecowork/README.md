# BitScoreCoWork

An asset by **BitScore Cybertech LLP** — [bitscore.in](https://bitscore.in), authorised India
partner for [Bitsight](https://www.bitsight.com/).

Pull and analyze **Bitsight Security Ratings** from inside your Claude Cowork environment, then turn
them into executive-ready reporting and **scoped, authorization-gated** security-testing plans —
without leaving Claude.

Built for BitScore's enterprise customers who are Bitsight subscribers: quick rating lookups for
your own organization, portfolio-wide vendor/third-party monitoring, vendor due-diligence briefs,
remediation roadmaps, CVE exposure sweeps, framework evidence packs, indicative financial exposure
estimates, board briefings, and VAPT/BAS *planning* artifacts your licensed testers execute manually.

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
| **regmap** | "map this to NIST CSF / ISO 27001" | Framework evidence pack — evidenced / partially / not evidenced |
| **quantify** | "what's our exposure in rupees?" | Indicative financial exposure range with every assumption shown |
| **vapt-plan** | "build a VAPT / vulnerability-assessment plan" | Findings report + assessment plan (identification only) |
| **security-test-plan** | "create a VAPT/BAS engagement plan" | Full test plan, RoE, ATT&CK scenarios, report scaffold |

See [`HELP_GUIDE.md`](HELP_GUIDE.md) for example prompts, expected inputs, and troubleshooting.

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
  for personal data; RBI/SEBI/IRDAI third-party risk norms) are surfaced where relevant. The
  `regmap` skill organizes observed evidence against framework control areas, but it does **not**
  determine compliance or give legal advice — loop in your compliance/legal team.

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
| **Server won't start** | Ensure Node.js 18+ is available. No `npm install` is required — the server uses only Node built-ins. |

---

© 2026 BitScore Cybertech LLP. Released under the MIT License (see [`LICENSE`](LICENSE)). "Bitsight"
is a registered trademark of Bitsight Technologies, Inc.; this plugin is an independent integration
and is not published by Bitsight.
