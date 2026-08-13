# BitScoreCoWork

A Claude Cowork plugin for **Bitsight Security Ratings**, by
**BitScore Cybertech LLP** — [bitscore.in](https://bitscore.in), authorised India partner for
[Bitsight](https://www.bitsight.com/).

**Latest release: [v0.4.2](https://github.com/nimitt-IN/bitscorecowork/releases/tag/v0.4.2)** —
sixteen skills, 15 read-only tools, verified against the live Bitsight API.
[All releases →](https://github.com/nimitt-IN/bitscorecowork/releases)

Pull and analyze Bitsight Security Ratings from inside Claude, then turn them into executive-ready
reporting, vendor decisions, remediation plans, audit evidence, footprint validation, regulatory
incident notifications, crisis simulations, and scoped, authorization-gated security-testing plans.
It ships a zero-dependency MCP server (Node.js 18+) wrapping the Bitsight REST API as 15 read-only
tools, plus sixteen skills:

| Skill | What it produces |
| --- | --- |
| `mycompany` | Your organization's rating, tier band, risk vectors |
| `myportfolio` | Portfolio-wide ratings, color-banded, high-risk flagged |
| `watchtower` | Recurring delta digest — act now / watch / ignore |
| `boardpack` | Executive slide deck (+ optional 1-page brief) |
| `peer-index` | Sector position by industry percentile and peer cohort, vector by vector |
| `vendor-brief` | Due-diligence brief with a go / no-go recommendation |
| `remediation-roadmap` | Prioritized 30/60/90-day fix plan |
| `cve-sweep` | Portfolio exposure to a named CVE, with evidence |
| `regmap` | NIST CSF 2.0 / ISO 27001 / Indian-regime evidence pack, incl. the RBI Directions, 2026 |
| `assurance-pack` | Answers to an inbound customer security questionnaire or RFP section |
| `quantify` | Indicative financial exposure range (**not** Bitsight FQ) |
| `entity-scope` | Signed-off asset inventory + attribution-dispute submission |
| `incident-notify` | Escalation matrix with IST deadlines + per-instrument notification drafts |
| `tabletop` | Board crisis simulation with injects, regulatory clocks and a facilitator guide |
| `vapt-plan` | Findings report + assessment plan (identification only) |
| `security-test-plan` | Test plan, RoE, ATT&CK scenarios, report scaffold |

➡️ **Full documentation lives in [`bitscorecowork/README.md`](bitscorecowork/README.md)** (features,
setup, security notes) and [`bitscorecowork/HELP_GUIDE.md`](bitscorecowork/HELP_GUIDE.md) (per-skill
usage and troubleshooting).

## Repository layout

| Path | What it is |
| --- | --- |
| [`bitscorecowork/`](bitscorecowork/) | The plugin source tree — edit here |
| `bitscorecowork-0.4.2.plugin` | The current built, installable plugin (a zip of `bitscorecowork/`) |
| [`LICENSE`](LICENSE) | MIT License |

Only the current bundle is kept at the repo root. Earlier bundles remain downloadable from their
[GitHub releases](https://github.com/nimitt-IN/bitscorecowork/releases).

## Install

Download **[`bitscorecowork-0.4.2.plugin` from the v0.4.2 release](https://github.com/nimitt-IN/bitscorecowork/releases/tag/v0.4.2)**
(it's also committed at the repo root) and add it in Claude, or point at the `bitscorecowork/`
directory as a local plugin. The `bitsight` MCP server starts automatically — no `npm install` and
no configuration required.

**Upgrade from any earlier bundle.** Releases before 0.4.2 describe the RBI Cybersecurity Directions,
2026 as a single commercial-banks instrument and route every other regulated entity to the 2023 IT
Governance Master Direction. There are in fact **seven parallel Directions**, one per entity class,
so an `incident-notify` escalation matrix or a `regmap` pack built on an older bundle can cite the
wrong instrument for an NBFC, SFB, Payments Bank, UCB, AIFI or CIC. They also still cite the IRDAI
2023 Guidelines, replaced in April 2026.

## Current release

**v0.4.2** — 16 skills, 15 read-only tools. **Every instrument in the incident-reporting reference has
now been read at source; nothing is outstanding.**

**SEBI LODR, closed out — and wrong in both directions.** 0.4.1 left Reg. 30(6) as the one unverified
row. Read from the consolidated text (last amended 14 July 2026): **a cyber incident is twelve hours,
not twenty-four**, because limb (ii) covers events *emanating from within* the listed entity. The
twenty-four-hour figure everyone quotes is limb (iii), for events arising outside it — quoting it puts
the disclosure twelve hours late. Board decisions are **thirty minutes**, not the twelve hours 0.4.1
attributed to them. The seventy-two-hour figure applies only to non-tax litigation claims held in the
structured digital database, not to incidents.

**Two LODR provisions the plugin never carried.** **Reg. 27(2)(ba)** puts cyber incidents, breaches and
data loss in the **quarterly corporate governance report with no materiality test** — so an incident
correctly judged immaterial for Reg. 30 can still be reportable, and it outlives the incident.
**Reg. 21(4)** requires the Risk Management Committee's role to specifically cover cyber security.

**`regmap` now asks whether the entity is listed**, whatever framework was chosen — LODR reaches every
listed entity in any sector. The mapping reference gains a LODR section in which **two of three rows
are "Bitsight evidences nothing"**, with a guardrail that a rating change is neither an incident nor a
disclosable event.

Carried from 0.4.1: the **seven parallel RBI Directions** (410/419/428/437/456/461/470, one per entity
class, six hours to DAKSH); **DPDP breach duties not in force until 13 May 2027**; **IRDAI's 24-hour
step does not exist** in the 2026 Guidelines; **CSCRF is three filings**; and `entity-scope`'s
**`origin_subsidiary`** — a Bitsight asset total is a row count, not a host count.

[Full release history →](https://github.com/nimitt-IN/bitscorecowork/releases)

## Building the `.plugin` from source

The `.plugin` file is just a zip of the `bitscorecowork/` directory. After changing anything under
`bitscorecowork/`, rebuild it so the shipped artifact matches:

```bash
rm -f bitscorecowork-0.4.2.plugin
zip -r -X bitscorecowork-0.4.2.plugin bitscorecowork \
  -x '*/.DS_Store' -x '*/node_modules/*'
```

## License

Released under the [MIT License](LICENSE). "Bitsight" is a registered trademark of Bitsight
Technologies, Inc.; this plugin is an independent integration and is not published by Bitsight.
