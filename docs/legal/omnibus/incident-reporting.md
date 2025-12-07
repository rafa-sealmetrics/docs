---
sidebar_position: 7
title: "Single Entry Point for Incident Reporting"
description: "New unified cybersecurity and data breach reporting system operated by ENISA"
keywords: [incident reporting EU, ENISA single entry point, NIS2 reporting, DORA reporting, GDPR breach]
---

# Single Entry Point for Incident Reporting

The EU Digital Omnibus introduces a unified incident reporting system operated by ENISA (European Union Agency for Cybersecurity). This "report once, share many" approach eliminates duplicate submissions across multiple regulations and promises to save businesses millions in compliance costs while improving regulatory response.

## The Current Reporting Nightmare

### Multiple Overlapping Obligations

Organizations operating in the EU face a fragmented landscape of incident reporting requirements:

#### 1. NIS2 Directive (Cybersecurity Incidents)

**Regulation**: Directive (EU) 2022/2555

**Who reports**: Essential and important entities (telecom, energy, transport, healthcare, digital infrastructure, etc.)

**What to report**: Significant cybersecurity incidents

**Timeline**:
- Early warning: Within 24 hours
- Incident notification: Within 72 hours
- Final report: Within 1 month

**To whom**: National CSIRT or competent authority

#### 2. GDPR Article 33 (Data Breaches)

**Regulation**: GDPR (EU) 2016/679

**Who reports**: All data controllers

**What to report**: Personal data breaches posing risk to individuals

**Timeline**: Within 72 hours of becoming aware

**To whom**: Supervisory authority (Data Protection Authority)

**Additional**: Article 34 requires communication to data subjects if high risk

#### 3. DORA (Digital Operational Resilience)

**Regulation**: Regulation (EU) 2022/2554

**Who reports**: Financial entities (banks, insurers, investment firms, payment providers)

**What to report**: Major ICT-related incidents

**Timeline**:
- Initial notification: As soon as possible
- Intermediate reports: As investigation progresses
- Final report: Within specified timeframes

**To whom**: Financial supervisory authorities (EBA, EIOPA, ESMA)

#### 4. eIDAS (Trust Services)

**Regulation**: Regulation (EU) 910/2014

**Who reports**: Qualified trust service providers

**What to report**: Security breaches and incidents affecting trust services

**Timeline**: Within 24 hours

**To whom**: National supervisory body

#### 5. CER Directive (Critical Entities Resilience)

**Regulation**: Directive (EU) 2022/2557

**Who reports**: Critical entities in essential sectors

**What to report**: Incidents affecting critical services

**Timeline**: As defined by Member States

**To whom**: National competent authority

### The Complexity Problem

**For a financial institution operating digital services**:
- NIS2 incident to CSIRT (24-72 hours)
- GDPR breach to DPA (72 hours)
- DORA incident to financial supervisor (immediately)
- Potentially CER report if critical entity

**Result**:
- Four separate reports
- Different formats and platforms
- Different timelines
- Risk of inconsistencies
- Duplication of effort
- Compliance team overwhelmed

**For the business**:
- 4+ hours per incident preparing multiple reports
- Legal review for each submission
- Coordination across compliance, IT, legal teams
- Risk of missing deadlines or providing inconsistent information

**For regulators**:
- Fragmented information
- Difficulty coordinating response
- Duplication across authorities
- Incomplete picture of incident landscape

## The Solution: Single Entry Point

### "Report Once, Share Many"

The Digital Omnibus establishes a **unified incident reporting system** operated by ENISA.

**Core principle**: Organizations submit one report through one interface; ENISA distributes to all relevant authorities.

### How It Works

**Step 1: Single submission**
- Organization determines an incident is reportable under any regulation
- Logs into ENISA single entry point portal
- Completes unified report form
- Indicates which regulations apply (NIS2, GDPR, DORA, etc.)

**Step 2: Automatic routing**
- ENISA system validates submission
- Report is automatically routed to:
  - National CSIRT (if NIS2)
  - Data Protection Authority (if GDPR)
  - Financial supervisor (if DORA)
  - eIDAS supervisor (if trust service)
  - Other relevant authorities
- Secure information sharing protocols ensure confidentiality

**Step 3: Authority access**
- Each authority receives relevant portions of report
- Authorities can access shared information as permitted
- Cross-authority coordination facilitated
- Single source of truth for incident details

**Step 4: Follow-up**
- Updates submitted through same portal
- All authorities automatically notified
- Final reports centralized

### What Organizations Report

**Single unified form** covering:
- Incident description and classification
- Affected systems and data
- Number of individuals affected (if data breach)
- Impact assessment
- Response and mitigation measures
- Timeline of events
- Technical details (as required)

**Smart form**: Only shows fields relevant to applicable regulations
- If GDPR breach: Data subject impact questions appear
- If NIS2 incident: Cybersecurity-specific fields appear
- If DORA: Financial resilience questions appear

### Operated by ENISA

**ENISA (European Union Agency for Cybersecurity)**:
- EU agency responsible for cybersecurity policy and implementation
- Expertise in incident management
- Existing infrastructure (EU CyCLONe network)
- Trusted by Member States and industry

**Technical infrastructure**:
- Secure portal with encryption
- Multi-factor authentication
- API access for automated reporting (optional)
- Integration with existing incident management tools
- Audit logging and access controls

**Support**:
- Technical helpdesk
- Guidance on classification and reporting
- Templates and examples
- Training for compliance teams

## Implementation Timeline

### 18 Months After Entry Into Force

**Deadline**: Approximately Q1 2029 (based on estimated Q3 2027 entry into force)

**What happens**:
- ENISA launches single entry point portal
- Organizations transition to new reporting system
- Authorities integrate with ENISA platform
- Legacy reporting systems remain available during transition

**Possible extension**: Commission may extend deadline to 24 months (Q3 2029) if technical implementation requires more time

### Phased Rollout Expected

**Phase 1 (Months 1-6)**:
- Portal development and testing
- Authority integration
- Pilot with volunteer organizations

**Phase 2 (Months 7-12)**:
- Gradual sector onboarding (likely NIS2 entities first)
- Parallel running with legacy systems
- Feedback and refinement

**Phase 3 (Months 13-18)**:
- Full deployment across all sectors
- Legacy systems phased out
- Mandatory use begins

**Technical specifications**: To be developed by ENISA in consultation with Member States and stakeholders

### Coordination with Member States

**National competent authorities** must:
- Integrate their systems with ENISA portal
- Accept reports via single entry point
- Maintain secure information sharing protocols
- Provide national language support (where required)

**Data protection authorities** must:
- Integrate GDPR breach reporting with single entry point
- Maintain independence (GDPR requirement)
- Ensure confidentiality of personal data in reports

## GDPR Breach Notification Changes

### Threshold Raised to "High Risk"

**Article 33 amendment**: Data breach notification to supervisory authority now required only for **HIGH RISK** breaches.

**Current rule (Article 33)**:
> Notify supervisory authority within 72 hours if breach poses "risk" to rights and freedoms of individuals

**New rule (amended Article 33)**:
> Notify supervisory authority within 72 hours if breach poses "HIGH RISK" to rights and freedoms of individuals

**Impact**: Aligns Article 33 (notification to authority) with Article 34 (communication to data subjects), which already requires "high risk."

### What Constitutes "High Risk"?

**EDPB to create**:
- Common breach notification template
- List of circumstances constituting "high risk"
- Assessment criteria and guidance

**Expected "high risk" factors** (based on current Article 34 guidance):
- Large scale (thousands of individuals)
- Sensitive data (health, financial, credentials, special categories)
- Vulnerable populations (children)
- Severe consequences (identity theft, fraud, discrimination)
- Irreversible harm

**Expected NOT "high risk"**:
- Small-scale incidents (few individuals)
- Non-sensitive data
- Effective mitigating measures already in place
- Technical incidents with no real-world impact
- Isolated events with limited data

### Low-Risk Breaches

**No longer require notification** to supervisory authority if only "risk" (not "high risk").

**Still required**:
- Internal documentation (Article 33(5): all breaches must be documented)
- Investigation and response
- Notification IF situation escalates to high risk
- Accountability and demonstrable compliance

**Benefit**:
- Reduced administrative burden
- Supervisory authorities focus on serious incidents
- Organizations can focus resources on remediation instead of paperwork

### How This Interacts with Single Entry Point

**High-risk GDPR breaches**:
- Reported through ENISA single entry point
- Automatically forwarded to relevant DPA
- DPA receives standardized EDPB template format
- Other authorities (CSIRT, financial supervisors) also notified if applicable

**Low-risk breaches**:
- No reporting to DPA required
- May still be reportable under other regulations (e.g., NIS2 if significant cybersecurity incident)
- Organizations should document why breach was assessed as not high-risk

**Article 34 (data subject communication)**:
- Still required for high-risk breaches
- Timeline and requirements unchanged
- Not handled through ENISA portal (direct communication to individuals)

## Benefits of Single Entry Point

### For Organizations

**Time savings**:
- One report instead of 4+ separate submissions
- Estimated 75% reduction in reporting time per incident
- Faster submission (familiar interface, unified form)

**Cost savings**:
- Reduced legal review costs (single report)
- Less duplication of effort
- Simplified compliance training
- Lower risk of errors or inconsistencies

**Better compliance**:
- Easier to meet deadlines (one timeline instead of multiple)
- Clear guidance on what to report
- Reduced risk of missing an obligation
- Audit trail in single system

**Operational efficiency**:
- Streamlined incident response process
- Centralized records and documentation
- API integration with incident management tools
- Less context-switching between platforms

### For Regulators and Supervisory Authorities

**Complete picture**:
- See all aspects of incident (cyber, data, operational)
- Understand cross-sectoral impacts
- Better situational awareness

**Faster response**:
- Immediate access to incident information
- Real-time coordination with other authorities
- Ability to launch joint investigations
- More effective crisis management

**Resource efficiency**:
- No duplicate intake processes
- Shared technical infrastructure
- Coordinated follow-up and enforcement
- Better data for trend analysis

**Improved oversight**:
- Unified incident statistics
- Cross-sector threat intelligence
- Early warning of systemic issues
- Evidence-based policy making

### For the EU as a Whole

**Cybersecurity resilience**:
- Better understanding of threat landscape
- Faster identification of cross-border incidents
- Coordinated EU-level response
- Shared learning across sectors

**Data protection**:
- DPAs informed of cybersecurity context
- Cyber authorities aware of data protection impacts
- Holistic incident management

**Regulatory efficiency**:
- Reduced burden on businesses
- Better use of public resources
- Harmonized enforcement approach

## Practical Guidance

### Preparing for the Single Entry Point

**Now - Q1 2029 (deadline)**:

**Step 1: Inventory your reporting obligations**
- Which regulations apply to your organization?
- NIS2? GDPR? DORA? eIDAS? CER?
- Who in your organization handles each?

**Step 2: Map current incident response process**
- How do you detect incidents?
- Who assesses reportability?
- What's your current reporting workflow?
- What tools do you use?

**Step 3: Identify integration opportunities**
- Can your incident management tool integrate with ENISA API?
- Do you need to update incident classification?
- How will you assess "high risk" for GDPR?

**Step 4: Update procedures and training**
- Incident response playbooks
- Compliance team training
- Legal review processes
- Communication templates

**Step 5: Monitor ENISA developments**
- Technical specifications publication
- Portal pilot programs
- Industry guidance
- Member State implementation

### Using the Single Entry Point

**When an incident occurs**:

1. **Detect and assess**:
   - Is this reportable under any regulation?
   - NIS2: Significant cybersecurity incident?
   - GDPR: High-risk data breach?
   - DORA: Major ICT incident?
   - Other?

2. **Classify**:
   - Severity level
   - Affected systems/data
   - Number of individuals (if data breach)
   - Potential impact

3. **Report via single entry point**:
   - Log into ENISA portal
   - Select applicable regulations
   - Complete unified form
   - Attach supporting documentation
   - Submit

4. **Meet specific timelines**:
   - NIS2 early warning: 24 hours
   - GDPR/NIS2 full report: 72 hours
   - DORA: As soon as possible
   - System will show relevant deadlines

5. **Follow up**:
   - Submit updates through same portal
   - Respond to authority inquiries
   - Final report when investigation complete

6. **Document**:
   - Save confirmation and report reference
   - Maintain internal records
   - Track authority responses

### GDPR High-Risk Assessment

**Factors to consider** (EDPB guidance expected):

**Scale**:
- How many individuals affected?
- Large numbers increase likelihood of high risk

**Sensitivity**:
- What type of data?
- Special categories (Article 9) = likely high risk
- Financial/health data = likely high risk
- Basic contact info only = likely NOT high risk

**Consequences**:
- Could individuals suffer identity theft?
- Financial loss?
- Discrimination?
- Reputational damage?
- Physical harm?

**Vulnerability**:
- Are data subjects vulnerable (children)?
- Are they in precarious situations?

**Mitigation**:
- Have you implemented effective measures?
- Is data encrypted (keys not compromised)?
- Have you recovered data quickly?

**Rule of thumb**: If you're unsure whether it's "high risk," err on the side of reporting. Better to report a borderline case than miss a high-risk breach.

## Comparison with Other Regions

### United States

**Fragmented landscape**:
- Federal: SEC (securities), HHS (health), FTC (consumer), OCC (banking)
- State: 50+ different data breach notification laws
- No unified reporting system

**Impact**: EU single entry point is major competitive advantage for simplicity

### United Kingdom

**Post-Brexit**:
- Maintains GDPR-like breach notification (ICO)
- Considering unified cybersecurity reporting
- May adopt similar single entry point

### Asia-Pacific

**Varied**:
- Japan: Personal Information Protection Commission
- Australia: Notifiable Data Breaches scheme
- Singapore: Personal Data Protection Commission
- Generally single-regulator systems but no cross-regulatory unification

**EU leadership**: Single entry point across multiple regulations is globally innovative

## Related Resources

- [GDPR Amendments](./gdpr-changes.md) - Details on Article 33 threshold change
- [Timeline and Implementation](./timeline-implementation.md) - When single entry point launches
- [EU Digital Omnibus Overview](./index.md) - Complete regulation guide

## Key Takeaways

1. **Single entry point for all incident reporting** operated by ENISA
2. **"Report once, share many"** eliminates duplicate submissions
3. **Implementation: 18 months** after entry into force (≈Q1 2029)
4. **Possible extension to 24 months** if technical needs require
5. **GDPR threshold raised to "high risk"** (aligns with Article 34)
6. **EDPB to create common template** and high-risk criteria
7. **Major time and cost savings** for organizations (75% reduction in reporting time)
8. **Better regulatory coordination** and incident response
9. **Covers**: NIS2, GDPR, DORA, eIDAS, CER, and future regulations
10. **Prepare now**: Inventory obligations, update procedures, monitor ENISA

The single entry point represents a rare win-win in regulation: businesses save time and money while regulators gain better information and coordination. By eliminating the absurdity of submitting near-identical reports to multiple authorities, the Digital Omnibus demonstrates that simplification and strong oversight are not mutually exclusive—they're mutually reinforcing.
