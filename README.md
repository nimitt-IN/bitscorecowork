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
| `bitscorecowork-0.2.0.plugin` | The built, installable plugin (a zip of `bitscorecowork/`) |
| [`LICENSE`](LICENSE) | MIT License |

## Install

Install the built plugin file (`bitscorecowork-0.2.0.plugin`) in Claude, or add the
`bitscorecowork/` directory as a local plugin. The `bitsight` MCP server starts automatically — no
`npm install` and no configuration required.

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
