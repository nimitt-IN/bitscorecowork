---
name: credential-exposure
description: >
  Report which companies in the Bitsight portfolio, the user's own organisation
  included, have accounts or email addresses in known credential leaks: which
  breach, when, what data types, how many records, and what is new since the last
  review. Turns it into actions (resets, MFA, phishing watch, vendor questions) and
  flags when it may have become an incident. Use when the user asks "are our
  credentials in any breaches", "which vendors have leaked credentials", "exposed
  credentials report", "new leaks since last month", or names a breach in the news
  and asks who is affected.
metadata:
  version: "0.8.0"
---

# credential-exposure: leaked accounts, triaged into action

Leaked credentials are among the commonest ways in, and they sit outside the rating's usual
remediation story: no certificate or port to fix, just people and accounts. This skill reads
Bitsight's exposed-credentials data and turns it into a short, dated action list.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication first, never persist the token, the shared error handling, India context, data
handling).

## What the data is

- Bitsight ties **leaks** (a breached service or a dump, e.g. a 2013 platform breach, or a 2026
  ransomware leak) to the companies whose domains appear in them, with a **record count** and
  **unique domain count** per company. Each leak carries its **leak date**, the date Bitsight
  **added** it, a description, and the **data types leaked** (email addresses, passwords, names,
  phone numbers).
- **No credential values are ever returned.** This skill can say *"312 records of yours appear in
  the X leak, which included passwords"*. It cannot say which accounts, and must never imply it can.
- Most rows are **old public dumps**. A 2013 breach added in 2017 is background noise. A leak from
  last month that included passwords is today's problem. Triage by date and data type, never by
  count alone.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if not
   authenticated, ask for the token and call `bitsight_set_token` (never echo it back). (Global rules §1.)

2. **Set the scope.** Own organisation, one vendor, or the whole portfolio, and the window. *"What's
   new since our last review"* is the most useful question; ask for the date, and default to 90 days.

3. **Portfolio view.** Call `bitsight_get_exposed_credentials` with `date_added_gte` for the window,
   then again without it for the all-time baseline. Each returns one row per company: leaks, records,
   latest date added. Check `complete`; if it is false the cap was reached, so say the view is partial.

4. **Company view.** For the user's own organisation (`summaries['my-company']` from
   `bitsight_get_portfolio`) and for each company that matters (new in the window, critical tier,
   or named by the user), call `bitsight_get_exposed_credentials` with `company_guid`. The calls are
   independent, so issue them together. Read each leak's name, leak date, date added, records and
   data types.

5. **Triage each leak** into one of three bands, and show why:
   - **Act now.** Leaked or added within the window, *and* an authentication data type among those
     leaked. As Bitsight names them: *Passwords*, *Plaintext Passwords*, *Hashed Passwords*,
     *Encrypted Passwords*, *Password Hints*, *Security Questions*.
   - **Review.** Recent but identity data only (*Email Addresses*, *Usernames*, *Name*, *Phone
     Numbers*). This is phishing and password-spray fuel, not a direct key.
   - **Background.** Old dumps (leak date more than two years back) whose credentials should
     long since have been rotated. List them as a count, not a table.

6. **Turn it into actions**, matched to the band. For the user's own organisation: forced resets for
   accounts on affected domains, MFA coverage checks, a check that no service still accepts the
   leaked passwords, a phishing-awareness note naming the breached brand, and watching sign-ins from
   unusual locations. For a vendor: what to **ask** them (were the affected accounts rotated, is MFA
   enforced, has any access to *your* data used those accounts), never what to do in their estate.

7. **Flag a possible incident, without deciding it.** A leak *at another service* is normally not
   the user's own reportable incident. It becomes one if there is evidence of **use**: unauthorised
   access to the user's systems or data, account takeover, or abuse of the leaked accounts against
   the user's services. If the user reports any of that, say plainly that **CERT-In's six-hour clock
   may be running** (Annexure I includes *unauthorised access of IT systems/data*, *data breach* and
   *data leak*), that the call belongs to their compliance and legal team, and hand off to
   `incident-notify`. DPDP breach duties are **not in force until 13 May 2027**; mention them only as
   a planning note. (Global rules §7.)

8. **Report.**
   - **Headline**: *"N new leaks in the last X days touch M companies; K need action now."*
   - **Act-now table**: company, leak, leak date, date added, records, data types, action.
   - **Review list**, then the **background count**.
   - **The limitation**, stated where clean companies are listed: absence from Bitsight's leak data
     is not proof that no credentials have leaked.
   - Offer `.xlsx` via the `xlsx` skill for a tracked follow-up.

9. **Offer next steps:** `incident-notify` if there is evidence of use; `vendor-brief` for a critical
   vendor with an act-now leak; `watchtower` to make this a recurring check; `assurance-pack` when a
   customer questionnaire asks about credential monitoring.

## Guardrails

- Never ask for, guess or reconstruct the leaked credentials, and never suggest testing whether a
  leaked password still works. That is unauthorised access (global rules §5), not verification.
- Leak data about third parties is confidential under Bitsight's Terms of Service. A vendor hears
  only about **its own** exposure, never another vendor's (global rules §8).
- Name breached services as Bitsight names them, and attribute the description to Bitsight. Don't
  embellish who did it or how.
- Don't present record counts as people: one person can appear many times, and one record can be a
  shared mailbox.

## Error handling

Follow the shared table in the global rules: 401 → re-prompt and stop; **403 → the token is valid but
exposed-credentials data isn't in this subscription: say so and stop this skill** (never re-prompt for
a token); 429 → the server has already retried, so name what's missing; `complete: false` → the view
is partial, so say so; empty for a company → report zero known leaks together with the limitation
above, never as an all-clear.
