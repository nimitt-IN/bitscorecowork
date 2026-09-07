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

**Verified on 4 August 2026, re-verified against every published text on 13 August 2026, extended to the
IFSCA track on 18 August 2026, and brought current on 7 September 2026** — when the IFSCA track was found
to be a year out of date and two SEBI circulars of 24 August 2026 were missing. Every sectoral instrument
here is **Primary**. Two sections are
**Secondary** and say so where they sit: **NCIIPC**, whose terms come from the protected-system
declaration rather than from a general instrument, and the **RBI IT Governance Master Direction, 2023**,
retained only as a historical pointer.

**The gap this edition closes: IFSCA is four instruments, not one.** The 2025 Guidelines were amended on
10 March 2026 and a second, heavier regime for **IFSC market infrastructure institutions** landed on
20 April 2026, followed by a frontier-AI advisory on 4 June 2026. This file carried only the 2025 text
until 7 September 2026, which made two of its statements wrong rather than merely incomplete: the
exemptions are **two tiers with different conditions**, not one list of four, and an IFSC exchange,
clearing corporation or depository runs a **wider incident trigger** than the baseline. See
[the IFSCA section](#ifsca--gift-city-ifsc-entities).

**The displacement rule still governs everything else here.** An entity licensed by **IFSCA** files with
the Authority, **not** with the RBI, SEBI or IRDAI — an IFSC licence displaces the mainland regulator even
for business those regulators supervise onshore. Routing a GIFT City banking unit to RBI/DoS/2026-27/410
is silent when it goes wrong: the draft looks right. IFSCA also runs the only Indian cyber clock that
continues past the first filing, to seven days for the fix and thirty for root cause.

Earlier corrections, retained because the wrong versions still circulate: the RBI family is **seven
instruments**, not one; IRDAI's **2026** Guidelines replaced the 2023 ones and carry **no 24-hour step**;
CSCRF is **three filings**, not one; the DPDP breach obligations are **not in force until 13 May 2027**;
and SEBI LODR's cyber disclosure is **twelve hours, not twenty-four**. See the change note at the end.

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
| SEBI CSCRF | **6 hours**, then **24 hours** — and the 24-hour filing is **staged**, not final | Noticing/detecting, or being brought to notice | `mkt_incidents@sebi.gov.in` + CERT-In; then the SEBI Incident Reporting Portal at `https://siportal.sebi.gov.in` |
| SEBI LODR, Reg. 30(6) (listed entities) | **12 hours** for a cyber incident (30 min for board decisions; 24h only if the event arises *outside* the entity) | Occurrence of a *material* event | Stock exchanges |
| SEBI LODR, Reg. 27(2)(ba) (listed entities) | Next **quarterly** CG report — no materiality test | Any cyber incident, breach or data loss | Stock exchanges |
| IRDAI Cyber Guidelines, **2026** (replaced the 2023 Guidelines) | **6 hours** — *no 24-hour step in the 2026 text* | Noticing, or being brought to notice | CERT-In, copied to IRDAI |
| IFSCA Cyber Security Guidelines, 2025 (as amended 10 Mar 2026) — **GIFT City, and it replaces the mainland filing** | **6 hours**, then **3 days**, then **7 days** to mitigate, then **30 days** | Detection | `cyber-incidents@ifsca.gov.in`, copied to the CISO, IFSCA |
| IFSCA **MII** Guidelines, 2026 — IFSC exchanges, clearing corporations, depositories | Same four steps — but the trigger is **wider** and the first filing has **two recipients** | Noticing/detecting, **or being brought to notice** | IFSCA (`cyber-incidents@ifsca.gov.in`) **and** CERT-In; NCIIPC too for Protected Systems |
| DPDP — Data Principals | ⚠️ **Not in force until 13 May 2027** | — | Each affected Data Principal |
| DPDP — the Board | ⚠️ **Not in force until 13 May 2027** | — | Data Protection Board of India |
| NCIIPC (protected systems) | **6 hours** | Noticing | NCIIPC |

**Care point:** these are not alternatives. A listed private-sector bank holding customer personal
data can owe CERT-In, DAKSH and the stock exchanges on the same incident, on different clocks, in
different formats. Work the overlap section below before drafting.

**The IFSCA row is the exception to that, and it is the one to get right.** IFSCA does not stack on top
of the RBI, SEBI or IRDAI filing — it **replaces** it. Establish where the entity is licensed before
anything else, because "it is a bank" and "it is a bank in GIFT City" route to different regulators.

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
through branch mode are covered, with modified "comply or explain" treatment on certain chapters.

**Read 410's own scope wording, not the usual gloss.** It covers *"banking companies (other than Small
Finance Banks, Payments Banks, and **Local Area Banks**)"*. The natural summary — "each excluded class
has its own Directions" — is true of SFBs and Payments Banks and **false of Local Area Banks**, which
have none in this family. **Urban Co-operative Banks are not in that carve-out at all**: they are
Primary Co-operative Banks rather than banking companies, so they were never inside 410's definition to
be excluded from it. They file under 437 because 437 is addressed to them, not because 410 sent them
there. The distinction matters when someone asks *why* an entity files where it does.

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

**Care point:** these Directions do **not** absorb outsourcing governance. Vendor oversight sits in a
separate 2025 pair, which the 2026 cyber Directions expressly preserve and carve around:

| Instrument | Reference | Source |
| --- | --- | --- |
| RBI (**Commercial Banks** – Managing Risks in Outsourcing) Directions, 2025 | RBI/DOR/2025-26/**171** | https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=13139 |
| RBI (**Non-Banking Financial Companies** – Managing Risks in Outsourcing) Directions, 2025 | RBI/DOR/2025-26/**363** | https://www.rbi.org.in/scripts/BS_ViewMasDirections.aspx?id=12941 |

Both issued 28 November 2025, both with existing IT outsourcing agreements to comply by 10 April 2026.
The NBFC instrument reaches HFCs, CICs, standalone primary dealers and the account aggregator and P2P
categories as well, and grades by scale-based layer — Base Layer takes the general outsourcing
provisions only, Middle Layer and above pick up the IT-specific ones. If the incident originated at a
service provider, the applicable outsourcing instrument's notification and oversight terms are in play
alongside the cyber Directions' reporting paragraph — see `regulatory-map.md`.

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
Qualified REs, Mid-size, Small-size, Self-certification).

**The category is not stable, and the thresholds have been replaced twice.** Do not determine one from
the August 2024 circular alone — the criteria were rewritten in April 2025 and again in August 2025,
and two entity types were re-categorised in both rounds. The current tables, the amendment circulars
and the April re-fixing rule are in [`cscrf-categories.md`](cscrf-categories.md). For incident
reporting the category matters less than it does for the control obligations — the six-hour clock below
is common to all REs — but a broker or DP owes an extra leg, so establish the registration type.

**The clock — and it is more than one filing.** Verbatim: *"Any cyber-attack, cyber security incident
and / or breach falling under CERT-In Cybersecurity directions shall be notified to SEBI and CERT-In
within 6 hours of noticing/ detecting such incidents or being brought to notice about such
incidents."*

| What | When | Where |
| --- | --- | --- |
| Initial notification | **6 hours** | `mkt_incidents@sebi.gov.in` **and** CERT-In |
| Necessary details | **24 hours** | SEBI Incident Reporting Portal — `https://siportal.sebi.gov.in` |
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

### The FIRE realignment — 24 hours now *opens* the filing

**Confidence: Primary.** Circular `HO/(449)2026-ITD-5_DIV1/I/19448/2026`, **24 August 2026**, read from
the published PDF on 7 September 2026. Source:
https://www.sebi.gov.in/legal/circulars/aug-2026/alignment-of-sebi-s-cyber-incident-reporting-portal-with-fire-format_103915.html

**It moved no deadline, and that is the first thing to say** — para 2 restates the same six hours to
`mkt_incidents@sebi.gov.in` and the same twenty-four hours to the portal. Anyone who reads "new incident
reporting circular" as "new clock" is wrong; the table above is unchanged by it.

**What it did change is the shape of the filing.** The portal is now aligned to the Financial Stability
Board's **Format for Incident Reporting Exchange (FIRE)**, and para 4 is the operative sentence:

> *"The portal will facilitate reporting of incidents in stages to reflect incident life cycle from
> initial reporting to intermediate updates and final closure, while acknowledging that certain
> information may not be available at the time of initial reporting."*

So the twenty-four-hour submission **opens** a staged filing rather than closing one. An RE that files
once at hour twenty-three and stops has met the clock and missed the obligation: intermediate updates
and a final closure are part of the same duty. Two practical consequences for a draft:

- **Say what is unknown rather than waiting for it.** The circular expressly contemplates incomplete
  information at initial reporting, which removes the usual argument for filing late.
- **Put the closure step on the incident plan.** The file stays open on the portal until the RE closes
  it, which is a task nobody owns unless it is written down.

Portal: `https://siportal.sebi.gov.in`. Para 6 requires the circular to be read *with* CSCRF rather than
instead of it — it is a portal and format change, not a replacement framework.

### SEBI IT Resilience Index — not an incident clock, and it binds MIIs alone

**Confidence: Primary.** Circular `HO/47/18/11(1)2026-MRD-TPD1/I/19509/2026`, **24 August 2026**, read
from the published PDF on 7 September 2026.

Issued the same day as the FIRE circular, on the same subject area, to an **entirely different
population** — which is the trap. It creates no notification duty and belongs on no incident timeline.
It is here so that `incident-notify` does not cite it and `tabletop` does not inject it.

- **Binds stock exchanges, clearing corporations and depositories only**, and the addressee list carves
  out **AMC Repo Clearing Ltd by name**. No other SEBI-regulated entity owes anything under it.
- Nine parameters to 100: Availability 20 · Security 20 · Integrity 10 · Governance 10 · Reliability and
  Monitoring 10 · Business Continuity 10 · Modularity and Flexibility 10 · Scalability 5 · Others
  (incident handling etc.) 5.
- **Computation must be system-driven** — para 5.5 requires it to run automatically from IT systems
  "without manual intervention", so that it stays "non-discretionary and fool proof"; manual retrieval
  only after the exception is discussed with the MII's SCOT **in advance**. That makes it an engineering
  obligation rather than a reporting one.
- Half-yearly within 60 days of each half-year end, as a rolling comparison of two consecutive
  half-years with corrective actions, to the SCOT and the Governing Board.
- Dates: ISF finalises sub-parameters **30 Nov 2026** → SOP to SEBI **31 Jan 2027** → operationalised
  **28 Feb 2027** → first submission for the half-year ending **31 Mar 2027**.

**ITRI is not the CCI.** Same shape — weighted parameters totalling 100 — and nothing else. The CCI is a
maturity score under CSCRF Annexure-K for categorised REs generally
([`cscrf-categories.md`](cscrf-categories.md)); ITRI is resilience across nine parameters for MIIs alone.
An MII computes both, and conflating them in a pack misstates what either measures.

---

## SEBI LODR, Regulation 30 — the parallel obligation that gets missed

**Confidence: Primary.** Regulation 30(6), 27(2)(ba) and 21(4) read directly from the consolidated
text on 13 August 2026 and quoted verbatim below.

*Retrieval note, because it defeated a first attempt:* SEBI's regulation pages render the text in a
**PDF viewer iframe**, so the HTML carries no regulation content. The consolidated PDF is at
`sebi.gov.in/sebi_data/attachdocs/jul-2026/1784630770711.pdf` — read the iframe `src`, not the page.

| | |
| --- | --- |
| **Instrument** | SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015 — Reg. 30 and Schedule III Part A; also **Reg. 27(2)(ba)** and **Reg. 21(4)** |
| **Current version** | Last amended **14 July 2026** |
| **Source** | https://www.sebi.gov.in/sebi_data/attachdocs/jul-2026/1784630770711.pdf (consolidated PDF) · [landing page](https://www.sebi.gov.in/legal/regulations/jul-2026/securities-and-exchange-board-of-india-listing-obligations-and-disclosure-requirements-regulations-2015-last-amended-on-july-14-2026-_102974.html) |

**Who it binds.** Listed entities — regardless of sector. A listed manufacturer with no financial-sector
regulator at all still owes this one.

**The clock — Reg. 30(6), verbatim.** *"The listed entity shall first disclose to the stock exchange(s)
all events or information which are material in terms of the provisions of this regulation as soon as
reasonably possible and in any case not later than the following:"*

| Limb | Deadline | Applies to |
| --- | --- | --- |
| **(i)** | **thirty minutes** from closure of the meeting | Events decided at a **board meeting**. Provisos: **three hours** where the meeting closes after normal trading hours but more than three hours before the next trading day opens; for multi-day meetings, results are disclosed within 30 minutes or 3 hours of the close of the day they were considered |
| **(ii)** | **twelve hours** from occurrence | Event **emanating from within** the listed entity |
| **(iii)** | **twenty-four hours** from occurrence | Event **not** emanating from within the listed entity |

> ### ⚠️ A cyber incident is almost always limb (ii) — **twelve hours, not twenty-four**
>
> This corrects the industry shorthand *and* what this reference said until 13 August 2026. A
> ransomware event, data breach, customer-data leak or IT outage **originates within the listed
> entity**, so it falls in limb (ii). Quoting "24 hours" — the figure most commonly repeated, and the
> one this file previously carried — puts the disclosure **twelve hours late**.
>
> Note also that limb (i) is **thirty minutes**, not twelve hours. This reference previously
> attributed twelve hours to board decisions. Both limbs were wrong, in opposite directions.

**The 72-hour figure is narrower than usually reported.** It is **not** a general limb. It applies only
to claims made against the listed entity **under litigation or dispute (other than tax)** falling under
Schedule III Part A Para B sub-para 8, **and only where** the relevant information is maintained in the
entity's structured digital database under the PIT Regulations, 2015 — then 72 hours from receipt of
notice. Do not offer it for a cyber incident.

**Two further provisos.** Events with timelines specified in Part A of Schedule III follow **those**
timelines. And where disclosure is made after the deadline, the entity must **provide an explanation
for the delay along with the disclosure** — so a late filing is visible on its face.

**Materiality.** Determined under Reg. 30(4); the board authorises **Key Managerial Personnel** for the
purpose of determining materiality and making the disclosures, and the KMP's contact details and the
materiality policy are both website disclosures under Reg. 46(2).

**Cyber incidents are not named in Schedule III.** They reach Reg. 30 through the materiality test
rather than by being listed. The nearest express entry is Part A Para B sub-para 6 — disruption of
operations of a unit or division due to natural calamity, force majeure, strikes or lockouts. Do not
tell a client a cyber incident is a listed Schedule III event; it is a materiality judgement.

**Why it matters here.** This is a **disclosure to the market**, drafted to a different audience and a
different standard than a regulatory incident report, and it is routinely forgotten in the first six
hours while the security team works the technical clocks. On a twelve-hour limb it can fall due
*before* some of them.

### The standing LODR obligation nobody puts in an incident plan

**Reg. 27(2)(ba):** *"Details of cyber security incidents or breaches or loss of data or documents
shall be disclosed along with the report mentioned in clause (a) of sub-regulation (2), as may be
specified."* — i.e. **in the quarterly corporate governance report.**

This is separate from Reg. 30 and **does not depend on materiality**. An incident that was correctly
judged immaterial for Reg. 30 can still be reportable here. It is a recurring obligation, so it also
outlives the incident: put it on the post-incident checklist, not just the first-24-hours one.

**Reg. 21(4)** additionally requires the **Risk Management Committee's** role to *"specifically cover
cyber security"* — a governance hook regmap can evidence against.

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

## IFSCA — GIFT City IFSC entities

**Confidence: Primary.** All four instruments read directly from the published PDFs — the 2025
Guidelines on 18 August 2026, the three 2026 instruments on **7 September 2026**. Every clause below is
quoted verbatim.

### IFSCA is four instruments, and which ones you read depends on the entity

| # | Instrument | Reference | Issued | Who reads it |
| --- | --- | --- | --- | --- |
| 1 | Guidelines on Cyber Security and Cyber Resilience for Regulated Entities in IFSCs | IFSCA-CSD0MSC/13/2025-DCS | 10 Mar 2025, in force **1 Apr 2025** | **Every** IFSC RE — the baseline |
| 2 | Amendment to those Guidelines | IFSCA-CSD0MSC/1/2026-DCS | 10 Mar 2026, immediate effect | Every IFSC RE — it **substitutes** para 21 and **inserts** para 23 |
| 3 | Guidelines on Cyber Security and Cyber Resilience for **MIIs** in IFSC | IFSCA-CSD/MSC/2/2026-DCS | 20 Apr 2026, in force **1 Apr 2026** | IFSC stock exchanges incl. the bullion exchange, clearing corporations, depositories — **on top of** #1 |
| 4 | Advisory on Heightened Cyber Security Risks arising from Frontier AI Models | IFSCA-CSD/MSC/3/2026-DCS | 4 Jun 2026, immediate effect | Every IFSC RE — it "does not dilute any obligation" under #1–#3 |

**Retrieval note, because it defeats the obvious approach.** The 2026 documents are not at the
`/Document/Legal/*.pdf` path the 2025 Guidelines use and cannot be reached by guessing a URL. Find them
through **Legal › Circular** on ifsca.gov.in — a client-rendered table behind a POST search, so `curl`
on the listing page returns a shell. The document links themselves are
`/CommonDirect/DownloadFile?id=…&fileName=…`, which **does** serve the PDF to `curl` once a session
cookie has been picked up from the listing page; the sibling `/CommonDirect/GetFileView?…` link is a
viewer route and returns the site shell instead.

**The reference-number trap.** Each instrument prints its own form — `CSD0MSC/1/` on the March
amendment, `CSD/MSC/2/` on the April MII Guidelines. The June advisory then cites the March one back as
`IFSCA-CSD/MSC/1/2026-DCS`, with a slash, so IFSCA's own later document disagrees with the earlier one's
header. Record what the instrument prints on itself, and treat `CSD0MSC` and `CSD/MSC` as
interchangeable when matching.

### The baseline — Guidelines, 10 March 2025

| | |
| --- | --- |
| **Instrument** | Guidelines on Cyber Security and Cyber Resilience for Regulated Entities in IFSCs |
| **Reference** | IFSCA-CSD0MSC/13/2025-DCS |
| **Issued** | 10 March 2025, signed by the General Manager & Chief Information Security Officer |
| **In force** | **1 April 2025** |
| **Statutory basis** | Sections 12 and 13, International Financial Services Centres Authority Act, 2019 |
| **Source** | https://ifsca.gov.in/Document/Legal/guidelines-on-cyber-security-and-cyber-resilience-for-regulated-entities-in-ifscs-1-10032025064412.pdf |

> ### ⚠️ An IFSC licence displaces the mainland regulator
>
> This is the fact the whole section turns on, and it is the one most likely to be missed, because
> nothing about a GIFT City entity's *business* announces it. A banking unit in the IFSC is a bank. It
> is not an RBI-regulated bank for this purpose: it is **licensed, recognised, registered or authorised
> by IFSCA**, and it files here. A GIFT City fund does not take a CSCRF category. A GIFT City insurance
> entity is not on the IRDAI clock.
>
> So the entity question in `incident-notify` is not "bank, NBFC, intermediary or insurer" — it is
> **"where is it licensed?"** first, and the sectoral question second. Getting this wrong produces a
> DAKSH filing under an instrument that does not bind the entity, while the six-hour clock that does
> bind it runs out. **CERT-In still binds it**, as it binds nearly everyone.

**Who it binds.** *"REs shall include any entity which is licensed, recognised, registered or authorised
by IFSCA."* Deliberately wide, and it reaches entity types with no mainland analogue at all. The
Guidelines are applied on a **principle of proportionality**, taking into account the scale and
complexity of operations, the nature of the activity, interconnectedness with the financial ecosystem,
and the corresponding cyber risks — so two REs of different size owe the same obligations at different
depths. Proportionality is not an exemption; the express exemptions — two tiers since March 2026 — are
below.

**The clock — four steps, and the tail is unique in this file.**

| Step | Deadline | From | Goes to |
| --- | --- | --- | --- |
| Report the particulars of the incident | **6 hours** | **Detection** | `cyber-incidents@ifsca.gov.in`, **copied to the CISO, IFSCA** |
| Interim report | **3 days** | Detection | IFSCA |
| **Mitigation measures taken** | **7 days** | Detection | Internal, evidenced to IFSCA |
| Detailed root cause analysis report | **30 days** | Detection | IFSCA |

Para 19, verbatim: *"In case of occurrence of any cyber incident, the REs are required to report the
particulars of the incident to the Authority on cyber-incidents@ifsca.gov.in with a copy to CISO,
IFSCA, not later than six (6) hours from the detection of the incident."*

Para 20, verbatim: *"Additionally, the REs shall submit the interim report within 3 days followed by a
detailed root cause analysis report within 30 days. The REs shall take mitigation measures for the same
within 7 days."*

**Two things about this clock that are true of nothing else in this file.**

1. **It runs from *detection*, not from noticing.** CERT-In, CSCRF and IRDAI all run from "noticing *or
   being brought to notice*". IFSCA does not use that formula. Where both bind — and CERT-In always
   does — a vendor's phone call can start the CERT-In clock before the entity has detected anything,
   so the two are not necessarily running from the same moment. Record both.
2. **Seven days is a deadline on the fix, not on a filing.** No other Indian cyber instrument puts a
   clock on the remediation itself. It changes what the first week looks like: the technical work is
   on a regulatory deadline, not merely on an internal one, and the thirty-day RCA means the incident
   file stays open a month after the notifications stop. Build the timeline for a month, not a day.

### The exemptions — two tiers since 10 March 2026, not one list of four

**This is the position most likely to be got wrong, because the pre-amendment version is the one in
circulation.** The March 2026 amendment (IFSCA-CSD0MSC/1/2026-DCS) **substituted** para 21 and
**inserted** a new para 23. Foreign universities *moved between tiers*; Credit Rating Agencies and
newly incorporated standalone REs became exempt for the first time. The tiers are **not**
interchangeable, because their conditions differ in a way that matters: a para 23 RE exists precisely
because it has **no parent**, so telling one to adopt "the parent's framework and CISO" asks for
something it cannot do by definition.

| | **Para 21 — leans on a parent** | **Para 23 — has no parent** |
| --- | --- | --- |
| Who | a. branch of a regulated Indian or foreign entity · b. RE serving its group entities only, e.g. a GIC · c. RE with fewer than 10 employees | a. foreign university set up in the IFSC · b. newly incorporated standalone RE in the IFSC with no parent organisation · c. **Credit Rating Agency** |
| Conditions during the exempted period | adopt the parent's (or its holding company's) cyber security framework and IS Policy · the **parent's CISO acts as Designated Officer** · that parent is **regulated by a regulator/Government Body** in its home jurisdiction | certify that the RE "has implemented adequate cybersecurity measures **proportionate to its risk exposure**" |
| Annual certification | Designated Officer certifies within **90 days of each financial-year end** | Designated Officer certifies within **90 days of each financial-year end** |
| Annual cyber security audit report to IFSCA | **Yes — new in the 2026 amendment** | No |

**Two changes inside para 22 that a reader of the 2025 text will state wrongly.** The substituted
condition says the parent must be regulated by *"a regulator/ Government Body in its home
jurisdiction"* — **not** a *financial-sector* regulator, as the 2025 text had it. And the 2025
requirement that the parent's framework **include the IFSC RE within its scope** is simply gone. Both
widen the exemption; neither is a paraphrase difference.

**The annual audit report is a live obligation, not a formality.** Para 22(e) — *"The RE shall submit
the annual cyber security audit report to IFSCA"* — is new. An RE that read the 2025 text, concluded it
was exempt and has filed nothing since is behind on it.

**The exemptions expire.** Both tiers run *"for a period of three (3) years from the date of its
issuance"*. In para 21 that plainly means the 2025 Circular, so **10 March 2028**. Para 23 was inserted
by the 2026 amendment and uses the same words, so it *could* be read as running to 10 March 2029; the
natural reading is that "this Circular" is the 2025 one throughout. **The ambiguity is IFSCA's.** State
10 March 2028 and say the para 23 reading is unsettled — an RE relying on a para 23 exemption in 2028
should ask the Authority rather than take either date from us.

**And CERT-In binds an exempt RE anyway.** Para 21 exempts the RE from *these Guidelines*. It has no
effect on the CERT-In Directions, which reach body corporates generally. An exempt GIFT City RE that
suffers a reportable incident still owes CERT-In six hours from noticing.

**Care point:** do not rule on whether an entity is inside an exemption, and in particular do not read
"branch" or "group entities only" loosely — both are drafted narrowly and both are conditional on the
tests above. Put paras 21, 22 and 23 in front of the entity's compliance team and let them determine it
(global rules §7).

---

### The MII layer — Guidelines of 20 April 2026, and the clock is *not* the baseline's

**Confidence: Primary.** IFSCA-CSD/MSC/2/2026-DCS read from the published PDF on 7 September 2026.

**Who reads it.** IFSC stock exchanges **including the bullion exchange**, clearing corporations and
depositories. It sits **on top of** the 2025 baseline rather than replacing it — para 1 recites the
baseline and para 2 says a "more robust, granular and prescriptive" framework is warranted for
institutions that are "systemically critical". So an IFSC MII is reading two instruments, not one.

**The date is the trap.** Para 6: *"These Guidelines shall come into effect from April 01, 2026"* — but
they were **issued on 20 April 2026**, twenty days later. Any account that treats the issue date as the
commencement date is wrong by three weeks in the wrong direction.

**The clock — same four steps, wider trigger, two recipients.**

| Step | Deadline | From | Goes to |
| --- | --- | --- | --- |
| Notify the incident (para 104) | **6 hours** | Noticing / detecting, **or being brought to notice** | **IFSCA and CERT-In**, IFSCA via `cyber-incidents@ifsca.gov.in` |
| Interim report (para 105) | **3 days** | Detection | IFSCA |
| Mitigation measures (para 105) | **7 days** | Detection | Internal, evidenced to IFSCA |
| Root cause analysis (para 105) | **30 days** | Detection | IFSCA |
| **Protected Systems** (para 106) | per NCIIPC | — | **NCIIPC as well**, making three recipients |
| **Quarterly incident report** (para 107) | **15 days** from each quarter end (Jun · Sep · Dec · Mar) | Cadence, not an incident | IFSCA |

Para 104, verbatim: *"Any cyber-attack, cyber security incident, and/ or breach shall be notified to
IFSCA and CERT-In within 6 hours of noticing/ detecting such incidents or being brought to notice about
such incidents."*

**Compare that with the baseline and the difference is operational, not cosmetic.** The baseline runs
from **detection** to **IFSCA alone**; the MII Guidelines add the **brought-to-notice** limb — the same
one CERT-In uses — and name CERT-In in the same breath. For an MII a vendor's phone call starts the
six-hour clock. Do not carry the baseline's narrower trigger onto an MII draft.

**Para 107 is the one nobody puts in an incident plan.** A quarterly report on incidents, breaches and
the mitigations taken, to IFSCA within 15 days of each quarter end — a cadence obligation that outlives
the incident, and the IFSC counterpart of SEBI LODR Reg. 27(2)(ba).

**Beyond the clocks**, and worth knowing because it changes what a pack should claim: annual audit by a
**CERT-In empanelled** IS auditor, report to IFSCA within **120 days** of the financial-year end — note
that this is 120, against the baseline's 90 — with an **MD/CEO declaration** alongside it; a maximum of
three consecutive years per audit firm and a two-year cooling-off; **ISO 27001 within two years of
issuance**, so **20 April 2028**, not two years from the 1 April commencement; **bi-annual VAPT** for
NCIIPC-designated systems; and an **annual Cryptographic Risk Assessment** with express **post-quantum**
readiness, which nothing else in this file asks for.

---

### The frontier-AI advisory — 4 June 2026, and the label understates it

**Confidence: Primary.** IFSCA-CSD/MSC/3/2026-DCS read from the published PDF on 7 September 2026.

It creates **no notification clock**, so it belongs in no incident timeline — it is here because it
changes what "prepared" means for every IFSC RE, and because the covering page misleads. The circular
says REs are *"encouraged to comply"* with Annexure A and *"shall come into force with immediate
effect"*, and it states expressly that it *"does not dilute any obligation"* under the Guidelines it
sits alongside.

**Read the annexure, not the covering page.** Of its eleven items, **six are drafted with *shall***:
presume newly disclosed critical vulnerabilities are exploitable **within hours**; carry frontier AI as
a **defined scenario** in the cyber risk assessment, reviewed periodically and placed **before the
Board — before the Standing Committee on Technology at an MII**; maintain an **SBOM** covering
open-source components; hold a **comprehensive API inventory** with rate-limiting, throttling and a
whitelist of authorised entities; require **critical service providers** to assess frontier-AI risk and
furnish evidence of preparedness; and tune monitoring for **"attack sequences that exceed plausible
human-operated timelines"**. Where AI is used for vulnerability identification or remediation,
AI-generated code **shall** get human oversight and security testing before production.

Phishing-resistant MFA, prioritised patching and minutes-not-hours credential response are the
*encouraged* half. An RE reading only the covering paragraph takes the whole annexure as optional and is
wrong about two-thirds of it.

**Why `incident-notify` cares.** Item 1 compresses the assumed exploit window to hours, which is a
statement about how fast a patch wave becomes an incident. Item 7 puts an evidence duty on **critical
service providers** — the third-party direction in the "one incident, many clocks" checklist below.

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

1. **Fix the trigger time and write it down — both of them.** The moment of *noticing*, in IST, with
   the source (alert, vendor call, researcher email, regulator enquiry), **and** the moment of
   *detection* where they differ. Most clocks here run from noticing; the RBI's and IFSCA's run from
   detection. Record it before anything else — it is the first thing every regulator asks and the
   hardest thing to reconstruct afterwards.
2. **Establish where the entity is licensed, before asking what it does.** A GIFT City entity files
   with **IFSCA** and not with the RBI, SEBI or IRDAI, however mainland its business looks. If the
   answer is IFSCA, go to step 3b and skip 3a entirely; if it is not, go to 3a. Asking this second,
   after "what kind of entity is it", is how a GIFT City banking unit ends up with a DAKSH draft.
3. **a — Add the mainland sectoral filing.** For an RBI-regulated entity this means **identifying
   which of the seven 2026 Directions binds it** — commercial bank 410, SFB 419, Payments Bank 428,
   UCB 437, AIFI 456, NBFC 461, CIC 470 — all six hours from detection, all on DAKSH. For an NBFC,
   also establish the **chapter**, since Base Layer below ₹500 crore carries no DAKSH clause.
   Otherwise: SEBI CSCRF (SEBI-regulated entities), IRDAI (insurers and intermediaries). Ask which;
   never rule.

   **b — Or add the IFSCA filing, which replaces it.** Ask **whether the RE is an MII** before
   anything else, because the two IFSC regimes have different triggers. A non-MII RE: six hours from
   **detection** to `cyber-incidents@ifsca.gov.in`, then 3 days, 7 days and 30 days. An IFSC exchange,
   clearing corporation or depository: six hours from noticing, detecting **or being brought to
   notice**, to **IFSCA and CERT-In**, plus NCIIPC for a Protected System — then the same 3/7/30 tail
   and a quarterly report within 15 days of each quarter end. Test the exemptions on the **current**
   two-tier text: para 21 (branch · group-only GIC · under ten employees) or para 23 (foreign
   university · newly incorporated standalone RE · Credit Rating Agency), never the pre-2026 list of
   four. An exempt RE owes IFSCA nothing on this incident but still owes CERT-In, still certifies
   within 90 days of the financial-year end, and — if it is in para 21 — owes an annual cyber security
   audit report as well.
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
| IRDAI cited the **2023** Guidelines | The **2026** Guidelines (IRDAI/GA&HR/CIR/MISC/51/4/2026, 6 April 2026) replaced them | **Primary** — the circular and the Guidelines inside the Annexure B ZIP were read directly on 13 August 2026. *(This row said Secondary until 18 August 2026, when it was found to have outlived the reading that superseded it — the row below records the same instrument as Primary.)* |
| DPDP treated as a live clock | ⚠️ **Rule 7 and Act s.8 do not commence until 13 May 2027** — there is no DPDP breach clock running today | **Primary** — Rule 1(2)–(4) of G.S.R. 846(E) and the tranches in G.S.R. 843(E) read and quoted |
| IRDAI shown as "6 hours, then 24 hours" | **6 hours only.** The 24-hour step is from the 2023 Guidelines and has no counterpart in the 2026 text | **Primary** — §3.6 quoted from the Guidelines inside the Annexure B ZIP; full-text search returns no 24-hour incident obligation |
| SEBI CSCRF was Secondary, one filing, "from detection" | **Primary**, and it is three filings — 6h to SEBI + CERT-In, 24h to the SEBI portal, plus a 6h leg to exchanges/depositories for brokers and DPs — triggered by *noticing or being brought to notice* | **Primary** — circular SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/113 read directly |
| SEBI LODR said **24 hours** for a cyber incident and **12 hours** for board decisions | **Reversed and corrected: 12 hours** for an incident (limb (ii), emanating from within), **30 minutes** for board decisions. Adds Reg. 27(2)(ba) — cyber incidents in the **quarterly CG report, with no materiality test** — and Reg. 21(4) | **Primary** — Reg. 30(6), 27(2)(ba) and 21(4) read from the consolidated PDF and quoted |

*(The three missing RBI paragraph numbers — 419, 428, 437 — were filled on 13 August 2026 from the
published texts. All seven RBI rows are now Primary and complete.)*

---

## Change note — 18 August 2026

Reviewed against the corresponding registries on bitscore.in, which are maintained from the same
primary sources by a separate verification pass. Four differences were found; all are fixed above.

| What was wrong or missing | What it now says | How it was verified |
| --- | --- | --- |
| **IFSCA / GIFT City was absent entirely.** An IFSC-licensed entity would have been routed to the RBI, SEBI or IRDAI — silently, because the draft looks correct | A full IFSCA section: the displacement rule, the four-step clock (6h from detection · 3d interim · 7d mitigation · 30d RCA), the para-21 exemptions with their para-22 conditions, the 90-day annual certification that survives an exemption, and the exemptions' own 10 March 2028 expiry. *(The exemptions were stated as a single list of four; superseded by the 7 September 2026 note below — the March 2026 amendment had already made them two tiers.)* | **Primary** — IFSCA-CSD0MSC/13/2025-DCS read from the published PDF on 18 August 2026; paras 19, 20, 21 and 22 quoted verbatim |
| *"Every row in this file is now Primary"* — while NCIIPC and the RBI 2023 MD both still read **Secondary**, and the change note still marked IRDAI Secondary after the section itself had been re-verified | The header names the two Secondary sections and says why each is Secondary; the IRDAI change-note row is corrected to Primary | Read against the file's own section headers |
| SFBs, Payments Banks and **UCBs** described as *excluded from 410* | 410's own scope excludes SFBs, Payments Banks and **Local Area Banks**. UCBs are Primary Co-operative Banks and were never inside the definition; LABs were excluded and have **no** instrument in the family | **Primary** — 410's applicability clause |
| The NBFC outsourcing instrument referred to only as *"a parallel 2025 instrument"*, unnamed | Named: **RBI/DOR/2025-26/363**, 28 November 2025, with its scope and its scale-based grading, alongside 171 for commercial banks | **Primary** — RBI Master Directions index |

**Nothing outstanding.** Every sectoral instrument in this file has been read at source; the two
Secondary sections are marked where they sit and say why. What remains is maintenance: instruments are
amended, so re-verify before relying on any row, and treat the verification dates above as the
freshness marker.

**Two facts recorded here are not yet on bitscore.in** — the IFSCA exemptions' three-year expiry
(10 March 2028) and the 90-day annual certification an exempt RE still owes. Both were read from the
Guidelines on 18 August 2026 and should be carried back to `lib/incident-clocks.ts`. *(Both landed on
the site subsequently; the counterpart is current on this point.)*

---

## Change note — 7 September 2026

The IFSCA track in this file was **a year out of date**, and two SEBI circulars of 24 August 2026 were
missing entirely. Every row below was read at source on 7 September 2026, not copied from the
counterpart registry.

| What was wrong or missing | What it now says | How it was verified |
| --- | --- | --- |
| **IFSCA presented as one instrument.** The 2025 Guidelines were the only IFSCA text here | **Four instruments**, with a table saying which entity reads which: the 2025 baseline, the 10 Mar 2026 amendment, the 20 Apr 2026 MII Guidelines and the 4 Jun 2026 frontier-AI advisory | **Primary** — all three 2026 PDFs read from ifsca.gov.in |
| **"The four exemptions — para 21."** Foreign universities listed inside para 21; conditions stated as the 2025 text has them | **Two tiers with different conditions.** Para 21 was substituted and holds three parent-backed categories; a new **para 23** holds foreign universities, newly incorporated standalone REs and **Credit Rating Agencies**, which have no parent and certify proportionality instead. Para 21 now also owes an **annual cyber security audit report** | **Primary** — IFSCA-CSD0MSC/1/2026-DCS, paras 3(i)–(iii) quoted |
| Para 22 stated as requiring a **financial-sector** regulator, and the parent's framework to cover the IFSC RE | The substituted text says *"a regulator/ Government Body"* — not financial-sector — and the scope condition is **gone**. Both widen the exemption | **Primary** — same circular |
| **The MII layer was absent.** An IFSC exchange, clearing corporation or depository would have been drafted on the baseline's narrower trigger and single recipient | A full MII section: six hours on a **brought-to-notice** trigger to **IFSCA *and* CERT-In**, NCIIPC for Protected Systems, the 3/7/30 tail, the **quarterly** para 107 report, and the audit/ISO/PQC obligations. In force **1 Apr 2026, twenty days before issue** | **Primary** — IFSCA-CSD/MSC/2/2026-DCS, paras 6, 104–107, 117–122 quoted |
| The frontier-AI advisory was absent | Recorded as creating no clock, with the **six *shall* items** separated from the encouraged half — the label on the covering page is not the obligation | **Primary** — IFSCA-CSD/MSC/3/2026-DCS, Annexure A read in full |
| **SEBI's FIRE realignment was absent**, and the 24-hour portal step read as a single closing filing | The circular **moved no deadline** — and the 24-hour submission is now **staged**: initial report, intermediate updates, final closure. File once and stop and you have met the clock and missed the obligation. Portal named: `https://siportal.sebi.gov.in` | **Primary** — HO/(449)2026-ITD-5_DIV1/I/19448/2026, paras 2, 4 and 5 quoted |
| **SEBI's IT Resilience Index was absent** | Recorded with an explicit *"this is not an incident clock"*: MIIs alone, AMC Repo Clearing carved out by name, system-driven computation, and the ISF → SOP → Feb 2027 timeline. Also distinguished from the CCI, which it resembles and is not | **Primary** — HO/47/18/11(1)2026-MRD-TPD1/I/19509/2026 read in full |

**Why the drift happened, since it is the useful part.** Three of the five instruments were issued
*before* this file's last verification date and were still missed, because the check was "has anything
changed since August?" rather than "what does the regulator's own index list today?". IFSCA's listing is
a client-rendered POST search that returns nothing to `curl`, so the instruments were invisible to the
method being used. **Re-verification has to enumerate the regulator's index, not diff against the last
reading** — the retrieval note in the IFSCA section records how.

---

© 2026 BitScore Cybertech LLP. "Bitsight" is a registered trademark of Bitsight Technologies, Inc.;
this plugin is an independent integration and is not published by Bitsight. Regulatory references are
indicative, are not legal advice, and must be confirmed against the current published text by the
user's compliance and legal team.

<!-- provenance
mirrors: bitscore.in lib/incident-clocks.ts, lib/regulations.ts
verified: 2026-09-07
next-review: 2026-12-07
-->
