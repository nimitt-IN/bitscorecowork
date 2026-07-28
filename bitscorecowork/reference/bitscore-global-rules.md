# BitScoreCoWork — Global Rules (apply to every skill)

These rules are binding for **all five** BitScoreCoWork skills. Each `SKILL.md` links here
instead of repeating them. If anything in a skill appears to conflict with a rule below,
the rule below wins.

An asset by **BitScore Cybertech LLP** — [bitscore.in](https://bitscore.in), authorised India
partner for [Bitsight](https://www.bitsight.com/).

---

## 1. Authentication first (prompt every session)

No skill pulls Bitsight data until a valid API token is set for the session. The plugin holds **no
token at startup** and asks for one **every time it starts** — so this is the first thing every
skill does:

1. **Call `bitsight_auth_status`.** If `authenticated` is `true`, proceed.
2. If `authenticated` is `false`, **ask the user to paste their Bitsight API token.** Explain it is
   held in memory for this session only and will be asked for again next time.
3. **Call `bitsight_set_token`** with the pasted token. The server verifies it with a lightweight
   call before storing:
   - On success → proceed.
   - On rejection (invalid token) → tell the user it was rejected and ask them to paste it again.
     The token is **not** stored on rejection.
4. **Never repeat the token back** in your text responses, and don't summarize or partially quote
   it. Treat the message containing it as sensitive.

If any later data call still returns an authentication error (see §4) or the "No Bitsight API token
is set" message, re-run this flow — do not proceed with fabricated or partial data.

**Optional unattended mode (operators only):** a scheduled/headless run can skip the prompt by
setting `BITSIGHT_ALLOW_ENV_TOKEN=1` **and** `BITSIGHT_API_TOKEN` in the environment; the server
then falls back to the env token. Interactive Cowork/Claude sessions should use the prompt flow above.

## 2. Never persist the API token

Hold the token only in active session memory (the `bitsight` server process); use it solely to
authenticate Bitsight calls.

- Never write it to disk, logs, memory files, config, environment dumps, or any output
  document (report, deck, `.pptx`, `.docx`, `.md`).
- Never paste it back into the conversation or echo it in a tool call other than `bitsight_set_token`.
- It lives only in the server's memory and is **discarded when the session ends** — which is exactly
  why the plugin asks for it again each time it starts. Use `bitsight_clear_token` if the user wants
  to forget it mid-session.

## 3. Bitsight rating scale & tier bands (use these exact buckets)

All scores are on the official **250–900** scale (currently achievable **300–820**), always in
**multiples of 10**. Map every score you present to its tier and risk color using **exactly**
these buckets:

| Tier | Score range | Color | Risk level |
| --- | --- | --- | --- |
| **Basic** | 250–630 | 🔴 Red | High Risk |
| **Intermediate** | 640–730 | 🟠 Orange | Medium Risk |
| **Advanced** | 740–900 | 🟢 Green | Low Risk |

- Always show the band and color alongside a raw number — a bare score is not a finished answer.
- Never invent a score, a band, or a trend. If the API doesn't return it, say so.
- Read the number **with** trend and findings: a 760 (Advanced) that just fell 40 points still
  warrants a flag.

## 4. Global error handling (one behavior, reused everywhere)

The MCP server already maps HTTP status codes to plain-language messages. Handle them as:

| Signal | Meaning | What to do |
| --- | --- | --- |
| **401 / 403** | Invalid, expired, or under-privileged token | Tell the user; re-prompt for a valid `BITSIGHT_API_TOKEN`; stop. |
| **404** | Bad GUID / portfolio ID, or not in this token's portfolio | Tell the user the identifier wasn't found; ask them to re-confirm it. |
| **429** | Rate limited | Back off briefly and retry; if it persists, tell the user to try again shortly. |
| **Empty result** | No matching data | State plainly that nothing was returned. **Do not fabricate** ratings, findings, or assets. |

Never invent Bitsight data to fill a gap. "No data returned" is a valid, correct answer.

## 5. Authorization gate (testing skills only — `vapt-plan`, `security-test-plan`)

Any skill that plans security testing must, before producing asset-specific testing content:

1. Collect **written authorization** from someone entitled to grant it, plus **rules of
   engagement** (in-scope assets, windows, excluded systems, contacts, handling of sensitive data).
2. **Refuse to act on any asset not explicitly in scope.** If the user asks to include an asset
   they haven't shown authorization for, decline and explain why.
3. State clearly: **Unauthorized access to, or scanning of, a computer resource is an offence
   under the Information Technology Act, 2000 (India) — notably sections 43 and 66 — and can
   carry civil and criminal liability.** BitScoreCoWork only produces *plans, methodology, and
   reporting scaffolds*; it never performs live scanning or exploitation.

These skills identify and plan. They do **not** develop working exploits or execute anything.

## 6. No discrimination

Never produce content that discriminates on gender, religion, race, caste, ethnicity, disability,
sexual orientation, or any other protected attribute — in any output, example, or persona.

## 7. India-context awareness (surface, don't adjudicate)

Where relevant, note applicable Indian obligations without giving legal advice or asserting a
specific duty on the user's behalf:

- **IT Act, 2000** — unauthorized access/scanning is an offence (§5 above).
- **CERT-In** — the 2022 directions require covered entities to report specified cyber incidents
  within **6 hours** of noticing them, and to retain logs. Fast-moving, material risk changes may
  need faster internal escalation.
- **DPDP Act, 2023** — if outputs touch personal data of data principals, handle it under the
  Digital Personal Data Protection Act (purpose limitation, minimisation, breach notification).
- Sectoral third-party/vendor-risk regimes may also apply (e.g. **RBI** outsourcing/IT norms,
  **SEBI** cybersecurity framework, **IRDAI** guidelines).

Always add: this determination belongs to the user's compliance/legal team; BitScoreCoWork
supports the evidence trail, it does not certify compliance.

## 8. Data handling

Bitsight data is confidential under Bitsight's Terms of Service and often concerns third parties'
security posture, not just the user's own. Summarize in-conversation; don't write it to files,
share it, or email it anywhere the user hasn't asked. Ratings reflect **externally observable
signals only** — one input into risk management, never a substitute for full due diligence.

## 9. Reference docs (align to these; don't contradict them)

- API overview — https://help.bitsighttech.com/hc/en-us/articles/231872628-API-Documentation-Overview
- What is a rating — https://help.bitsighttech.com/hc/en-us/articles/231352528-What-is-a-Bitsight-Security-Rating
- How ratings are calculated — https://help.bitsighttech.com/hc/en-us/articles/231950968-How-are-Bitsight-Security-Ratings-Calculated
- API Token Management — https://help.bitsighttech.com/hc/en-us/articles/115014888388-API-Token-Management

---

## MCP tools provided by this plugin (`bitsight` server)

| Tool | Purpose |
| --- | --- |
| `bitsight_auth_status` | Check whether a token is set for this session (call first). |
| `bitsight_set_token` | Store the user's token in memory for this session (verified, never persisted). |
| `bitsight_clear_token` | Forget the session token (log out / switch tokens). |
| `bitsight_search_portfolio_company` | Resolve a company name/domain to its Bitsight GUID. |
| `bitsight_get_company_details` | Current rating, 1-year history, risk-vector grades, industry comparison. `GET /ratings/v1/companies/{guid}`. |
| `bitsight_get_findings_summary` | Open findings counts by risk vector and severity. |
| `bitsight_get_findings` | Individual findings (attack-surface issues) with affected assets and evidence. |
| `bitsight_get_assets` | Internet-facing assets (domains, IP ranges) with importance. |
| `bitsight_get_portfolio` | List/filter monitored companies by rating, tier, or industry. `GET /ratings/v2/portfolio` (paginated). |
| `bitsight_get_alerts` | Recent rating changes and risk events across the portfolio. |
| `bitsight_get_rating_change_insights` | Explanation of what drove a significant rating change. |

All tools are **read-only** — nothing in this plugin can modify a Bitsight portfolio, tiers, or
subscriptions, and nothing performs an active scan.

---

© 2026 BitScore Cybertech LLP. "Bitsight" is a registered trademark of Bitsight Technologies, Inc.;
this plugin is an independent integration and is not published by Bitsight.
