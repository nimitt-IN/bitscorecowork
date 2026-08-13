# BitScoreCoWork

A Claude Cowork plugin for **Bitsight Security Ratings**, by
**BitScore Cybertech LLP** — [bitscore.in](https://bitscore.in), authorised India partner for
[Bitsight](https://www.bitsight.com/).

**Latest release: [v0.4.1](https://github.com/nimitt-IN/bitscorecowork/releases/tag/v0.4.1)** —
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
| `bitscorecowork-0.4.1.plugin` | The current built, installable plugin (a zip of `bitscorecowork/`) |
| [`LICENSE`](LICENSE) | MIT License |

Only the current bundle is kept at the repo root. Earlier bundles remain downloadable from their
[GitHub releases](https://github.com/nimitt-IN/bitscorecowork/releases).

## Install

Download **[`bitscorecowork-0.4.1.plugin` from the v0.4.1 release](https://github.com/nimitt-IN/bitscorecowork/releases/tag/v0.4.1)**
(it's also committed at the repo root) and add it in Claude, or point at the `bitscorecowork/`
directory as a local plugin. The `bitsight` MCP server starts automatically — no `npm install` and
no configuration required.

**Upgrade from any earlier bundle.** Releases before 0.4.1 describe the RBI Cybersecurity Directions,
2026 as a single commercial-banks instrument and route every other regulated entity to the 2023 IT
Governance Master Direction. There are in fact **seven parallel Directions**, one per entity class,
so an `incident-notify` escalation matrix or a `regmap` pack built on an older bundle can cite the
wrong instrument for an NBFC, SFB, Payments Bank, UCB, AIFI or CIC. They also still cite the IRDAI
2023 Guidelines, replaced in April 2026.

## Current release

**v0.4.1** — 16 skills, 15 read-only tools.

Regulatory corrections to the bundled references. The RBI Cybersecurity, Technology: Risk, Resilience
and Assurance Framework Directions, 2026 are **seven parallel instruments issued on 31 July 2026**,
one per entity class — commercial banks 410, SFBs 419, Payments Banks 428, UCBs 437, AIFIs 456, NBFCs
461, CICs 470 — each carrying the same six-hour DAKSH clock under its own reporting paragraph. The
plugin previously treated 410 as the single instrument and sent every other entity class to the 2023
IT Governance Master Direction, which would have misrouted a live filing. All seven were read directly
from rbi.org.in. NBFC scope is corrected too: 461 binds every RBI-registered NBFC, graded by chapter,
and Base Layer below ₹500 crore carries no DAKSH clause at all — only CERT-In's six hours. IRDAI moves
to the 2026 Guidelines that replaced the 2023 text, and the DPDP Rules gain their G.S.R. 846(E)
citation with the 13-versus-14 November date trap spelled out.

**The DPDP breach clock is not running, and earlier releases implied it was.** Rule 1(4) of
G.S.R. 846(E) places **Rule 7 in the eighteen-month tranche — commencing 13 May 2027** — and
G.S.R. 843(E) commences Act section 8 on the same date. `incident-notify` no longer drafts DPDP
intimations as live filings; `tabletop` runs them as labelled rehearsal injects.

**SEBI CSCRF is three filings, not one** — six hours to `mkt_incidents@sebi.gov.in` and CERT-In, 24
hours to the SEBI Incident Reporting Portal, plus a further six-hour leg to exchanges and depositories
for brokers and DPs. **IRDAI's 24-hour step turned out not to exist** in the 2026 Guidelines; it was a
2023 carry-over. **SEBI LODR Reg. 30 is now marked unverified** rather than quoted with false
confidence — SEBI's consolidated text is client-rendered and could not be read.

`entity-scope` also gains **`origin_subsidiary`**, the asset field that explains estate size: the same
IP is returned once per subsidiary it maps through, so a Bitsight asset total is a row count, not a
host count. The reference now requires deduplication before any total is quoted, documents `hosted_by`
being routinely null, and points at RDAP as the checkable registry fallback a dispute submission needs.

[Full release history →](https://github.com/nimitt-IN/bitscorecowork/releases)

## Building the `.plugin` from source

The `.plugin` file is just a zip of the `bitscorecowork/` directory. After changing anything under
`bitscorecowork/`, rebuild it so the shipped artifact matches:

```bash
rm -f bitscorecowork-0.4.1.plugin
zip -r -X bitscorecowork-0.4.1.plugin bitscorecowork \
  -x '*/.DS_Store' -x '*/node_modules/*'
```

## License

Released under the [MIT License](LICENSE). "Bitsight" is a registered trademark of Bitsight
Technologies, Inc.; this plugin is an independent integration and is not published by Bitsight.
