# SEBI CSCRF — entity categorisation and what each category owes

Working reference for **`regmap`**, and for the CSCRF steps in **`incident-notify`** and
**`assurance-pack`**. It answers one question the framework itself makes surprisingly hard: *which
category is this entity in, and therefore which obligations bind it?*

> ## Read this before categorising anything
>
> **Do not determine a category from the August 2024 circular alone.** The categorisation criteria
> have been **replaced twice since** — in April 2025 and again in August 2025 — and the replacements
> did not adjust numbers, they replaced whole tests. Two entity types were re-categorised in **both**
> rounds. Every table below is stated at its current version and names the circular it came from.
>
> - **Applicability and categorisation are the RE's determination**, made with its compliance team.
>   This reference puts the current criteria in front of them; it does not rule. (Global rules §7.)
> - **Verify against the published circular before anything goes into a filing.** Each entry carries
>   the circular short name and the clause or table it was read from.
> - **A firm can be correctly categorised and still be working to a superseded threshold table.** That
>   is the specific failure mode this file exists to prevent, and it does not look like an error from
>   the inside.

---

## The categories

Highest obligation to lowest. Where an RE holds more than one SEBI registration, **the highest
category attaching to any of them applies** — stated in CSCRF v1.0 (clause 23 of the thresholds
section) and repeated in the April 2025 clarification (clause 4).

| Category | Who is in it |
| --- | --- |
| **MII** | Stock exchanges, clearing corporations and depositories — and Qualified RTAs, treated at par |
| **Qualified RE** | The largest non-MII entities, plus KRAs |
| **Mid-size RE** | |
| **Small-size RE** | |
| **Self-certification RE** | The lightest category that still carries obligations |
| **Exempt** | Outside CSCRF compliance, or excluded from submission |

**The category is fixed once a year, not continuously.** Verbatim from the framework:

> *"The category of REs shall be decided at the beginning of the financial year based on the data of the previous financial year. Once the category of RE is decided, RE shall remain in the same category throughout the financial year irrespective of any changes in the parameters during the financial year."*

So an entity that crosses a threshold in October does not change category until the following April.
It also means a categorisation carried out today is answering a question about **last** financial
year's numbers.

---

## The circulars

| Circular | Reference | Issued | What it did |
| --- | --- | --- | --- |
| **CSCRF v1.0** | SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/113 | 20 Aug 2024 | The framework, and the original thresholds |
| Clarifications | SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2024/184 | 31 Dec 2024 | First round of queries answered |
| **First extension** | SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2025/45 | 28 Mar 2025 | Timelines to 30 June 2025 — **except MIIs, KRAs and QRTAs** |
| **April 2025 clarification** | SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2025/60 | 30 Apr 2025 | **Replaced the categorisation criteria** for brokers, DPs, IAs, RAs, KRAs, AIFs/VCFs and PMs |
| **Second extension** | SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2025/96 | 30 Jun 2025 | Timelines to **31 Aug 2025** — again **except MIIs, KRAs and QRTAs** |
| **August 2025 technical clarification** | SEBI/HO/ITD-1/ITD_CSC_EXT/P/CIR/2025/119 | 28 Aug 2025 | **Replaced the criteria again** for Portfolio Managers and Merchant Bankers |

SEBI's own FAQ, 11 June 2025: https://www.sebi.gov.in/sebi_data/faqfiles/jun-2025/1749647139924.pdf

> **The deadline everyone quotes has a carve-out everyone forgets.** "CSCRF was due 31 August 2025" is
> true only for the REs the two extensions covered. **MIIs, KRAs and QRTAs were excluded from both**,
> so their original deadline never moved. Never tell one of those three that it had until August 2025.

---

## Categorisation, entity by entity

Each table is at its **current** version. Where an earlier version is still widely quoted, the entry
says so — that is where the mistakes come from.

### Stock exchange, clearing corporation or depository (MII)

**Category: MII** — stated outright for the class, with no threshold to compute.

Market Infrastructure Institutions sit in their own category and carry the framework in full. MIIs were also excluded from both compliance extensions, so their original deadline never moved.

*Source: CSCRF v1.0 — Thresholds for REs’ categorization.*

### Stock broker

**Criterion — Number of total registered clients**

| Band | Category |
| --- | --- |
| **Below** 1,000 | **Exempt** *(from clause 2.1.2 — see the gap note below)* |
| More than 1,000 and up to 10,000 | Self-certification RE |
| More than 10,000 and up to 1 lakh | Small-size RE |
| More than 1 lakh and up to 10 lakhs | Mid-size RE |
| More than 10 lakhs | **Qualified RE** |

**Criterion — Clientele trading volume in a year**

| Band | Category |
| --- | --- |
| **Below** ₹1,000 crore | **Exempt** *(from clause 2.1.2 — see the gap note below)* |
| More than ₹1,000 crore and up to ₹10,000 crore | Self-certification RE |
| More than ₹10,000 crore and up to ₹1,00,000 crore | Small-size RE |
| More than ₹1,00,000 crore and up to ₹10,00,000 crore | Mid-size RE |
| More than ₹10,00,000 crore | **Qualified RE** |

> **The two criteria are applied independently and the higher result wins.** An entity that is small on one axis and large on the other takes the larger category. Applying only the more convenient parameter understates the obligation.

Qualified Stock Brokers designated under the February 2023 QSB circular are Qualified REs regardless of either parameter.

**Carve-out.** Clause 2.1.2, verbatim: *"Stock Brokers with less than 1,000 crores clientele trading
volume (in a year) and less than 1,000 total registered clients are exempted from CSCRF."* Both limbs
must be satisfied.

> ⚠️ **Exactly 1,000 is categorised by neither limb, on either parameter — and that is SEBI's drafting,
> not a close question.** Table 1's lowest band begins at *"More than 1,000"*; clause 2.1.2's exemption
> reaches only *"less than 1,000"*. A broker at exactly 1,000 registered clients, or exactly ₹1,000
> crore of clientele trading volume, falls in the gap between them. The August 2025 technical
> clarification does not close it — it does not touch stock broker categorisation at all.
>
> **Say so rather than resolving it**, and in particular do not round down into Exempt. That fails in
> the direction of *less* obligation, which is the expensive direction: it tells a broker it is outside
> CSCRF on a reading clause 2.1.2 does not support. Answer from the other parameter if that one is
> unambiguous and gives a category — the higher-of-two rule still applies — and otherwise return no
> category and put the two clauses in front of the RE's compliance team.

> ⚠️ **Superseded version still in circulation.** CSCRF v1.0 categorised brokers on active UCC client base and distinguished client-based from proprietary brokers. April 2025 replaced that table outright and the proprietary/client-based split no longer exists.

*Source: April 2025 clarification — clause 2.1.*

### Depository Participant

**Category: derived from another registration** — it cannot be computed from a number, so a follow-up question is always required.

A DP that is also registered as a stock broker is categorised on the stock broker criteria. A DP registered as anything other than a stock broker is a Qualified RE. Where a DP holds several registrations, the highest categorisation applies.

**Carve-out.** DPs with fewer than 100 clients are exempt from the requirement to employ SOC services or onboard to the Market SOC — an exemption from the SOC obligation only, not from CSCRF.

> ⚠️ **Superseded version still in circulation.** CSCRF v1.0 categorised DPs as institutional (Qualified) or non-institutional (Mid-size). April 2025 replaced that test.

*Source: April 2025 clarification — clause 2.2.*

### Portfolio Manager

**Criterion — Assets under management**

| Band | Category |
| --- | --- |
| ₹3,000 crore and below | Self-certification RE |
| More than ₹3,000 crore and less than ₹10,000 crore | Small-size RE |
| ₹10,000 crore and above | Mid-size RE |

No Portfolio Manager is a Qualified RE — the top band is Mid-size.

**Carve-out.** A Portfolio Manager in the self-certification band with fewer than 100 clients is exempt from the mandatory Market SOC requirement.

> ⚠️ **Superseded version still in circulation.** Re-categorised twice. CSCRF v1.0 set four bands from ₹1,000 crore; April 2025 collapsed them to two either side of ₹3,000 crore; August 2025 replaced that with the three bands above. Both earlier tables are still widely quoted.

*Source: August 2025 technical clarification — Part C, clause 7.1.*

### Merchant Banker

**Category: Small-size RE** — stated outright for the class, with no threshold to compute.

Every active Merchant Banker — one that has undertaken any merchant banking activity in the relevant period — is a Small-size RE. Category no longer depends on issue-management activity or on being part of a conglomerate.

**Carve-out.** Inactive Merchant Bankers, meaning those that have undertaken no merchant banking activity in the relevant review period, are exempt from CSCRF.

> ⚠️ **Superseded version still in circulation.** Re-categorised twice. CSCRF v1.0 made conglomerate/SIFI-linked MBs Qualified REs and issue-management MBs Mid-size; April 2025 dropped the conglomerate limb; August 2025 dropped the activity limb as well.

*Source: August 2025 technical clarification — Part C, clause 7.2.*

### Manager of an AIF or Venture Capital Fund

**Criterion — Sum of corpus of all AIFs, VCFs and their schemes managed by the manager**

| Band | Category |
| --- | --- |
| ₹3,000 crore and below | Self-certification RE |
| More than ₹3,000 crore and less than ₹10,000 crore | Small-size RE |
| ₹10,000 crore and above | Mid-size RE |

Categorisation is at manager level, not fund level, and AIFs and VCFs are assessed together. Where one manager runs both, the VCF scheme corpus counts towards the same threshold. No AIF or VCF manager is a Qualified RE.

**Carve-out.** A manager in the self-certification band with a client base of fewer than 100 is exempt from the mandatory Market SOC requirement.

> ⚠️ **Superseded version still in circulation.** CSCRF v1.0 categorised each AIF on its own AUM and each VCF on its own scheme corpus, in two separate tables. April 2025 clubbed them and moved the assessment to manager level.

*Source: April 2025 clarification — clause 2.7.*

### Mutual Fund or Asset Management Company

**Criterion — Assets under management**

| Band | Category |
| --- | --- |
| Less than ₹10,000 crore | Small-size RE |
| ₹10,000 crore and above but less than ₹1 lakh crore | Mid-size RE |
| ₹1 lakh crore and above | **Qualified RE** |

*Source: CSCRF v1.0 — Table 10.*

### Custodian

**Criterion — Assets under custody**

| Band | Category |
| --- | --- |
| Less than ₹1 lakh crore | Small-size RE |
| ₹1 lakh crore and above but less than ₹10 lakh crore | Mid-size RE |
| ₹10 lakh crore and above | **Qualified RE** |

*Source: CSCRF v1.0 — Table 5.*

### Registrar to an Issue and Share Transfer Agent

**Criterion — Number of folios serviced**

| Band | Category |
| --- | --- |
| Fewer than 10,000 folios | **Exempt** |
| 10,000 and above but less than 1 crore | Small-size RE |
| 1 crore and above but less than 2 crore | Mid-size RE |
| 2 crore and above — a Qualified RTA | **MII** |

No RTA is a Qualified RE: the table runs Small-size, Mid-size, then straight to MII. Qualified RTAs are treated at par with MIIs, and like MIIs they were excluded from both compliance extensions.

**Carve-out.** RTAs servicing fewer than 10,000 folios are excluded from CSCRF compliance altogether. RTAs with fewer than 100 clients are exempt from the SOC and Market SOC requirement only.

*Source: CSCRF v1.0 — Table 12.*

### KYC Registration Agency

**Category: Qualified RE** — stated outright for the class, with no threshold to compute.

KRAs were excluded from both compliance extensions, so their original deadline never moved.

> ⚠️ **Superseded version still in circulation.** CSCRF v1.0 treated KRAs at par with MIIs. April 2025 re-categorised them as Qualified REs.

*Source: April 2025 clarification — clause 2.5.*

### Investment Adviser

**Category: derived from another registration** — it cannot be computed from a number, so a follow-up question is always required.

An Investment Adviser registered with SEBI in another capacity takes the highest of the categories attaching to those other registrations. The reporting authority for CSCRF compliance is BSE Ltd for five years from 25 July 2024.

**Carve-out.** Investment Advisers not registered with SEBI in any other capacity are exempt from CSCRF.

> ⚠️ **Superseded version still in circulation.** CSCRF v1.0 excluded individual IAs and made non-individual IAs Small-size REs. April 2025 replaced that with the other-registration test.

*Source: April 2025 clarification — clause 2.3.*

### Research Analyst

**Category: derived from another registration** — it cannot be computed from a number, so a follow-up question is always required.

A Research Analyst registered with SEBI in another capacity takes the highest of the categories attaching to those other registrations. The reporting authority for CSCRF compliance is BSE Ltd for five years from 25 July 2024.

**Carve-out.** Research Analysts not registered with SEBI in any other capacity are exempt from CSCRF.

*Source: April 2025 clarification — clause 2.4.*

### Designated Depository Participant

**Category: derived from another registration** — it cannot be computed from a number, so a follow-up question is always required.

A DDP holds both DP and Custodian registrations, and takes the higher of the two categorisations.

*Source: CSCRF v1.0 — clause 9 of the thresholds section.*

### Debenture Trustee

**Category: Self-certification RE** — stated outright for the class, with no threshold to compute.

**Carve-out.** A Debenture Trustee that has added no new issuer of listed debt securities as a client in the last three financial years is excluded from CSCRF compliance.

*Source: CSCRF v1.0 — clause 7 of the thresholds section.*

### Credit Rating Agency

**Category: Self-certification RE** — stated outright for the class, with no threshold to compute.

*Source: CSCRF v1.0 — clause 5 of the thresholds section.*

### Collective Investment Scheme

**Category: Self-certification RE** — stated outright for the class, with no threshold to compute.

*Source: CSCRF v1.0 — clause 4 of the thresholds section.*

### Banker to an Issue or Self-Certified Syndicate Bank

**Category: Exempt** — stated outright for the class, with no threshold to compute.

Bankers to an Issue and SCSBs do not take a CSCRF category. They submit a certificate of compliance to SEBI against the RBI cybersecurity guidelines instead, and where the bank is listed, that certificate also goes to the stock exchanges.

*Source: CSCRF v1.0 — clause 2 of the thresholds section.*

### FPI, FVCI, LPCC, QDP, REIT, InvIT or Vault Manager

**Category: Exempt** — stated outright for the class, with no threshold to compute.

Foreign Portfolio Investors, Foreign Venture Capital Investors, Limited Purpose Clearing Corporations, Qualified Depository Participants, REITs, InvITs and Vault Managers are each excluded from submission of compliance with CSCRF.

*Source: CSCRF v1.0 — clauses 10, 11, 14, 18, 19 and 21 of the thresholds section.*

---

## What each category actually owes

The categorisation is not the deliverable — it is the question you have to answer before you can say
which obligations bind. These are the graded ones most often asked about.

| Obligation | Binds | Detail |
| --- | --- | --- |
| **Cyber Capability Index** | MII, Qualified RE | MIIs conduct a third-party assessment of their cyber resilience using the CCI half-yearly. Qualified REs self-assess yearly. The two carry different evidential weight — a third-party assessment and a self-report are not interchangeable. |
| **ISO 27001 certification** | MII, Qualified RE | ISO/IEC 27001 certification is mandatory for MIIs and Qualified REs. |
| **Cyber risk management framework** | MII, Qualified RE, Mid-size RE | A documented framework for identifying, analysing, evaluating, prioritising, responding to and monitoring cyber risks on a continuous basis. |
| **IT Committee including an external cyber security expert** | MII, Qualified RE, Mid-size RE | An IT Committee that mandatorily includes at least one external independent expert on cyber security matters. For Small-size and Self-certification REs a committee is desirable but not mandatory; in its absence, CSCRF compliance is reviewed and approved by the MD, CEO, a Board member, the partners or the proprietor. |
| **Red teaming exercise** | MII, Qualified RE | Red teaming is conducted as part of the cyber security framework. |
| **SOC functional efficacy measurement** | MII, Qualified RE | MIIs and Qualified REs measure the functional efficacy of their SOC half-yearly. Every other RE obtains it yearly from the SOC service provider it uses. |
| **Market SOC onboarding** | Small-size RE, Self-certification RE | Small-size and Self-certification REs are mandated to onboard to the Market SOC operated by BSE and NSE. Several narrow carve-outs apply below 100 clients — see the entity note. |
| **Dedicated Hardware Security Module** | MII, Qualified RE | A dedicated HSM is mandatory for MIIs and Qualified REs. Mid-size, Small-size and Self-certification REs may implement an alternative based on a risk assessment approved by the Board, partners or proprietor. |

*Sources: CSCRF v1.0 Executive Summary and the April 2025 clarification, clause 5 (HSM).*

**This is not the whole framework.** CSCRF runs to five functions and a long annexure set; the rows
above are the ones whose *applicability turns on the category*, which is what this file is for. For
anything else, read the circular.

---

## What Bitsight can and cannot contribute here

**It cannot categorise an entity.** Nothing in a security rating establishes AUM, client count,
folios serviced or trading volume. Those come from the entity's own records, and the categorisation
is its determination.

**What it can do** is evidence the externally observable part of the obligations the category pulls
in — the attack-surface half of Protect and Detect, and continuous third-party review as an activity
in its own right. Map that through [`regulatory-map.md`](regulatory-map.md), and say plainly that
the category itself came from the user.

---

© 2026 BitScore Cybertech LLP. "Bitsight" is a registered trademark of Bitsight Technologies, Inc.;
this plugin is an independent integration and is not published by Bitsight. Regulatory references are
indicative, are not legal advice, and must be confirmed against the current published text by the
user's compliance and legal team.

<!-- provenance
mirrors: bitscore.in lib/cscrf-categories.ts (verified 2026-08-14), lib/regulations.ts
verified: 2026-09-07
next-review: 2026-12-07
-->
