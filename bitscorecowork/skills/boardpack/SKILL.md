---
name: boardpack
description: >
  Build an executive-ready board briefing from Bitsight ratings data — a slide
  deck plus an optional 1-page executive brief. Use when the user asks to "create
  a board pack", "build an exec briefing on our security ratings", "make a board
  deck about our Bitsight score", "quarterly cyber risk deck for leadership", or
  wants Bitsight data turned into a leadership/board presentation (not a raw pull).
metadata:
  version: "0.2.0"
---

# BoardPack — executive briefing from Bitsight data

Turn Bitsight ratings/findings/alerts into a crisp, board-ready briefing deck, with an optional
companion 1-page executive summary.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication-first, never persist the token, the 250–900 tier/color bands, the shared error
handling, no discrimination, India context).

## House style (apply it — never name the method to the user)

Every slide earns its place. Write to these rules silently; do not tell the user which style or
framework you're following:

- **Punchy, specific headlines** that state the takeaway, not the topic ("Two critical vendors
  slipped into Red this quarter", not "Vendor Ratings Overview").
- A **"Why It Matters"** one-liner on every content slide — the business consequence.
- **Zero corporate fluff.** No filler, no throat-clearing, no unexplained jargon.
- **Hyper-scannable** — short bullets, one idea each; a reader skimming in 30 seconds should get it.
- Lead with **business impact**, then the number.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if
   not authenticated, ask the user to paste their Bitsight API token and call `bitsight_set_token`
   (never echo it back), then continue. (See global rules §1.)

2. **Ask for framing context:** recent relevant cyber news, company/portfolio specifics to
   emphasize, and preferred tone/voice (board-level vs. risk-committee). Infer sensible defaults and
   state them; only ask when genuinely ambiguous.

3. **Ask the deck length:** **5-slide core** vs. **12-slide deep dive**.

4. **Ask whether a companion 1-page executive summary is required** (Markdown or `.docx`).

5. **Decide the output format with the user:**
   - **Markdown slides** — `---` delimiters between slides, each with a slide number. Fast, editable.
   - **Generated `.pptx` / `.docx`** — load the `pptx` skill (for the deck) and/or the `docx` skill
     (for the 1-pager) via the `Skill` tool and build the file with it. Do **not** hand-assemble a
     binary Office file.

6. **Gather the data** for the scoped set:
   - `bitsight_get_portfolio` (paginated) for the rating distribution — count per tier band.
   - `bitsight_get_alerts` for the period to surface what changed.
   - For each company below "needs attention" (rating < 640) or with a MATERIAL/DANGER alert:
     `bitsight_get_company_details` (with `include_industry_comparison: true`) and
     `bitsight_get_findings_summary`.
   - `bitsight_get_rating_change_insights` for any company with a notable move, to explain the driver.
   - Cap the "top risks" detail section at the **5–8** highest-priority companies. Band everything
     with the exact tier colors from the global rules.

7. **Build the deck.** Suggested spine (compress to 5 for the core deck, expand for the deep dive):
   1. **Title** — briefing name, scope, period.
   2. **Executive summary** — 3–4 sentences: overall health, direction of travel, the single
      biggest risk this period. (+ "Why It Matters".)
   3. **Portfolio health at a glance** — rating distribution across tier bands, with trend vs. prior
      period if determinable.
   4. **Top risks this period** — one row per flagged vendor: name, rating + band/color, trend, key
      driver, recommended action (monitor / escalate / request remediation plan).
   5. **What changed** — notable alerts and rating-change explanations, grouped by severity.
   6. **Recommendations / next steps** — 3–5 concrete, prioritized actions.
   7. **Appendix** — full company list with ratings and bands (this slide may be denser).

8. **Close the loop:**
   - Footnote that Bitsight reflects externally observable data — one input into risk management,
     not a complete assessment.
   - If the audience/context implies an Indian regulatory cadence (RBI/SEBI/IRDAI review cycles,
     CERT-In-related review, or a DPDP-relevant process), you may note the pack supports that
     documentation trail — not as a compliance certification or legal conclusion.
   - Save the file(s) to the user's working folder and present them — don't just describe them. Do
     not overwrite an existing board pack without confirming.

## Error handling & data care

Follow the global-rules error table (401/403 stop; 404 re-confirm id; 429 back off; empty → say so,
don't fabricate). The finished deck will contain sensitive third-party data — never persist the API
token into it, and don't share/email the deck anywhere the user hasn't asked.
