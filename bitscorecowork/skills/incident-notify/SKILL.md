---
name: incident-notify
description: >
  Draft the time-bound regulatory notifications an Indian entity owes after a
  cyber incident — CERT-In's 6-hour report, RBI reporting for banks and NBFCs,
  SEBI CSCRF and LODR disclosure, IRDAI, and DPDP breach intimation to the Data
  Protection Board and to affected Data Principals. Use when the user says "we've
  had an incident", "draft our CERT-In report", "what do we have to report and by
  when", "breach notification", "DPDP breach intimation", or needs the fact-gathering
  checklist, escalation matrix and notification drafts (as opposed to a simulated
  exercise, which is `tabletop`).
metadata:
  version: "0.4.2"
---

# incident-notify — time-bound Indian regulatory notifications after an incident

Work out which notification clocks are running, gather the facts each one needs, and draft the
filings — so the six-hour deadline is met with a defensible document rather than missed while someone
finds the template.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication-first, never persist the token, the shared error handling, no discrimination, India
context — §7 in particular).

The instrument reference is [`../../reference/incident-reporting-map.md`](../../reference/incident-reporting-map.md).
**Read it before drafting anything**, including its opening caveats and the per-instrument confidence
markers, which apply to every clock you quote.

## Say this before you start

**Three things, plainly, in the first response:**

**The clocks run from noticing, not from confirming.** Six hours starts when the incident was noticed
or someone brought it to notice — a vendor call, a researcher's email, a regulator's enquiry. "We are
still investigating" does not pause it. This is the most common and most expensive failure.

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

2. **Fix the trigger time. Do this first and write it down.** The moment the incident was noticed, in
   IST, and how — own alerting, a vendor, a researcher, a customer, a regulator. Every clock is
   measured from something and most are measured from this. It is the first thing every regulator
   asks and the hardest fact to reconstruct afterwards. If it is uncertain, record the range and the
   basis, and say which end you are working the clocks from.

3. **Establish the entity, because it decides which instruments are in play.** Ask; never rule
   (global rules §7):
   - **Entity type** — commercial bank, Small Finance / Payments / Local Area Bank, co-operative bank,
     NBFC (and which Scale-Based Regulation layer), SEBI-regulated intermediary or MII, insurer or
     insurance intermediary, or none of these.
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
   the recipient, the deadline expressed as **a wall-clock time in IST** derived from the trigger time
   (not "6 hours" — "by 14:30 IST today"), the channel, the format, and who inside the organisation
   owns the filing. Put it at the top of everything you produce. A CISO at hour four needs the
   deadline, not the citation.

   Mark each row's confidence from the reference — **Primary** where the published text was read,
   **Secondary** where it rests on summaries — and tell the user to confirm the Secondary rows before
   filing.

5. **Run the fact-gathering checklist.** What each notification needs, and what is still unknown:
   - **Timeline** — noticed, believed started, contained, resolved. In IST, with sources.
   - **What was affected** — systems, applications, data categories, and whether personal data of Data
     Principals is involved. **Categories and counts, never values.**
   - **Scale** — records, individuals, customers, geographies. Ranges where the number is not yet firm.
   - **Nature** — mapped to the CERT-In Annexure I categories in the reference. Present the list and
     let the user determine which apply.
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
   - **DPDP** — ⚠️ **do not draft these as live filings.** Rule 7 and Act s.8 commence **13 May 2027**.
     If the user wants them, produce them clearly marked as **preparatory, not yet in force**: the
     intimation to each affected Data Principal (concise, clear, plain, with the consequences, the
     mitigation and a contact who can answer them) and the two-stage Board notification. Say plainly
     that no DPDP clock is running on this incident, and that the CERT-In and sectoral filings are
     the live ones.

   Every draft carries: the trigger time, what is known, what is under investigation, and a named
   contact. Mark each one **DRAFT — NOT FILED**.

8. **Produce the incident timeline log** — a running record of what was known when, and what was
   filed when, in IST. It becomes the spine of the root-cause report, the supervisory response and any
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
- **Never determine materiality** for a SEBI LODR disclosure. That is the authorised KMP's call on
  advice, and it carries consequences in both directions.
- **Nothing is filed or sent from here.** Every draft is marked `DRAFT — NOT FILED` and handed to a
  named accountable officer.
- **Never invent a fact to complete a draft.** An unknown marked *under investigation* is correct and
  expected; a plausible-sounding record count in a regulatory filing is not recoverable.
- **Apply DPDP minimisation to the drafts themselves.** Categories and counts of affected records —
  never credential values, account numbers, or named individuals in a document that will circulate.
- **Quote no clock you have not checked against the reference**, and pass through its confidence
  marker. A wrong deadline in an incident is worse than no deadline, because it will be relied on.
- Do not speculate about attribution of the attack, or name a suspected actor, in a regulatory draft.
  State observed facts.

## Error handling

Follow the shared table in the global rules: 401 → re-prompt and stop; **403 → the token is valid but the endpoint isn't in this subscription: carry on without it and name the gap** (never re-prompt for a token); 404 → re-confirm the
GUID; 429 → back off and retry; empty result → say so plainly. In this skill, treat any Bitsight
failure as **non-blocking** — the notifications are the deliverable and they do not depend on it.
Note what could not be corroborated, and carry on with the drafts.
