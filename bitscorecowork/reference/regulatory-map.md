# Risk-vector → framework reference map (indicative)

Working reference for the **`regmap`** skill. It maps Bitsight risk vectors to the control areas of
common frameworks and Indian regulatory regimes, so externally observed evidence can be filed
against the control it speaks to.

> ## Read this before using the map
>
> These mappings are **indicative and non-authoritative.** They are a starting point for a
> conversation with a compliance team, not a control mapping of record.
>
> - Framework texts are revised; control identifiers move. **Verify every reference against the
>   current published text** before it goes into an audit file.
> - A Bitsight risk vector is **evidence about one externally observable aspect** of a control. It
>   is never the whole control. Good grades on TLS vectors say nothing about key management policy,
>   staff training, or internal segmentation.
> - Indian regulatory entries are **thematic** — the obligation area a vector speaks to — not clause
>   citations. Applicability depends on entity type, size, and sector, and is a determination for
>   the user's compliance and legal team.
> - Nothing here is legal advice, and nothing here certifies compliance. See global rules §7.

---

## How to read the columns

- **Risk vector** — as Bitsight groups and names them.
- **What it evidences** — the observable fact the grade actually establishes.
- **NIST CSF 2.0** — Function.Category level (GV Govern, ID Identify, PR Protect, DE Detect,
  RS Respond, RC Recover).
- **ISO/IEC 27001:2022** — Annex A control areas.
- **Indian regimes** — the obligation *theme* most commonly engaged.

---

## Compromised Systems

Evidence of infection or attacker-controlled activity observed from outside.

| Risk vector | What it evidences | NIST CSF 2.0 | ISO/IEC 27001:2022 | Indian regimes |
| --- | --- | --- | --- | --- |
| Botnet Infections | Hosts communicating with known command-and-control infrastructure | DE.CM, RS.MA | A.8.7, A.8.16 | CERT-In (incident detection & reporting); RBI/SEBI/IRDAI cyber-incident handling |
| Malware Servers | Systems observed distributing malware | DE.CM, RS.MA | A.8.7, A.8.16 | CERT-In (reportable incident categories) |
| Spam Propagation | Systems sending spam — usually a symptom of compromise | DE.CM | A.8.7, A.8.16 | CERT-In (incident detection) |
| Unsolicited Communications | Traffic to destinations it should have no reason to reach | DE.CM, DE.AE | A.8.16 | CERT-In (monitoring & logging) |
| Potentially Exploited | Devices running software behaving as though compromised | DE.CM, RS.MA | A.8.7, A.8.16 | CERT-In; sectoral incident-response expectations |

**Care point:** these are the vectors most likely to indicate a *live* problem rather than a hygiene
gap. Treat a material change here as an operational escalation first and a compliance artifact
second.

---

## Diligence

Evidence about configuration and maintenance of internet-facing systems.

| Risk vector | What it evidences | NIST CSF 2.0 | ISO/IEC 27001:2022 | Indian regimes |
| --- | --- | --- | --- | --- |
| Patching Cadence | How quickly known vulnerabilities are remediated | ID.RA, PR.PS | A.8.8 | RBI/SEBI/IRDAI vulnerability-management expectations |
| TLS/SSL Certificates | Certificate validity, expiry, and trust chain | PR.DS | A.8.24 | Sectoral data-in-transit protection expectations |
| TLS/SSL Configurations | Protocol versions and cipher suites in use | PR.DS | A.8.24 | Sectoral data-in-transit protection expectations |
| Open Ports | Services exposed to the internet | PR.IR, PR.AA | A.8.20, A.8.21 | Sectoral network-security expectations |
| Web Application Headers | Browser-side protections on web applications | PR.PS | A.8.9, A.8.26 | Sectoral application-security expectations |
| Insecure Systems | Systems reaching endpoints indicating unsupported/insecure configuration | PR.PS, ID.AM | A.8.9 | Sectoral configuration-management expectations |
| Server Software | Versions and support status of observed server software | ID.AM, PR.PS | A.8.8, A.8.9 | Sectoral asset & patch-management expectations |
| Desktop / Mobile Software | Versions and support status of observed endpoint software | ID.AM, PR.PS | A.8.8 | Sectoral endpoint-management expectations |
| Mobile Application Security | Security posture of published mobile applications | PR.PS | A.8.25, A.8.26 | Sectoral application-security expectations; DPDP where apps process personal data |
| DNSSEC | Whether DNS responses are cryptographically validated | PR.DS, PR.IR | A.8.20, A.8.21 | Sectoral network-integrity expectations |
| Domain Squatting | Look-alike domains registered against the organization's brand | ID.RA, DE.CM | A.5.7 | Sectoral fraud/brand-abuse monitoring expectations |

**Care point:** Diligence vectors are where remediation is most visible and where a rating moves most
readily — which makes them the easiest place to improve a number without materially improving risk.
Note that tension when it applies.

---

## User Behavior

Evidence about activity on the organization's networks that raises exposure.

| Risk vector | What it evidences | NIST CSF 2.0 | ISO/IEC 27001:2022 | Indian regimes |
| --- | --- | --- | --- | --- |
| File Sharing | Peer-to-peer file-sharing observed on corporate networks | PR.AA, GV.PO | A.5.10, A.8.12 | Sectoral acceptable-use expectations |
| Exposed Credentials | Organizational credentials appearing in known breach corpora | PR.AA, ID.RA | A.5.17, A.8.5 | DPDP (where personal data is implicated); CERT-In (where it indicates an incident) |

**Care point:** Exposed-credential data concerns identifiable individuals. Handle it under the DPDP
Act, 2023 — minimise what you extract, don't reproduce credential values in any output, and don't
name individuals where a count answers the question.

---

## Public Disclosure

| Risk vector | What it evidences | NIST CSF 2.0 | ISO/IEC 27001:2022 | Indian regimes |
| --- | --- | --- | --- | --- |
| Security Incidents | Publicly disclosed breaches attributed to the organization | ID.RA, RS.MA, RC.RP | A.5.24, A.5.26 | CERT-In (reporting); DPDP (personal-data breach); sectoral disclosure expectations |

---

## Cross-cutting: the portfolio itself as evidence

Continuous third-party monitoring is itself a control activity, independent of any single vector:

| Activity | NIST CSF 2.0 | ISO/IEC 27001:2022 | Indian regimes |
| --- | --- | --- | --- |
| Continuous monitoring of third parties' external posture | GV.SC, ID.RA | A.5.19, A.5.20, A.5.21, A.5.22 | RBI outsourcing/IT governance; SEBI cybersecurity framework; IRDAI outsourcing & cyber guidelines |
| Pre-contract due diligence on a vendor | GV.SC, ID.RA | A.5.19, A.5.20 | RBI/SEBI/IRDAI third-party due-diligence expectations |
| Evidence retention for supervisory review | GV.OV, GV.SC | A.5.19, A.5.22 | CERT-In log-retention direction; sectoral record-keeping expectations |

---

## Indian regimes — orientation notes

Short, non-exhaustive context. Applicability is always entity-specific.

- **CERT-In Directions (2022)** — covered entities must report specified cyber incidents within
  **6 hours** of noticing them, and retain ICT logs for a rolling period within India. Ratings data
  can evidence *monitoring*; it does not discharge a reporting obligation and does not tell you
  whether one has arisen.
- **DPDP Act, 2023** — engaged wherever outputs touch personal data of data principals. Purpose
  limitation and minimisation apply to what you extract and retain from findings, especially
  exposed-credential data.
- **RBI** — IT governance, risk, controls and assurance expectations, and outsourcing norms for
  regulated entities, which include third-party risk assessment and ongoing monitoring.
- **SEBI** — the cybersecurity and cyber-resilience framework for regulated market entities,
  including third-party and vendor-risk provisions.
- **IRDAI** — information and cybersecurity guidelines for insurers and intermediaries, including
  outsourcing risk.

For each of these, the correct output is *"here is the observed evidence relevant to this obligation
area"* — never *"you are compliant with X"*.

---

© 2026 BitScore Cybertech LLP. "Bitsight" is a registered trademark of Bitsight Technologies, Inc.;
this plugin is an independent integration and is not published by Bitsight. Framework and regulatory
names are the property of their respective bodies; references here are indicative only.
