# Attribution patterns — reading a Bitsight digital footprint

Working reference for the **`entity-scope`** skill. It sets out why an asset appears under a company
in Bitsight, which appearances are commonly wrong, how to tell the categories apart from observable
evidence, and what a dispute submission has to contain to succeed.

> ## Read this before disputing anything
>
> **"That isn't ours" is right often enough to be worth checking, and wrong often enough to be worth
> checking properly.**
>
> - Bitsight attributes assets to companies from registration data, DNS, certificates, routing and
>   observed relationships. It is inference at scale, so it has a false-positive rate — but the
>   inference is usually built on something, and the something is worth understanding before it is
>   contested.
> - **The categories below are hypotheses, not verdicts.** Every pattern here has a legitimate
>   counter-example: plenty of organisations really do run their own infrastructure on shared cloud
>   ranges, and plenty of odd-looking subdomains really are theirs.
> - **Only the asset owner can confirm ownership.** This reference helps assemble the evidence; the
>   determination is the customer's, recorded against a named person.
> - **This plugin cannot change a footprint.** Its tools are read-only and there is no attribution or
>   dispute endpoint. Submissions are filed by the customer through the Bitsight platform or their
>   account team, and the rating does not move until Bitsight adjudicates.

**Verified against the live Bitsight API on 4 August 2026.**

---

## Why an asset shows up, and where the error creeps in

| Attribution basis | What Bitsight is inferring | Where it goes wrong |
| --- | --- | --- |
| Domain registration | Registrant details tie a domain to a company | Registrations kept after divestment; brand-protection domains never used; registrar privacy masking |
| DNS resolution | A hostname under a company's domain resolves to an address | The address is a shared platform the company doesn't control |
| IP allocation | A netblock is registered or routed to the company | Ranges sub-allocated to franchisees, tenants, or since transferred |
| TLS certificates | A certificate names the company or its domains | Wildcard and SAN certificates issued to a hosting provider covering many tenants |
| Corporate hierarchy | Subsidiary or acquired-entity relationships | Divestments not reflected; entities acquired but never integrated; joint ventures |
| Observed relationships | Infrastructure patterns linking assets | Coincidence of shared hosting rather than shared ownership |

**Care point:** most mis-attribution is not a mistake about *who owns a name* — it is a mistake about
*what a name implies about control*. That distinction drives everything below.

---

## The taxonomy

Eight categories. The first four are the common false positives; the last four are the cases where
"not ours" is usually the wrong answer.

### 1. Shared hosting and multi-tenant platforms

**The claim:** the IP is a shared server hosting hundreds of unrelated sites; findings on it reflect
other tenants.

**Evidence to look for:**
- The same address attributed to **multiple companies** — the strongest single signal available.
- rDNS naming a hosting provider rather than the company.
- Findings on services the company doesn't operate (mail, control panels, unrelated web stacks).
- Hostname patterns: `*.hostgator.*`, `*.bluehost.*`, `*.godaddy.*`, `*.siteground.*`,
  `*.dreamhost.*`, `*.ionos.*`, `*.hostinger.*`, `cpanel.*`, `plesk.*`, `*.shared.*`.

**Usual outcome:** dispute, or narrow to the tenant boundary. **But check the counter-case:** if the
company is the *only* tenant, or bought a dedicated plan, the findings are theirs.

### 2. CDN and edge infrastructure

**The claim:** the address belongs to a CDN or edge network, not the company.

**Evidence:** rDNS or CNAME chains ending in `*.cloudfront.net`, `*.akamai*.net`, `*.akamaiedge.net`,
`*.fastly.net`, `*.cloudflare.*`, `*.azureedge.net`, `*.edgekey.net`, `*.edgesuite.net`,
`*.llnwd.net`, `*.stackpath*`. Addresses shared across enormous numbers of unrelated companies.

**Usual outcome:** the *address* is disputable; the **configuration often is not.** A TLS or header
finding on a CDN edge serving the company's site frequently reflects the company's own CDN
configuration, which it controls and can fix. Separate the two before disputing.

### 3. Cloud PaaS and managed platforms

**The claim:** it's an AWS/Azure/GCP range, so it isn't ours.

**Evidence:** `*.elasticbeanstalk.com`, `*.herokuapp.com`, `*.azurewebsites.net`, `*.appspot.com`,
`*.cloudapp.azure.com`, `*.compute.amazonaws.com`, `*.run.app`, `*.vercel.app`, `*.netlify.app`,
`*.pages.dev`.

**Usual outcome: usually keep it.** This is the category where "not ours" is most often wrong. A
generic cloud hostname says nothing about who deployed the workload. Under every shared-responsibility
model in the market, the customer owns the configuration of what it runs. Dispute only where the
instance genuinely belongs to a different tenant — and that needs evidence, not a hostname pattern.

### 4. Marketing, SaaS and third-party-operated properties

**The claim:** the campaign microsite, status page or support portal is run by an agency or vendor.

**Evidence:** `*.wordpress.com`, `*.wixsite.com`, `*.squarespace.com`, `*.myshopify.com`,
`*.hubspotpagebuilder.*`, `*.marketo.*`, `*.zendesk.com`, `*.statuspage.io`, `*.force.com`,
`*.sharepoint.com`. Registrant is an agency; DNS delegated to a vendor.

**Usual outcome: contextual, and often keep.** It carries the company's brand and frequently its
customers' data. Operated by a vendor is a **shared-responsibility** finding — a third-party risk item
routed to the vendor, not a footprint error. Reclassify rather than dispute.

### 5. Divested entities and stale registrations

**The claim:** that business was sold; those domains went with it.

**Evidence:** brands absent from current corporate structure; registration or DNS unchanged since a
known transaction date; certificates naming the acquirer; content referencing a former parent.

**Usual outcome: legitimate dispute — with paperwork.** Cite the transaction and its date. Where
registrations were genuinely retained but the operation transferred, say exactly that; retained
registrations are frequently why the attribution exists at all.

**Care point:** a divested-entity claim tends to surface a real hygiene problem — domains still
pointing at infrastructure nobody owns are a subdomain-takeover risk regardless of whose footprint
they sit in. Raise it even when the dispute succeeds.

### 6. Franchisee, dealer and distributor estates

**The claim:** franchisees run their own IT under our brand.

**Evidence:** many small sites in a consistent naming pattern (`dealer-*`, `store-*`, city or branch
names); wildly inconsistent posture across them; scattered small hosting providers.

**Usual outcome: contested, and worth arguing on the merits rather than the technicality.** Legally
separate operators are not the company's assets. But they carry the brand, they often process the
company's customers' data, and a breach at one lands on the brand — which is exactly the exposure the
franchisor is usually blind to. Track them as **extended enterprise**, dispute only where the
commercial relationship genuinely places them outside the company's risk.

### 7. Acquired but not integrated

**The claim:** we bought them last year; their IT isn't ours yet.

**Evidence:** an intact, coherent estate under a different brand, distinct from the parent's patterns.

**Usual outcome: keep — this is a correct attribution.** Consolidated risk follows consolidated
ownership. If it is on the balance sheet, its externally observable posture is the group's. The right
response is an integration plan, not a dispute. This category is the most common attempt to make
findings disappear, and it should be pushed back on directly.

### 8. Stale DNS and abandoned infrastructure

**The claim:** that host was decommissioned years ago.

**Evidence:** records resolving to addresses no longer routed to the company; long-expired
certificates; services on versions long out of support.

**Usual outcome: keep, and treat as urgent.** A DNS record pointing at infrastructure the company no
longer controls is a takeover risk, not an attribution error. The fix is removing the record — which
also removes the finding, legitimately.

---

## The decision, in three outcomes

Every asset reviewed lands in exactly one of these. Record the basis and the named sign-off for each.

| Outcome | Meaning | What follows |
| --- | --- | --- |
| **Keep** | Confirmed as the entity's own asset | Stays in scope for findings, remediation and testing |
| **Dispute** | Believed mis-attributed, with evidence | Goes into the submission; **stays in scope until Bitsight rules** |
| **Shared responsibility** | Real, brand-bearing, but operated by a third party | Stays in the footprint; routed to third-party risk and the vendor |

**Care point:** the third row is what stops this exercise becoming score management. Most of what
customers initially want to dispute belongs there — genuinely operated by someone else, and genuinely
still their exposure.

---

## What a dispute submission needs

Bitsight adjudicates; a submission that merely asserts is usually rejected. Assemble, per asset:

- **The asset**, exactly as Bitsight lists it — domain, hostname, or IP/CIDR.
- **The claimed category** from the taxonomy above.
- **The evidence**, and it must be *checkable*: the hosting provider and account status, rDNS or
  CNAME chain, WHOIS or RIR allocation showing a different holder, the transaction date and counterparty
  for a divestment, the contract that places operation with a franchisee.
- **What the entity does own nearby**, where relevant. Precision helps — "the range is ours, these
  four addresses within it are sub-allocated to a tenant" adjudicates faster than a blanket denial.
- **A named, dated sign-off** from someone entitled to speak for the estate.
- **The findings currently attributed to the asset**, so the effect of a successful dispute is visible
  and nobody is surprised by a rating movement later.

**Submission route.** Through the Bitsight platform's footprint/attribution workflow, or the
customer's Bitsight account team. **This plugin cannot submit it, and drafting it changes nothing on
its own.**

**Set the expectation in writing:** adjudication takes time, the rating does not move while it is
pending, and Bitsight may decline. A disputed asset is not a removed asset.

---

## API notes for this work

- `bitsight_get_assets` returns the observed inventory with `importance_category`, services and
  country. **Page through it fully** — a footprint review on the first page is not a footprint review.
- `bitsight_get_assets` is one of the endpoints most often **gated by subscription (403)**. When it
  is, reconstruct a partial footprint from the asset names carried on individual findings via
  `bitsight_get_findings`, and label the result explicitly as findings-derived and incomplete. Never
  present it as a full inventory.
- `bitsight_get_findings` expands `attributed_companies`. Where an asset carries **more than one**
  attributed company, that is the strongest available signal for categories 1 and 2.
- `bitsight_get_company_details` gives `primary_domain` — the anchor for judging whether a domain
  plausibly belongs to the same estate.
- `bitsight_search_portfolio_company` resolves sibling, parent and acquired entities that may be the
  correct home for a contested asset.
- **Country** on an asset is a weak signal on its own. Multinationals, cloud regions and CDN edges all
  produce legitimate foreign-country assets. Use it to prompt a question, never to conclude.

---

© 2026 BitScore Cybertech LLP. "Bitsight" is a registered trademark of Bitsight Technologies, Inc.;
this plugin is an independent integration and is not published by Bitsight. Attribution
determinations rest with Bitsight and with the asset owner; nothing here binds either.
