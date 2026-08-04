---
name: assurance-pack
description: >
  Answer an inbound security questionnaire, customer due-diligence request or RFP
  security section using the organization's own Bitsight evidence. Use when the
  user asks to "answer this security questionnaire", "fill in the customer DDQ",
  "respond to the security section of an RFP", "a client wants proof of our
  security posture", or needs an outbound assurance response (as opposed to an
  audit-facing framework evidence pack, which is `regmap`).
metadata:
  version: "0.4.0"
---

# assurance-pack — answering inbound security questionnaires

Turn the organization's own Bitsight evidence into answers a prospect or customer can accept —
without claiming anything the data cannot support, and without handing over a map of the attack
surface.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication-first, never persist the token, the 250–900 tier/color bands, the shared error
handling, no discrimination, India context — §7's banned-words rule in particular).

This is the outbound mirror of `regmap`. That skill organizes evidence for an auditor; this one
answers a counterparty who is deciding whether to buy from, or sign with, the user's organization.
Same evidence, different reader, and a much sharper set of constraints.

## Two rules that shape every answer

**Never claim compliance.** This output is commercial, outbound, and will be read as a representation
by the counterparty and possibly by their lawyers. "Compliant", "certified", "meets the requirement",
"satisfies the control" are prohibited (global rules §7), and they are more dangerous here than
anywhere else in this plugin — a questionnaire answer becomes a contractual representation surprisingly
often. Say what is **evidenced**, **partially evidenced**, or **not evidenced by this data**, and route
everything else to the people who hold the real answer.

**Never attach the findings.** An itemised list of the organization's own open findings, sent to a
prospect, is a target map — and it will be forwarded, stored and probably not deleted. Share the
rating, the band, the trend, and vector-level posture. Keep the finding detail in-house. If a
questionnaire demands specifics, that is a conversation under NDA between security teams, not a
document attached to a bid.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if
   not authenticated, ask the user to paste their Bitsight API token and call `bitsight_set_token`
   (never echo it back). Proceed only once a token is set. (See global rules §1.)

2. **Get the actual questions.** Ask the user to paste, attach or point at the questionnaire — a
   customer DDQ, a CAIQ- or SIG-style workbook, an RFP security section, or an ad-hoc list from a
   prospect's security team. Answering a generic template when a specific one exists wastes the work.
   If they have no document yet and want a standing pack, build the common set: posture, external
   attack surface, vulnerability management, encryption in transit, email security, third-party risk,
   incident response and regulatory position.

3. **Establish the context, because it sets the tone and the limits.**
   - **Who is asking, and what for** — a prospect in a bid, an existing customer's annual review, a
     regulator-driven request routed through a client, or a partner's onboarding.
   - **What the deal involves** — will the user's organization hold the counterparty's personal data,
     connect to their systems, or process payments? That decides which vectors matter and how much
     scrutiny is proportionate.
   - **Deadline and format** — bids run to a clock, and the format is usually fixed by the asker.
   - **What has already been answered elsewhere.** A prior response, an existing security page, or a
     standard set — consistency across responses matters more than elegance in any one of them. A
     contradiction between two answers to the same customer is worse than a gap.

4. **Resolve the subject and pull the evidence.** Resolve the user's own organization via
   `summaries["my-company"]` from `bitsight_get_portfolio`, or by GUID or name.
   - `bitsight_get_company_details` with **`include_industry_comparison: true`** — the current rating
     from `ratings[0].rating`, the tier band and colour, the 1-year trend, the per-vector grades and
     the industry percentile. **The trend and the percentile are the strongest assets here**: an
     improving rating above sector average is a better answer than a static number.
   - `bitsight_get_findings_summary` — for the user's own understanding of where the gaps are before
     they answer. **This informs the answers; it does not go into the pack.**
   - `bitsight_get_industry_benchmark` on the industry slug — so the rating is quoted against its
     sector rather than in a vacuum.
   - `bitsight_get_findings` with `affects_rating: true` and **`severity_gte: 8`** only where the user
     needs to know what a specific answer is exposed on. Global rules §3a for thresholds. Again — for
     their eyes, not the counterparty's.

5. **Answer question by question**, and assign each answer one of four dispositions:
   - **Evidenced** — Bitsight observes it directly. Externally observable controls: TLS configuration,
     email authentication records, exposed services, patching posture, observed compromise signals.
   - **Partially evidenced** — Bitsight sees the external surface of the control but not its design or
     operation. **Most answers land here**, and saying so is what makes the pack credible.
   - **Not evidenced by this data** — Bitsight says nothing about it. Internal controls, policies,
     governance, training, physical security, segmentation, background checks.
   - **Requires internal input** — the honest answer exists inside the organization but not in this
     data. **Route it, with a named owner**: the ISO 27001 certificate to the compliance team, the DR
     test results to infrastructure, the DPDP notice to legal.

   The last two are not failures. A pack in which every question is answered from ratings data is not
   credible and the counterparty's security team will know it.

6. **Write the covering statement**, near the front and unmissable:
   - What Bitsight is — an independent, externally observed security rating, refreshed continuously,
     not a self-assessment. **This is the pack's real strength**: it is third-party evidence, which a
     self-completed questionnaire is not. Say so.
   - What it observes — externally visible signals only.
   - What it does **not** cover — internal controls, policies, governance, training, physical
     security, and everything else in the *not evidenced* column.
   - That it is one input, not an audit, a certification or a compliance conclusion.
   - The date. Ratings move daily and this is a point-in-time statement.

7. **Assemble the pack.** Answers in the asker's own structure and order — do not restructure a
   customer's questionnaire, it will be scored against their template. Plus:
   - **The posture summary** — rating, band and colour, 12-month trend, industry percentile.
   - **Vector-level posture** at grade level, where the questionnaire asks about specific control areas.
   - **The covering statement** from step 6.
   - **An open-items list**, for the user's eyes only: the questions routed for internal input, with
     owners and the deadline. That list is the actual project plan for closing the response.

8. **Flag what the pack reveals about the user.** Before it goes out, tell them what a competent
   reader will infer: a weak vector grade, a declining trend, a percentile below sector. Better they
   hear it here than in the counterparty's follow-up questions. Where a gap is going to be visible,
   `remediation-roadmap` is often the right answer before the pack is, and it is worth saying so even
   when the deadline argues otherwise.

9. **Offer the output format:** `.docx` via the `docx` skill if it is going into a bid or a customer
   file, `.xlsx` via the `xlsx` skill if the questionnaire came as a workbook and must be returned in
   that shape (common, and usually the right answer), Markdown for internal review first. Save to the
   user's working folder and present it. **Recommend an internal review before it goes out** — this is
   an outbound representation about the organization's own security, and it should not leave on the
   strength of a generated draft.

10. **Offer next steps:** `remediation-roadmap` for the weaknesses the questionnaire exposed,
    `regmap` if the counterparty wants framework-level mapping rather than plain answers, or
    `mycompany` if the user needs to understand their own posture properly before answering anything.

## Guardrails

- **Never write "compliant", "non-compliant", "certified", "meets the requirement" or "satisfies the
  control"** about the user's organization. Not in a summary, not in a covering note, not in a single
  answer. This is an outbound commercial document and those words are representations.
- **Never overstate to win the deal.** An answer that oversells what Bitsight evidences is a
  misrepresentation to a counterparty, and it unwinds badly — in the security review, in the contract,
  or after an incident. If the honest answer is weak, say it plainly and let the user decide how to
  handle it.
- **Never include itemised findings, asset lists, hostnames or IP addresses.** Posture and grades only.
- **Never answer a question the data cannot support.** *Requires internal input* with a named owner is
  a complete, professional answer. An invented one is not.
- **Never claim an audit, a certification, or a Bitsight endorsement of the organization.** Bitsight
  rates; it does not certify, and it has not vouched for anyone.
- The pack describes the user's own posture, so §8's third-party concerns are lighter here — but it is
  still confidential, it is going outside the organization, and it should not go out without an
  internal owner signing it off.
- If the questionnaire asks about **sub-processors or the user's own vendors**, that is those third
  parties' confidential posture under Bitsight's Terms of Service — do not pass their ratings on to a
  counterparty. Describe the third-party risk *process* instead.

## Error handling

Follow the shared table in the global rules: 401 → re-prompt and stop; **403 → the token is valid but the endpoint isn't in this subscription: carry on without it and name the gap** (never re-prompt for a token); 404 → re-confirm the
GUID; 429 → back off and retry; empty result → mark the affected questions **not evidenced by this
data** and route them for internal input. Never fill a gap in an outbound assurance document with an
assumption — an invented answer to a customer's security questionnaire is the worst possible place for
one.
