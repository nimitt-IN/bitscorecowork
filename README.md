# BitScoreCoWork

A Claude Cowork plugin for **Bitsight Security Ratings**, by
**BitScore Cybertech LLP** — [bitscore.in](https://bitscore.in), authorised India partner for
[Bitsight](https://www.bitsight.com/).

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
| `regmap` | NIST CSF 2.0 / ISO 27001 / Indian-regime evidence pack |
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
| `bitscorecowork-0.2.0.plugin` | **Current** built, installable plugin (a zip of `bitscorecowork/`) |
| `bitscorecowork-0.1.1.plugin` | Previous release, kept for anyone still on it |
| [`LICENSE`](LICENSE) | MIT License |

## Install

Install the current plugin file (`bitscorecowork-0.2.0.plugin`) in Claude, or add the
`bitscorecowork/` directory as a local plugin. The `bitsight` MCP server starts automatically — no
`npm install` and no configuration required.

`bitscorecowork-0.1.1.plugin` is retained so existing installs aren't stranded, but it lacks the
five newer skills and — more importantly — treats an HTTP 403 as an authentication failure, which
sends you rotating a valid token when Bitsight is really telling you an endpoint isn't in your
subscription. Upgrade when you can.

## Versions

| Version | Skills | Notes |
| --- | --- | --- |
| **0.2.0** | 10 | Adds `vendor-brief`, `remediation-roadmap`, `cve-sweep`, `regmap`, `quantify` and four read-only Bitsight tools. Separates 401 (bad token) from 403 (endpoint not in subscription) so a gated endpoint degrades gracefully instead of aborting the workflow. |
| 0.1.1 | 5 | Initial release: `mycompany`, `myportfolio`, `boardpack`, `vapt-plan`, `security-test-plan`. |

## Building the `.plugin` from source

The `.plugin` file is just a zip of the `bitscorecowork/` directory. After changing anything under
`bitscorecowork/`, rebuild it so the shipped artifact matches:

```bash
rm -f bitscorecowork-0.2.0.plugin
zip -r -X bitscorecowork-0.2.0.plugin bitscorecowork \
  -x '*/.DS_Store' -x '*/node_modules/*'
```

## License

Released under the [MIT License](LICENSE). "Bitsight" is a registered trademark of Bitsight
Technologies, Inc.; this plugin is an independent integration and is not published by Bitsight.
