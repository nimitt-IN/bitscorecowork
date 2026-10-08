---
name: threat-attestation
description: >
  Track what companies have stated about the threats Bitsight flags against them —
  Unreviewed, Under review, Not vulnerable or Risk accepted — set against the
  observed exposure. For the user's own organisation it gives the review backlog;
  for vendors it shows who has publicly answered a CVE and who hasn't, as a chase
  list. Use when the user asks "which CVEs haven't we reviewed", "what have our
  vendors said about CVE-XXXX", "who still needs chasing after the sweep", "our
  attestation backlog", or follows a cve-sweep.
metadata:
  version: "0.8.0"
---

# threat-attestation: who has said what about a threat

`cve-sweep` answers *who looks exposed*. The next question is always *who has responded*. Bitsight
lets a company record an **attestation** against each threat it is flagged for, and this skill reads
those statements and lines them up with the exposure data.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication first, never persist the token, the shared error handling, India context, data
handling).

## What an attestation is

- A company's own statement about one threat: **UNREVIEWED**, **UNDER_REVIEW**, **NOT_VULNERABLE**
  or **RISK_ACCEPTED**, with the time it was made. It can be **public** (visible to companies
  monitoring it) or **private**.
- **Scope `spm`** is the user's own organisation and subsidiaries: the full set, public and private.
  **Scope `tprm`** is portfolio companies, and shows only what they have chosen to make public.
- **No row is not the same as UNREVIEWED.** A vendor with no attestation has said nothing at all.
- An attestation is a **claim**, not evidence. *Not vulnerable* from a vendor still showing as
  `EXPOSED` in `bitsight_get_threat_companies` is the most important row in any report. It may be
  right (mitigated in a way Bitsight can't see) or wrong, and either way it is a question to ask.
- This skill **reads only**. It never records or changes an attestation. If the user wants to record
  one for their own organisation, point them to the Bitsight platform.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if not
   authenticated, ask for the token and call `bitsight_set_token` (never echo it back). (Global rules §1.)

2. **Pick the question.**
   - **Own backlog**: *"which threats haven't we reviewed?"* → step 3.
   - **One threat across vendors**: *"what have vendors said about CVE-X?"* → step 4.
   - **After a sweep**: the user has `cve-sweep` results → step 4, with that threat.

3. **Own backlog.** Call `bitsight_get_threat_attestations` with `scope: "spm"`. Report
   `by_attestation`, then list UNREVIEWED and UNDER_REVIEW threats, oldest first. To prioritise, look
   each threat up with `bitsight_list_threats` (`q` = the threat name; use `exact_matches`) for
   severity, EPSS and how many portfolio companies are exposed, and with `bitsight_get_threat_companies`
   (`exposure_detection: "EXPOSED"`) to confirm the user's own organisation is still observed as
   exposed. An unreviewed threat that is still exposed and severe goes to the top.

4. **One threat across vendors.**
   - Resolve the threat GUID with `bitsight_list_threats` and read `exact_matches` (`q` is a
     substring search).
   - Exposure: `bitsight_get_threat_companies` for the threat, paged fully. Use the `summaries`
     counts and split rows on `exposure_detection`.
   - Statements: `bitsight_get_threat_attestations` with `threat_guid` and `scope: "tprm"`.
     These two calls are independent; issue them together.
   - Join on company GUID, and place every exposed company in exactly one bucket:
     - **Exposed, no statement**: chase first.
     - **Exposed, Unreviewed or Under review**: chase with a date.
     - **Exposed, but says Not vulnerable**: verify. Ask for the evidence behind the claim.
     - **Exposed, Risk accepted**: an escalation decision for the user, not the vendor.
     - **Mitigated**: no chase; list for completeness.

5. **Report.**
   - **Headline**: *"Of N exposed companies, A have made a statement and B have not."*
   - **Table** per bucket: company, tier, exposure state, attestation and its date, last seen.
   - The **claim-versus-observation** rows called out on their own.
   - **The limitation**: absent attestations are silence, not denial, and vendors' private
     attestations are not visible to the user.
   - Offer `.xlsx` via the `xlsx` skill as a chase tracker.

6. **Offer a chase note per vendor**, as `cve-sweep` does: factual, non-accusatory, naming the threat,
   what was observed and when, what statement is on record (or that none is), and what confirmation is
   asked for by when. **Draft only. Do not send anything.**

7. **Offer next steps:** `cve-sweep` to refresh exposure; `vendor-brief` for a critical vendor that has
   accepted the risk; `assurance-pack` when a customer asks how the user tracks vendor responses to
   critical vulnerabilities; `incident-notify` if a vendor confirms exploitation that touches the
   user's data.

## Guardrails

- Never present an attestation as verified, and never present Bitsight's exposure flag as the final
  word either. Report both, side by side, with dates.
- A vendor sees only its own row in anything drafted for it, never another vendor's (global rules §8).
- No exploitation content. To confirm remediation, describe what to *ask* for (version, patch date,
  configuration evidence), not how to test it.
- Attestations go stale. Date every output and recommend a re-check while the advisory is live.

## Error handling

Follow the shared table in the global rules: 401 → re-prompt and stop; **403 → the token is valid but
attestations aren't in this subscription: carry on with exposure data alone and say so** (never
re-prompt for a token); 404 → re-confirm the threat or company GUID; 429 → the server has already
retried, so name what's missing; empty attestations for `tprm` → no vendor has made a public
statement on this threat, which is itself the finding.
