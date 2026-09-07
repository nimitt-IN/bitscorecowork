# Risk-vector → framework reference map (indicative)

Working reference for the **`regmap`** skill. It maps Bitsight risk vectors to the control areas of
common frameworks and Indian regulatory regimes, so externally observed evidence can be filed
against the control it speaks to.

> ## Read this before using the map
>
> These mappings are **indicative and non-authoritative.** They are a starting point for a
> conversation with a compliance team, not a control mapping of record.
>
> - Framework texts are revised; control identifiers move. **Verify every reference against the
>   current published text** before it goes into an audit file.
> - A Bitsight risk vector is **evidence about one externally observable aspect** of a control. It
>   is never the whole control. Good grades on TLS vectors say nothing about key management policy,
>   staff training, or internal segmentation.
> - Indian regulatory entries are **thematic** — the obligation area a vector speaks to — not clause
>   citations. Applicability depends on entity type, size, and sector, and is a determination for
>   the user's compliance and legal team.
> - Nothing here is legal advice, and nothing here certifies compliance. See global rules §7.

---

## How to read the columns

- **Risk vector** — as Bitsight groups and names them.
- **What it evidences** — the observable fact the grade actually establishes.
- **NIST CSF 2.0** — Function.Category level (GV Govern, ID Identify, PR Protect, DE Detect,
  RS Respond, RC Recover).
- **ISO/IEC 27001:2022** — Annex A control areas.
- **Indian regimes** — the obligation *theme* most commonly engaged.

For **RBI** subjects there is a dedicated, source-cited section further down — see
[RBI Directions, 2026 (commercial banks)](#rbi-directions-2026--commercial-banks). The "Indian
regimes" column below stays thematic; the RBI section is where chapter-level references live.

---

## Compromised Systems

Evidence of infection or attacker-controlled activity observed from outside.

| Risk vector | What it evidences | NIST CSF 2.0 | ISO/IEC 27001:2022 | Indian regimes |
| --- | --- | --- | --- | --- |
| Botnet Infections | Hosts communicating with known command-and-control infrastructure | DE.CM, RS.MA | A.8.7, A.8.16 | CERT-In (incident detection & reporting); RBI/SEBI/IRDAI cyber-incident handling |
| Malware Servers | Systems observed distributing malware | DE.CM, RS.MA | A.8.7, A.8.16 | CERT-In (reportable incident categories) |
| Spam Propagation | Systems sending spam — usually a symptom of compromise | DE.CM | A.8.7, A.8.16 | CERT-In (incident detection) |
| Unsolicited Communications | Traffic to destinations it should have no reason to reach | DE.CM, DE.AE | A.8.16 | CERT-In (monitoring & logging) |
| Potentially Exploited | Devices running software behaving as though compromised | DE.CM, RS.MA | A.8.7, A.8.16 | CERT-In; sectoral incident-response expectations |

**Care point:** these are the vectors most likely to indicate a *live* problem rather than a hygiene
gap. Treat a material change here as an operational escalation first and a compliance artifact
second.

---

## Diligence

Evidence about configuration and maintenance of internet-facing systems.

| Risk vector | What it evidences | NIST CSF 2.0 | ISO/IEC 27001:2022 | Indian regimes |
| --- | --- | --- | --- | --- |
| Critical Vulnerability Management | How quickly disclosed vulnerabilities are remediated, weighted by severity | ID.RA, PR.PS | A.8.8 | RBI/SEBI/IRDAI vulnerability-management expectations |
| TLS/SSL Certificates | Certificate validity, expiry, and trust chain | PR.DS | A.8.24 | Sectoral data-in-transit protection expectations |
| TLS/SSL Configurations | Protocol versions and cipher suites in use | PR.DS | A.8.24 | Sectoral data-in-transit protection expectations |
| Open Ports | Services exposed to the internet | PR.IR, PR.AA | A.8.20, A.8.21 | Sectoral network-security expectations |
| Web Application Headers | Browser-side protections on web applications | PR.PS | A.8.9, A.8.26 | Sectoral application-security expectations |
| Insecure Systems | Systems reaching endpoints indicating unsupported/insecure configuration | PR.PS, ID.AM | A.8.9 | Sectoral configuration-management expectations |
| Server Software | Versions and support status of observed server software | ID.AM, PR.PS | A.8.8, A.8.9 | Sectoral asset & patch-management expectations |
| Desktop / Mobile Software | Versions and support status of observed endpoint software | ID.AM, PR.PS | A.8.8 | Sectoral endpoint-management expectations |
| Mobile Application Security | Security posture of published mobile applications | PR.PS | A.8.25, A.8.26 | Sectoral application-security expectations; DPDP where apps process personal data |
| DNSSEC | Whether DNS responses are cryptographically validated | PR.DS, PR.IR | A.8.20, A.8.21 | Sectoral network-integrity expectations |
| Domain Squatting | Look-alike domains registered against the organization's brand | ID.RA, DE.CM | A.5.7 | Sectoral fraud/brand-abuse monitoring expectations |

**Care point:** Diligence vectors are where remediation is most visible and where a rating moves most
readily — which makes them the easiest place to improve a number without materially improving risk.
Note that tension when it applies.

---

## User Behavior

Evidence about activity on the organization's networks that raises exposure.

| Risk vector | What it evidences | NIST CSF 2.0 | ISO/IEC 27001:2022 | Indian regimes |
| --- | --- | --- | --- | --- |
| File Sharing | Peer-to-peer file-sharing observed on corporate networks | PR.AA, GV.PO | A.5.10, A.8.12 | Sectoral acceptable-use expectations |
| Exposed Credentials | Organizational credentials appearing in known breach corpora | PR.AA, ID.RA | A.5.17, A.8.5 | DPDP (where personal data is implicated); CERT-In (where it indicates an incident) |

**Care point:** Exposed-credential data concerns identifiable individuals. Handle it under the DPDP
Act, 2023 — minimise what you extract, don't reproduce credential values in any output, and don't
name individuals where a count answers the question.

---

## Public Disclosure

| Risk vector | What it evidences | NIST CSF 2.0 | ISO/IEC 27001:2022 | Indian regimes |
| --- | --- | --- | --- | --- |
| Security Incidents | Publicly disclosed breaches attributed to the organization | ID.RA, RS.MA, RC.RP | A.5.24, A.5.26 | CERT-In (reporting); DPDP (personal-data breach); sectoral disclosure expectations |

---

## Cross-cutting: the portfolio itself as evidence

Continuous third-party monitoring is itself a control activity, independent of any single vector:

| Activity | NIST CSF 2.0 | ISO/IEC 27001:2022 | Indian regimes |
| --- | --- | --- | --- |
| Continuous monitoring of third parties' external posture | GV.SC, ID.RA | A.5.19, A.5.20, A.5.21, A.5.22 | RBI outsourcing Directions, 2025 — **171** commercial banks, **363** NBFCs — and IT governance expectations; SEBI cybersecurity framework; IRDAI outsourcing & cyber guidelines; IFSCA Guidelines for IFSC entities |
| Pre-contract due diligence on a vendor | GV.SC, ID.RA | A.5.19, A.5.20 | RBI/SEBI/IRDAI third-party due-diligence expectations |
| Evidence retention for supervisory review | GV.OV, GV.SC | A.5.19, A.5.22 | CERT-In log-retention direction; sectoral record-keeping expectations |

---

## RBI Directions, 2026 — commercial banks

**Reserve Bank of India (Commercial Banks – Cybersecurity, Technology: Risk, Resilience and
Assurance Framework) Directions, 2026**

| | |
| --- | --- |
| **Reference** | RBI/DoS/2026-27/410 · DoS.CO.CSITEG.4/31.01.015/2026-27 |
| **Issued** | 31 July 2026, Department of Supervision |
| **In force** | Immediately upon issuance |
| **Source** | https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=13643 |

**Who it covers.** Commercial banks under the Banking Regulation Act, 1949, **excluding** Small
Finance Banks, Payments Banks and Local Area Banks. Foreign banks operating in branch mode follow a
comply-or-explain approach on selected provisions. It **repeals** the previous cybersecurity and
IT-governance instructions for the banks it covers — so for a covered bank this is the current
instrument, and the older circulars are the wrong thing to cite.

**Who it does not cover — and where they went instead.** 410 is **one of seven parallel Directions
issued on 31 July 2026**, one per entity class. The classes excluded from 410 are excluded because
they have their own instrument, **not** because they are outside the framework:

| Entity class | Reference | RBI notification Id |
| --- | --- | --- |
| Commercial Banks | RBI/DoS/2026-27/**410** | 13643 |
| Small Finance Banks | RBI/DoS/2026-27/**419** | 13634 |
| Payments Banks | RBI/DoS/2026-27/**428** | 13625 |
| Urban Co-operative Banks | RBI/DoS/2026-27/**437** | 13616 |
| All India Financial Institutions | RBI/DoS/2026-27/**456** | 13597 |
| Non-Banking Financial Companies | RBI/DoS/2026-27/**461** | 13592 |
| Credit Information Companies | RBI/DoS/2026-27/**470** | 13583 |

URL pattern: `https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=<Id>`. Verified against the
published texts on 13 August 2026.

**Regional Rural Banks and Local Area Banks have no instrument in this family** — LABs received a
separate *(Local Area Banks – Miscellaneous) Supervisory Directions, 2026* the same day. A parallel
*Digital Payment Security Controls* family was also issued on 31 July 2026 for the same classes;
**different instruments, never cite them interchangeably.**

**NBFCs — the chapter matters as much as the instrument.** 461 binds all RBI-registered NBFCs, but
graded: Ch. III (Base Layer below ₹500 crore, and CICs) · Ch. IV (Base Layer ₹500 crore and above) ·
Ch. V (Top, Upper and Middle Layer, excluding CICs). Map evidence to the chapter that binds the
entity.

**Ask the user which RBI instrument applies to them; never decide it for them.** Applicability is a
determination for their compliance and legal team (global rules §7).

**What it does *not* replace: outsourcing.** These Directions do not absorb outsourcing governance,
and assuming they do is the easy mistake. Outsourcing for commercial banks sits in the **Reserve
Bank of India (Commercial Banks – Managing Risks in Outsourcing) Directions, 2025** —
RBI/DOR/2025-26/171, issued 28 November 2025, existing IT outsourcing agreements to comply by
10 April 2026 — which themselves repealed the 2023 Master Direction on Outsourcing of IT Services
for those banks. Source: https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=13139

NBFCs have their own instrument of the same date: the **Reserve Bank of India (Non-Banking Financial
Companies – Managing Risks in Outsourcing) Directions, 2025**, RBI/DOR/2025-26/**363**, reaching HFCs,
CICs, standalone primary dealers and the account aggregator and P2P categories, and graded by
scale-based layer — Base Layer NBFCs follow the general outsourcing provisions only, Middle Layer and
above pick up the IT-specific ones. Source:
https://www.rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=12941

The 2026 Directions expressly **preserve** that instrument and carve around it: their third-party
provisions apply only to IT and cybersecurity arrangements falling *outside* the outsourcing
Directions. So a covered bank runs both — outsourcing governance (materiality, due diligence, audit
rights reaching subcontractors, concentration, exit) under the 2025 Directions, cybersecurity
controls and supervisory reporting under the 2026 Directions. Map vendor-oversight evidence to the
outsourcing instrument, not to Chapter IV, unless the arrangement genuinely sits outside it — and
say which you have assumed.

**Chapters** — cite at this level. Chapter I Preliminary · II Role of the Board · III Information
Technology Governance and Oversight · IV IT and Information Security Risk Management · V Baseline
Cybersecurity and Resilience Requirements · VI Cyber Security Operations Centre · VII Information
Systems Audit · VIII Repeal and Other Provisions.

> **Chapter-level only.** Reference these Directions by chapter and obligation theme. Do **not**
> quote paragraph numbers into an audit file from this reference — read them off the published text
> at the source URL above and have the compliance team confirm them. A wrong paragraph number in a
> supervisory response costs more than an absent one.

### Risk vector → RBI 2026 obligation area

| Risk vector | RBI 2026 chapter | Obligation area it speaks to | What it cannot show |
| --- | --- | --- | --- |
| Critical Vulnerability Management | V | Vulnerability management and remediation within defined timeframes; secure configuration and patch management | The VA/PT programme itself — six-monthly VA and annual PT on critical systems, by independent trained assessors, is an internal record |
| TLS/SSL Certificates · TLS/SSL Configurations | V | Protection of data in transit | Data-at-rest and endpoint DLP, which are internal |
| Open Ports · DNSSEC | V | Secure configuration; network security of internet-facing infrastructure | Internal segmentation and the internal network entirely |
| Web Application Headers · Mobile Application Security | V | Application security controls on customer-facing channels | Application source, SDLC and pre-release testing |
| Insecure Systems · Server Software · Desktop / Mobile Software | IV, V | Information asset inventory and criticality classification; software currency; unauthorised-software controls | Whether whitelisting or blocking of unauthorised installation is actually enforced |
| Botnet Infections · Malware Servers · Potentially Exploited · Spam Propagation · Unsolicited Communications | VI | Continuous surveillance; detection capability of the Cyber Security Operations Centre | The CSOC's own design, staffing, SIEM coverage and L1/L2/L3 escalation |
| Exposed Credentials | V | Multi-factor authentication and credential protection; customer and staff awareness | Whether MFA is enforced on privileged and critical systems — internal only |
| Security Incidents (public disclosure) | V | Cyber incident response and recovery; reporting of incidents | Whether an incident was reported to DAKSH within six hours of detection, or notified to CERT-In |
| Domain Squatting | V, VI | Brand-abuse and phishing monitoring; customer education on phishing | Take-down action actually taken |

### Portfolio and vendor activity → RBI 2026 obligation area

| Activity | RBI 2026 chapter | Obligation area it speaks to |
| --- | --- | --- |
| Continuous external monitoring of third parties | IV | Ongoing oversight of service providers, proportionate to materiality |
| Pre-contract vendor due diligence (`vendor-brief`) | IV | Vendor risk assessment commensurate with materiality |
| Retained, dated evidence packs for supervisory review | III, VII | IT governance oversight; risk-based Information Systems Audit |
| Board-level reporting of external posture (`boardpack`) | II, III | Board approval and oversight of IT, cybersecurity and resilience strategy |

**Care point.** These Directions are dense on things Bitsight cannot see — Board composition and the
IT Strategy Committee, the CISO's reporting line, CSOC staffing, DR drills and RTO/RPO, training,
IS Audit, DAKSH reporting. An RBI-scoped pack that does not say so plainly is misleading. Bitsight
evidences the **external surface** of Chapter V and the **detection outcomes** relevant to Chapter VI,
and it evidences third-party monitoring under Chapter IV as an activity in its own right. Nothing
more.

---

## SEBI LODR — the listed-entity obligations regmap is usually asked about last

**Verified Primary against the consolidated text (last amended 14 July 2026) on 13 August 2026.**

These bind **every listed entity, in any sector** — a listed manufacturer with no financial-sector
regulator owes them. They are easy to miss because they sit in the *listing* regulations rather than in
a cybersecurity framework, and a SEBI-regulated entity that is also listed is in **both** these and
CSCRF.

| Provision | What it requires | What Bitsight can evidence |
| --- | --- | --- |
| **Reg. 21(4)** | The Risk Management Committee's role shall *"specifically cover cyber security"* | Dated external-posture packs and trend put in front of the RMC (`boardpack`, `watchtower`) evidence the **committee having cyber material to review** — not that the committee exists or met |
| **Reg. 27(2)(ba)** | Details of **cyber security incidents or breaches or loss of data or documents** disclosed with the **quarterly corporate governance report** — **no materiality test** | **Nothing.** Bitsight does not observe incidents. Say so plainly; this comes from the entity's own incident register |
| **Reg. 30(6)** | Market disclosure of material events — **12 hours** for an event emanating from within the entity | **Nothing directly.** Ratings are not a disclosure trigger and must never be presented as one |

**Care point, and it is the important one for this section.** Two of these three rows are *"Bitsight
evidences nothing"*, and that is the correct output. The temptation is to map a rating movement onto
Reg. 30 or Reg. 27(2)(ba) because both mention incidents. **A rating change is not an incident, is not
a disclosable event, and must never be presented as either.** Where a client asks, say what the
provision requires, say the evidence comes from their incident register, and stop.

**Never opine on materiality.** Reg. 30(4) makes it the authorised KMP's determination on advice, and
it carries securities-law consequences in both directions. regmap surfaces the obligation and names
who decides.

---

## IFSCA — GIFT City, where a rating pack maps unusually well

**Guidelines on Cyber Security and Cyber Resilience for Regulated Entities in IFSCs** — the baseline,
and **one of four IFSCA cyber instruments**. Verified at source 7 September 2026.

| | |
| --- | --- |
| **Reference** | IFSCA-CSD0MSC/13/2025-DCS |
| **Issued** | 10 March 2025 · **in force 1 April 2025** |
| **Binds** | *"any entity which is licensed, recognised, registered or authorised by IFSCA"* |
| **Source** | https://ifsca.gov.in/Document/Legal/guidelines-on-cyber-security-and-cyber-resilience-for-regulated-entities-in-ifscs-1-10032025064412.pdf |

**Establish the licence before the sector.** An IFSC licence **displaces** the mainland regulator: a
GIFT City banking unit is not mapped to the RBI's 2026 Directions and a GIFT City fund does not take a
CSCRF category. Ask where the entity is licensed before asking what it does.

**Then ask whether it is an MII**, because a second regime sits on top of this one:

| Instrument | Reference | Issued | Adds |
| --- | --- | --- | --- |
| Amendment to the baseline Guidelines | IFSCA-CSD0MSC/1/2026-DCS | 10 Mar 2026 | Substitutes para 21 and inserts para 23 — **two exemption tiers**, not one list of four. See [`incident-reporting-map.md`](incident-reporting-map.md) |
| Guidelines for **MIIs** in IFSC | IFSCA-CSD/MSC/2/2026-DCS | 20 Apr 2026, **in force 1 Apr 2026** | A prescriptive regime for IFSC exchanges, clearing corporations and depositories, layered on the baseline |
| Advisory on **Frontier AI** Models | IFSCA-CSD/MSC/3/2026-DCS | 4 Jun 2026 | Six *shall* items in Annexure A, despite the "advisory" label |

A `regmap` pack for an IFSC MII maps to **both** the baseline's five components and the MII Guidelines'
seven functions — Govern, Identify, Protect, Detect, Respond, Recover, Resilience. Say which you have
used.

**Five key components**, and the pack should be organised on them: **I** Governance · **II** Cyber
security and cyber resilience framework · **III** Third party risk management · **IV** Communication &
awareness · **V** Audit.

**Why this instrument suits a ratings pack better than most.** Two provisions are unusually close to
what Bitsight actually observes:

- **Para 9(a) — asset inventory.** The IS Policy must maintain a detailed inventory of IT assets
  *"including system configurations, their interconnections with internal and external systems"*, risk
  assessed and classified by business criticality. The **externally** facing half of that is exactly
  what the attributed footprint evidences — see [`attribution-patterns.md`](attribution-patterns.md)
  and the `entity-scope` skill.
- **Para 11 — six-monthly third-party review, on an express cadence.** For third parties the RE depends
  on for core operations, or to whom it has granted access to critical systems, the RE must assess for
  vulnerabilities or compliance gaps *"through audit, review or feedback **every six months**"*. This is
  the clearest cadence obligation in any of the Indian instruments in this reference, and a dated
  portfolio pack maps onto it directly. **Para 13 keeps the ultimate responsibility with the RE**, so
  evidence of the review is evidence the RE performed it — not evidence the vendor is secure.

### Risk vector → IFSCA obligation area

| Risk vector | Component | Obligation area it speaks to | What it cannot show |
| --- | --- | --- | --- |
| Critical Vulnerability Management | II, §9(b) | Protection — security controls aligned with NIST / ISO 27000 to minimise likelihood and impact | The control selection process itself, and everything internal |
| TLS/SSL Certificates · TLS/SSL Configurations · Open Ports · DNSSEC | II, §9(b) | Protection of IT assets and data; secure configuration of internet-facing infrastructure | Internal segmentation, key management, data at rest |
| Insecure Systems · Server Software · Desktop / Mobile Software | II, §9(a) | Identification and classification of IT assets, and their configurations | Whether the inventory itself is complete — Bitsight sees what is externally observable, not what the RE has listed |
| Web Application Headers · Mobile Application Security | II, §9(b) | Protection of customer-facing channels | SDLC, source review, pre-release testing |
| Botnet Infections · Malware Servers · Potentially Exploited · Spam Propagation · Unsolicited Communications | II | Ability to anticipate, withstand, contain and recover from cyber-attacks — detection outcomes | The detection capability itself, and the incident-response process |
| Exposed Credentials | II, IV | Credential protection; employee awareness and reporting channels | Whether MFA is enforced, and whether training happened |
| Security Incidents (public disclosure) | II, and the para 19–20 clocks | Incident response and the reporting obligation | Whether the RE actually filed within six hours of detection |
| Domain Squatting | II, IV | Brand-abuse monitoring; customer and employee phishing awareness | Take-down action taken |

### Portfolio and vendor activity → IFSCA obligation area

| Activity | Component | Obligation area it speaks to |
| --- | --- | --- |
| Six-monthly assessment of third parties supporting core operations or holding critical-system access | III, **para 11** | The express six-month review cadence — a dated `watchtower` or `myportfolio` pack is direct evidence of the review having been carried out |
| Pre-contract vendor due diligence (`vendor-brief`) | III, paras 10 and 11 | Collaborative security approach; risk-based identification of dependent third parties |
| Board-level reporting of external posture (`boardpack`) | I | Oversight Body's governance of cyber risk |
| Retained, dated evidence for the annual audit | V | Independent assurance — the audit is **annual**, by a CERT-In empanelled auditor or one holding CISA, CISM, GSNA or CISSP, with the report to IFSCA **within 90 days of the financial-year end**. Brokers, bullion and clearing members and DPs who file a cyber audit report to an MII may submit that same report to IFSCA within 7 days of filing it |

**Care point.** Proportionality runs through the whole instrument — *"the scale and complexity of
operations, the nature of the activity … its interconnectedness … and the corresponding cyber risks"*.
A pack that presents these as a flat checklist misrepresents the Guidelines. Say what the observed
evidence shows and let the RE and its auditor set the depth. And note that Bitsight sees none of
components I, IV or V at all: governance, training and audit are entirely internal records.

### The MII layer, where it changes the mapping

For an IFSC stock exchange, clearing corporation or depository, the MII Guidelines of 20 April 2026 are
prescriptive where the baseline is principles-based, and three of their obligations change what a
ratings pack can honestly claim:

| Obligation (MII Guidelines) | What the pack can evidence | What it cannot |
| --- | --- | --- |
| Annual cyber security audit by a **CERT-In empanelled** IS auditor, to IFSCA within **120 days** of the financial-year end, with an **MD/CEO declaration** — one firm for at most three consecutive years, then a two-year cooling-off | Dated external evidence the auditor can take in evidence. Note the **120 days**, against the baseline's 90 — a pack built for a non-MII RE states the wrong deadline | The audit itself, the auditor's empanelment, and the declaration |
| **ISO 27001 within two years of issuance** — **20 April 2028**, measured from issue, not from the 1 April commencement | Nothing. Certification status is a fact about a certificate | Everything |
| **Annual Cryptographic Risk Assessment** with express **post-quantum** readiness | The TLS/SSL Configurations vector shows *deployed* protocol versions and cipher suites externally — the observable input to that assessment, and the only place in this map where Bitsight touches the PQC question at all | Key management, internal crypto inventory, and the assessment itself |
| **Bi-annual VAPT** for NCIIPC-designated systems | Nothing — VAPT is an internal record | Everything |

### The frontier-AI advisory, and the two items a ratings pack actually speaks to

The advisory of 4 June 2026 is drafted as an advisory and reads as an instrument: six of its eleven
Annexure A items say *shall*. Two of those six are unusually close to what Bitsight observes, and are
worth mapping rather than summarising:

| Annexure A item | Risk vector | What the evidence shows | What it cannot show |
| --- | --- | --- | --- |
| **§1** — presume newly disclosed critical vulnerabilities are exploitable **within hours**, and prepare for patch waves | Critical Vulnerability Management | Observed remediation latency against disclosed vulnerabilities, weighted by severity — the closest external proxy there is for whether an RE could survive a compressed window | Whether the RE has *planned* for a patch wave. The plan is internal |
| **§7** — require **critical service providers** to assess frontier-AI risk and furnish evidence of preparedness | Portfolio monitoring (`watchtower`, `myportfolio`, `vendor-brief`) | That the RE monitors those providers' external posture, dated. Evidence the RE performed oversight | Whether the provider actually assessed frontier-AI risk. That is a document the provider furnishes, not an observable |

The remaining four *shall* items — SBOM coverage, the API inventory with rate-limiting and whitelist,
frontier AI as a **board-level named risk scenario** (the Standing Committee on Technology at an MII),
and human oversight of AI-generated remediation code — are **entirely internal**. A pack that gestures
at them is overclaiming. Name them as out of scope and say who holds the evidence.

**One thing worth telling a client**, because it is true and few know it: this is, as far as this
reference is aware, the first Indian financial-sector instrument to require frontier AI as a defined
scenario put before a board.

---

## Indian regimes — orientation notes

Short, non-exhaustive context. Applicability is always entity-specific.

- **CERT-In Directions (2022)** — covered entities must report specified cyber incidents within
  **6 hours** of noticing them, and retain ICT logs for a rolling period within India. Ratings data
  can evidence *monitoring*; it does not discharge a reporting obligation and does not tell you
  whether one has arisen.
- **DPDP Act, 2023** — engaged wherever outputs touch personal data of data principals. Purpose
  limitation and minimisation apply to what you extract and retain from findings, especially
  exposed-credential data.
- **RBI** — two separate tracks, and they are not alternatives.
  - *Cybersecurity and IT governance.* The Cybersecurity, Technology: Risk, Resilience and Assurance
    Framework Directions, 2026 (31 July 2026) are **seven parallel instruments, one per entity
    class** — commercial banks 410, SFBs 419, Payments Banks 428, UCBs 437, AIFIs 456, NBFCs 461,
    CICs 470 — each superseding the earlier cyber/IT-governance circulars for its class. Identify
    which one binds the entity; see the
    [dedicated section above](#rbi-directions-2026--commercial-banks). Regional Rural Banks and Local
    Area Banks have none in this family.
  - *Outsourcing and vendor oversight.* Two parallel instruments, both issued 28 November 2025, both
    with existing IT outsourcing agreements to comply by 10 April 2026: **RBI/DOR/2025-26/171** for
    commercial banks, which repealed the 2023 IT-outsourcing Master Direction for them, and
    **RBI/DOR/2025-26/363** for NBFCs, reaching HFCs, CICs, standalone primary dealers and the account
    aggregator and P2P categories as well, graded by scale-based layer — Base Layer takes the general
    outsourcing provisions only, Middle Layer and above pick up the IT-specific ones. The 2026 cyber
    Directions preserve both rather than absorbing them.
  - Which set applies is entity-specific, and vendor-oversight evidence usually belongs against the
    outsourcing instrument rather than the cyber one: ask, don't assume.
- **SEBI** — two separate tracks, and a listed SEBI-regulated entity is in both.
  - *CSCRF* (SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/113, 20 August 2024) — the cybersecurity and
    cyber-resilience framework for regulated market entities, including third-party and vendor-risk
    provisions, **graded by RE category**. The category decides which obligations bind, so it is the
    first thing to establish for a CSCRF pack — and the categorisation criteria have been **replaced
    twice since the original circular**, in April 2025 and August 2025. Never determine a category
    from the August 2024 text alone: see [`cscrf-categories.md`](cscrf-categories.md).
  - *LODR, for listed entities* — **Reg. 27(2)(ba)** requires details of **cyber security incidents,
    breaches or loss of data or documents** in the **quarterly corporate governance report**, with no
    materiality test; **Reg. 21(4)** requires the Risk Management Committee's role to *"specifically
    cover cyber security"*; **Reg. 30(6)** governs market disclosure of material events. These reach
    listed entities in **any** sector, including ones with no financial-sector regulator at all. See
    [`incident-reporting-map.md`](incident-reporting-map.md) for the clocks.
  - *Two circulars of 24 August 2026, same date, different populations.* The **FIRE realignment**
    (HO/(449)2026-ITD-5_DIV1/I/19448/2026) binds every RE reporting under CSCRF and **moved no
    deadline** — it made the 24-hour portal filing **staged**, so it opens the filing rather than
    closing it. The **IT Resilience Index** (HO/47/18/11(1)2026-MRD-TPD1/I/19509/2026) binds **MIIs
    alone**, with AMC Repo Clearing Ltd carved out by name, and creates no reporting clock at all —
    nine weighted parameters computed **system-driven**, half-yearly, first submission for the half-year
    ending 31 March 2027. Do not map a rating onto ITRI: its Security parameter is a **20% weighting in
    an index the MII computes from its own systems**, not something an external observer contributes to.
    Clocks and detail in [`incident-reporting-map.md`](incident-reporting-map.md).
- **IRDAI** — Information and Cyber Security Guidelines, **2026** (IRDAI/GA&HR/CIR/MISC/51/4/2026,
  6 April 2026), which replaced the 2023 Guidelines, including outsourcing risk.
- **IFSCA — and it displaces the three above.** Guidelines on Cyber Security and Cyber Resilience for
  Regulated Entities in IFSCs (IFSCA-CSD0MSC/13/2025-DCS, 10 March 2025, in force 1 April 2025) bind
  *"any entity which is licensed, recognised, registered or authorised by IFSCA"* — the GIFT City IFSC.
  **An IFSC licence displaces the mainland regulator**: a GIFT City banking unit is not mapped to the
  RBI's 2026 Directions, and a GIFT City fund does not take a CSCRF category. Applied on a **principle
  of proportionality** — scale and complexity of operations, nature of the activity, interconnectedness,
  and the corresponding cyber risks — so the same obligation binds two REs at different depths, which
  is worth saying in a pack rather than presenting a flat checklist. CERT-In binds an IFSC entity either
  way.

  **IFSCA is four instruments.** An amendment of 10 March 2026 restructured the exemptions into **two
  tiers** — para 21 for REs that lean on a parent (branches, group-only GICs, under ten employees), para
  23 for those with none (foreign universities, newly incorporated standalone REs, **Credit Rating
  Agencies**) — and added an **annual cyber security audit report** to the para 21 conditions. MII
  Guidelines of 20 April 2026 layer a prescriptive regime on IFSC exchanges, clearing corporations and
  depositories, in force **1 April 2026, twenty days before they were issued**. A frontier-AI advisory
  of 4 June 2026 reaches every RE. Do not state the pre-2026 "four exemptions at para 21" — it is wrong
  about the count, the paragraph and the conditions. Detail and clocks in
  [`incident-reporting-map.md`](incident-reporting-map.md).

For each of these, the correct output is *"here is the observed evidence relevant to this obligation
area"* — never *"you are compliant with X"*.

---

© 2026 BitScore Cybertech LLP. "Bitsight" is a registered trademark of Bitsight Technologies, Inc.;
this plugin is an independent integration and is not published by Bitsight. Framework and regulatory
names are the property of their respective bodies; references here are indicative only.

<!-- provenance
mirrors: bitscore.in lib/regulations.ts
verified: 2026-09-07
next-review: 2026-12-07
-->
