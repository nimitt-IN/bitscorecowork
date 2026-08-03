# BitScoreCoWork

A Claude Cowork plugin for **Bitsight Security Ratings**, by
**BitScore Cybertech LLP** — [bitscore.in](https://bitscore.in), authorised India partner for
[Bitsight](https://www.bitsight.com/).

**Latest release: [v0.3.1](https://github.com/nimitt-IN/bitscorecowork/releases/tag/v0.3.1)** —
ten skills, 15 read-only tools, verified against the live Bitsight API.
[All releases →](https://github.com/nimitt-IN/bitscorecowork/releases)

Pull and analyze Bitsight Security Ratings from inside Claude, then turn them into executive-ready
reporting, vendor decisions, remediation plans, audit evidence, and scoped, authorization-gated
security-testing plans. It ships a zero-dependency MCP server (Node.js 18+) wrapping the Bitsight
REST API as 15 read-only tools, plus ten skills:

| Skill | What it produces |
| --- | --- |
| `mycompany` | Your organization's rating, tier band, risk vectors |
| `myportfolio` | Portfolio-wide ratings, color-banded, high-risk flagged |
| `boardpack` | Executive slide deck (+ optional 1-page brief) |
| `vendor-brief` | Due-diligence brief with a go / no-go recommendation |
| `remediation-roadmap` | Prioritized 30/60/90-day fix plan |
| `cve-sweep` | Portfolio exposure to a named CVE, with evidence |
| `regmap` | NIST CSF 2.0 / ISO 27001 / Indian-regime evidence pack, incl. the RBI Directions, 2026 |
| `quantify` | Indicative financial exposure range (**not** Bitsight FQ) |
| `vapt-plan` | Findings report + assessment plan (identification only) |
| `security-test-plan` | Test plan, RoE, ATT&CK scenarios, report scaffold |

➡️ **Full documentation lives in [`bitscorecowork/README.md`](bitscorecowork/README.md)** (features,
setup, security notes) and [`bitscorecowork/HELP_GUIDE.md`](bitscorecowork/HELP_GUIDE.md) (per-skill
usage and troubleshooting).

## Repository layout

| Path | What it is |
| --- | --- |
| [`bitscorecowork/`](bitscorecowork/) | The plugin source tree — edit here |
| `bitscorecowork-0.3.1.plugin` | **Current** built, installable plugin (a zip of `bitscorecowork/`) |
| `bitscorecowork-0.3.0.plugin` | Previous release, kept for anyone still on it |
| `bitscorecowork-0.2.1.plugin` | Older release, kept for anyone still on it |
| `bitscorecowork-0.2.0.plugin` | Older release, kept for anyone still on it |
| `bitscorecowork-0.1.1.plugin` | Older release, kept for anyone still on it |
| [`LICENSE`](LICENSE) | MIT License |

## Install

Download **[`bitscorecowork-0.3.1.plugin` from the v0.3.1 release](https://github.com/nimitt-IN/bitscorecowork/releases/tag/v0.3.1)**
(it's also committed at the repo root) and add it in Claude, or point at the `bitscorecowork/`
directory as a local plugin. The `bitsight` MCP server starts automatically — no `npm install` and
no configuration required.

Older bundles are retained so existing installs aren't stranded, but upgrade when you can. 0.3.0
implies the 2026 cybersecurity Directions absorbed RBI outsourcing governance for commercial banks;
they expressly do not, so a vendor-oversight pack built on it can cite the wrong instrument. 0.2.1
maps `regmap` to the RBI cybersecurity circulars that the 31 July 2026 Directions repealed for
commercial banks, so an RBI pack built on it cites a superseded instrument. 0.2.0 additionally
still describes the retired **Patching Cadence** risk vector and sequences it as slow programme
work, which is now the wrong advice under Critical Vulnerability Management. 0.1.1 additionally
lacks the five newer skills and treats an HTTP 403 as an authentication failure, which sends you
rotating a valid token when Bitsight is really telling you an endpoint isn't in your subscription.

## Versions

| Version | Skills | Tools | Notes |
| --- | --- | --- | --- |
| **[0.3.1](https://github.com/nimitt-IN/bitscorecowork/releases/tag/v0.3.1)** — current | 10 | 15 | Separates the two RBI tracks 0.3.0 blurred. Outsourcing for commercial banks sits in the **[Managing Risks in Outsourcing Directions, 2025](https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=13139)** (28 Nov 2025), which repealed the 2023 IT-outsourcing Master Direction for them; the 2026 cybersecurity Directions expressly **preserve** that regime and carve around it, their third-party paragraphs reaching only arrangements outside it. `regmap` now asks which instrument a pack is about before mapping vendor oversight, and separates the outsourcing artefacts from the Chapter IV ones. |
| [0.3.0](https://github.com/nimitt-IN/bitscorecowork/releases/tag/v0.3.0) | 10 | 15 | Makes `critical_vulnerability_management` the plugin's only risk-vector name and moves the wire-level compatibility into the MCP server — verified on the live API, the retired `patching_cadence` slug is still the one Bitsight answers, and an unrecognised slug returns an empty set rather than an error, so 0.2.1's retry heuristic could report a clean company that was graded F. All ten skills now filter severity with a numeric `severity_gte` floor (9 severe, 8 material and above, 6 moderate and above) instead of pulling everything. Adds the **[RBI (Commercial Banks – Cybersecurity, Technology: Risk, Resilience and Assurance Framework) Directions, 2026](https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=13643)** (RBI/DoS/2026-27/410, 31 July 2026, in force immediately) to `regmap`'s mapping reference — coverage, the eight chapters, a risk-vector → chapter table, and what the data cannot show. Chapter-level references by design. When RBI is the chosen framework, and only then, `regmap` first asks **which** RBI instrument applies (the 2026 Directions repeal the earlier circulars for covered banks, but not for NBFCs, SFBs, Payments Banks or co-operative banks), then invites the user to supply policies, VA/PT reports, IS Audit findings, the outsourcing register or an existing control mapping. Supplied material is recorded, never assessed, and RBI rows carry an evidence-source column so client-supplied evidence never blurs into Bitsight-observed evidence. Other frameworks are unchanged. |
| [0.2.1](https://github.com/nimitt-IN/bitscorecowork/releases/tag/v0.2.1) | 10 | 15 | Tracks Bitsight's 16 July 2026 replacement of the **Patching Cadence** risk vector with **Critical Vulnerability Management**. More than a rename: CVM grades on a severity-weighted average time-to-remediate with a 90-day finding lifetime, so `remediation-roadmap` no longer defers it to days 61–90 as slow programme work and instead puts Material/Severe findings in the first 30 days. `regmap`'s framework table, the `mycompany` and `vendor-brief` copy, and the `bitsight_get_findings` risk-vector slug guidance all follow. |
| [0.2.0](https://github.com/nimitt-IN/bitscorecowork/releases/tag/v0.2.0) | 10 | 15 | Adds `vendor-brief`, `remediation-roadmap`, `cve-sweep`, `regmap`, `quantify`, plus industry-benchmark and threat/CVE tools. Separates 401 (bad token) from 403 (endpoint not in subscription) so a gated endpoint degrades gracefully instead of aborting the workflow. Response shapes corrected against the live API. |
| [0.1.1](https://github.com/nimitt-IN/bitscorecowork/releases/tag/v0.1.1) | 5 | 11 | Initial release: `mycompany`, `myportfolio`, `boardpack`, `vapt-plan`, `security-test-plan`. |

## Building the `.plugin` from source

The `.plugin` file is just a zip of the `bitscorecowork/` directory. After changing anything under
`bitscorecowork/`, rebuild it so the shipped artifact matches:

```bash
rm -f bitscorecowork-0.3.1.plugin
zip -r -X bitscorecowork-0.3.1.plugin bitscorecowork \
  -x '*/.DS_Store' -x '*/node_modules/*'
```

## License

Released under the [MIT License](LICENSE). "Bitsight" is a registered trademark of Bitsight
Technologies, Inc.; this plugin is an independent integration and is not published by Bitsight.
