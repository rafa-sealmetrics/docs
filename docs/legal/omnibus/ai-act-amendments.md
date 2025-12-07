---
sidebar_position: 6
title: "AI Act Amendments in the Digital Omnibus"
description: "How the Digital Omnibus simplifies AI compliance and clarifies GDPR-AI intersection"
keywords: [AI Act amendments, AI regulation EU, GDPR AI, AI compliance]
---

# AI Act Amendments in the Digital Omnibus

The EU Digital Omnibus addresses the intersection of AI development and data protection through a new GDPR provision—Article 88c—that provides a clear legal basis for processing personal data in AI system development. This change, combined with special category data safeguards, aims to enable European AI innovation while maintaining strong privacy protections.

## Context: Two Parallel AI Proposals

### Digital Omnibus (COM(2025) 837)

**This proposal** includes:
- GDPR-AI intersection provisions
- New Article 88c (AI processing legitimate interest)
- New Article 9(2)(k) (special categories exception for AI)
- Data protection framework for AI development

**Focus**: How GDPR applies to AI training and operation

### AI Omnibus (COM(2025) 836)

**Separate proposal** published same day includes:
- AI Act simplifications
- SME/SMC exemptions for AI compliance
- Conformity assessment streamlining
- High-risk classification clarifications

**Focus**: AI Act compliance burden reduction

**Relationship**: Both proposals work together for coherent GDPR-AI Act framework; this page focuses on GDPR amendments in Digital Omnibus.

## New Article 88c: Legitimate Interest for AI

### The Legal Basis Problem

**Before Article 88c**:

AI developers faced uncertainty about lawful basis for processing personal data in training and operation:

**Article 6(1)(a) Consent**:
- Impractical for large training datasets (billions of data points)
- Cannot obtain consent from all individuals in web-scraped data
- Consent withdrawal would require model retraining

**Article 6(1)(b) Contract**:
- Not applicable (no contractual relationship with training data subjects)

**Article 6(1)(f) Legitimate interest**:
- Unclear if AI development qualified
- Balance test uncertain
- Regulatory guidance lacking
- Risk of enforcement action

**Result**: Legal uncertainty deterred European AI investment; developers moved to jurisdictions with clearer rules.

### Article 88c: Clear Legal Basis

**New GDPR provision** (full text):

> "Where the processing of personal data is necessary for the interests of the controller in the context of the development and operation of an AI system as defined in Article 3, point (1), of Regulation (EU) 2024/1689 or an AI model, such processing may be pursued for legitimate interests within the meaning of Article 6(1)(f) of Regulation (EU) 2016/679, where appropriate, except where other Union or national laws explicitly require consent, and where such interests are overridden by the interests, or fundamental rights and freedoms of the data subject which require protection of personal data, in particular where the data subject is a child."

**Key components**:

1. **AI system/model development and operation** = legitimate interest
2. **Under Article 6(1)(f)** (not a new legal basis, but explicit recognition)
3. **Balance test still applies** (interests vs. rights)
4. **Exception: Laws requiring consent** (e.g., DMA for gatekeepers)
5. **Special protection for children**

### What Article 88c Covers

**Training AI models**:
- Collecting training data from various sources
- Preprocessing and cleaning datasets
- Training machine learning models
- Validation and testing

**Operating AI systems**:
- Processing inputs through trained models
- Generating outputs and predictions
- Monitoring and improving model performance
- Fine-tuning and updating models

**AI model development**:
- Developing foundation models
- Creating domain-specific models
- Transfer learning and adaptation
- Model evaluation and benchmarking

**Research and development**:
- Experimental AI techniques
- Novel architectures and algorithms
- Safety and alignment research

### What Article 88c Does NOT Override

**Laws explicitly requiring consent**:

**Digital Markets Act (DMA) Article 5(2)**:
- Gatekeepers must obtain consent for combining personal data across core platform services
- Article 88c does NOT exempt gatekeepers from this
- DMA explicitly requires consent → Article 88c exception applies

**Other consent-specific requirements**:
- Sector-specific laws mandating consent
- National laws requiring consent for specific processing

**Fundamental rights balancing**:
- Balance test under Article 6(1)(f) still required
- Rights may override legitimate interest
- No blanket authorization

**Children's data**:
- "In particular where the data subject is a child"
- Higher bar for legitimate interest when children's data involved
- Special safeguards required

## Special Categories of Data (Article 9)

### The Challenge

**Article 9 GDPR**: Special categories (race, ethnicity, health, biometric, genetic, political opinions, religious beliefs, sexual orientation, trade union membership) generally prohibited unless exception applies.

**AI training problem**:
- Web-scraped data may contain special category information
- Image datasets may include faces (biometric data)
- Text may reveal health conditions or political opinions
- Impossible to guarantee 100% exclusion from large datasets

**Before**: Uncertainty whether AI training violated Article 9 if special category data residually processed despite filtering efforts.

### New Article 9(2)(k): Exception for AI

**New exception** added to Article 9(2):

Processing of special categories is permitted if:
1. **Processing is for AI development** (under Article 88c)
2. **Technical measures implemented** to avoid collecting special categories
3. **Data minimization** during source selection, training, testing
4. **Special category data removed or protected** if identified despite safeguards
5. **Only residual processing** (not intentional targeting)

**Key principle**: If you tried to exclude special categories and implemented appropriate measures, residual processing doesn't violate Article 9.

### Required Technical Measures

**During data source selection**:
- Filter datasets for special category indicators
- Exclude sources known to contain sensitive data
- Implement automated screening
- Manual review where feasible

**During training and testing**:
- Data minimization techniques
- Anonymization and pseudonymization
- Differential privacy
- Federated learning (where appropriate)

**If special category data identified**:
- Remove from training set
- Protect through encryption or other safeguards
- Document remediation measures
- Update filtering for future iterations

**Protection against disclosure**:
- Ensure special category data not revealed in model outputs
- Test for memorization and leakage
- Implement output filtering
- Monitor for unintended disclosures

### What This Means in Practice

**Permitted**:
- Training image recognition model on web photos that may include faces (biometric)
  - **If**: Implemented filtering, removed identified faces where possible, model doesn't output special category data
- Training language model on internet text that may mention health
  - **If**: Filtered medical records and health forums, minimized health data, protected residual mentions

**Still prohibited**:
- Intentionally collecting special category data for AI training without Article 9 exception
- Training model specifically on health data without legal basis (research exception, consent, etc.)
- Deliberately targeting special categories without safeguards

**Best practice**:
- Document filtering and minimization efforts
- Maintain audit trails
- Regular testing for special category leakage
- Update safeguards as techniques improve

## Required Safeguards Under Article 88c

Beyond special category measures, Article 88c mandates:

### 1. Appropriate Technical and Organizational Measures

**Technical measures**:
- Data minimization at source selection stage
- Anonymization and pseudonymization
- Encryption and access controls
- Output filtering and monitoring
- Privacy-enhancing technologies (differential privacy, federated learning, secure computation)

**Organizational measures**:
- AI governance frameworks
- Data protection by design and default
- Staff training on privacy-preserving AI
- Vendor management for third-party data
- Regular audits and reviews

### 2. Respect for Data Minimization

**During source selection**:
- Collect only necessary data for AI purpose
- Prefer synthetic data where feasible
- Filter unnecessary personal information
- Limit scope of data collection

**During training/testing**:
- Use only required data points
- Remove or aggregate where possible
- Implement federated or distributed learning
- Avoid overtraining on personal data

### 3. Protection Against Disclosure

**Model outputs**:
- Must not disclose personal data from training set
- Test for memorization (can model reproduce training examples?)
- Implement output sanitization
- Monitor for data leakage

**Model sharing**:
- Ensure models don't encode personal data in parameters
- Model inversion and membership inference protections
- Secure model deployment

### 4. Enhanced Transparency

**To data subjects**:
- Inform about AI processing where feasible
- Explain purposes and logic (to extent possible without IP disclosure)
- Provide meaningful information about automated decision-making
- Accessible privacy policies

**Transparency obligations**:
- Article 13/14 information requirements apply
- Must explain AI training and operation
- Layered approach (summary + details)

**Limitations**:
- Disproportionate effort exemption may apply (amended Article 13)
- Trade secret protections balanced with transparency

### 5. Unconditional Right to Object

**Article 21 GDPR**: Data subjects have right to object to processing under Article 6(1)(f)

**For AI processing**:
- **Unconditional right to object** to processing of their data for AI purposes
- Controller must stop processing that individual's data
- Includes removal from training sets (to extent feasible)
- No requirement to prove "particular situation" (unlike normal Article 21(1))

**Practical challenges**:
- Identifying specific data subject's data in large training set
- Removing data from already-trained model (may require retraining)
- Balancing individual rights with model integrity

**Approaches**:
- Maintain source-to-model traceability
- Implement machine unlearning techniques
- Document deletion efforts
- Update future model versions

## Balance Test Still Applies

### Article 6(1)(f) Three-Part Test

Even with Article 88c, the standard legitimate interest assessment applies:

**1. Legitimate interest exists**:
- ✅ Article 88c explicitly recognizes AI development as legitimate interest
- Must still demonstrate specific interest (research, product development, service improvement)

**2. Processing is necessary**:
- Is there a less invasive alternative?
- Can you use synthetic data instead?
- Is anonymized data sufficient?
- Necessity test still required

**3. Balancing test**:
- Controller's interests vs. data subject's rights and freedoms
- Consider: nature of data, context of collection, reasonable expectations, impact on individuals
- Special consideration for children

**Result**: Not every AI processing automatically qualifies; balance test may still tip against processing in high-risk scenarios.

### When Balance May Favor Data Subjects

**High-risk scenarios**:
- AI systems making decisions with severe consequences (credit, employment, law enforcement)
- Large-scale processing of vulnerable populations
- Opaque or unexplainable AI
- Processing special categories at scale
- Children's data for commercial AI

**Safeguards to tip balance**:
- Enhanced transparency
- Stronger technical protections
- Human oversight
- Individual control mechanisms
- Impact assessments

## Coordination with AI Act

### AI Act Risk-Based Framework

**Regulation (EU) 2024/1689** classifies AI systems by risk:

**Prohibited AI**: Banned practices (social scoring, real-time biometric in public, etc.)

**High-risk AI**: Strict requirements (biometric identification, critical infrastructure, education, employment, law enforcement, migration, justice)

**Limited risk AI**: Transparency obligations (chatbots, deepfakes, emotion recognition)

**Minimal risk AI**: No specific requirements

### How Article 88c Interacts

**Article 88c provides GDPR legal basis** for data processing in AI development

**AI Act provides AI-specific requirements** (technical documentation, risk management, human oversight, accuracy, cybersecurity)

**Both must be satisfied**:
- Article 88c → Personal data processing lawful under GDPR
- AI Act → AI system complies with risk-appropriate requirements
- Different regulatory concerns, complementary frameworks

**Example: High-risk employment AI**

**GDPR (Article 88c)**:
- Legitimate interest for AI development
- Balance test (employment decisions impact = high)
- Safeguards: Transparency, data minimization, right to object
- Special categories protection

**AI Act**:
- High-risk classification (employment decisions)
- Requirements: Risk management, data governance, technical documentation, human oversight, accuracy, robustness, cybersecurity
- Conformity assessment
- Registration in EU database

**Both frameworks apply**: AI developer must satisfy GDPR Article 88c AND AI Act high-risk requirements.

## SME/SMC Extensions (via AI Omnibus)

### Extended Compliance Timelines

**AI Omnibus (COM(2025) 836)** proposes:

**For SMEs and SMCs developing AI**:
- Longer deadlines for high-risk AI compliance
- Phased implementation of requirements
- Grace periods for conformity assessment

**Benefit**: Small AI developers have time to build compliance infrastructure without cliff-edge obligations

### Simplified Documentation

**Reduced burden**:
- Lighter technical documentation for SME/SMC high-risk AI
- Proportionate record-keeping
- Simplified conformity assessment procedures

**Coordination**: Works with Article 88c to create viable path for European SME/SMC AI innovation

**Learn more**: [SME and Small Mid-Cap Exemptions](./smes-small-midcaps.md)

## Practical Guidance for AI Developers

### Step 1: Determine if Article 88c Applies

**Your processing qualifies if**:
- ✅ Developing or operating AI system/model
- ✅ Processing personal data as part of AI workflow
- ✅ No other law explicitly requires consent

**Your processing does NOT qualify if**:
- ❌ You're a DMA gatekeeper combining data across core platform services (consent required)
- ❌ Sector-specific law requires consent
- ❌ Not actually developing/operating AI (just using AI tools = different analysis)

### Step 2: Conduct Balance Test

**Document**:
- Your legitimate interest (research, product, service)
- Necessity of personal data processing
- Alternatives considered (synthetic data, anonymization)
- Data subject rights and freedoms impacted
- Safeguards implemented

**Higher bar if**:
- Children's data involved
- High-risk AI system
- Large-scale processing
- Special categories present

### Step 3: Implement Technical Safeguards

**Data minimization**:
- [ ] Filter training data sources
- [ ] Remove unnecessary personal information
- [ ] Prefer aggregated or synthetic data where feasible
- [ ] Document minimization efforts

**Special categories**:
- [ ] Implement automated filtering for special category indicators
- [ ] Remove identified special category data
- [ ] Protect residual data if cannot be fully removed
- [ ] Document measures and exceptions

**Output protection**:
- [ ] Test for memorization and data leakage
- [ ] Implement output filtering
- [ ] Monitor model behavior
- [ ] Regular security assessments

### Step 4: Transparency and Rights

**Information to data subjects**:
- [ ] Update privacy policy for AI processing
- [ ] Explain purposes and logic (Article 13/14)
- [ ] Provide meaningful information about AI
- [ ] Accessible and understandable language

**Right to object**:
- [ ] Implement mechanism to receive objections
- [ ] Process for removing individual's data from training sets
- [ ] Machine unlearning or model retraining procedures
- [ ] Document objection handling

### Step 5: Documentation and Accountability

**Maintain records**:
- Legitimate interest assessment
- Balance test documentation
- Technical safeguards implemented
- Data sources and processing
- Objections and responses
- Special category filtering efforts

**Regular reviews**:
- Update safeguards as technology improves
- Reassess balance test if processing changes
- Monitor regulatory guidance
- Adapt to best practices

## Comparison with Other Jurisdictions

### United States

**No federal AI data protection framework**:
- State laws (CCPA, CPRA, Virginia, Colorado, etc.) vary
- No explicit legitimate interest for AI
- Relies on consent or legitimate business purpose

**EU advantage**: Article 88c provides clear, harmonized legal basis for AI development across 27 Member States

### United Kingdom

**Post-Brexit**:
- Retained GDPR framework
- Considering AI-specific data processing provisions
- Likely to adopt similar approach for competitiveness

### China

**Personal Information Protection Law (PIPL)**:
- Requires consent for most processing (stricter than EU)
- Limited exceptions for AI development
- More restrictive than Article 88c

**EU balance**: Article 88c enables innovation while maintaining safeguards

## Future Developments

### EDPB Guidance Expected

**European Data Protection Board** will likely issue:
- Guidelines on Article 88c application
- Balance test factors for AI processing
- Technical safeguards best practices
- Special categories in AI training
- Right to object implementation

**Timeline**: 2027-2028 (after Omnibus adoption)

### AI Act Implementation

**Parallel implementation**:
- AI Act enforcement begins August 2026 (phased)
- Article 88c effective 6 months after Omnibus entry into force (≈Q1 2028)
- Coordinated guidance from Commission, EDPB, AI Office

### Evolving Technology

**Privacy-enhancing technologies**:
- Differential privacy improvements
- Federated learning maturity
- Synthetic data generation
- Machine unlearning techniques

**Standards development**:
- Technical standards for AI data minimization
- Conformity assessment procedures
- Best practices for safeguards

## Related Resources

- [GDPR Amendments](./gdpr-changes.md) - Complete list of GDPR changes including Article 88c
- [Timeline and Implementation](./timeline-implementation.md) - When Article 88c takes effect
- [SME and Small Mid-Cap Exemptions](./smes-small-midcaps.md) - AI Act SME/SMC extensions
- [EU Digital Omnibus Overview](./index.md) - Complete regulation guide

## Key Takeaways

1. **New Article 88c**: Explicit legitimate interest for AI development and operation
2. **Legal certainty**: Clear GDPR basis for processing personal data in AI training
3. **Balance test still applies**: Not blanket authorization; rights vs. interests
4. **Special categories exception**: Article 9(2)(k) permits residual processing if safeguards implemented
5. **Required safeguards**: Data minimization, output protection, transparency, right to object
6. **Unconditional right to object**: Data subjects can demand removal from AI training
7. **Exception for consent laws**: DMA gatekeepers still need consent
8. **Children's data**: Higher protection standard
9. **Coordination with AI Act**: Both GDPR and AI Act must be satisfied
10. **SME/SMC benefits**: Extended timelines and simplified compliance via AI Omnibus

Article 88c represents Europe's attempt to balance AI innovation with fundamental rights protection. By providing legal certainty through explicit recognition of AI development as a legitimate interest, while maintaining robust safeguards and the balance test, the provision aims to enable European AI competitiveness without sacrificing the GDPR's core protections. The success of this approach will depend on implementation: careful balance testing, effective safeguards, and meaningful enforcement of data subject rights. If executed well, Article 88c could position Europe as the global leader in trustworthy, rights-respecting AI development.
