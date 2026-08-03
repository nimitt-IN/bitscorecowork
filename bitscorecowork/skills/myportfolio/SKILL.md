---
name: myportfolio
description: >
  Pull Bitsight security ratings for every company in a managed portfolio. Use
  when the user asks to "pull our portfolio ratings", "check all our vendors'
  Bitsight ratings", "which vendors are high risk", "rank our third parties by
  security rating", "portfolio-wide security ratings", or wants ratings across a
  whole monitored portfolio rather than a single company.
metadata:
  version: "0.3.1"
---

# MyPortfolio — ratings across a managed portfolio

Pull Bitsight ratings for all companies in a portfolio, color-band each by tier, and surface the
high-risk (Basic-tier) vendors.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication-first, never persist the token, the 250–900 tier/color bands, the shared error
handling, no discrimination, India context).

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if
   not authenticated, ask the user to paste their Bitsight API token and call `bitsight_set_token`
   (never echo it back). Proceed only once a token is set. (See global rules §1.)

2. **Get the portfolio scope.** Prompt for the Portfolio GUID/ID if the user hasn't given one. If
   the token has a single default portfolio, you may pull it directly — but say which one you used.

3. **Ask which vendors / supply-chain assets to prioritize or cross-analyze** — e.g. a named tier,
   the top-N critical suppliers, a specific industry, or "all". Use this to focus the read; still
   pull the whole set so the risk picture is complete.

4. **Ask the output format** (pick one; default to Matrix Table):
   - **Matrix Table** — one row per company: name, domain, rating, tier band + color, industry.
   - **High-Risk Flag Report** — lead with Basic-tier / lowest-rated vendors and what makes each
     risky; summarize the rest briefly.
   - **Comparative Stack Ranking** — all companies ranked best→worst by rating, banded by color.

5. **Pull the portfolio with pagination.** Call `bitsight_get_portfolio` and **page through every
   result** using `limit`/`offset` until you've collected the full set — do not stop at the first
   page. Apply the user's prioritization filter (`rating_lt`, `industry_slug`, `tier`) where it
   maps cleanly to an API filter; otherwise pull all and filter in your summary. If the user gave a
   specific risk threshold, use it; otherwise use `rating_lt: 640` (the Basic/Intermediate boundary)
   as the default "high-risk" cut.

6. **Color-band every company** using the exact global-rules buckets
   (Basic 250–630 🔴 High / Intermediate 640–730 🟠 Medium / Advanced 740–900 🟢 Low). **Surface every
   Basic-tier vendor as high risk** regardless of the chosen format. Include a one-line portfolio
   summary: total companies, count per band, and the count of high-risk (Basic) vendors.

7. **Offer next steps:** run the `mycompany` skill on any flagged vendor for a deeper single-company
   read, or `boardpack` to escalate several at once. If the user is clearly running this
   periodically, mention it can be scheduled — but only offer, don't set it up unprompted.

8. **Close** with the standing notes: this is confidential third-party data (don't write it to a
   file or forward it unless asked), and Bitsight reflects externally observable signals only. If it
   feeds an Indian regulatory cadence (RBI outsourcing/IT vendor norms, SEBI, IRDAI, CERT-In, or a
   DPDP-relevant process), note it can support that evidence trail — not as legal/compliance advice.

## Error handling

Follow the shared table in the global rules: 401 → re-prompt for the token and stop; **403 → valid token, unentitled endpoint: continue without that source and say what's missing** (never re-prompt);
404 → bad portfolio ID, ask the user to re-confirm; 429 → back off and retry (be mindful when
paginating large portfolios); empty result → say the portfolio returned no companies and do not
fabricate any.
