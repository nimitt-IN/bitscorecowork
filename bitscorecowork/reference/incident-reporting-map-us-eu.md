# Incident-reporting instruments — US and EU clocks (source-cited)

Working reference for the **`incident-notify`** skill when the entity reports in the **United States**
or the **European Union**. The Indian clocks are in
[`incident-reporting-map.md`](incident-reporting-map.md); an entity with operations in more than one
jurisdiction reads both.

> ## Read this before drafting anything
>
> This is a **drafting aid, not legal advice, and not a determination that any instrument applies.**
>
> - **Applicability is entity-specific and belongs to the user's compliance and legal team.** Ask.
>   Never rule. (Global rules §7.)
> - **Half of these clocks do not run from the incident.** GDPR, NIS2, the Cyber Resilience Act, HIPAA
>   and the FTC run from *becoming aware* or *discovery*. The SEC, NYDFS and the US bank rule run from a
>   **determination the entity makes**. DORA runs from **classification**, capped by awareness. A table
>   of durations read without its triggers is a queue that is not one.
> - **A determination is a clock event.** None of these regimes lets the decision wait: the SEC requires
>   the materiality determination "without unreasonable delay after discovery", and DORA caps
>   classification at 24 hours from awareness. Timestamp every decision, with who made it and why.
> - **Verify every citation against the published text before a notification is filed.**
> - Nothing here certifies compliance, and no draft produced from it has been filed or sent.

**Verified on 25 September 2026.** Every row is **Primary**: read from the issuing body's own text on
EUR-Lex, sec.gov, dfs.ny.gov, the eCFR and cisa.gov. Two things are deliberately **not** covered, and the
skill must say so rather than imply otherwise: **US state breach-notification laws** (every state has
one, with its own thresholds and windows) and **Member State additions to NIS2** (a directive, so the
recipient and channel come from national transposing law).

---

## The clocks at a glance

| Instrument | Who it binds | First deadline | Runs from | Goes to |
| --- | --- | --- | --- | --- |
| SEC Form 8-K, Item 1.05 | SEC registrants | **4 business days** | **determining** the incident is material | SEC, via EDGAR — public |
| SEC Form 6-K | Foreign private issuers | **promptly** | the home-country disclosure | SEC, via EDGAR |
| NYDFS, 23 NYCRR 500.17(a) | NYDFS-regulated entities | **72 hours** | **determining** a cybersecurity incident occurred | NYDFS Superintendent |
| NYDFS, 23 NYCRR 500.17(c) | NYDFS-regulated entities | **24 hours**, then **30 days** | making an **extortion payment** | NYDFS Superintendent |
| Computer-Security Incident Notification Rule | US banking organisations | **36 hours** | **determining** a notification incident occurred | OCC, Federal Reserve or FDIC |
| Same rule, service-provider limb | Bank service providers | **as soon as possible** | determining covered services were disrupted ≥ 4 hours | each affected bank's designated contact |
| HIPAA Breach Notification Rule | Covered entities | **60 calendar days** at the outside | **discovery** | individuals; HHS; media over 500 in a State |
| HIPAA, business-associate limb | Business associates | **60 calendar days** at the outside | **discovery** | the covered entity |
| FTC Safeguards Rule, 16 CFR 314.4(j) | Non-bank financial institutions (FTC) | **30 days** | **discovery** | FTC |
| CIRCIA | Covered critical-infrastructure entities | 72 hours — **not in force** | reasonable belief the incident occurred | CISA |
| NIS2, Article 23 | EU essential and important entities | **24 h** early warning · **72 h** notification · **1 month** final | **becoming aware** of a significant incident | national CSIRT or competent authority |
| DORA, RTS 2025/301 Art. 5 | EU financial entities | **4 h** from classification, **never later than 24 h** from awareness | **classification** as major | competent authority |
| GDPR, Article 33 | Controllers | **72 hours**, where feasible | **becoming aware** | supervisory authority |
| GDPR, Article 33(2) | Processors | without undue delay | becoming aware | the controller |
| Cyber Resilience Act, Article 14 | Manufacturers of products with digital elements | **24 h** early warning · **72 h** notification | **becoming aware** | coordinating CSIRT and ENISA, via the single reporting platform |

---

## United States

### SEC — Form 8-K, Item 1.05 (domestic registrants)

- **Clock.** General Instruction B.1: "A report pursuant to Item 1.05 is to be filed within four
  business days after the registrant determines that it has experienced a material cybersecurity
  incident." An event on a Saturday, Sunday or holiday on which the Commission is closed starts the
  count on, and includes, the next business day. Count in **New York**; the SEC is closed on US federal
  holidays.
- **The determination cannot wait.** Instruction 1: the materiality determination "must be made without
  unreasonable delay after discovery of the incident."
- **Content.** The material aspects of the nature, scope and timing of the incident, and its material
  impact or reasonably likely material impact, including on financial condition and results of
  operations (Item 1.05(a)). Not required: specific technical information about the planned response or
  systems (Instruction 4).
- **Amendment.** Where required information is not determined or unavailable at filing, say so, then file
  an 8-K/A within four business days after it is determined or becomes available (Instruction 2).
- **Delay.** Only where the US Attorney General determines disclosure poses a substantial risk to
  national security or public safety and notifies the Commission in writing: up to 30 days, a further
  30, and in extraordinary circumstances a final 60 (Item 1.05(c)).
- **Never determine materiality.** It is the registrant's determination on advice.
- **Source.** Form 8-K — https://www.sec.gov/files/form8-k.pdf · **Primary**

### SEC — Form 6-K (foreign private issuers)

- A foreign private issuer does not file Item 1.05. Form 6-K General Instruction B requires it to furnish
  what it makes public under home-country law, files with an exchange that makes it public, or
  distributes to security holders — the listed topics include a **material cybersecurity incident** —
  "promptly after the material contained in the report is made public".
- **So the home clock sets the American one.** An Indian issuer's SEBI LODR disclosure at twelve hours
  is what pulls the 6-K; see [`incident-reporting-map.md`](incident-reporting-map.md).
- **Source.** Form 6-K — https://www.sec.gov/files/form6-k.pdf · **Primary**

### NYDFS — 23 NYCRR Part 500

- **500.17(a)(1).** Notify the Superintendent "as promptly as possible but in no event later than 72
  hours after determining that a cybersecurity incident has occurred at the covered entity, its
  affiliates, or a third-party service provider", electronically in the form on the DFS website.
- **500.17(a)(2).** A continuing duty to update with material changes or new information.
- **Definition (500.1).** A *cybersecurity incident* is a cybersecurity event at the entity, an
  affiliate or a third-party service provider that requires notice to a government or supervisory
  body, has a reasonable likelihood of materially harming a material part of normal operations, **or
  results in the deployment of ransomware within a material part of its information systems**.
- **500.17(c).** After an extortion payment: notice **within 24 hours** of paying, and **within 30
  days** a written description of why payment was necessary, the alternatives considered, and the
  diligence performed, including sanctions (OFAC) compliance.
- **Source.** 23 NYCRR Part 500, as amended 1 November 2023 —
  https://www.dfs.ny.gov/system/files/documents/2023/12/rf23_nycrr_part_500_amend02_20231101.pdf ·
  **Primary**

### US banking organisations — Computer-Security Incident Notification Rule

- **Clock.** The primary federal regulator must receive notice "as soon as possible and no later than
  36 hours after the banking organization determines that a notification incident has occurred".
  Identical text in 12 CFR 53.3 (OCC), 225.302 (Federal Reserve) and 304.23 (FDIC).
- **Notification incident.** A computer-security incident that has materially disrupted or degraded —
  or is reasonably likely to — the ability to carry out banking operations, a business line whose failure
  would result in material loss, or operations whose failure would threaten US financial stability.
- **Service-provider limb** (53.4 · 225.303 · 304.24). A bank service provider notifies at least one
  bank-designated point of contact at each affected bank "as soon as possible" when it determines an
  incident has disrupted, or is reasonably likely to disrupt, covered services **for four or more
  hours**. That notice is what starts the bank's own analysis.
- **Source.** https://www.ecfr.gov/current/title-12/chapter-I/part-53 (and parts 225, 304) · **Primary**

### HIPAA — Breach Notification Rule (45 CFR Part 164, Subpart D)

- **Individuals (164.404).** "Without unreasonable delay and in no case later than 60 calendar days
  after discovery." Sixty is the outer limit, not the target.
- **Discovery (164.404(a)(2)).** The first day the breach is known — **or, by exercising reasonable
  diligence, would have been known**.
- **HHS (164.408).** For 500 or more individuals, contemporaneously with the individual notices. Below
  500, log and report within 60 days of the end of the calendar year.
- **Media (164.406).** More than 500 residents of a State or jurisdiction: prominent media there, same
  60-day limit.
- **Business associates (164.410).** Notify the covered entity within the same outer limit.
- **Source.** https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-D ·
  **Primary**

### FTC — Safeguards Rule, 16 CFR 314.4(j)

- **Clock.** "As soon as possible, and no later than 30 days after discovery", where the notification
  event involves the information of **at least 500 consumers**.
- **Discovery.** When the event is known to the institution, including to any employee, officer or
  other agent (other than the person committing it).
- **Notification event (314.2).** Acquisition of **unencrypted** customer information without
  authorisation; information counts as unencrypted if the key was accessed. Unauthorised access is
  presumed to be acquisition absent reliable evidence to the contrary.
- **Source.** https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-314 · **Primary**

### CIRCIA — not in force

- CISA's factsheet: CIRCIA requires CISA to issue regulations requiring covered entities to report
  covered cyber incidents "within 72 hours from the time the entity reasonably believes the incident
  occurred". CISA's CIRCIA page: "Until the effective date of the final rule, organizations are not
  required to submit covered cyber incident or ransom payment reports under CIRCIA."
- **Never put a CIRCIA deadline in the matrix as though one were running.** The ransom-payment timing
  was not confirmed from a primary source and is not stated here.
- **Source.** https://www.cisa.gov/topics/cyber-threats-and-advisories/information-sharing/cyber-incident-reporting-critical-infrastructure-act-2022-circia ·
  **Primary** (status)

---

## European Union

### NIS2 — Directive (EU) 2022/2555, Article 23

- **Significant incident (23(3)).** One that has caused or is capable of causing severe operational
  disruption or financial loss to the entity, or considerable material or non-material damage to others.
- **Stages (23(4)).**
  - **(a)** early warning **within 24 hours** of becoming aware — saying whether it is suspected to be
    unlawful or malicious, or could have a cross-border impact;
  - **(b)** incident notification **within 72 hours** of becoming aware — an initial assessment of
    severity and impact, and indicators of compromise where available;
  - **(c)** an intermediate report on request;
  - **(d)** a final report **within one month of the 72-hour notification** — detailed description,
    root cause or threat type, mitigation, cross-border impact;
  - **(e)** if still ongoing at that point, a progress report, and the final report within a month of
    handling the incident.
- **Trust service providers** notify within 24 hours in place of (b).
- **Recipients of services** are notified "where appropriate" of significant incidents likely to affect
  them (23(1)).
- **It is a directive.** The authority, the channel and any national additions come from the Member
  State's transposing law. Ask which Member State.
- **Displaced for financial entities.** Article 4 and Recital 28: DORA is the sector-specific act for
  financial entities, and its major-incident reporting applies **instead of** Article 23.
- **Source.** https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2555 · **Primary**

### DORA — Regulation (EU) 2022/2554 and Delegated Regulation (EU) 2025/301

- **Initial notification (RTS Art. 5(1)(a)).** "As early as possible, but in any case, within four hours
  from the classification of the ICT-related incident as a major ICT-related incident and no later than
  24 hours from the moment the financial entity has become aware". **Both limbs bind** — classify at
  hour 22 and two hours remain.
- **Late classification (Art. 5(2)).** Classified as major only after 24 hours: within four hours of the
  classification.
- **Intermediate report (5(1)(b)).** Within **72 hours of submitting the initial notification**, "even
  where the status or the handling of the incident have not changed"; updated when regular activities are
  recovered.
- **Final report (5(1)(c)).** Within **one month** of the latest intermediate report.
- **Late filings (5(3)).** Inform the authority, with reasons, no later than the missed deadline.
- **Weekend relief (5(4)–(6)).** A deadline on a weekend or bank holiday in the entity's Member State may
  be met by noon of the next working day — **except** the initial and intermediate reports of credit
  institutions, central counterparties, operators of trading venues and entities identified as essential
  or important under NIS2, and any entity its competent authority excludes.
- **Sources.** DORA — https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022R2554 ·
  RTS 2025/301 — https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R0301 · **Primary**

### GDPR — Regulation (EU) 2016/679, Articles 33 and 34

- **Controller to authority (33(1)).** "Without undue delay and, where feasible, not later than 72 hours
  after having become aware", unless the breach is unlikely to result in a risk to people's rights and
  freedoms. A later notification carries the reasons for the delay.
- **Processor to controller (33(2)).** Without undue delay after becoming aware. The controller's 72
  hours generally runs from that notice.
- **Phased detail (33(4)).** Information not available at once may follow in phases.
- **Documentation (33(5)).** Every breach is documented, reportable or not.
- **Data subjects (34(1)).** Without undue delay where the breach is likely to result in a **high** risk.
- **Source.** https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679 · **Primary**

### Cyber Resilience Act — Regulation (EU) 2024/2847, Article 14

- **Applies from 11 September 2026** (most other obligations from 11 December 2027).
- **Actively exploited vulnerability, or severe incident, affecting the product:** early warning **24
  hours** from becoming aware; notification **72 hours** from becoming aware; final report **14 days after
  a corrective or mitigating measure is available** (vulnerability) or **one month after the 72-hour
  notification** (incident).
- **Goes to** the CSIRT designated as coordinator and ENISA, through ENISA's single reporting platform.
- **Source.** https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R2847 · **Primary** (as
  carried on bitscore.in's CRA article, verified at source)

---

## One incident, many clocks — working order

1. **Fix the moment of awareness**, with its time zone and its source. Five of these regimes run from it.
2. **Start the determinations at once** — SEC materiality, NYDFS cybersecurity incident, bank
   notification incident, DORA major classification. Separate questions, often separate owners. Log when
   each is answered.
3. **Resolve DORA before NIS2** for a financial entity. Filing both duplicates effort; filing only NIS2
   misses the tighter clock.
4. **Check the third-party direction.** A bank service provider's notice starts its customers' analysis;
   a HIPAA business associate's starts the covered entity's; a GDPR processor's starts the controller's.
5. **Decide on any extortion payment with the NYDFS clock in view.**
6. **Name what is not covered** — US state breach laws, Member State NIS2 additions — in every matrix.

---

<!-- provenance
mirrors: bitscore.in lib/incident-clocks-us-eu.ts
verified: 2026-09-25
next-review: 2026-12-25
-->
