---
name: regmap
description: >
  Build a framework evidence pack from Bitsight data — map risk vectors and
  findings to NIST CSF 2.0, ISO/IEC 27001:2022 and Indian regulatory obligation
  areas (RBI, SEBI, IRDAI, CERT-In, DPDP). Use when the user asks to "map our
  Bitsight data to NIST", "ISO 27001 evidence from our ratings", "show this
  against the SEBI/RBI framework", "control mapping", "map this to the RBI
  Cybersecurity Directions 2026", or wants ratings evidence organized for an
  audit, assessment or supervisory review.
metadata:
  version: "0.4.2"
---

# regmap — framework evidence pack from Bitsight data

Organize Bitsight's externally observed evidence against the control areas it speaks to, so it can
be filed in an audit pack, an internal assessment, or a supervisory response.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication-first, never persist the token, the 250–900 tier/color bands, the shared error
handling, no discrimination, India context — §7 in particular).

The mapping reference is [`../../reference/regulatory-map.md`](../../reference/regulatory-map.md).
**Read it before producing any mapping**, including its opening caveats, which apply to every row
you output.

## What this skill is, and what it is not

**It is:** an organized evidence pack. *Here is what Bitsight observes externally, here is the
control area that evidence speaks to, here is where the evidence is thin.*

**It is not:** a compliance assessment, an audit, a gap analysis of record, a certification, or
legal advice. It cannot tell the user whether they comply with anything, and it must never try.

Three words are banned from the output: **"compliant"**, **"non-compliant"**, **"certified"** — for
the user's organization or for any third party. Also avoid "meets the requirement" and "satisfies
the control", which mean the same thing in a suit. Say what is **evidenced**, what is **partially
evidenced**, and what is **not evidenced by this data**. That distinction is the entire value of the
output — an auditor can work with it, and it doesn't assert something the data can't support.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if
   not authenticated, ask the user to paste their Bitsight API token and call `bitsight_set_token`
   (never echo it back). Proceed only once a token is set. (See global rules §1.)

2. **Establish the scope.**
   - **Subject** — the user's own organization, one third party, or the portfolio as a whole (for
     evidencing third-party monitoring as a control activity in its own right).
   - **Framework(s)** — NIST CSF 2.0, ISO/IEC 27001:2022, and/or an Indian regime (RBI, SEBI,
     IRDAI, CERT-In, DPDP). Mapping to two frameworks at once is normal; more than that produces an
     unreadable table, so ask which matter. **If RBI is one of them, go to step 3 before pulling
     any data.**
   - **Is the entity listed?** Ask this **whatever framework was chosen** — it is not a SEBI-only
     question. SEBI **LODR** reaches every listed entity in any sector, including one with no
     financial-sector regulator, and a SEBI-regulated entity that is also listed is in **both** LODR
     and CSCRF. Three provisions matter: **Reg. 21(4)** (the Risk Management Committee's role must
     specifically cover cyber security), **Reg. 27(2)(ba)** (cyber incidents, breaches and data loss
     in the quarterly corporate governance report, **no materiality test**) and **Reg. 30(6)** (market
     disclosure of material events). See the LODR section of the mapping reference.
   - **The consumer** — an internal audit team, an external auditor, a customer's assessment
     questionnaire, or a regulator-facing file. This sets the tone and the level of hedging.
   - **Whether the user has their own control mapping already.** If they do, use theirs and map into
     it — an organization's existing control IDs beat a generic reference every time.

3. **If RBI was chosen — establish which instrument, then ask for the supplementary material.**
   This step runs **only** when the user picks RBI. Skip it entirely for NIST, ISO, SEBI, IRDAI,
   CERT-In or DPDP-only packs.

   **First, which RBI instrument.** The Cybersecurity, Technology: Risk, Resilience and Assurance
   Framework Directions, 2026 are **seven parallel instruments issued on 31 July 2026, one per
   entity class**, each repealing the earlier cyber and IT-governance instructions for its class:

   | Entity class | Reference | Id |
   | --- | --- | --- |
   | Commercial Banks | RBI/DoS/2026-27/**410** | 13643 |
   | Small Finance Banks | RBI/DoS/2026-27/**419** | 13634 |
   | Payments Banks | RBI/DoS/2026-27/**428** | 13625 |
   | Urban Co-operative Banks | RBI/DoS/2026-27/**437** | 13616 |
   | All India Financial Institutions | RBI/DoS/2026-27/**456** | 13597 |
   | Non-Banking Financial Companies | RBI/DoS/2026-27/**461** | 13592 |
   | Credit Information Companies | RBI/DoS/2026-27/**470** | 13583 |

   Source pattern: `https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=<Id>`. Regional Rural
   Banks and Local Area Banks have none in this family. **Mapping a pack to 410 for anything other
   than a commercial bank is wrong.** For an NBFC also establish the chapter — 461 grades Ch. III
   (Base Layer under ₹500 crore, and CICs), Ch. IV (Base Layer ₹500 crore and above) and Ch. V (Top,
   Upper and Middle Layer, excluding CICs). **Ask the user which applies to the subject entity —
   never rule on it yourself** (global rules §7). If they don't know, map to the instrument matching
   their stated entity type, label the assumption at the top of the pack, and tell them to have
   compliance confirm it.

   **And ask whether the pack is really about outsourcing**, because that is a different instrument.
   Vendor due diligence, monitoring, audit rights and exit sit in the **RBI (Commercial Banks –
   Managing Risks in Outsourcing) Directions, 2025** (28 November 2025), which repealed the 2023
   IT-outsourcing Master Direction for those banks; NBFCs have a parallel 2025 instrument. The 2026
   cyber Directions **preserve** that regime and carve around it — their third-party provisions
   reach only IT/cyber arrangements falling outside it. A pack about vendor oversight filed against
   Chapter IV of the cyber Directions is filed against the wrong instrument. If the subject is
   third-party oversight, say which instrument you have mapped to and why.

   **Then ask what else to fold in.** Bitsight covers a narrow slice of these Directions. Say so, and
   ask — in one message, as an invitation rather than a form — for anything the user wants included:

   > *Bitsight evidences the externally visible part of these Directions — roughly the internet-facing
   > controls in Chapter V, the detection outcomes Chapter VI's CSOC exists to produce, and
   > third-party monitoring under Chapter IV. Most of the rest sits in your own records. Anything you
   > want folded into this pack? Paste it, attach it, or point me at it — or say "just the Bitsight
   > data" and I'll build the pack on that alone and mark the rest as not evidenced.*

   Offer the checklist below so they can see what would strengthen the pack, and against which
   chapter each item lands. Never require any of it.

   | Chapter | Material that would strengthen the pack |
   | --- | --- |
   | II — Role of the Board | Board-approved IT, cybersecurity and business continuity strategy; minutes or resolutions; IT Strategy Committee composition |
   | III — IT Governance | IT Governance Framework; the standalone Cybersecurity Policy; IT Steering Committee terms of reference; CISO appointment and reporting line |
   | IV — Risk Management | IT/IS risk register; information asset inventory with criticality classification; for third-party arrangements outside the outsourcing Directions, the vendor risk assessments and contract clauses on right-to-audit and RBI inspection access |
   | Outsourcing (2025 Directions, not the 2026 ones) | Outsourcing register and materiality determinations; due-diligence files; audit rights reaching subcontractors; concentration analysis; exit plans — map these to the outsourcing instrument |
   | V — Baseline Controls | VA reports (six-monthly, critical systems) and PT reports (annual); patch and configuration-management records; MFA coverage; DLP; anti-malware coverage; DR drill results with RTO/RPO |
   | VI — CSOC | CSOC scope and staffing; SIEM log coverage; sample incident investigations; threat-intelligence sharing |
   | Incident handling | Cyber incident response and recovery policy; DAKSH submissions and timestamps; CERT-In notifications; root-cause analyses |
   | VII — IS Audit | IS Audit charter and plan; latest IS Audit report and open observations |
   | Prior supervisory record | Previous RBI inspection findings, compliance submissions, and any existing internal control mapping |
   | Metrics | KPIs already reported to the Board — patch latency, anti-malware coverage, training completion, IT maturity assessment |

   **How to handle whatever comes back.**
   - **Use their control IDs, not the reference's.** If they share an existing mapping or a policy
     with numbered controls, map into it — an organization's own identifiers beat a generic table.
   - **Label the source of every row**: *Bitsight-observed*, *client-supplied*, or *not evidenced*.
     A reader must be able to tell the externally observed rows from the ones resting on a document
     the user handed over. Never blend them.
   - **Don't assess what they give you.** Record that a document exists and what it covers. Do not
     conclude that it satisfies a chapter, and do not audit its contents against the Directions —
     that is their compliance team's work, and the banned-words rule below applies to it too.
   - **Don't quote paragraph numbers** out of the mapping reference into the pack. Chapter level
     only, with the source URL, and a line telling them to confirm against the published text.
   - **Handle it under global rules §8.** Material shared here may contain personal data or
     third-party confidential information; apply DPDP minimisation and don't retain or forward it
     beyond building this pack.
   - If they decline, proceed on Bitsight data alone and make the coverage statement in step 6 do
     the work. A Bitsight-only RBI pack is a legitimate output — it just has more "not evidenced"
     rows, and it should say why.

4. **Pull the evidence.**
   - `bitsight_get_company_details` with `include_industry_comparison: true` — rating, per-vector
     grades, trend. The per-vector grades are the backbone of the mapping.
   - `bitsight_get_findings_summary` — open issues per vector, which becomes the "gaps" column.
     Quote its categorical counts rather than deriving your own.
   - `bitsight_get_findings` with `affects_rating: true` and **`severity_gte: 8`** for the vectors in
     scope, where the pack needs a named specific rather than a grade. An assessor wants the material
     and severe rows evidenced by asset and date; a full pull buries them. Thresholds are in global
     rules §3a. Where the pack covers vulnerability remediation, the vector is
     `critical_vulnerability_management`.
   - `bitsight_get_industry_benchmark` — sector context, useful when the pack must show relative
     posture rather than an absolute claim.
   - For a **portfolio-scope** pack, `bitsight_get_portfolio` (paged fully) plus `bitsight_get_alerts`
     over the review period — together these evidence the *monitoring activity*, which is often the
     actual control being assessed.

5. **Build the mapping table.** One row per risk vector in scope:

   | Column | Content |
   | --- | --- |
   | Risk vector | As Bitsight names it |
   | Observed grade / state | The current grade, with open finding count |
   | What this evidences | The specific observable fact — not a conclusion |
   | Control area | The framework references from the mapping reference |
   | Evidence strength | **Evidenced** / **Partially evidenced** / **Not evidenced by this data** |
   | Gap / note | What's open, and what this data cannot show |

   Fill the **evidence strength** column honestly. Most rows are *partially evidenced* — Bitsight
   sees the external surface of a control, not its design or operation. A pack where everything is
   "evidenced" is not credible and will not survive an auditor.

   **For an RBI pack**, add an **Evidence source** column — *Bitsight-observed* / *client-supplied* /
   *not evidenced* — and map to the RBI 2026 chapters using the dedicated section of the mapping
   reference. Where the user supplied material in step 3, add its own rows rather than upgrading a
   Bitsight row's evidence strength on the strength of a document you have not assessed.

6. **Write the coverage statement.** Every pack states, prominently and near the front:
   - Bitsight observes **externally visible signals only**. Internal controls, policies, governance,
     training, physical security, and internal segmentation are **outside** what this evidences.
   - Framework references are **indicative** and must be confirmed against the current published
     text by the user's compliance team.
   - The pack **supports** an evidence trail; it does not constitute an assessment or a compliance
     conclusion.
   - **On an RBI pack**, also name the instrument and its citation, state that applicability was
     confirmed by the user (or assumed, and flag it), and name the material they supplied in step 3
     — or record that they chose to proceed on Bitsight data alone.

7. **List what this data cannot evidence.** Do this explicitly rather than leaving it implied — a
   short section naming the control families in the chosen framework that Bitsight says nothing
   about. It's what makes the pack usable: the reader learns where to look for other evidence. On an
   RBI pack this section is long by nature — Board composition, CISO reporting line, CSOC design and
   staffing, DR drills and RTO/RPO, MFA enforcement, training, IS Audit, and whether incidents were
   reported to DAKSH within six hours. Write it out; don't compress it into a disclaimer.

8. **Offer the output format:** `.xlsx` via the `xlsx` skill for a mapping matrix an auditor will
   work through (usually the right choice), `.docx` via the `docx` skill for a narrative pack, or
   Markdown for review. Save it and present it. Date every pack — evidence is a point-in-time
   observation and rating data changes daily.

9. **Offer next steps:** `remediation-roadmap` for the gaps the pack surfaces, `vendor-brief` if a
   specific third party looks weak, or `boardpack` if the pack's conclusions need leadership airtime.

## Guardrails

- **No legal advice, no compliance determinations, no applicability rulings.** Whether a regime
  applies to this entity is a question for the user's compliance and legal team, and the output
  should say so where it comes up.
- **Never invent a control identifier or clause number.** If the mapping reference doesn't cover
  something, say the mapping is unavailable rather than producing a plausible-looking ID. A wrong
  clause number in an audit file is worse than no clause number. For the RBI 2026 Directions this
  means **chapter level only** — cite the chapter and the source URL, and leave paragraph numbers to
  be read off the published text.
- **Client-supplied material is recorded, not assessed.** Documents the user hands over in step 3
  are logged as evidence that exists and cited by name and date. Reviewing them against the
  Directions is a compliance-team activity and remains outside this skill — the banned words apply
  to those rows exactly as they do to Bitsight rows.
- **Never overstate the evidence** to make a pack look complete. The "not evidenced" rows are doing
  real work.
- **A rating change is not an incident and not a disclosable event.** For SEBI LODR specifically:
  never map a rating movement or a new finding onto **Reg. 27(2)(ba)** or **Reg. 30(6)** because both
  mention incidents. Bitsight does not observe incidents; that evidence comes from the entity's own
  incident register. Two of the three LODR rows in the reference are correctly *"Bitsight evidences
  nothing"*, and that is the answer, not a gap to fill.
- **Never opine on materiality.** Under Reg. 30(4) it is the authorised KMP's determination on advice
  and carries securities-law consequences in both directions. Surface the obligation, name who
  decides, stop there.
- Where the pack covers a third party, it contains that party's confidential security posture under
  Bitsight's Terms of Service — don't forward it beyond the user's stated purpose.
- Where findings touch personal data (exposed credentials in particular), apply DPDP minimisation:
  report counts and categories, never credential values, and avoid naming individuals.

## Error handling

Follow the shared table in the global rules: 401 → re-prompt and stop; **403 → the token is valid but the endpoint isn't in this subscription: carry on without it and name the gap** (never re-prompt for a token); 404 → re-confirm the
GUID; 429 → back off and retry; empty result → record the row as **not evidenced by this data** and
never fill a gap with an assumption.
