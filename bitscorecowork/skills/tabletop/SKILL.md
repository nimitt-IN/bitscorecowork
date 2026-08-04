---
name: tabletop
description: >
  Generate a board-level cyber crisis simulation from the client's own observed
  attack surface — scenario, timed injects, decision points, regulatory clocks,
  media and analyst questions, a facilitator guide and a post-exercise report
  template. Use when the user asks to "run a tabletop exercise", "build a board
  cyber crisis simulation", "war-game a breach with the leadership team", "test
  our incident response", or wants a crisis exercise grounded in their real
  findings (as opposed to drafting notifications for a real incident, which is
  `incident-notify`).
metadata:
  version: "0.4.0"
---

# tabletop — board crisis simulation from the real attack surface

Build a crisis exercise the board cannot dismiss as hypothetical, because the entry point, the
systems and the third party in it are all drawn from what Bitsight actually observes about this
organisation.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication-first, never persist the token, the 250–900 tier/color bands, the shared error
handling, no discrimination, India context). **Global rules §5 applies: this skill plans no testing
and needs no authorization gate, but it is bound by the no-exploitation rule** — scenario narrative
only, never working exploit content or steps to verify an exposure by attempting it.

The regulatory clocks come from [`../../reference/incident-reporting-map.md`](../../reference/incident-reporting-map.md).
**Read it before building the clock injects** — the deadlines are what make an Indian board exercise
bite, and a wrong one teaches the wrong lesson.

## The stamp, and why it is not optional

**Every artefact this skill produces carries `EXERCISE — NOT A REAL INCIDENT`** — in the header, in
the footer, and inside the body of any simulated notification, press statement or customer email.

This is not decoration. A realistic simulated CERT-In filing or breach disclosure that leaves the room
without its stamp reads as a real breach disclosure, and the organisation will spend a bad afternoon
proving otherwise. Stamp the scenario, every inject, every draft artefact, and the report template.
If an artefact would be convincing, it needs the stamp most.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if
   not authenticated, ask the user to paste their Bitsight API token and call `bitsight_set_token`
   (never echo it back). Proceed only once a token is set. (See global rules §1.)

2. **Establish the exercise, because it sets everything else.**
   - **Who is in the room** — full board, a board risk committee, the executive team, or a joint
     exercise with the technical responders. A board exercise is about decisions, escalation and
     disclosure; a technical exercise is about containment. Do not blend them, and if the user wants
     both, sequence them.
   - **How long** — 60–90 minutes for a board session (4–6 injects), half a day for an executive
     session (8–12 injects). Injects expand to fill time; too many is the usual mistake.
   - **What is being tested** — decision-making under uncertainty, the escalation path, the regulatory
     clocks, third-party dependency, public communications, or continuity. Two objectives is plenty.
   - **The entity's regulatory position** — the same questions `incident-notify` asks (entity type,
     listed, personal data, protected systems). The clocks are the exercise's engine, and they differ.
   - **Anything off-limits** — a live matter, a real vendor dispute, an ongoing regulatory engagement.
     Ask, and respect it.

3. **Pull the real attack surface.**
   - `bitsight_get_company_details` with `include_industry_comparison: true` — rating, trend and the
     per-vector grades. **The weakest vectors are the scenario's entry point**; a scenario built on
     what is actually weak is the whole point of this skill.
   - `bitsight_get_findings_summary` — where the open issues concentrate.
   - `bitsight_get_findings` with `affects_rating: true` and **`severity_gte: 8`** for the weak
     vectors, to name concrete, real issues in the injects. See global rules §3a.
   - `bitsight_get_assets`, if entitled, to name real systems. If it 403s, take asset names from the
     findings instead and carry on — the exercise doesn't need a complete inventory.
   - `bitsight_get_portfolio` to pick a **real third party** for the supply-chain inject, and
     `bitsight_get_alerts` for anything recently deteriorating.
   - Optionally `bitsight_list_threats` for a current CVE to seed the trigger, which makes the
     scenario feel like this month rather than last year.

4. **Build the scenario.** One coherent narrative, plausible for this organisation, opening at the
   weakest observed vector and running through the systems and dependencies that actually exist.
   - **Ground it in the real findings but do not reproduce them as instructions.** "An unpatched
     internet-facing service in the payments estate" is the right altitude. A specific host, version
     and exploitation path is not — global rules §5.
   - **Make the uncertainty real.** Boards rehearse for clean facts and then meet an incident where
     nothing is confirmed. The first three injects should contradict each other.
   - Anchor it to something the organisation cares about — a settlement window, a regulatory
     inspection, quarter end, a product launch.

5. **Write the MSEL — the master scenario events list.** Timed injects, each with: the clock time,
   what the participants receive, which objective it tests, the decision it demands, and what the
   facilitator should watch for. Mix the channels — a SOC alert, a vendor's phone call, a journalist's
   email, a customer complaint on social media, a regulator's enquiry, a board member forwarding a
   rumour.

6. **Set the regulatory clocks running as injects.** This is what makes an Indian board exercise
   bite. From the incident-reporting reference, and expressed as wall-clock times from the scenario's
   trigger:
   - The **CERT-In six hours** ticking while the room is still arguing about whether this counts as an
     incident. That argument *is* the lesson.
   - The applicable **sectoral filing** — DAKSH for a covered commercial bank, the relevant instrument
     for an NBFC, SEBI CSCRF, IRDAI.
   - **DPDP** intimation to affected Data Principals, which reaches customers and therefore the market.
   - **SEBI LODR Reg. 30** if listed — the materiality decision, under time pressure, with incomplete
     facts. This one reliably surprises boards.

   Put a visible countdown in the facilitator guide. A clock nobody can see does not create pressure.

7. **Write the decision points.** Explicit, and each with the information deliberately withheld:
   *invoke the crisis plan or not; notify or wait for confirmation; pay or refuse; take the platform
   offline during business hours; tell customers before the facts are complete; who speaks publicly.*
   For each, note what a good decision looks like, what the common failure is, and which role should
   own it.

8. **Write the media, analyst and customer questions.** Real ones, in the register they actually
   arrive in: a journalist who already has a source, an analyst on the results call, a large customer
   demanding contractual notification, a regulator asking why they heard it from the press. Include
   the question nobody wants — *"when did you know?"*

9. **Write the facilitator guide.** The part that decides whether the exercise works:
   - Pre-brief, room setup, roles, and the ground rule that it is a no-fault exercise.
   - The scenario with the timeline and the injects to release.
   - Probe questions per inject, for when the room goes quiet or agrees too quickly.
   - What to watch: who escalates, who takes the decision, whether anyone starts the clocks, whether
     anyone asks about personal data, whether the third party is contacted.
   - How to handle a room that solves it too fast, and one that stalls.
   - A hot-wash script for the final 15 minutes.

10. **Write the evaluation rubric and the post-exercise report template.** Rubric against the stated
    objectives — decision quality, escalation speed, clock awareness, communication, role clarity —
    scored as observed behaviour, not as a grade on people. The report template covers what happened,
    what worked, what did not, the gaps found, and **dated actions with named owners**. An exercise
    without an action list is entertainment.

11. **Offer the output format:** `.docx` via the `docx` skill for the facilitator guide and report
    template, `.pptx` via the `pptx` skill if injects are being projected, `.xlsx` via the `xlsx`
    skill for the MSEL and the action tracker. Markdown by default for review. Save to the user's
    working folder and present them — **with the stamp on every one.**

12. **Offer next steps:** `incident-notify` to have the real notification drafts ready before the
    exercise rather than improvised during it, `remediation-roadmap` for the gaps the exercise
    surfaces, or `boardpack` if the findings need to go back to the board formally.

## Guardrails

- **`EXERCISE — NOT A REAL INCIDENT` on every artefact**, header, footer and inside the body of
  anything that imitates a real notification, press release or customer communication. No exceptions
  for internal-only material — internal material is exactly what leaks.
- **No exploitation content.** Scenario narrative only. No proof-of-concept, no exploitation steps, no
  instructions for verifying an exposure by attempting it, however realistic that would make the
  exercise (global rules §5).
- **Role titles, never named individuals.** "The CISO", "the head of retail banking". An exercise that
  puts a named person on the failing decision becomes a performance-management document, and people
  stop participating honestly.
- **Anonymise external parties.** A scenario in which a named real vendor is breached reads as an
  allegation about a real company's real security. Use "a payments processor in your portfolio" and
  keep the real name in the facilitator's private notes if the point depends on it.
- **Never simulate an actual regulator's response, ruling or enforcement.** Simulate the enquiry, not
  the outcome — a fabricated RBI or SEBI position, even in an exercise, is misleading and will be
  quoted back later.
- **Do not present the scenario as a prediction.** It is one plausible path drawn from observed
  weaknesses, not a forecast, and the exercise's value does not depend on it being likely.
- The pack contains this organisation's real weaknesses and named systems — it is a useful document to
  an attacker. Treat it as confidential (global rules §8), and where a real third party appears in the
  facilitator notes, that is their confidential posture under Bitsight's Terms of Service.
- No discrimination in scenarios, personas or injects (global rules §6). Crisis scenarios reach for
  stereotypes about attackers easily — don't.

## Error handling

Follow the shared table in the global rules: 401 → re-prompt and stop; **403 → the token is valid but the endpoint isn't in this subscription: carry on without it and name the gap** (never re-prompt for a token); 404 → re-confirm the
GUID; 429 → back off and retry; empty result → build the exercise from the risk vectors and grades
that did return, and say the scenario is grounded in less data than usual. Never invent a finding or
an asset to make a scenario more vivid — an exercise built on a fabricated weakness sends the
organisation to fix something it does not have.
