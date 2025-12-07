---
sidebar_position: 2
title: "GDPR Amendments in the Digital Omnibus"
description: "Detailed analysis of GDPR changes: personal data definition, pseudonymization, AI training, breach notifications"
keywords: [GDPR amendments, personal data definition, pseudonymization EU, data breach notification, GDPR AI]
---

# GDPR Amendments in the Digital Omnibus

The EU Digital Omnibus introduces targeted amendments to the General Data Protection Regulation (GDPR) that clarify ambiguities, reduce compliance burdens, and adapt the framework to new technological realities like artificial intelligence.

Unlike the wholesale repeal of other regulations, the GDPR is **amended, not replaced**—recognizing its fundamental soundness while addressing practical pain points identified since 2018.

## Personal Data Definition Clarified

### The "Reasonably Likely" Standard

The Omnibus amends **Article 4** to codify the Court of Justice of the European Union (CJEU) interpretation of "personal data":

**New standard**: Data is personal when it is **"reasonably likely to be used"** by the holder to identify an individual.

**What this changes:**

**Before**: Uncertainty about whether data is "personal" if identification is theoretically possible but highly impractical.

**After**: Clear standard based on reasonable likelihood, considering:
- Available technical means
- Cost of identification
- Time required
- Practical feasibility

### Entity-Specific Personal Data

**Key principle**: Data that is personal for one entity may NOT be personal for another.

**Example scenario:**

A hospital shares pseudonymized medical records with a research institution:
- **For the hospital**: Personal data (they have the key to re-identify)
- **For the researcher**: NOT personal data (they cannot re-identify)

**Legal consequence**: The researcher is NOT bound by GDPR requirements applicable to personal data processing, as long as they lack the means to re-identify individuals.

### Pseudonymization Clarity

**Article 4 amendments** clarify that pseudonymized data is NOT personal data for a recipient who:
1. Receives the data in pseudonymized form, AND
2. Does not have the means to re-identify the data subject

**Practical impact:**
- Facilitates legitimate data sharing for research
- Reduces compliance burden on recipients of pseudonymized data
- Encourages privacy-enhancing technologies
- Creates legal certainty for data intermediaries

### Commission Implementing Acts on Pseudonymization

**New provision**: The Commission can adopt **implementing acts** specifying:
- Criteria for effective pseudonymization
- Technical techniques and standards
- When pseudonymization provides sufficient protection

**Benefits:**
- Harmonized standards across EU
- Technical guidance for implementation
- Legal certainty for processors
- Promotes interoperability

## Scientific Research Expanded

### New Definition in Article 4

**Scientific research** now explicitly includes:
- Fundamental research
- Applied research
- **Technological development**
- **Demonstration activities**

**Impact**: Broader scope for research exemptions and flexibilities.

### Further Processing Compatibility

**Article 5(1)(b)** clarification: Further processing for scientific research is **compatible with the initial purpose** of data collection.

**What this means:**
- Data collected for one purpose can be used for research
- No need for fresh legal basis
- Simplifies longitudinal studies
- Encourages data reuse for public benefit

### Legitimate Interest for Research

**Article 6(1)(f)** amendment: Processing for scientific research explicitly recognized as a **legitimate interest**.

**Requirements:**
- Balance test still applies
- Data subject rights remain
- Appropriate safeguards required

**Benefit**: Clarifies legal basis for research activities without need for consent in many cases.

### Information Obligation Exemption

When providing information to data subjects would require **disproportionate effort** in a research context, the obligation can be waived.

**Conditions:**
- Legitimate research purpose
- Appropriate safeguards in place
- Public interest considerations

**Example**: Retrospective medical research on decades of patient records where contacting all individuals is impractical.

## AI Training and Development

### New Article 88c: AI Legitimate Interest

The Omnibus introduces **Article 88c**, a dedicated provision for AI system development:

**Core principle**: Processing personal data for AI development and operation is a **legitimate interest** under Article 6(1)(f).

**Full text:**
> "Where the processing of personal data is necessary for the interests of the controller in the context of the development and operation of an AI system as defined in Article 3, point (1), of Regulation (EU) 2024/1689 or an AI model, such processing may be pursued for legitimate interests within the meaning of Article 6(1)(f)..."

### Scope and Limitations

**What Article 88c covers:**
- Training AI models on personal data
- Testing and validating AI systems
- Operating AI systems that process personal data
- Fine-tuning and improving models

**What Article 88c does NOT override:**
- Laws explicitly requiring consent (e.g., DMA requirements for gatekeepers)
- Fundamental rights that override legitimate interests
- Special protections for children
- Article 9 special category data (see below)

**Balance test still required**: The legitimate interest must not be overridden by data subject rights and freedoms.

### Special Categories of Data (Article 9)

**Article 88c addresses special category data** (race, health, religion, etc.):

**Goal**: Avoid processing special categories through technical measures.

**Requirements for AI developers:**
1. **Implement technical measures** during data source selection to avoid collecting special category data
2. **Data minimization** during training and testing
3. **Remove or protect** special category data if identified despite safeguards
4. **Exception**: Special category data processed residually despite safeguards does NOT violate Article 9

**Practical meaning:**
- AI developers must try to filter out sensitive data
- If some sensitive data remains despite best efforts, processing may continue
- Must demonstrate good-faith technical safeguards
- Cannot intentionally target special category data

### Required Safeguards

**Article 88c mandates** "appropriate organisational, technical measures and safeguards":

**Technical measures:**
- Data minimization during source selection
- Filtering and sanitization
- Protection against disclosure of residual data
- Non-disclosure safeguards in model outputs

**Organizational measures:**
- Enhanced transparency to data subjects
- Clear documentation of safeguards
- Regular review and updates

**Unconditional right to object**: Data subjects must have the right to object to processing of their data for AI purposes.

### Impact on AI Industry

**Positive:**
- Legal certainty for AI training
- Legitimate interest basis clearly established
- Harmonized EU-wide approach

**Obligations:**
- Cannot ignore data subject rights
- Must implement technical safeguards
- Must respect objections
- Transparency requirements

**Not a free pass:**
- Balance test applies
- High-risk processing still restricted
- Children's data has additional protection
- DMA gatekeepers still need consent

## Data Breach Notification Threshold

### Raising the Bar to "High Risk"

**Article 33 amendment**: Data breach notification to supervisory authorities now required only for **HIGH RISK** breaches (previously "risk").

**Before**:
- Notify supervisory authority within 72 hours if breach poses "risk" to rights and freedoms
- Resulted in over-notification of minor incidents
- Burdened supervisory authorities with trivial reports

**After**:
- Notify only if "high risk" to rights and freedoms
- Aligns with Article 34 (direct communication to data subjects, which always required "high risk")
- Reduces administrative burden

### What Constitutes "High Risk"?

The **European Data Protection Board (EDPB)** will create:
- Common template for notifications
- List of breach types constituting "high risk"
- Guidance on assessment criteria

**Expected "high risk" scenarios:**
- Large-scale breaches affecting thousands
- Sensitive data (health, financial, credentials)
- Breaches enabling identity theft or fraud
- Data of vulnerable populations (children)
- Breaches with severe consequences

**Not "high risk" (examples):**
- Accidental disclosure of limited non-sensitive data
- Breaches with effective mitigating measures already in place
- Technical incidents with no real-world impact
- Isolated incidents affecting single individuals with minimal data

### Single Entry Point via ENISA

**New centralized reporting**: Breaches can be reported through a **single entry point** managed by ENISA (European Union Agency for Cybersecurity).

**Benefits:**
- Simplified reporting for multi-national controllers
- Consistent format and handling
- Reduced administrative complexity
- Better data for EU-wide security analysis

### Practical Impact

**For controllers:**
- Fewer required notifications
- Focus on genuinely serious incidents
- Reduced compliance costs
- Still must document ALL breaches internally

**For supervisory authorities:**
- Fewer trivial notifications
- Can focus on serious incidents
- Better resource allocation
- Improved oversight quality

## Information Requirements Simplified

### Article 13 Exemption for Low-Risk Processing

**New Article 13 provision**: Controllers need NOT provide information to data subjects when **BOTH** conditions are met:

**Condition (a)**: Data subject likely already has the information

**Condition (b)**: Processing is NOT high-risk

**Who benefits:**
- Small business operators (craftspeople, hairdressers)
- Local service providers (sports clubs, community organizations)
- SMEs with straightforward processing
- Public authorities for routine operations

**Example scenarios:**

✅ **Hairdresser appointment book**: Customer knows their name and phone number are recorded for appointments. Low risk. No privacy notice needed.

✅ **Local sports club membership**: Members obviously know the club has their contact info. Low risk. Simplified or no notice acceptable.

❌ **Online health monitoring service**: High-risk processing. Full Article 13 notice required.

❌ **Customer profiling for marketing**: Data subject may not know extent of processing. Full notice required.

### What This Changes

**Before**: Every processing activity, no matter how trivial, required detailed Article 13 information.

**After**: Proportionate approach recognizing low-risk, obvious processing.

**Safeguards:**
- Only for genuinely low-risk processing
- Data subject must reasonably expect the processing
- All other GDPR requirements still apply
- Data subject rights remain fully enforceable

## Right of Access: Abusive Requests

### Article 12 Amendment

**New provision**: Controllers can **refuse abusive access requests** where the request is made for purposes other than data protection.

**What constitutes "abusive":**
- Litigation harassment
- Commercial intelligence gathering
- Competitor research disguised as access requests
- Repeated requests with no legitimate data protection purpose
- Requests clearly aimed at disrupting business operations

### Lower Burden of Proof

**Key change**: **Lower burden of proof** for controllers to demonstrate that a request is abusive.

**Before**: Controllers had to clearly prove abuse, often difficult in practice.

**After**: Reasonable indications of abuse are sufficient to justify refusal.

**Safeguards:**
- Must still be genuine abuse (not simply inconvenient)
- Data subjects can challenge refusal
- Supervisory authorities can review
- Cannot be used to deny legitimate requests

### Impact

**For controllers:**
- Protection against weaponized access requests
- Reduced costs from abusive requesters
- Can focus resources on legitimate requests

**For data subjects:**
- Legitimate requests still fully protected
- No impact on genuine exercise of rights
- Challenge mechanism if unfairly refused

## Automated Decision-Making

### Article 22 Clarification

**Article 22** has been clarified regarding the "necessary for contract" exception:

**Old ambiguity**: Could automated decisions be "necessary for contract" only if human decision-making was impossible?

**New clarity**: The fact that a **human could make the decision does NOT prevent** automated processing from being "necessary for the contract."

**What this means:**

✅ **Credit decisions**: Automated credit scoring can be "necessary for contract" even though humans could theoretically assess creditworthiness.

✅ **Fraud prevention**: Automated fraud checks are permissible even if manual review is possible.

✅ **Pricing algorithms**: Dynamic pricing based on automated analysis can be necessary for the service model.

**Limits:**
- Must still be genuinely necessary for the specific contract
- Cannot be arbitrary
- Data subject rights (explanation, human review) remain
- Transparency requirements apply

**Not a blanket authorization**: Controllers must still demonstrate the automated decision-making is necessary for the specific contractual relationship, not just convenient.

## Summary of GDPR Amendments

| Amendment | Article | Impact |
|-----------|---------|--------|
| **Personal data definition** | Article 4 | "Reasonably likely" standard; entity-specific determination |
| **Pseudonymization** | Article 4 | Clarity on when pseudonymized data is not personal; Commission implementing acts |
| **Scientific research definition** | Article 4 | Includes tech development and demonstration |
| **Research compatibility** | Article 5(1)(b) | Further processing for research is compatible |
| **Research legitimate interest** | Article 6(1)(f) | Research explicitly recognized as legitimate interest |
| **Information exemption** | Article 13 | No notice needed if data subject has info AND low-risk |
| **Abusive access requests** | Article 12 | Lower burden to refuse abusive requests |
| **Automated decisions** | Article 22 | "Necessary for contract" doesn't require automation to be only option |
| **Breach notification** | Article 33 | Threshold raised to "high risk" only |
| **AI processing** | Article 88c (new) | Legitimate interest for AI development; safeguards required |
| **Cookie consent** | Article 88a (new) | Unified GDPR framework for terminal storage |
| **Browser signals** | Article 88b (new) | Machine-readable consent preferences |

## Related Resources

- [Cookie Consent Reform](./cookies-eprivacy.md) - Details on Articles 88a and 88b
- [Impact on Web Analytics](./impact-analytics.md) - How amendments affect analytics
- [EU Digital Omnibus Overview](./index.md) - Complete regulation guide

## Key Takeaways

1. **Personal data definition clarified** with "reasonably likely" standard from CJEU case law
2. **Pseudonymization promoted** with clarity on when data is no longer personal
3. **Scientific research expanded** in definition and flexibilities
4. **AI training has legal basis** via Article 88c legitimate interest
5. **Breach notifications reduced** to high-risk incidents only
6. **Information requirements simplified** for low-risk, obvious processing
7. **Abusive access requests** can be refused with lower burden of proof
8. **Automated decision-making** clarified for contractual necessity

These amendments preserve the GDPR's core privacy protections while addressing practical implementation challenges identified over six years of application. The result is a more workable framework that reduces unnecessary compliance burdens without compromising data subject rights.
