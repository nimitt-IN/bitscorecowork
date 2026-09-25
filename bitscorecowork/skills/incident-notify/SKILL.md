---
name: incident-notify
description: >
  Draft the time-bound regulatory notifications an entity owes after a cyber
  incident, in India, the US and the EU — CERT-In's 6-hour report, RBI, SEBI CSCRF
  and LODR, IRDAI, IFSCA and DPDP in India; SEC Form 8-K/6-K, NYDFS Part 500, the
  US bank 36-hour rule, HIPAA and the FTC Safeguards Rule in the US; NIS2, DORA,
  GDPR and the Cyber Resilience Act in the EU. Use when the user says "we've had an
  incident", "draft our CERT-In report", "what do we have to report and by when",
  "breach notification", "8-K cyber disclosure", "DORA major incident", "NIS2 early
  warning", "GDPR 72 hours", "GIFT City incident reporting", or needs the fact-gathering checklist,
  escalation matrix and notification drafts (as opposed to a simulated exercise,
  which is `tabletop`).
model: opus
effort: high
metadata:
  version: "0.7.0"
---

# incident-notify — time-bound regulatory notifications after an incident (India, US, EU)

Work out which notification clocks are running, gather the facts each one needs, and draft the
filings — so the first deadline is met with a defensible document rather than missed while someone
finds the template.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication-first, never persist the token, the shared error handling, no discrimination, India
context — §7 in particular).

The instrument references are [`../../reference/incident-reporting-map.md`](../../reference/incident-reporting-map.md)
for India and [`../../reference/incident-reporting-map-us-eu.md`](../../reference/incident-reporting-map-us-eu.md)
for the US and the EU. **Read the one for each jurisdiction in play before drafting anything**,
including the opening caveats and the per-instrument confidence markers, which apply to every clock you
quote.

## Say this before you start

**Three things, plainly, in the first response:**

**The clocks run from noticing, not from confirming.** In India, six hours starts when the incident was
noticed or someone brought it to notice — a vendor call, a researcher's email, a regulator's enquiry.
GDPR, NIS2, HIPAA and the FTC also run from awareness or discovery. "We are still investigating" pauses
none of them. This is the most common and most expensive failure.

**And some clocks run from a decision.** The SEC, NYDFS and the US bank rule run from determining the
incident is material, has occurred, or is a notification incident; DORA runs from classifying it as
major, capped at 24 hours from awareness. None of those decisions may wait. Name who makes each one and
timestamp it.

**Bitsight contributes very little here, and this skill is mostly not about Bitsight.** It can confirm
whether an affected host sits in the observed footprint, and whether findings or alerts preceded the
incident. Every fact a notification actually turns on — what happened, when, what was accessed, how
many records — comes from the entity's own logs and forensics.

**Nothing here is filed, sent, or legally advised.** These are drafts for the accountable officer and
the legal team. Whether an incident is reportable, and which instruments apply, are the entity's
determinations to make.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if
   not authenticated, ask the user to paste their Bitsight API token and call `bitsight_set_token`
   (never echo it back). Proceed only once a token is set. (See global rules §1.)
   **If the user is mid-incident and doesn't want to stop for a token, skip it and carry on** — most
   of this skill needs no Bitsight data at all. Say what will be missing and move to step 2. An
   incident response is not the moment to block on a credential.

2. **Fix the trigger time. Do this first and write it down.** The moment the incident was noticed —
   in IST for Indian clocks, and in UTC plus the entity's local time where US or EU clocks run — and how:
   own alerting, a vendor, a researcher, a customer, a regulator. For US and EU regimes, also record each
   **determination** as it is made (materiality, cybersecurity incident, notification incident, major
   classification) with its time, owner and basis. Every clock is
   measured from something and most are measured from this. It is the first thing every regulator
   asks and the hardest fact to reconstruct afterwards. If it is uncertain, record the range and the
   basis, and say which end you are working the clocks from.

3. **Establish the jurisdictions first, then the entity.** Ask which apply — India, the US, the EU, or
   several — because an entity with operations or customers in more than one reads more than one
   reference. For the **US and EU**, ask (never rule; global rules §7):
   - **SEC status** — registrant (Form 8-K, Item 1.05) or foreign private issuer (Form 6-K, driven by the
     home disclosure).
   - **NYDFS-regulated?** · **A US banking organisation, or a service provider to one?** · **HIPAA
     covered entity or business associate?** · **A non-bank financial institution under the FTC
     Safeguards Rule?** · **Critical infrastructure?** (CIRCIA — not yet in force; say so.)
   - **An EU financial entity under DORA?** Ask this **before** NIS2: for a financial entity DORA's
     reporting applies instead of NIS2 Article 23. If DORA applies, ask whether it is a credit
     institution, CCP, trading venue or NIS2 essential/important entity — those get **no weekend
     relief** on the initial and intermediate reports.
   - **An NIS2 essential or important entity, and in which Member State?** The recipient and channel
     come from national transposing law.
   - **GDPR controller or processor** for the affected data? · **A manufacturer of a product with digital
     elements** sold in the EU (Cyber Resilience Act, Article 14, from 11 September 2026)?
   - **Whose personal data, resident where?** US state breach laws follow residency. This skill does
     **not** resolve them — say so in the matrix.

   **For India**, establish the entity, because it decides which instruments are in play. Ask; never
   rule (global rules §7):
   - **Where is it licensed? Ask this first, before what it does.** If the entity is licensed,
     recognised, registered or authorised by **IFSCA** — that is, it is a **GIFT City / IFSC** entity —
     it files with **IFSCA and not with the RBI, SEBI or IRDAI**. An IFSC licence displaces the
     mainland regulator, however mainland the business looks: a GIFT City banking unit is not on the
     DAKSH clock and a GIFT City fund does not take a CSCRF category. Asking this second, after "what
     kind of entity is it", is exactly how a GIFT City banking unit answers "bank" and receives a
     draft filed under an instrument that does not bind it. **CERT-In binds it either way.**
   - **Entity type** — commercial bank, Small Finance / Payments / Local Area Bank, co-operative bank,
     NBFC (and which Scale-Based Regulation layer), SEBI-regulated intermediary or MII, insurer or
     insurance intermediary, IFSCA-regulated IFSC entity, or none of these.
   - **If IFSCA — ask whether it is an MII before anything else.** An IFSC **stock exchange
     (including the bullion exchange), clearing corporation or depository** reads the MII Guidelines of
     20 April 2026 **on top of** the 2025 baseline, and its clock is not the baseline's: six hours on a
     **noticing / detecting / brought-to-notice** trigger, to **IFSCA *and* CERT-In**, plus NCIIPC if a
     Protected System is affected. Every other IFSC RE runs the baseline: six hours from **detection**,
     to IFSCA. Carrying the baseline's narrower trigger onto an MII draft starts the clock late.
   - **If IFSCA — test the exemptions on the current two-tier text.** The March 2026 amendment
     substituted para 21 and inserted para 23; the pre-2026 "four exemptions at para 21" is wrong about
     the count, the paragraph and the conditions. **Para 21** — branch of a regulated Indian or foreign
     entity · RE serving **group entities only** (e.g. a GIC) · RE with **fewer than 10 employees** —
     leans on a parent: it adopts the parent's framework and IS Policy, the **parent's CISO acts as
     Designated Officer**, that parent is regulated by *"a regulator/ Government Body"* in its home
     jurisdiction (**not** necessarily a financial-sector one), and it owes an **annual cyber security
     audit report** to IFSCA. **Para 23** — foreign university · newly incorporated standalone RE with
     **no parent** · **Credit Rating Agency** — has no parent to lean on and instead certifies measures
     *"proportionate to its risk exposure"*. Never tell a para 23 entity to adopt its parent's
     framework; by definition it has none. Either way an exempt RE owes IFSCA nothing on this incident
     but still owes **CERT-In**, and still certifies within **90 days of the financial-year end**. Put
     paras 21, 22 and 23 in front of their compliance team; do not determine the exemption yourself.
   - **Listed?** — SEBI LODR Regulation 30 reaches every listed entity regardless of sector, and it is
     the obligation most often forgotten in the first six hours.
   - **Personal data in scope?** — DPDP is the only track that reaches individuals, but **its breach
     obligations do not commence until 13 May 2027** (Rule 7 and Act s.8; see the reference). Ask
     anyway — it shapes containment, evidence handling and customer communications now, and the
     entity may have contractual or policy commitments of its own. Just don't put a DPDP deadline in
     the matrix as though one were running.
   - **Any declared protected system affected?** — protected-system status is a notified fact. Ask;
     do not infer it from sector or size.
   - **Did it originate at a service provider, or is the entity itself the provider?** — either way,
     someone else's contractual notification clock is running.

4. **Build the escalation matrix.** From the instrument reference, one row per applicable instrument:
   the recipient, the deadline expressed as **a wall-clock time** derived from its own trigger (not "6
   hours" — "by 14:30 IST today"; not "4 business days" — "by end of Thursday 8 October, New York"),
   what starts that clock, the channel, the format, and who inside the organisation owns the filing.
   Indian clocks in IST; US and EU clocks in the entity's local time with UTC alongside. Count SEC
   business days in New York, skipping US federal holidays. Rows whose trigger is a decision not yet
   made say so rather than inventing a time. Put it at the top of everything you produce. A CISO at hour four needs the
   deadline, not the citation.

   Mark each row's confidence from the reference — **Primary** where the published text was read,
   **Secondary** where it rests on summaries — and tell the user to confirm the Secondary rows before
   filing.

5. **Run the fact-gathering checklist.** What each notification needs, and what is still unknown:
   - **Timeline** — noticed, believed started, contained, resolved, and each reportability decision.
     With time zone and sources.
   - **What was affected** — systems, applications, data categories, and whether personal data of Data
     Principals is involved. **Categories and counts, never values.**
   - **Scale** — records, individuals, customers, geographies. Ranges where the number is not yet firm.
   - **Nature** — for India, mapped to the CERT-In Annexure I categories in the reference. Present the
     list and let the user determine which apply.
   - **Current status** — contained or live, and what is running.
   - **Actions taken** — containment, mitigation, preservation of logs and evidence.
   - **Third parties** — vendors involved, and whether they have notified or been notified.
   - **Who is accountable** for each filing, by name and role.

   **Mark every unknown explicitly as *under investigation*.** Drafting cannot wait for complete
   facts — at hour four they never are. A filing with stated unknowns and a commitment to update is
   normal practice; a late filing is a compliance failure.

6. **Pull whatever Bitsight can corroborate** — briefly, and only if a token is set and it is
   relevant:
   - `bitsight_get_company_details` and `bitsight_get_findings` to confirm whether an affected host or
     domain is in the observed footprint, and whether findings on that vector preceded the incident.
     Useful for the root-cause narrative regulators ask for.
   - `bitsight_get_alerts` around the incident window for any externally observed change.
   - For a **third-party** incident, `bitsight_get_company_details` on the vendor for the posture and
     trend before it — evidence about the diligence performed, not about the breach.
   - If attribution of the affected asset is itself contested, `entity-scope` is the skill for that.

   **Never present Bitsight data as incident facts.** It is externally observed, on its own refresh
   cadence, and it cannot tell you what happened inside.

7. **Draft each notification** to its own instrument's requirements — they are not variations of one
   document. Follow the reference for what each must contain, and in particular:
   - **CERT-In** — the Annexure I category, the 6-hour clock, the technical facts, and the logs the
     directions require to accompany it.
   - **RBI** — DAKSH within six hours, under **the instrument for that entity class** (one of seven;
     see the reference). Name which instrument you drafted against and label the assumption if
     applicability was not confirmed.
   - **SEBI CSCRF** — three filings, not one: six hours to `mkt_incidents@sebi.gov.in` **and**
     CERT-In, details to the SEBI Incident Reporting Portal within 24 hours, and for stock brokers and
     depository participants a further six-hour leg to the exchanges/depositories.
   - **LODR Reg. 30** if listed — separate from CSCRF, different audience, different standard, written
     for the market. **A cyber incident is limb (ii) — twelve hours, not the twenty-four everyone
     quotes** — because it emanates from within the listed entity. On a twelve-hour clock this can
     fall due *before* some of the technical filings, so put it in the matrix early.
   - **LODR Reg. 27(2)(ba)** if listed — cyber incidents, breaches and data loss go into the
     **quarterly corporate governance report**, with **no materiality test**. An incident correctly
     judged immaterial for Reg. 30 can still be reportable here. It outlives the incident: put it on
     the post-incident checklist, and say so even though it is not a first-day clock.
   - **IRDAI** — six hours to CERT-In with a copy to IRDAI. **There is no 24-hour step in the 2026
     Guidelines**; do not carry one over from the 2023 text.
   - **IFSCA** if the entity is licensed in the IFSC — **and this replaces the RBI, SEBI or IRDAI
     filing rather than adding to it.** Four steps: particulars to `cyber-incidents@ifsca.gov.in` with
     a copy to the CISO, IFSCA within **6 hours**; interim report at **3 days**; **mitigation measures
     taken within 7 days**; detailed root cause analysis at **30 days**. The seven-day step is a
     deadline on the *fix*, not on a filing — no other Indian instrument here puts a clock on
     remediation — so say so plainly, because it changes what the first week is for. The matrix runs a
     month, not a day.
     - **Baseline RE:** all four measured from **detection**, to IFSCA.
     - **IFSC MII** (exchange incl. bullion, clearing corporation, depository): the first filing runs
       from **noticing, detecting or being brought to notice** and goes to **IFSCA *and* CERT-In** —
       and **NCIIPC** too where the affected system is a declared Protected System. Add the
       **quarterly** report to IFSCA within 15 days of each quarter end to the post-incident checklist;
       it is the IFSC counterpart of LODR Reg. 27(2)(ba) and it outlives the incident.
   - **SEC Form 8-K, Item 1.05** — four business days from the materiality determination. The material
     aspects of nature, scope and timing, and the material or reasonably likely material impact. Not
     specific technical detail of the response. State what is not yet determined and plan the 8-K/A.
     **Never draft the materiality conclusion** — draft the disclosure for the determination the
     registrant has made. A foreign private issuer furnishes on **Form 6-K** promptly after its home
     disclosure instead.
   - **NYDFS 500.17** — 72 hours from determining a cybersecurity incident occurred, including at an
     affiliate or third-party service provider; electronic, on the DFS form. If an extortion payment is
     made: notice within 24 hours, and the written explanation, alternatives considered and sanctions
     diligence within 30 days.
   - **US bank rule** — 36 hours from determining a notification incident, to the primary federal
     regulator. A **bank service provider** notifies each affected bank's designated contact as soon as
     possible when covered services are disrupted for four hours or more.
   - **HIPAA** — without unreasonable delay, 60 days at the outside, from discovery (including when it
     would have been known with reasonable diligence). Individuals; HHS; media above 500 residents of a
     State. A business associate notifies the covered entity.
   - **FTC Safeguards** — 30 days from discovery where unencrypted information of 500 or more consumers
     was acquired without authorisation.
   - **NIS2 Article 23** — early warning within 24 hours of becoming aware of a significant incident;
     notification within 72 hours; final report one month after the notification. **Not for a DORA
     financial entity.**
   - **DORA** — initial notification four hours from classification as major, **never later than 24 hours
     from awareness**; intermediate report 72 hours after the initial one, even if nothing has changed;
     final report one month after the latest intermediate report. Apply the weekend rule only where it
     is available to this entity.
   - **GDPR** — controller to the supervisory authority within 72 hours of awareness where feasible,
     with reasons if later, detail in phases if needed; data subjects without undue delay where the risk
     is high. A processor notifies the controller without undue delay.
   - **Cyber Resilience Act** — early warning at 24 hours and notification at 72 hours of becoming aware
     of an actively exploited vulnerability or severe incident in the product, to the coordinating CSIRT
     and ENISA through the single reporting platform.
   - **CIRCIA** — not in force. Never put it in the matrix as a running clock.
   - **DPDP** — ⚠️ **do not draft these as live filings.** Rule 7 and Act s.8 commence **13 May 2027**.
     If the user wants them, produce them clearly marked as **preparatory, not yet in force**: the
     intimation to each affected Data Principal (concise, clear, plain, with the consequences, the
     mitigation and a contact who can answer them) and the two-stage Board notification. Say plainly
     that no DPDP clock is running on this incident, and that the CERT-In and sectoral filings are
     the live ones.

   Every draft carries: the trigger time, what is known, what is under investigation, and a named
   contact. Mark each one **DRAFT — NOT FILED**.

8. **Produce the incident timeline log** — a running record of what was known when, and what was
   filed when, with time zones. It becomes the spine of the root-cause report, the supervisory response and any
   subsequent inspection. Start it now rather than reconstructing it later.

9. **Offer the output format:** Markdown by default so it can be edited fast under time pressure;
   `.docx` via the `docx` skill for filings going into the incident file. Save to the user's working
   folder and present them. Date and time-stamp everything.

10. **Offer next steps:** `tabletop` once the incident is closed — the exercise that would have made
    this easier is worth running afterwards — `entity-scope` if attribution of the affected asset is
    disputed, or `vendor-brief` if a third party caused it and the relationship needs reassessing.

## Guardrails

- **Never determine that an incident is reportable, or that an instrument applies.** Present the
  categories, the entity questions and the clocks; the determination belongs to the entity and its
  legal team. This is the single most important line in this skill.
- **Never assume the sector implies the regulator.** A GIFT City entity is licensed by IFSCA and files
  there, not with the RBI, SEBI or IRDAI. Establish where the entity is licensed before you establish
  what it does — this is the one routing error in this skill that produces a draft which looks
  entirely correct and is filed with the wrong authority.
- **Never determine materiality** for a SEBI LODR disclosure or an SEC Form 8-K. That is the
  authorised KMP's, or the registrant's, call on advice, and it carries consequences in both
  directions. The same goes for NYDFS, the US bank rule's notification-incident test and DORA's major
  classification: surface the test, name who decides, timestamp the decision.
- **Say what is not covered.** US state breach-notification laws and Member State additions to NIS2
  are outside the references. Every US or EU matrix names them as open items rather than implying
  completeness.
- **Nothing is filed or sent from here.** Every draft is marked `DRAFT — NOT FILED` and handed to a
  named accountable officer.
- **Never invent a fact to complete a draft.** An unknown marked *under investigation* is correct and
  expected; a plausible-sounding record count in a regulatory filing is not recoverable.
- **Apply data minimisation (DPDP, GDPR) to the drafts themselves.** Categories and counts of affected records —
  never credential values, account numbers, or named individuals in a document that will circulate.
- **Quote no clock you have not checked against the reference**, and pass through its confidence
  marker. A wrong deadline in an incident is worse than no deadline, because it will be relied on.
- Do not speculate about attribution of the attack, or name a suspected actor, in a regulatory draft.
  State observed facts.

## Error handling

Follow the shared table in the global rules: 401 → re-prompt and stop; **403 → the token is valid but the endpoint isn't in this subscription: carry on without it and name the gap** (never re-prompt for a token); 404 → re-confirm the
GUID; 429 → the server has already retried with backoff; name the data that is missing rather than truncating silently; empty result → say so plainly. In this skill, treat any Bitsight
failure as **non-blocking** — the notifications are the deliverable and they do not depend on it.
Note what could not be corroborated, and carry on with the drafts.
