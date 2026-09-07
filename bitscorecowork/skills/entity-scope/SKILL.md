---
name: entity-scope
description: >
  Validate a company's Bitsight digital footprint — review the attributed assets,
  flag likely mis-attributions, draft the attribution-dispute submission, and
  produce a signed-off asset inventory. Use when the user says "those IPs aren't
  ours", "this asset doesn't belong to us", "validate our Bitsight footprint",
  "why is this domain attributed to us", "dispute an asset with Bitsight", or
  wants the attributed estate confirmed before anyone acts on the findings (as
  opposed to analysing the findings themselves).
metadata:
  version: "0.6.0"
---

# entity-scope — validating the Bitsight digital footprint

Turn *"those IPs aren't ours"* into a reviewed, evidenced, signed-off asset inventory — and a dispute
submission for the assets that genuinely are mis-attributed.

**Before anything else, read and apply [`../../reference/bitscore-global-rules.md`](../../reference/bitscore-global-rules.md)**
(authentication-first, never persist the token, the 250–900 tier/color bands, the shared error
handling, no discrimination, India context).

The attribution reference is [`../../reference/attribution-patterns.md`](../../reference/attribution-patterns.md).
**Read it before categorising any asset**, including its opening caveats — the nine categories and
their counter-cases are the substance of this skill.

## Why this is worth doing before anything else

An asset inventory fails silently. Nothing alerts on the entry that was never made, and the gap only
becomes visible when something happens to the host nobody was watching.

**SEBI's CDSL order, 20 July 2026**, is the clearest available illustration, and it is a regulator's
own finding rather than a vendor claim. SEBI imposed a **₹1 crore penalty** over the November 2022
LockBit ransomware attack. The order records many failures, but the one that enabled the rest was a
missing entry rather than a missing control: an **internet-facing Active Directory Federation Services
server was never classified as a critical asset**, and so fell outside the testing and monitoring
regime that would have found it. The disaster recovery site was encrypted too.

Two things follow, and both are this skill's argument:

- **The controls were not absent — the asset was.** Testing, monitoring and patching all worked as
  designed on the assets they had been pointed at. An inventory error is not one control failing; it
  is every control silently skipping one host.
- **An internet-facing asset that the organisation has forgotten is exactly what an external view
  finds**, because attribution starts from what is observable rather than from what is listed. That is
  the case for reconciling the attributed footprint against the internal inventory: the interesting
  assets are the ones on one list and not the other, in **both** directions.

Use it to frame the engagement where a customer questions why footprint validation is worth the time.
Do not overreach: Bitsight would not have prevented that incident, and nothing here says it would.
What an external view offers is a second, independently assembled list to reconcile against.

## What this skill can and cannot do

**It can:** review the observed footprint, categorise every asset against the attribution taxonomy,
assemble checkable evidence, and produce both a signed-off inventory and a dispute submission.

**It cannot change the footprint.** Every tool in this plugin is read-only, and Bitsight exposes no
attribution or dispute endpoint. The submission is filed by the customer through the Bitsight platform
or their account team, **Bitsight adjudicates, and the rating does not move while that is pending.**
Say this at the start, not at the end — a customer who thinks disputing an asset removes it today will
be told otherwise by their own rating tomorrow.

## Workflow

1. **Ensure a Bitsight API token is set (prompt every session).** Call `bitsight_auth_status`; if
   not authenticated, ask the user to paste their Bitsight API token and call `bitsight_set_token`
   (never echo it back). Proceed only once a token is set. (See global rules §1.)

2. **Resolve the entity, and establish what "the entity" means.** Take the GUID if given; otherwise
   resolve via `bitsight_search_portfolio_company`, or read `summaries["my-company"]` from
   `bitsight_get_portfolio` for the user's own organization. Then ask the questions that decide half
   the categorisations before any data is pulled:
   - **What sits inside this legal entity** — and what belongs to a parent, a subsidiary, or a
     sibling that is rated separately. Assets frequently belong to a real part of the group, just not
     *this* row in the portfolio.
   - **Recent corporate activity** — acquisitions, divestments, mergers, joint ventures, with dates.
     This resolves categories 5 and 7 outright and is rarely volunteered unprompted.
   - **Franchisee, dealer or distributor estates** trading under the brand.
   - **Who can sign off.** The inventory is worthless without a name against it.

3. **Pull the observed footprint.**
   - `bitsight_get_assets`, **paged through fully** with `limit`/`offset`. A footprint review that
     stops at the first page is not a footprint review — and on a large estate the interesting
     assets are rarely on page one. **Read `hosted_by` first** — Bitsight names the hosting
     organisation directly on every asset, which beats inferring one from a hostname; it is often
     null, and where it is, an **RDAP lookup** on the address gives you the registered allocation
     holder, which is stronger evidence anyway. **Read `origin_subsidiary` second** — it names the
     entity the attribution came through. Also carried: `asset_type`, `country`,
     `importance_category`, `services`, `tags` and the finding count.

     **Deduplicate before quoting any total.** The same asset is returned **once per
     `origin_subsidiary` it maps through**, so the `count` is a row count, not a host count — pages
     running 100 rows to 18 unique hosts are normal on an overlapping estate. Report unique hosts and
     rows separately and say which is which. Quoting the raw total as "assets" overstates the estate
     several-fold and misleads every downstream decision.

     **If the estate is too large to page fully**, say so explicitly: give the number of pages
     sampled, the offsets used, and the proportion of the estate covered — and label every conclusion
     as drawn from a sample. Results come back roughly importance-descending, so an early-pages-only
     sample is biased towards `critical` assets and is not representative.
   - `bitsight_get_company_details` for `primary_domain` and the current rating, so the effect of any
     successful dispute has a baseline.
   - `bitsight_get_findings` with `severity_gte: 1` across the estate — here you want everything, not
     a material-and-above worklist, because an asset with a single minor finding is exactly the kind
     that turns out not to be theirs. Read the **`attributed_companies`** expansion on each finding,
     and **read the names, not just the count** — that distinction is in the attribution reference and
     it decides the category. Page through rather than reporting the first page.

   **If `bitsight_get_assets` returns 403**, the asset inventory isn't in this subscription. Do not
   stop. Reconstruct a partial footprint from the asset names carried on the individual findings,
   **label it findings-derived and incomplete every time it is presented**, and tell the user a full
   inventory needs the entitlement — a subscription question for their Bitsight account team, not a
   token problem. An inventory built this way sees only assets that *have* findings, which is a
   material gap and must be stated as one.

4. **Categorise every asset** against the nine categories in the attribution reference, using the
   observable evidence — `hosted_by`, multi-company attribution, service mix, country, naming
   conventions, and rDNS or CNAME patterns where the inventory wasn't available. Assign each asset one
   of four outcomes:
   - **Keep** — confirmed the entity's own.
   - **Dispute** — believed mis-attributed, with evidence.
   - **Shared responsibility** — real and brand-bearing, but operated by a third party.
   - **Entity overlap** — correctly attributed, but the same organisation is modelled more than once
     in the portfolio. A hygiene item for the account team, not a dispute.

   **Read multi-attribution by the names it returns, never by the count.** Unrelated companies on one
   asset point at shared hosting or a CDN. Names that are all variants of the same organisation —
   per-cloud entities, lab entities, anything suffixed `DUPLICATE` — point at entity overlap, where
   nothing is mis-attributed and a dispute would be the wrong instrument. On the live subscription
   this was verified against, the second case was the more common of the two.

   **Show the reasoning per asset**, not just the verdict. The user has to be able to disagree with a
   categorisation, and an auditor has to be able to follow it. Where the evidence is thin, say the
   category is a hypothesis needing internal confirmation rather than presenting it as settled.

5. **Push back where "not ours" is doing work it shouldn't.** This is the step that makes the output
   credible, and it is the one most likely to be unwelcome:
   - A **cloud PaaS hostname is not evidence of anything.** Who deployed the workload decides
     ownership, and under every shared-responsibility model the customer owns its configuration.
   - A **CDN edge address** may be disputable while the **TLS or header configuration on it is the
     entity's own** and entirely within its control.
   - An **acquired entity's estate is the group's estate.** Not yet integrated is a plan, not a
     dispute.
   - A **franchisee estate** may sit outside the legal entity and still carry the brand, the customers
     and the breach. Track it as extended enterprise.
   - **Stale DNS pointing at infrastructure nobody controls** is a subdomain-takeover risk, not an
     attribution error — and the fix removes the finding legitimately.

   Say plainly when a claim looks like convenience rather than fact. The customer may still overrule
   you; record that they did, with their reason.

6. **Confirm with the asset owner.** Present the categorised list and ask for confirmation
   asset-by-asset for anything proposed as **dispute**. Only the owner can confirm ownership — this
   skill assembles evidence, it does not adjudicate. Record the name, role and date against every
   decision, including the keeps.

7. **Build the signed-off inventory.** One row per asset: asset as Bitsight lists it, asset type,
   `hosted_by`, importance category, country, attributed companies where more than one, outcome
   (**keep / dispute / shared responsibility / entity overlap**), the category, the evidence, current
   findings attributed to it, who signed off, and the date. Head it with the entity, the GUID, the
   pull date and the current rating — this is a point-in-time record and the footprint changes.

8. **Draft the dispute submission** for the disputed rows only, following the submission checklist in
   the attribution reference: the asset as listed, the claimed category, checkable evidence, what the
   entity does own nearby, the named sign-off, and the findings currently attributed. State in the
   covering note that adjudication takes time, the rating is unchanged while pending, and Bitsight may
   decline. **Nothing is submitted from here** — hand it over for the customer to file through the
   platform or their account team.

9. **Offer the output format:** `.xlsx` via the `xlsx` skill for the inventory (usually right — it is
   a working document the estate owners will revisit), `.docx` via the `docx` skill for the dispute
   submission if it is going to Bitsight as a document, Markdown for review. Save to the user's
   working folder and present them. Date every inventory, and don't overwrite a previous one — the
   sequence of footprint reviews is itself the audit trail.

10. **Offer next steps:** `vapt-plan` or `security-test-plan` now that scope is confirmed — testing an
    asset that turns out to belong to someone else is the expensive version of this mistake —
    `remediation-roadmap` for the findings on the assets that survived review, or `vendor-brief` where
    a shared-responsibility asset points at a third party who should be assessed properly.

## Guardrails

- **A disputed asset is not a removed asset.** Findings stay attributed and the rating stands until
  Bitsight rules. Never present a draft submission as though the exposure is already resolved, and
  never net disputed assets out of a finding count.
- **Never let this become score management.** The purpose is an accurate footprint, which sometimes
  means *adding* context rather than removing assets. If the review ends with every contested asset
  disputed and nothing reclassified as shared responsibility or entity overlap, it was not a review.
- **Never file entity overlap as a dispute.** Nothing is mis-attributed when an organisation is
  modelled twice — the asset really is theirs. Sending it to adjudication wastes the customer's
  credibility on a submission that should be a conversation with their account team.
- **Never assert ownership or non-ownership on the user's behalf.** Categories are hypotheses from
  observable evidence; the determination rests with the asset owner and, for the footprint itself,
  with Bitsight.
- **Record the sign-off or don't claim one.** An inventory with no named owner is a working note, and
  should say so rather than being presented as signed off.
- Where the footprint concerns a **third party**, it is that party's confidential security posture
  under Bitsight's Terms of Service (global rules §8) — and disputing another company's attribution is
  their prerogative, not the user's. Assemble the evidence, share it with them if the user wants, and
  leave the filing to whoever owns the estate.
- Asset inventories name internet-facing infrastructure and are useful to an attacker. Treat the
  output as confidential and don't circulate it beyond the stated purpose.

## Error handling

Follow the shared table in the global rules: 401 → re-prompt and stop; **403 → the token is valid but the endpoint isn't in this subscription: carry on without it and name the gap** (never re-prompt for a token); 404 → the
GUID isn't in this token's portfolio, re-confirm it; 429 → back off and retry; empty result → say the
footprint came back empty rather than reporting a clean or minimal estate, and check the GUID before
concluding anything — an empty asset list is far more often a scope or entitlement problem than a
company with no internet-facing infrastructure.
