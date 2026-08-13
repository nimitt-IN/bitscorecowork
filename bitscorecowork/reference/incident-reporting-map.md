# Incident-reporting instruments — Indian regulatory clocks (source-cited)

Working reference for the **`incident-notify`** skill, and the source of the regulatory-clock injects
in **`tabletop`**. It sets out who owes a notification after a cyber incident, how long they have,
where it goes, and what the notification has to contain.

> ## Read this before drafting anything
>
> This is a **drafting aid, not legal advice, and not a determination that any instrument applies.**
>
> - **Applicability is entity-specific and belongs to the user's compliance and legal team.** Whether
>   an entity is a commercial bank, a Middle-Layer NBFC, a SEBI-regulated intermediary, a Significant
>   Data Fiduciary, or the operator of a protected system changes which rows below bind it. Ask.
>   Never rule. (Global rules §7.)
> - **The clocks below are short and they run from *noticing*, not from confirming.** "We are still
>   investigating" does not pause a six-hour clock. This is the single most common failure.
> - **Verify every citation against the published text before a notification is filed.** Instruments
>   are amended; portals and formats change. Each section below carries its source URL and the date
>   this reference was verified.
> - Confidence is marked per instrument. **Primary** means the published text was read directly.
>   **Secondary** means the position is drawn from reliable summaries and has *not* been confirmed
>   against the instrument itself — treat those clocks as indicative and confirm before filing.
> - Nothing here certifies compliance, and no draft produced from it has been filed or sent.

**All entries verified on 4 August 2026.** **Re-verified on 13 August 2026 against the published texts:
RBI (all seven Directions), IRDAI 2026, SEBI CSCRF, and both DPDP gazette notifications — all now
Primary.** Four rows were wrong: the RBI family is seven instruments rather than one, IRDAI cited a
superseded instrument and a 24-hour step that does not exist in the 2026 text, CSCRF is three filings
rather than one, and the DPDP breach obligations turn out **not to be in force until 13 May 2027**.
**SEBI LODR Reg. 30 remains the one unverified row.** See the change note at the end.

---

## How to read the columns

- **Who it binds** — the class of entity, in the instrument's own terms.
- **Clock** — the deadline and, critically, *what starts it*.
- **Goes to** — the recipient and the channel, where the instrument names one.
- **Source** — reference number, date, and URL.
- **Confidence** — **Primary** (published text read) or **Secondary** (summaries only).

---

## The clocks at a glance

| Instrument | Clock | Starts from | Goes to |
| --- | --- | --- | --- |
| CERT-In Directions, 2022 | **6 hours** | Noticing, or being brought to notice | CERT-In |
| RBI Cyber Directions, 2026 — **seven instruments, one per entity class** | **6 hours** | Detection | DAKSH, plus CERT-In |
| RBI IT Governance MD, 2023 | Superseded for the classes covered above — **check before using** | Detection | RBI, plus CERT-In |
| SEBI CSCRF | **6 hours**, then **24 hours** | Noticing/detecting, or being brought to notice | `mkt_incidents@sebi.gov.in` + CERT-In; then SEBI Incident Reporting Portal |
| SEBI LODR, Reg. 30 (listed entities) | **12 / 24 hours** by limb — *unverified, see section* | Occurrence of a *material* event | Stock exchanges |
| IRDAI Cyber Guidelines, **2026** (replaced the 2023 Guidelines) | **6 hours** — *no 24-hour step in the 2026 text* | Noticing, or being brought to notice | CERT-In, copied to IRDAI |
| DPDP — Data Principals | ⚠️ **Not in force until 13 May 2027** | — | Each affected Data Principal |
| DPDP — the Board | ⚠️ **Not in force until 13 May 2027** | — | Data Protection Board of India |
| NCIIPC (protected systems) | **6 hours** | Noticing | NCIIPC |

**Care point:** these are not alternatives. A listed private-sector bank holding customer personal
data can owe CERT-In, DAKSH and the stock exchanges on the same incident, on different clocks, in
different formats. Work the overlap section below before drafting.

**Second care point — the DPDP rows are the exception.** They are the one track here that is **not yet
live**. Rule 7 and Act section 8 both commence on **13 May 2027**. Plan for them; do not file against
them today. See the DPDP section for the verbatim commencement provisions.

---

## CERT-In Directions, 2022 — the baseline that reaches nearly everyone

**Confidence: Primary.** Published text read directly.

| | |
| --- | --- |
| **Instrument** | Directions under sub-section (6) of section 70B of the Information Technology Act, 2000 relating to information security practices, procedure, prevention, response and reporting of cyber incidents for Safe & Trusted Internet |
| **Reference** | No. 20(3)/2022-CERT-In, Ministry of Electronics and Information Technology (MeitY) |
| **Dated** | 28 April 2022 |
| **In force** | 60 days after issue, i.e. from 27 June 2022 |
| **Source** | https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf |

**Who it binds.** "Any service provider, intermediary, data centre, body corporate and Government
organisation." That is deliberately wide — most Indian entities operating IT systems fall inside it,
which is why this is the baseline row for almost every incident.

**The clock.** Incidents of the kinds listed in Annexure I must be reported to CERT-In **within 6
hours of noticing such incidents or being brought to notice about such incidents**. Note both limbs:
a vendor, a researcher or a regulator telling you starts the clock exactly as your own detection does.

**Channel.** Email `incident@cert-in.org.in`; phone 1800-11-4949; fax 1800-11-6969. Current formats
are published on cert-in.org.in and change from time to time — check before filing.

**Annexure I — the 20 reportable categories** (cited to Rule 12(1)(a) of the CERT-In Rules, 2013):

1. Targeted scanning/probing of critical networks/systems
2. Compromise of critical systems/information
3. Unauthorised access of IT systems/data
4. Website defacement, or intrusion and unauthorised changes such as inserting malicious code or
   links to external websites
5. Malicious code attacks — virus, worm, Trojan, Bots, Spyware, Ransomware, Cryptominers
6. Attacks on servers (database, mail, DNS) and network devices such as routers
7. Identity theft, spoofing and phishing attacks
8. Denial of Service (DoS) and Distributed Denial of Service (DDoS) attacks
9. Attacks on critical infrastructure, SCADA and operational technology systems, and wireless networks
10. Attacks on applications such as E-Governance and E-Commerce
11. Data breach
12. Data leak
13. Attacks on Internet of Things (IoT) devices and associated systems, networks, software, servers
14. Attacks or incidents affecting digital payment systems
15. Attacks through malicious mobile apps
16. Fake mobile apps
17. Unauthorised access to social media accounts
18. Attacks or malicious/suspicious activities affecting cloud computing systems, servers, software,
    applications
19. Attacks or malicious/suspicious activities affecting systems, servers, networks, software or
    applications related to Big Data, Blockchain, virtual assets, virtual asset exchanges, custodian
    wallets, robotics, 3D and 4D printing, additive manufacturing, drones
20. Attacks or malicious/suspicious activities affecting systems, servers, software or applications
    related to Artificial Intelligence and Machine Learning

**Standing obligations that bite during an incident.** Two directions are usually discovered too
late, both worth checking *before* an incident rather than during one:

- **Logs.** All ICT system logs enabled and maintained securely for a **rolling 180 days**, and
  **maintained within Indian jurisdiction**. They must be provided to CERT-In with an incident report
  or when directed.
- **Clock synchronisation.** All ICT system clocks synchronised to the NTP servers of NIC or NPL, or
  to servers traceable to them. Entities spanning multiple geographies may use another accurate
  source provided it does not deviate from NPL/NIC. An incident timeline assembled from unsynchronised
  clocks is very hard to defend.
- **Point of Contact.** A designated PoC must be registered with CERT-In in the Annexure II format
  (to `info@cert-in.org.in`) and kept current. CERT-In directs all communications to the PoC.

**Penalty.** Failure to furnish information or non-compliance "may invite punitive action under
sub-section (7) of section 70B of the IT Act, 2000 and other laws as applicable."

**Care point:** the categories are broad and several — *targeted scanning/probing*, *data leak* — are
triggered well below the threshold most organisations think of as "a breach". Do not let a narrow
internal definition of "incident" quietly override Annexure I. The determination is still the
entity's to make, with its legal team; the skill's job is to put the category list in front of them.

---

## RBI Cybersecurity, Technology: Risk, Resilience and Assurance Framework Directions, 2026 — **seven instruments**

**Confidence: Primary.** All seven verified at the RBI source URLs on 13 August 2026 — the instrument,
its reference number, its notification Id, and the incident-reporting paragraph, each read directly
from the published text.

**Note the paragraph numbers differ between instruments.** They are not a common numbering: commercial
banks 182, SFBs and Payments Banks 181, UCBs 88. Quote the number from the entity's own instrument.

> **The single most important correction in this reference.** This is **not one instrument for
> commercial banks.** The RBI issued **seven parallel Directions on 31 July 2026, one per entity
> class**. A commercial bank, an SFB, a Payments Bank, a UCB, an AIFI, an NBFC and a CIC each file
> under **their own instrument**. Citing 410 at an NBFC is wrong.

| Entity class | Reference | RBI notification Id | Reporting paragraph |
| --- | --- | --- | --- |
| Commercial Banks | RBI/DoS/2026-27/**410** | 13643 | Ch. V, §Z.1, **para 182** |
| Small Finance Banks | RBI/DoS/2026-27/**419** | 13634 | **para 181** |
| Payments Banks | RBI/DoS/2026-27/**428** | 13625 | **para 181** |
| Urban Co-operative Banks | RBI/DoS/2026-27/**437** | 13616 | **para 88** |
| All India Financial Institutions | RBI/DoS/2026-27/**456** | 13597 | **para 177** |
| Non-Banking Financial Companies | RBI/DoS/2026-27/**461** | 13592 | Ch. IV **para 28** / Ch. V **para 141** |
| Credit Information Companies | RBI/DoS/2026-27/**470** | 13583 | **para 177** |

URL pattern: `https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=<Id>`

**The clock — the same in every one of them.** Six hours from **detection**, on the **DAKSH** platform
(https://daksh.rbi.org.in), plus proactive notification to **CERT-In**. The RBI filing does not
discharge the CERT-In obligation. Verbatim from 410, para 182: *"The bank shall report cyber incidents
within six hours of detection on DAKSH platform."* From 461, para 141: *"The NBFC shall report cyber
incidents to RBI within six hours of detection on DAKSH platform."*

**Within 410 (commercial banks).** State Bank of India is covered. Foreign banks operating in India
through branch mode are covered, with modified "comply or explain" treatment on certain chapters. SFBs,
Payments Banks and UCBs are *excluded from 410* precisely because each now has its own instrument above
— an exclusion that means "file elsewhere", not "no obligation".

**Two entity classes with no instrument in this family.** **Regional Rural Banks** and **Local Area
Banks** have none — LABs got a separate *(Local Area Banks – Miscellaneous) Supervisory Directions,
2026* on the same day, which is a different instrument. Do not stretch 410 to cover either.

**NBFCs — read the chapter, not just the instrument.** 461 binds **all** NBFCs registered with RBI
(RBI Act 1934, Factoring Regulation Act 2011, NHB Act 1987), but its chapters are graded and **the
reporting obligation is not in all of them**:

| Chapter | Applies to | Six-hour DAKSH clause? |
| --- | --- | --- |
| Ch. III | Base Layer **below ₹500 crore**, and CICs | **No such clause** |
| Ch. IV | Base Layer **₹500 crore and above** | **Yes — para 28** |
| Ch. V | Top, Upper and Middle Layer, **excluding CICs** | **Yes — para 141** |

So "Base Layer NBFCs are outside it" — the old position in this reference — is **wrong**. A small Base
Layer NBFC is inside the instrument but carries no DAKSH clause; **CERT-In's six hours still binds it.**
CICs are addressed by Ch. III here *and* have their own instrument at 470 — establish which governs
before drafting.

**A parallel family issued the same day.** *RBI (… – Digital Payment Security Controls) Directions,
2026* were issued on 31 July 2026 for the same entity classes. **Different instruments — never cite
them interchangeably with the cyber Directions.**

**Follow-up.** In 410, paragraph 181 requires the bank to analyse cyber incidents — "including through
forensic analysis, if necessary" — for severity, impact and root cause; 461 carries the equivalent
duty immediately before para 141. The Directions do not set a separate deadline for the root-cause
report; expect the supervisor to ask, and build the timeline from the start.

**Care point:** these Directions do **not** absorb outsourcing governance. Vendor oversight for
commercial banks sits in the **RBI (Commercial Banks – Managing Risks in Outsourcing) Directions,
2025** (28 November 2025), which the 2026 cyber Directions expressly preserve and carve around. If
the incident originated at a service provider, the outsourcing instrument's notification and
oversight terms are in play alongside paragraph 182 — see `regulatory-map.md`.

---

## RBI Master Direction on IT Governance, Risk, Controls and Assurance Practices, 2023 — **largely superseded**

**Confidence: Secondary**, and **retained only as a historical pointer.** Do not draft against this
without first confirming it still governs the entity.

| | |
| --- | --- |
| **Reference** | RBI/DoS/2023-24/107 |
| **Issued** | 7 November 2023, in force from 1 April 2024 |
| **Source** | https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx |

**Why this section shrank.** The seven 2026 Directions each carry a **Repeal and Other Provisions**
chapter and displace the earlier cyber and IT-governance instructions for the classes they cover.
Commercial banks, SFBs, Payments Banks, UCBs, AIFIs, **NBFCs** and CICs are all now addressed by their
own 2026 instrument. Route to the table above first; come here only for an entity class demonstrably
outside that family, and confirm against the published Master Direction before filing.

**Care point — the most common error in this whole reference.** "RBI requires 2–6 hour reporting for
banks and NBFCs" is wrong twice over: it conflates instruments, and it quotes a window the 2026
family does not use. **Every one of the seven 2026 Directions sets six hours from detection, on
DAKSH.** What changes between entity classes is *which instrument* and, for NBFCs, *which chapter* —
not the clock. **Establish the entity type first**, and if the user is unsure, say which instrument
you have drafted against, label the assumption at the top of the draft, and route it to their
compliance team. Never rule on applicability yourself.

---

## SEBI Cybersecurity and Cyber Resilience Framework (CSCRF)

**Confidence: Primary.** Circular text read directly on 13 August 2026; clauses quoted below are
verbatim from the published PDF.

| | |
| --- | --- |
| **Instrument** | Cybersecurity and Cyber Resilience Framework (CSCRF) for SEBI Regulated Entities |
| **Reference** | SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/113 |
| **Issued** | 20 August 2024 |
| **Source** | https://www.sebi.gov.in/sebi_data/attachdocs/aug-2024/1724326790365.pdf |

**Who it binds.** SEBI-regulated entities across the board — AIFs, bankers to an issue and SCSBs,
clearing corporations, collective investment schemes, credit rating agencies, custodians, debenture
trustees, depositories and depository participants, DDPs, investment advisers and research analysts,
KYC registration agencies, merchant bankers, mutual funds and AMCs, portfolio managers, RTAs, stock
brokers, stock exchanges and venture capital funds. Obligations are graded by RE category (MIIs,
Qualified REs, mid-size, small-size, self-certification).

**The clock — and it is more than one filing.** Verbatim: *"Any cyber-attack, cyber security incident
and / or breach falling under CERT-In Cybersecurity directions shall be notified to SEBI and CERT-In
within 6 hours of noticing/ detecting such incidents or being brought to notice about such
incidents."*

| What | When | Where |
| --- | --- | --- |
| Initial notification | **6 hours** | `mkt_incidents@sebi.gov.in` **and** CERT-In |
| Necessary details | **24 hours** | SEBI Incident Reporting Portal |
| **Stock brokers / depository participants** — additional leg | **6 hours** | Stock Exchanges / Depositories, *alongside* SEBI and CERT-In |
| **All other** cybersecurity incidents | **24 hours** | SEBI, CERT-In and NCIIPC as applicable |

Note the trigger wording: **"noticing/ detecting … or being brought to notice"** — the same
three-limbed trigger as CERT-In, not detection alone.

Classification thresholds for what must go in the six-hour bucket are in **Annexure-O** (Classification
and Handling of Cybersecurity Incidents), which lists severe-nature incidents (DoS/DDoS, intrusion,
ransomware and other contaminants) on public information infrastructure, **data breaches or data
leaks**, and large-scale or frequent intrusions.

**Non-reporting is itself actionable.** The circular states that where an RE does not report an
incident it was aware of, *"appropriate regulatory action may be taken"*.

**Care point:** CSCRF's six hours and CERT-In's six hours are two filings, not one. Neither discharges
the other — and the 24-hour portal submission is a third step, not a substitute for either.

---

## SEBI LODR, Regulation 30 — the parallel obligation that gets missed

**Confidence: Secondary — and deliberately so.** An attempt to read Regulation 30(6) directly on
13 August 2026 **failed**: SEBI serves the consolidated regulations through a client-rendered page
whose text is not retrievable, and the LODR FAQ PDF does not restate the limits. The timings below
are therefore **not verified against the published text**. Treat them as indicative only and have the
company secretary confirm against the current consolidated version before anything is filed.

| | |
| --- | --- |
| **Instrument** | SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015, Reg. 30 and Schedule III, Part A |
| **Current version** | Last amended **14 July 2026** (verified as the current consolidated version on 13 August 2026) |
| **Source** | https://www.sebi.gov.in/legal/regulations/jul-2026/securities-and-exchange-board-of-india-listing-obligations-and-disclosure-requirements-regulations-2015-last-amended-on-july-14-2026-_102974.html |

**Who it binds.** Listed entities — regardless of sector. A listed manufacturer with no financial-sector
regulator at all still owes this one.

**The clock (unverified).** Reg. 30(6) sets tiered limits — commonly stated as **12 hours** for events
arising from a decision of the board, **24 hours** for events emanating from within the listed entity,
and a longer window where the event originates outside it. **Confirm which limb applies**; the
distinction matters and this reference has not been able to check it. Materiality is determined by Key
Managerial Personnel authorised by the Board for that purpose.

**Why it matters here.** A significant data breach, ransomware event, customer-data leak or major IT
disruption can be a material event. This is a **disclosure to the market**, drafted to a different
audience and a different standard than a regulatory incident report, and it is routinely forgotten in
the first six hours while the security team is working the technical clocks.

**Care point:** never assert that an incident *is* material. Materiality is the authorised KMP's
determination on advice, and it carries securities-law consequences in both directions — disclosing
an immaterial event and failing to disclose a material one are both problems. Surface the obligation,
name who decides, and stop there.

---

## DPDP Act, 2023 and the DPDP Rules — personal data breach

**Confidence: Primary.** Both gazette notifications read directly on 13 August 2026; the commencement
provisions and Rule 7 are quoted verbatim below.

| | |
| --- | --- |
| **Instruments** | Digital Personal Data Protection Act, 2023; Digital Personal Data Protection Rules, 2025 (Rule 7 — Intimation of Personal Data Breach) |
| **Rules reference** | **G.S.R. 846(E)**, notified **13 November 2025** |
| **Act commencement** | **G.S.R. 843(E)**, same date — a *separate* notification, easily confused with the Rules |
| **Source** | https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf (Rules) · https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf (Act commencement) |

> ## ⚠️ Rule 7 is **not in force**. It commences **13 May 2027**.
>
> This is the single most important fact in this section, and it inverts how the DPDP track is usually
> presented. **Rule 1 of the Rules, verbatim:**
>
> - *"(2) Rules 1, 2 and 17 to 21 shall come into force on the date of their publication in the Official Gazette."*
> - *"(3) Rule 4 shall come into force one year after the date of publication of this Gazette."*
> - *"(4) **Rules 3, 5 to 16, 22 and 23 shall come into force eighteen months after the date of publication of this Gazette.**"*
>
> **Rule 7 falls in sub-rule (4)** — the eighteen-month tranche. Eighteen months from 13 November 2025
> is **13 May 2027**.
>
> The Act agrees. **G.S.R. 843(E)** commences **section 8** — which carries the breach-notification
> duty — in its own eighteen-month tranche (*"sections 7 to 10"*), while only sections 1(2), 2, 18–26,
> 35, 38–43 and 44(1) and (3) took effect on 13 November 2025. Those early sections establish the
> **Data Protection Board**; they do not impose the breach duty.
>
> **So as at August 2026 there is no DPDP breach-intimation clock running on a live incident.** Do not
> put one in an escalation matrix as though there were, and do not tell a client they owe the Board a
> 72-hour report today. Say it is **not yet in force, commencing 13 May 2027**, and that the CERT-In
> and sectoral clocks are the ones actually running. Getting this wrong in the optimistic direction
> invents an obligation; getting it wrong in the other direction leaves a client unprepared for a
> deadline that is coming.

> **Date trap.** The Rules PDF carries **two dates**, and the wrong one circulates widely.
> G.S.R. 846(E) is dated **13 November 2025**; the 14th is only the e-gazette upload stamp
> (`CG-DL-E-14112025`). The 13th is operative — the eighteen-month clock to **13 May 2027** runs from
> it, so "notified 14 Nov" and "13 May 2027" cannot both be right.

**Everything below describes the regime as it will operate from 13 May 2027.** It is the right thing
to plan and rehearse against, and the wrong thing to file today.

**Who it binds.** Data Fiduciaries — anyone determining the purpose and means of processing digital
personal data. This is orthogonal to sector: it can bind alongside RBI, SEBI or IRDAI obligations on
the same incident.

**Two recipients, two different clocks.**

**To each affected Data Principal — without delay.** In a "concise, clear and plain manner", through
the fiduciary's registered communication channel, covering:
- a description of the breach, including its nature, extent and the timing of its occurrence;
- the consequences relevant to that individual;
- the mitigation measures being implemented;
- safety measures the individual can take to protect their own interests;
- contact details of a person able to respond to their questions.

**To the Data Protection Board of India — in two stages.**
1. **Without delay**, on becoming aware: the nature, extent, timing and location of the breach, and
   its likely impact.
2. **Within 72 hours** (or longer, if the Board permits): a detailed report covering the circumstances
   and reasons for the breach, mitigation measures implemented or proposed, findings about who was
   responsible, measures to prevent recurrence, and **a summary of the intimations already given to
   affected Data Principals**.

**Penalty.** Failure to notify carries a financial penalty of up to **₹200 crore** under the Act's
Schedule.

**Care point:** "without delay" is genuinely stricter than the 72-hour figure it is usually reported
alongside, and the two-stage structure means the 72-hour report is a *follow-up*, never the first
step. Note also that the Data Principal intimations must be summarised back to the Board — so the
notification to individuals has to be tracked from the outset, not reconstructed later.

**Apply DPDP minimisation to the drafts themselves.** Report categories and counts of affected
records. Never put credential values, account numbers or named individuals into a draft notification
or an incident file that will circulate.

---

## IRDAI Information and Cyber Security Guidelines, **2026**

**Confidence: Primary.** The circular and the Guidelines themselves (Annexure B) were read directly on
13 August 2026; the clause below is quoted verbatim.

| | |
| --- | --- |
| **Instrument** | IRDAI Information and Cyber Security Guidelines, **2026** (Version 2.0) |
| **Reference** | IRDAI/GA&HR/CIR/MISC/51/4/2026 |
| **Issued** | 6 April 2026, signed by the Executive Director (GA & HR) |
| **Replaces** | IRDAI Information and Cyber Security Guidelines, **2023** (IRDAI/GA&HR/GDL/MISC/88/04/2023, dated 24 April 2023) |
| **Compliance** | *"…shall strictly adhere to the said guidelines and ensure compliance from the current financial year."* |
| **Source** | Circular and Annexure A/B: https://irdai.gov.in/en/document-detail?documentId=9189223 — the Guidelines are inside the **Annexure B ZIP** |

> **Trap — the superseded document page is still live.** IRDAI's document page
> `document-detail?documentId=3314780` **still serves the 2023 Guidelines PDF** (confirmed
> 13 August 2026). It does not carry a superseded notice. Landing on it and drafting from it is the
> obvious failure mode here, and it is why this reference cited the wrong instrument in the first
> place. Check the year on the PDF you actually opened.
>
> A further practical note: the circular PDF is a **scanned image with no extractable text**, and the
> Guidelines are distributed inside a ZIP. Read the circular visually; the Guidelines PDF inside the
> ZIP does extract normally.

**Who it binds.** Named in the circular: all Insurers **including Foreign Reinsurance Branches**, and
Insurance Intermediaries covering **Brokers, Corporate Agents, Web Aggregators, TPAs, IMFs, Insurance
Repositories, ISNP, Corporate Surveyors, MISPs and CSCs**, plus the **Insurance Information Bureau of
India (IIB)**. Broader than the "insurers and intermediaries" shorthand usually used.

**The clock — one step, not two.** Guidelines §3.6 (*Notification to regulatory authorities*), verbatim:
*"Organization shall mandatorily report cyber incidents to Cert-In within 6 hours of noticing or being
brought to notice about such incidents with a copy to IRDAI and other concerned regulators /
authorities."* Methods and formats are those published on the CERT-In website.

> **Correction carried into this edition.** Earlier versions of this reference described IRDAI as
> *"6 hours, then details to the Authority within 24 hours"*. **That second step is from the 2023
> Guidelines and does not appear in the 2026 text** — a full-text search of the 2026 Guidelines returns
> no 24-hour incident-reporting obligation. Do not put a 24-hour IRDAI deadline in an escalation
> matrix. If a client's own internal standard keeps one, that is their policy, not the Guidelines.

Note the trigger: **"noticing or being brought to notice"** — matching CERT-In, not "detection".

**Standing obligations.** ICT infrastructure logs maintained for a **rolling 180 days and within
Indian jurisdiction**, per CERT-In's directions, and made available to Law Enforcement Agencies,
IRDAI, CERT-In and **CSIRT-Fin** on demand. The Guidelines also name CSIRT-Fin and Cyber Swachhta
Kendra among the external parties an incident-notification process must identify.

---

## NCIIPC — protected systems and critical information infrastructure

**Confidence: Secondary.** If the entity operates a declared protected system, its specific
notification terms come from the declaration and NCIIPC's directions to it — use those, not this row.

| | |
| --- | --- |
| **Statutory basis** | Sections 70 and 70A, Information Technology Act, 2000 |
| **Source** | https://nciipc.gov.in |

**Who it binds.** Operators of computer resources declared **protected systems** by notification in
the Official Gazette — CII in banking, energy, telecom, transport, government and strategic sectors.
Several large Indian banks' IT resources have been so declared.

**The clock.** Incident reporting to NCIIPC **within 6 hours**, with log retention of at least 180
days, alongside periodic CII evaluation.

**Care point:** protected-system status is a *notified* fact, not an inference. Ask whether the
affected system is within a declared protected system — do not deduce it from the entity's sector or
size, and do not assume the whole estate is covered because part of it is.

---

## One incident, many clocks

The real difficulty is rarely a single instrument — it is that several run at once, from different
trigger events, to different recipients, in different formats. Work it in this order:

1. **Fix the trigger time and write it down.** The moment of *noticing*, in IST, with the source
   (alert, vendor call, researcher email, regulator enquiry). Every clock below is measured from
   something; most are measured from this. Record it before anything else — it is the first thing
   every regulator asks and the hardest thing to reconstruct afterwards.
2. **Run the baseline.** CERT-In binds nearly every Indian entity. Start there.
3. **Add the sectoral filing.** For an RBI-regulated entity this means **identifying which of the
   seven 2026 Directions binds it** — commercial bank 410, SFB 419, Payments Bank 428, UCB 437, AIFI
   456, NBFC 461, CIC 470 — all six hours from detection, all on DAKSH. For an NBFC, also establish
   the **chapter**, since Base Layer below ₹500 crore carries no DAKSH clause. Otherwise: SEBI CSCRF
   (SEBI-regulated entities), IRDAI (insurers and intermediaries). Ask which; never rule.
4. **Add the personal-data track if personal data is in scope.** DPDP runs on its own clocks, to
   different recipients, and it reaches individuals — which no other instrument here does.
5. **Add the market-disclosure track if the entity is listed.** SEBI LODR Reg. 30, on materiality,
   decided by the authorised KMP.
6. **Add NCIIPC if a declared protected system is affected.**
7. **Check the third-party direction.** If the incident originated at a service provider, the
   contract's notification SLA and, for regulated entities, the applicable outsourcing instrument are
   both live. If the entity *is* the service provider, its customers' clocks are now running on the
   notice it gives them.

**Care point:** the six-hour clocks are short enough that drafting cannot start when the facts are
complete — they never are at hour four. Draft on what is known, mark every unknown explicitly as
*under investigation*, and file the update. A late filing is a compliance failure; an early filing
with stated unknowns is normal practice.

---

## What Bitsight can and cannot contribute here

**Be honest about this in every output.** Bitsight is a small part of an incident notification.

**It can:**
- confirm whether an affected host or domain sits in the entity's **externally observed footprint**,
  which is useful when attribution of the asset is itself in question — see
  [`attribution-patterns.md`](attribution-patterns.md);
- show whether **findings or alerts on that vector or asset preceded the incident**, which matters for
  the root-cause narrative regulators ask for;
- establish, for a **third-party** incident, what the vendor's externally observed posture and trend
  looked like before it — evidence about the diligence performed, not about the breach.

**It cannot:**
- tell you an incident occurred, when it started, what was accessed, or how many records are affected
  — every fact a notification actually turns on comes from the entity's own logs, forensics and
  investigation;
- tell you whether an incident is reportable, or whether an instrument applies;
- substitute for the internal timeline. Bitsight observes externally and on its own refresh cadence,
  which is not incident-response tempo.

---

## Change note — 13 August 2026

Two rows in this reference were wrong in ways that would have misrouted a live filing. Both are fixed
above.

| What was wrong | What it now says | How it was verified |
| --- | --- | --- |
| The RBI 2026 framework was presented as **one** commercial-banks instrument, with NBFCs sent to the 2023 IT Governance Master Direction | **Seven** parallel Directions issued 31 July 2026, one per entity class, each with the same six-hour DAKSH clock; the 2023 MD is largely superseded | **Primary** — all seven texts read at rbi.org.in; reference numbers, notification Ids and reporting paragraphs quoted |
| NBFC Base Layer described as outside the instrument | 461 binds **all** RBI-registered NBFCs, with graded chapters; Base Layer below ₹500 crore has **no** DAKSH clause, only CERT-In's | **Primary** — applicability clause and Ch. IV/V paragraphs read directly |
| IRDAI cited the **2023** Guidelines | The **2026** Guidelines (IRDAI/GA&HR/CIR/MISC/51/4/2026, 6 April 2026) replaced them | **Secondary** — recorded from an earlier reading; the clocks are **not** re-confirmed against the 2026 text and are flagged as such |
| DPDP treated as a live clock | ⚠️ **Rule 7 and Act s.8 do not commence until 13 May 2027** — there is no DPDP breach clock running today | **Primary** — Rule 1(2)–(4) of G.S.R. 846(E) and the tranches in G.S.R. 843(E) read and quoted |
| IRDAI shown as "6 hours, then 24 hours" | **6 hours only.** The 24-hour step is from the 2023 Guidelines and has no counterpart in the 2026 text | **Primary** — §3.6 quoted from the Guidelines inside the Annexure B ZIP; full-text search returns no 24-hour incident obligation |
| SEBI CSCRF was Secondary, one filing, "from detection" | **Primary**, and it is three filings — 6h to SEBI + CERT-In, 24h to the SEBI portal, plus a 6h leg to exchanges/depositories for brokers and DPs — triggered by *noticing or being brought to notice* | **Primary** — circular SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/113 read directly |
| SEBI LODR pointed at a bare domain | Points at the current consolidated version (last amended 14 July 2026), with the limits explicitly marked **unverified** | Verification **attempted and failed** — SEBI's regulation text is client-rendered and unreadable; recorded as a known gap rather than papered over |

**Still outstanding:**

1. **SEBI LODR Reg. 30(6) remains unverified.** The 12/24-hour limbs could not be read from the
   published text. This is the last Secondary row in the file and the one most likely to be quoted
   wrongly — read it from a PDF copy of the consolidated regulations and close it.

*(The three missing RBI paragraph numbers — 419, 428, 437 — were filled on 13 August 2026 from the
published texts. All seven RBI rows are now Primary and complete.)*

---

© 2026 BitScore Cybertech LLP. "Bitsight" is a registered trademark of Bitsight Technologies, Inc.;
this plugin is an independent integration and is not published by Bitsight. Regulatory references are
indicative, are not legal advice, and must be confirmed against the current published text by the
user's compliance and legal team.
