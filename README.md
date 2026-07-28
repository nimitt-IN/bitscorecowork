# BitScoreCoWork

A Claude Cowork plugin for **Bitsight Security Ratings**, by
**BitScore Cybertech LLP** — [bitscore.in](https://bitscore.in), authorised India partner for
[Bitsight](https://www.bitsight.com/).

Pull and analyze Bitsight Security Ratings from inside Claude, then turn them into executive-ready
reporting and scoped, authorization-gated security-testing plans. It ships a zero-dependency MCP
server (Node.js 18+) wrapping the Bitsight REST API plus five skills: `mycompany`, `myportfolio`,
`boardpack`, `vapt-plan`, and `security-test-plan`.

➡️ **Full documentation lives in [`bitscorecowork/README.md`](bitscorecowork/README.md)** (features,
setup, security notes) and [`bitscorecowork/HELP_GUIDE.md`](bitscorecowork/HELP_GUIDE.md) (per-skill
usage and troubleshooting).

## Repository layout

| Path | What it is |
| --- | --- |
| [`bitscorecowork/`](bitscorecowork/) | The plugin source tree — edit here |
| `bitscorecowork-0.1.1.plugin` | The built, installable plugin (a zip of `bitscorecowork/`) |
| [`LICENSE`](LICENSE) | MIT License |

## Install

Install the built plugin file (`bitscorecowork-0.1.1.plugin`) in Claude, or add the
`bitscorecowork/` directory as a local plugin. The `bitsight` MCP server starts automatically — no
`npm install` and no configuration required.

## Building the `.plugin` from source

The `.plugin` file is just a zip of the `bitscorecowork/` directory. After changing anything under
`bitscorecowork/`, rebuild it so the shipped artifact matches:

```bash
rm -f bitscorecowork-0.1.1.plugin
zip -r -X bitscorecowork-0.1.1.plugin bitscorecowork \
  -x '*/.DS_Store' -x '*/node_modules/*'
```

## License

Released under the [MIT License](LICENSE). "Bitsight" is a registered trademark of Bitsight
Technologies, Inc.; this plugin is an independent integration and is not published by Bitsight.
