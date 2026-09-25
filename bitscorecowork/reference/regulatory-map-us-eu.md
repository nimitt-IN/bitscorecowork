# Regulatory map — US and EU scope and obligation areas (source-cited)

Working reference for **`regmap`** when the pack is built against a **US or EU** regime, and for any
skill asked "which of these applies to us?". The NIST CSF 2.0 / ISO 27001 columns and the Indian
regimes are in [`regulatory-map.md`](regulatory-map.md); read that file's opening caveats too — they
apply here unchanged.

> ## Read this before mapping anything
>
> - **Scope is the user's determination, not yours.** The scope notes below say what the text reaches,
>   so the right questions get asked. They are not a ruling that an instrument binds anyone. (Global
>   rules §7.)
> - **Incorporation is not the test.** GDPR follows the people whose data is processed; NIS2 follows the
>   services provided in the EU; US state laws follow residency. A company incorporated in India can
>   carry obligations in all three.
> - **Obligation areas here are indicative.** Mapping a risk vector to a NIS2 measure or a DORA chapter
>   says the evidence *speaks to* that area. It never says the area is met. The banned words in `regmap`
>   apply.
> - **Chapter or article level only.** Do not invent sub-paragraph references. Where the text below
>   quotes a letter or subsection, it was read at source; anything finer must be read off the published
>   text by the user's compliance team.

**Verified on 25 September 2026** against EUR-Lex (GDPR, NIS2, DORA, Commission Recommendation
2003/361/EC), sec.gov, dfs.ny.gov, the eCFR and occ.gov. Every row is **Primary**.

---

## Scope — who each instrument reaches

### European Union

| Instrument | Reaches | Source |
| --- | --- | --- |
| **GDPR**, Art. 3 | (1) processing in the context of an EU establishment, wherever it happens; (2) a non-EU controller or processor whose processing relates to **offering goods or services** to people in the EU, paid or not, or **monitoring their behaviour** there | [2016/679](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679) |
| **NIS2**, Art. 2(1) | Entities of a type in **Annex I or II** that are at least **medium-sized** (or exceed the medium-sized ceilings) and provide services or carry out activities in the EU | [2022/2555](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2555) |
| **NIS2**, Art. 2(2) | Regardless of size: public electronic communications, trust service providers, TLD registries and DNS providers, sole providers of an essential service, and entities whose disruption would have significant public-safety, security, health or systemic impact, among others | same |
| **DORA**, Art. 2(1)–(2) | "Financial entities": credit institutions; payment and e-money institutions; account information service providers; investment firms; crypto-asset service providers and issuers of asset-referenced tokens; CSDs; CCPs; trading venues; trade repositories; AIF managers; management companies; data reporting service providers; insurance and reinsurance undertakings; insurance intermediaries; IORPs; credit rating agencies; administrators of critical benchmarks; crowdfunding providers; securitisation repositories. Point (u) also names **ICT third-party service providers** | [2022/2554](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022R2554) |
| **DORA**, Art. 2(3) | Excludes, among others, insurance intermediaries that are micro, small or medium-sized, and IORPs with 15 members or fewer | same |
| **Cyber Resilience Act** | Manufacturers of products with digital elements made available on the EU market; Art. 14 reporting from **11 Sep 2026**, most other obligations from **11 Dec 2027** | [2024/2847](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R2847) |

**NIS2 sectors.** Annex I (high criticality): energy · transport · banking · financial market
infrastructures · health · drinking water · waste water · digital infrastructure · ICT service management
(business-to-business) · public administration · space. Annex II (other critical): postal and courier ·
waste management · chemicals · food · manufacturing · digital providers · research.

**Essential or important (Art. 3).** An **Annex I** entity **above** the medium-sized ceilings is
**essential** (3(1)(a)), as are qualified trust service providers, TLD registries and DNS providers
regardless of size, and entities a Member State identifies. Every other in-scope entity is **important**
(3(2)). Member States keep the list; ask the user which one they are on.

**Size (Recommendation 2003/361/EC, Annex Art. 2).** Medium: fewer than 250 staff, and turnover up to
€50m and/or balance sheet up to €43m. Small: fewer than 50 staff, and turnover and/or balance sheet up to
€10m. Counted with partner and linked enterprises. NIS2 disapplies Art. 3(4) of that Annex.

**DORA displaces NIS2 for financial entities.** NIS2 Recital 28 names DORA as the sector-specific act
for financial entities; its ICT risk management, incident reporting, testing, information-sharing and
third-party provisions apply **instead of** NIS2's (Art. 4). A bank is mapped to DORA, not to NIS2 Art. 21.

### United States

| Instrument | Reaches | Source |
| --- | --- | --- |
| **SEC Form 8-K, Item 1.05** | SEC registrants — material cybersecurity incidents | [Form 8-K](https://www.sec.gov/files/form8-k.pdf) |
| **SEC Regulation S-K, Item 106** | SEC registrants — annual disclosure of cyber risk management, strategy and governance | [17 CFR 229.106](https://www.ecfr.gov/current/title-17/chapter-II/part-229/subpart-229.100/section-229.106) |
| **SEC Form 6-K** | Foreign private issuers — furnishes what is made public at home | [Form 6-K](https://www.sec.gov/files/form6-k.pdf) |
| **NYDFS, 23 NYCRR Part 500** | Entities licensed or regulated by the New York Department of Financial Services | [Part 500](https://www.dfs.ny.gov/system/files/documents/2023/12/rf23_nycrr_part_500_amend02_20231101.pdf) |
| **Computer-Security Incident Notification Rule** | US banking organisations (OCC, Fed, FDIC) and their bank service providers | [12 CFR 53](https://www.ecfr.gov/current/title-12/chapter-I/part-53) |
| **Interagency Guidance on Third-Party Relationships** | US banks — OCC, Federal Reserve, FDIC, 6 June 2023 | [OCC Bulletin 2023-17](https://www.occ.gov/news-issuances/bulletins/2023/bulletin-2023-17.html) |
| **FTC Safeguards Rule** | Non-bank financial institutions under FTC jurisdiction | [16 CFR 314](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-314) |
| **HIPAA** | Covered entities and business associates | [45 CFR 164](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164) |
| **State breach-notification laws** | Anyone holding personal information of a state's residents | Not resolved here — say so |

---

## Obligation areas a ratings pack speaks to

### NIS2 — Article 21(2) risk-management measures

Article 21(2) lists ten measures, (a) to (j). Bitsight evidences the external surface of some of them:

| Risk vector | NIS2 Art. 21(2) measure it speaks to |
| --- | --- |
| Critical Vulnerability Management | (e) security in acquisition, development and maintenance, **including vulnerability handling** |
| Server Software · Desktop / Mobile Software · Insecure Systems | (e) maintenance; (g) basic cyber hygiene |
| Web Application Headers · Mobile Application Security | (e) acquisition, development and maintenance |
| TLS/SSL Certificates · TLS/SSL Configurations | (h) cryptography and, where appropriate, encryption |
| Open Ports | (i) access control policies and asset management |
| DNSSEC | (g) basic cyber hygiene |
| Exposed Credentials | (i) access control; (j) multi-factor authentication |
| File Sharing | (g) basic cyber hygiene and training |
| Botnet Infections · Malware Servers · Spam Propagation · Unsolicited Communications · Potentially Exploited | (b) incident handling |
| Domain Squatting | (a) risk analysis |
| Security Incidents (public disclosure) | (b) incident handling |
| **Portfolio monitoring of suppliers** | **(d) supply chain security**, including the security of relationships with each direct supplier and service provider |

Measures (c) business continuity and (f) effectiveness assessment are **not evidenced** by external data;
say so.

### DORA — by chapter

| Evidence | DORA chapter |
| --- | --- |
| Diligence and User Behavior vectors | **Chapter II — ICT risk management** |
| Compromised Systems vectors; public Security Incidents | **Chapter III — ICT-related incident management, classification and reporting** (context only — a rating change is never itself a major ICT-related incident) |
| Portfolio monitoring of ICT providers; pre-contract posture checks; dated vendor history | **Chapter V — Managing of ICT third-party risk.** Art. 28 keeps the entity "fully responsible"; requires due diligence and a concentration assessment before contracting (28(4)); termination rights for "circumstances identified throughout the monitoring of ICT third-party risk" (28(7)(b)); exit strategies for critical or important functions (28(8)) |
| — | Chapter IV (testing) and Chapter VI (information sharing): **not evidenced** |

### NYDFS — Part 500

| Evidence | Section |
| --- | --- |
| Portfolio monitoring of third-party service providers | **500.11(a)** — identification and risk assessment, minimum practices, due diligence, and **periodic assessment** based on risk and continued adequacy |
| Exposed Credentials | 500.12 — multi-factor authentication (external evidence of exposure only; enforcement is internal) |
| TLS/SSL vectors | 500.15 — encryption of nonpublic information in transit (external surface only) |

### SEC — Regulation S-K, Item 106

| Evidence | Paragraph |
| --- | --- |
| Continuous rating history; findings workflow | 106(b)(1) — processes for assessing, identifying and managing material cyber risk |
| Portfolio monitoring | **106(b)(1)(iii)** — whether processes exist to oversee and identify cyber risk from **third-party service providers** |
| Rating and trend in board materials | 106(c)(1) — the board's oversight, and the processes by which it is informed (evidence of information flow, not of oversight quality) |

**Never map a rating movement to Item 1.05.** Bitsight does not observe incidents, and materiality is the
registrant's determination.

### US banks — Interagency guidance

Portfolio monitoring and pre-contract posture checks speak to **ongoing monitoring** and **due diligence**
across the third-party relationship life cycle. Map at guidance level; the guidance is principles-based
and "commensurate with the bank's risk profile and complexity".

---

<!-- provenance
mirrors: bitscore.in lib/tools/global-regulation-finder.ts
verified: 2026-09-25
next-review: 2026-12-25
-->
