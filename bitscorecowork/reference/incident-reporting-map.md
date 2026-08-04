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

**All entries verified on 4 August 2026.**

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
| RBI Cyber Directions, 2026 (commercial banks) | **6 hours** | Detection | DAKSH, plus CERT-In |
| RBI IT Governance MD, 2023 (incl. NBFCs) | **2–6 hours** | Detection | RBI, plus CERT-In |
| SEBI CSCRF | **6 hours** | Detection | SEBI portal, plus CERT-In |
| SEBI LODR, Reg. 30 (listed entities) | **24 hours** | Occurrence of a *material* event | Stock exchanges |
| IRDAI Cyber Guidelines, 2023 | **6 hours**, then **24 hours** | Noticing | CERT-In copied to IRDAI; then details to IRDAI |
| DPDP Act + Rules — Data Principals | **Without delay** | Becoming aware | Each affected Data Principal |
| DPDP Act + Rules — the Board | **Without delay**, then **72 hours** | Becoming aware | Data Protection Board of India |
| NCIIPC (protected systems) | **6 hours** | Noticing | NCIIPC |

**Care point:** these are not alternatives. A listed private-sector bank holding customer personal
data can owe CERT-In, DAKSH, the stock exchanges and the Data Protection Board on the same incident,
on three different clocks, in three different formats. Work the overlap section below before drafting.

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

## RBI (Commercial Banks — Cybersecurity, Technology: Risk, Resilience and Assurance Framework) Directions, 2026

**Confidence: Primary.** Published text read directly at the RBI source URL.

| | |
| --- | --- |
| **Reference** | RBI/DoS/2026-27/410 |
| **Issued** | 31 July 2026, in force immediately |
| **Source** | https://rbi.org.in/scripts/NotificationUser.aspx?Mode=0&Id=13643 |

**Who it binds.** Commercial banks, **excluding** Small Finance Banks, Payments Banks and Local Area
Banks. State Bank of India is covered. Foreign banks operating in India through branch mode are
covered, with modified "comply or explain" treatment on certain chapters. **Co-operative banks are
not covered.** These Directions repeal the earlier cyber and IT-governance instructions for the banks
they cover.

**The clock.** *"The bank shall report cyber incidents within six hours of detection on DAKSH
platform"* — Chapter V, Section Z.1, paragraph 182. DAKSH is the Reserve Bank's supervisory
monitoring portal at https://daksh.rbi.org.in. Banks should additionally notify **CERT-In**
proactively — the RBI filing does not discharge the CERT-In obligation.

**Follow-up.** Paragraph 181 requires the bank to analyse cyber incidents — "including through
forensic analysis, if necessary" — for severity, impact and root cause. The Directions do not set a
separate deadline for the root-cause report; expect the supervisor to ask, and build the timeline
from the start.

**Care point:** these Directions do **not** absorb outsourcing governance. Vendor oversight for
commercial banks sits in the **RBI (Commercial Banks – Managing Risks in Outsourcing) Directions,
2025** (28 November 2025), which the 2026 cyber Directions expressly preserve and carve around. If
the incident originated at a service provider, the outsourcing instrument's notification and
oversight terms are in play alongside paragraph 182 — see `regulatory-map.md`.

---

## RBI Master Direction on IT Governance, Risk, Controls and Assurance Practices, 2023 — NBFCs and other REs

**Confidence: Secondary.** Position drawn from reliable summaries; confirm against the published
Master Direction before filing.

| | |
| --- | --- |
| **Reference** | RBI/DoS/2023-24/107 |
| **Issued** | 7 November 2023, in force from 1 April 2024 |
| **Source** | https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx |

**Who it binds.** Regulated entities outside the 2026 Directions' scope — including **NBFCs in the
Top, Upper and Middle Layers** under Scale-Based Regulation. **Base Layer NBFCs are outside it.**

**The clock.** Cyber incidents are reportable to the Reserve Bank within the window set by the
applicable RBI cyber-security instructions — commonly stated as **2 to 6 hours** of detection — and
to CERT-In within 6 hours under the 2022 Directions.

**Care point — the most common error in this whole reference.** "RBI requires 2–6 hour reporting for
banks and NBFCs" conflates two instruments that no longer travel together. A commercial bank files
under the **2026 Directions** to **DAKSH**. An NBFC files under the **2023 Master Direction**, and
only if it is in the Top, Upper or Middle Layer. Small Finance Banks, Payments Banks, Local Area
Banks and co-operative banks are somewhere else again. **Establish the entity type first**, and if
the user is unsure, say which instrument you have drafted against, label the assumption at the top of
the draft, and route it to their compliance team. Never rule on applicability yourself.

---

## SEBI Cybersecurity and Cyber Resilience Framework (CSCRF)

**Confidence: Secondary.** Confirm the current portal, format and RE-category obligations against
SEBI's published circulars.

| | |
| --- | --- |
| **Instrument** | Cybersecurity and Cyber Resilience Framework for SEBI Regulated Entities |
| **Issued** | August 2024 |
| **Source** | https://www.sebi.gov.in |

**Who it binds.** SEBI-regulated entities — market infrastructure institutions (stock exchanges,
depositories, clearing corporations), brokers, mutual funds and other intermediaries. Obligations are
graded by RE category (MIIs, Qualified REs, mid-size, small-size, self-certification).

**The clock.** Reportable cyber incidents must reach **SEBI within 6 hours of detection**, via the
SEBI incident reporting channel, **and** CERT-In in parallel. Beyond the initial report, CSCRF carries
a recurring cycle of cyber audits and periodic reporting; a live incident usually also lands in the
next audit and action-taken report.

**Care point:** CSCRF's six hours and CERT-In's six hours are two filings, not one. Neither discharges
the other.

---

## SEBI LODR, Regulation 30 — the parallel obligation that gets missed

**Confidence: Secondary.** Materiality thresholds and the current Schedule III text must be confirmed
by the entity's company secretary and legal team.

| | |
| --- | --- |
| **Instrument** | SEBI (Listing Obligations and Disclosure Requirements) Regulations, 2015, Reg. 30 and Schedule III, Part A |
| **Source** | https://www.sebi.gov.in |

**Who it binds.** Listed entities — regardless of sector. A listed manufacturer with no financial-sector
regulator at all still owes this one.

**The clock.** Material events or information must be disclosed to the stock exchanges **promptly and
not later than 24 hours from the occurrence** of the event. Materiality is determined by Key
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

**Confidence: Rule text read via a secondary host; the Act is primary. Confirm the Rules against the
Gazette notification.**

| | |
| --- | --- |
| **Instruments** | Digital Personal Data Protection Act, 2023; Digital Personal Data Protection Rules (Rule 7 — Intimation of Personal Data Breach) |
| **Source** | https://www.meity.gov.in |

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

## IRDAI Information and Cyber Security Guidelines, 2023

**Confidence: Secondary.** Confirm the prescribed format and current reporting channel with IRDAI.

| | |
| --- | --- |
| **Instrument** | IRDAI Information and Cyber Security Guidelines, 2023 |
| **Source** | https://irdai.gov.in/document-detail?documentId=3314780 |

**Who it binds.** IRDAI-regulated entities — insurers, reinsurers and intermediaries.

**The clock, in two steps.** Report to **CERT-In within 6 hours** of noticing, **with a copy to
IRDAI** and other concerned regulators. Then submit the available details of the incident to the
Authority in the prescribed format **within 24 hours of intimation**.

**Standing obligations** mirror CERT-In's: logs maintained and monitored for a rolling **180 days**,
and system clocks synchronised to NIC or NPL NTP servers.

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
3. **Add the sectoral filing.** One of: DAKSH (commercial banks), RBI (NBFCs in Top/Upper/Middle
   Layers), SEBI CSCRF (SEBI-regulated entities), IRDAI (insurers). Ask which; never rule.
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

© 2026 BitScore Cybertech LLP. "Bitsight" is a registered trademark of Bitsight Technologies, Inc.;
this plugin is an independent integration and is not published by Bitsight. Regulatory references are
indicative, are not legal advice, and must be confirmed against the current published text by the
user's compliance and legal team.
