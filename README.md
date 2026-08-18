# BitScoreCoWork

A Claude Cowork plugin for **Bitsight Security Ratings**, by
**BitScore Cybertech LLP** — [bitscore.in](https://bitscore.in), authorised India partner for
[Bitsight](https://www.bitsight.com/).

**Latest release: [v0.5.0](https://github.com/nimitt-IN/bitscorecowork/releases/tag/v0.5.0)** —
sixteen skills, 15 read-only tools, verified against the live Bitsight API. 0.5.0 adds the **IFSCA /
GIFT City** regulatory track and SEBI CSCRF categorisation at its current thresholds.
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
| `bitscorecowork-0.5.0.plugin` | The current built, installable plugin (a zip of `bitscorecowork/`) |
| [`LICENSE`](LICENSE) | MIT License |

Only the current bundle is kept at the repo root. Earlier bundles remain downloadable from their
[GitHub releases](https://github.com/nimitt-IN/bitscorecowork/releases).

## Install

Download **[`bitscorecowork-0.5.0.plugin` from the v0.5.0 release](https://github.com/nimitt-IN/bitscorecowork/releases/tag/v0.5.0)**
(it's also committed at the repo root) and add it in Claude, or point at the `bitscorecowork/`
directory as a local plugin. The `bitsight` MCP server starts automatically — no `npm install` and
no configuration required.

**Upgrade from any earlier bundle.** Releases before 0.5.0 carry **no IFSCA track at all**, so a
GIFT City entity is routed to the RBI, SEBI or IRDAI — an IFSC licence displaces the mainland
regulator, and the resulting draft is filed with the wrong authority while the clock that does bind
the entity runs out. They also cite SEBI CSCRF at its **August 2024** thresholds, which were replaced
in April 2025 and again in August 2025. Releases before 0.4.2 additionally describe the RBI
Cybersecurity Directions, 2026 as a single commercial-banks instrument and route every other regulated
entity to the 2023 IT Governance Master Direction — there are in fact **seven parallel Directions**,
one per entity class — and still cite the IRDAI 2023 Guidelines, replaced in April 2026.

## Current release

**v0.5.0** — 16 skills, 15 read-only tools, five bundled references.

**The IFSCA / GIFT City track, which was missing entirely.** An entity licensed by IFSCA files with
IFSCA and **not** with the RBI, SEBI or IRDAI: an IFSC licence displaces the mainland regulator,
however mainland the business looks. Before this release a GIFT City banking unit answered "bank" to
`incident-notify` and received a DAKSH draft under RBI/DoS/2026-27/410, an instrument that does not
bind it — a failure that produced a draft looking entirely correct. The Guidelines
(IFSCA-CSD0MSC/13/2025-DCS, 10 March 2025) are now carried in full, read at source: **six hours from
detection**, an interim report at **3 days**, **mitigation measures taken within 7 days** — a
regulatory deadline on the fix itself, which nothing else here imposes — and root cause analysis at
**30 days**, plus the four para 21 exemptions, their conditions, the 90-day certification an exempt RE
still owes, and their expiry on 10 March 2028.

**SEBI CSCRF categorisation, at its current thresholds.** A new reference,
`reference/cscrf-categories.md`. The criteria were **replaced in April 2025 and again in August 2025**
— replaced, not adjusted — and Portfolio Managers and Merchant Bankers were re-categorised in both
rounds. SEBI fixes a category each April on the previous year's data and holds it for the year, so a
firm can be correctly categorised and still be working to a superseded table. `regmap` now asks for the
category before mapping anything.

**Four accuracy fixes**, including one in this reference's own claims: it said every row had been read
at source while NCIIPC and the superseded RBI 2023 Master Direction both still read Secondary. Also:
**Urban Co-operative Banks are not excluded from RBI 410** (Local Area Banks are, and they have no
instrument at all); the NBFC outsourcing instrument is now **named** — RBI/DOR/2025-26/363; and
`quantify` and `peer-index` gained Bitsight's published band-to-band breach multiples, the 720 mean,
and the fact that **about 60% of rated entities are Advanced** — the modal band, not an achievement.

**Every sectoral instrument in the incident-reporting reference has been read at source.** NCIIPC and
the superseded RBI 2023 Master Direction remain Secondary and say so where they sit.

### Carried from 0.4.2

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
rm -f bitscorecowork-0.5.0.plugin
zip -r -X bitscorecowork-0.5.0.plugin bitscorecowork \
  -x '*/.DS_Store' -x '*/node_modules/*'
```

## Keeping the regulatory references current

The four regulatory references under [`bitscorecowork/reference/`](bitscorecowork/reference/) hold the
same facts as the registries behind [bitscore.in/resources](https://www.bitscore.in/resources) —
`lib/regulations.ts`, `lib/incident-clocks.ts` and `lib/cscrf-categories.ts` in the site repository.
They are maintained separately, from the same primary sources, and that is how they drift: the IFSCA
track existed on the site for months before it existed here.

Each reference now ends with a provenance block naming what it mirrors and when it was verified:

```
<!-- provenance
mirrors: bitscore.in lib/incident-clocks.ts, lib/regulations.ts
verified: 2026-08-18
next-review: 2026-11-18
-->
```

The working rule:

1. **When a regulatory fact changes on either side, the other is the counterpart to check.** A new
   instrument, an amendment, a superseded circular, a corrected clock — it lands in both or in
   neither.
2. **Re-verify at source; do not copy across.** These references say they were read from the
   regulator's own published text, and that claim has to stay true independently. Copying a figure
   from the site propagates any error in it and quietly downgrades a Primary row to a hearsay one.
3. **Stamp the date you actually read it**, and mark the confidence honestly. A **Secondary** row that
   says so is useful; a **Primary** claim that has outlived its reading is worse than no claim, because
   it will be relied on.
4. **Review quarterly at the latest.** Between August 2024 and August 2026 the RBI, IRDAI and SEBI each
   replaced or amended a governing instrument, and SEBI did it three times.

## License

Released under the [MIT License](LICENSE). "Bitsight" is a registered trademark of Bitsight
Technologies, Inc.; this plugin is an independent integration and is not published by Bitsight.
