---
sidebar_position: 9
title: "Implementation Timeline"
description: "Key dates and milestones for Digital Omnibus implementation"
keywords: [Digital Omnibus timeline, EU regulation implementation, GDPR changes timeline]
---

# Implementation Timeline

The EU Digital Omnibus follows a carefully phased implementation schedule that gives businesses and regulators time to adapt while delivering benefits as quickly as possible. This page provides all key dates and milestones.

## Legislative Process

### November 19, 2025: Proposal Published

**Status**: Commission proposal adopted and published as COM(2025) 837 final

**Documents released**:
- Proposed Regulation text
- Explanatory Memorandum
- Staff Working Document (Impact Assessment)
- Annexes (correlation tables, repeals)

**What happened**: European Commission initiated the ordinary legislative procedure under Articles 16 and 114 TFEU.

### 2026: Parliamentary and Council Review

**European Parliament**:
- Committee assignment (likely LIBE for GDPR amendments, ITRE for Data Act)
- Rapporteur appointment
- Draft report and amendments
- Committee vote
- Plenary vote

**Council of the European Union**:
- Working Party examination
- COREPER review
- Council position adoption

**Expected duration**: 12-18 months for first reading positions

### 2026-2027: Trilogue Negotiations

**Trilogue** = informal negotiations between:
- European Parliament
- Council of the European Union
- European Commission (mediator)

**Goal**: Reach compromise text acceptable to both Parliament and Council

**Expected duration**: 6-12 months

**What can change**: Any provision may be amended, deleted, or added during negotiations. Timeline dates may shift.

### Late 2026 or 2027: Final Adoption

**Parliament**: Plenary vote on final compromise text

**Council**: Formal adoption of final text

**Publication**: Official Journal of the European Union (typically 30-60 days after adoption)

**Entry into force**: 20 days after publication in Official Journal

## Entry Into Force

### Estimated: Q3 2027

**Trigger**: 20 days after publication in Official Journal

**What it means**:
- Regulation becomes part of EU law
- Repeals take effect (P2B, FFDR, DGA, ODD)
- Implementation timelines start counting
- Transitional provisions activate

**Note**: This is an estimate based on typical legislative timeline. Actual date depends on legislative process speed.

## Implementation Deadlines

All timelines below are calculated **from entry into force** (estimated Q3 2027).

### 6 Months: Cookie Consent Framework

**Provision**: Article 88a GDPR (cookie consent rules)

**Deadline**: Approximately Q1 2028

**What becomes applicable**:
- Consent exemption for aggregated audience measurement (Article 88a(3)(c))
- Consent exemption for service functionality (Article 88a(3)(b))
- Single-click refuse requirement (Article 88a(4)(a))
- 6-month re-asking prohibition (Article 88a(4)(c))
- No re-asking during valid consent period (Article 88a(4)(b))

**Impact**:
- 60% of cookie banners can be eliminated
- First-party analytics without consent becomes lawful
- Better consent UX where consent is required

**What to do before this deadline**:
- [x] Audit analytics and tracking tools
- [x] Identify exempt vs. consent-required processing
- [x] Update privacy policies
- [x] Implement single-click refuse if keeping banners
- [x] Plan banner removal for exempt processing

**Learn more**: [Cookie Consent Reform](./cookies-eprivacy.md)

### 18 Months: Single Entry Point for Incident Reporting

**Provision**: Single entry point for incident reporting (ENISA-operated)

**Deadline**: Approximately Q1 2029

**Extension possible**: Commission may extend to 24 months if technical implementation requires more time

**What becomes applicable**:
- Unified incident reporting portal
- Single submission satisfies multiple obligations
- ENISA coordinates distribution to relevant authorities
- Secure information sharing between regulators

**What to do before this deadline**:
- [x] Review current incident reporting procedures
- [x] Identify all applicable reporting obligations (NIS2, GDPR, DORA, etc.)
- [x] Prepare for single portal integration
- [x] Update incident response plans
- [x] Train security teams on new process

**Learn more**: [Single Entry Point for Incident Reporting](./incident-reporting.md)

### 24 Months: Website Browser Signal Support

**Provision**: Article 88b(1)-(5) GDPR (machine-readable consent signals)

**Deadline**: Approximately Q3 2029

**What becomes applicable**:
- Websites must accept automated consent signals from browsers
- Websites must accept automated refusal/objection signals
- Controllers must respect user choices communicated via browser

**Exemption**: Media service providers are exempt and can still show consent dialogs

**What to do before this deadline**:
- [x] Monitor European standardisation body standards development
- [x] Prepare technical infrastructure for signal interpretation
- [x] Test compatibility with signal formats
- [x] Update consent management systems
- [x] Plan fallback for users without signal-capable browsers

**Note**: Standards for signal format will be developed during this period. Early preparation recommended.

**Learn more**: [Cookie Consent Reform - Browser Signals](./cookies-eprivacy.md#browser-signals-the-future-of-consent)

### 48 Months: Browser Implementation

**Provision**: Article 88b(6)-(7) GDPR (browser consent controls)

**Deadline**: Approximately Q3 2031

**Who is affected**: Non-SME browser providers

**What becomes applicable**:
- Browsers must provide technical means for users to give consent
- Browsers must provide technical means for users to refuse consent
- Consent/refusal must be automated and machine-readable

**Exemption**: SME browser providers are exempt (browsers from small/medium enterprises)

**Major browsers affected**:
- Google Chrome
- Apple Safari
- Microsoft Edge
- Mozilla Firefox
- Opera (if not SME)

**User impact**: Users will be able to set privacy preferences once in their browser, which will be automatically communicated to websites.

**Timeline reasoning**: 48 months gives browser vendors ample time to:
- Participate in standards development
- Design user interfaces
- Implement technical infrastructure
- Test interoperability
- Roll out to billions of users

## Parallel and Related Processes

### Digital Fitness Check (Ongoing)

**Status**: Currently underway

**Scope**: Comprehensive review of EU digital legislation effectiveness

**Regulations under review**:
- Digital Services Act (DSA)
- Digital Markets Act (DMA)
- eCommerce Directive
- Consumer protection rules

**Expected outcome**: Additional simplification proposals in 2026-2027

**Relationship to Omnibus**: Fitness Check may identify further consolidation opportunities beyond what Omnibus already achieves.

### AI Omnibus (Parallel Proposal)

**Document**: COM(2025) 836 (published same day as Digital Omnibus)

**Scope**: Amendments to AI Act (Regulation (EU) 2024/1689)

**Key changes**:
- Extended SME/SMC exemptions for AI compliance
- Simplified conformity assessment
- Reduced documentation burden
- Clarifications on high-risk AI classification

**Relationship to Digital Omnibus**:
- Separate legislative process
- Article 88c in Digital Omnibus references AI Act
- Both proposals work together for coherent AI framework

**Timeline**: Similar to Digital Omnibus (adoption 2026-2027)

### Scheduled Reviews of Related Regulations

#### DMA Review (2026)

**Regulation**: Digital Markets Act (EU) 2022/1925

**Article 33**: Commission must review effectiveness by May 2026

**Topics**:
- Gatekeeper designation criteria
- Effectiveness of obligations
- Need for additional core platform services
- Interoperability requirements

**Potential impact**: May affect how Article 88a consent exemptions interact with DMA requirements

#### DSA Evaluation (2027)

**Regulation**: Digital Services Act (EU) 2022/2065

**Article 91**: Commission report on application by November 2027

**Topics**:
- Platform accountability effectiveness
- Illegal content enforcement
- Transparency requirements
- User redress mechanisms

**Note**: P2B Regulation repeal by Omnibus assumes DSA adequately covers platform-business relationships

#### Data Act Evaluation (2028)

**Regulation**: Data Act (EU) 2023/2854

**Article 48**: Commission evaluation report by September 2028

**Topics** (as consolidated by Omnibus):
- Data access rights effectiveness
- Switching service adoption
- Data intermediation market development
- Public sector data access
- International data access framework

**Note**: This will be first evaluation of consolidated Data Act including absorbed DGA/ODD provisions

#### AI Act Evaluation (2029)

**Regulation**: AI Act (EU) 2024/1689

**Article 112**: Commission evaluation by August 2029

**Topics**:
- High-risk classification effectiveness
- Conformity assessment procedures
- Market surveillance
- Innovation impact
- Need for amendments

**Relationship**: Will evaluate Article 88c implementation (AI processing under GDPR)

## Preparation Timeline for Organizations

### Now - Late 2026: Planning Phase

**Monitor legislative process**:
- Track amendments during Parliament/Council review
- Watch for changes to timelines or provisions
- Engage with industry associations for input

**Conduct readiness assessment**:
- Which provisions affect your organization?
- What changes are needed to systems and processes?
- What are the resource requirements?

**Begin strategic planning**:
- Cookie banner strategy (remove vs. keep vs. hybrid)
- Analytics tool evaluation
- Data governance framework updates

### Late 2026 - Q3 2027: Pre-Implementation

**Finalize compliance strategy** based on adopted text:
- Detailed gap analysis
- Implementation roadmap
- Budget allocation
- Vendor selection (if needed)

**Update policies and procedures**:
- Privacy policies
- Cookie policies
- Data processing agreements
- Internal compliance manuals

**Training preparation**:
- Identify training needs
- Develop materials
- Schedule sessions

### Q3 2027 - Q1 2028: Article 88a Preparation

**Deadline**: 6 months after entry into force

**Critical actions**:
- [x] Implement Article 88a(3)(c) exemptions
- [x] Remove unnecessary cookie banners
- [x] Update consent mechanisms if retaining banners
- [x] Single-click refuse implementation
- [x] Privacy policy updates
- [x] User communication about changes

**Testing and validation**:
- Consent flow testing
- Analytics implementation verification
- Cross-browser compatibility
- Mobile experience

### Q1 2028 - Q1 2029: Incident Reporting Preparation

**Deadline**: 18 months after entry into force (possibly 24)

**Critical actions**:
- [x] Monitor ENISA portal development
- [x] Update incident response procedures
- [x] Integrate with single entry point
- [x] Train security and compliance teams
- [x] Test reporting workflows

### Q1 2029 - Q3 2029: Browser Signal Preparation

**Deadline**: 24 months after entry into force

**Critical actions**:
- [x] Implement European standards for signal interpretation
- [x] Update consent management platforms
- [x] Test signal handling
- [x] Fallback mechanisms for non-supporting browsers
- [x] User communication about browser-based consent

**Monitor**:
- Standards publication by European standardisation bodies
- Browser vendor implementation progress
- Industry best practices emerging

### Q3 2029 - Q3 2031: Browser Implementation Phase

**Deadline**: 48 months after entry into force (for browsers)

**For website operators**:
- Monitor browser adoption rates of consent controls
- Adapt to changing user behavior (more browser-level blocking)
- Optimize consent strategies for new landscape

**For browser vendors**:
- Standards implementation
- User interface design
- Testing and rollout
- User education

## Risk Factors and Contingencies

### Legislative Process Delays

**Risk**: Trilogue negotiations extend beyond expected timeframe

**Impact**: Later entry into force, shifted implementation deadlines

**Mitigation**: Begin planning based on proposal text; adjust timeline as final text approaches

### Technical Standard Delays

**Risk**: European standardisation bodies take longer than expected to develop browser signal standards

**Impact**: Difficulty implementing Article 88b compliance

**Mitigation**: 24-month website deadline provides buffer; participate in standards development; prepare flexible implementation

### Compliance Challenges

**Risk**: Ambiguities in final text create interpretation difficulties

**Impact**: Uncertain compliance pathways

**Mitigation**: Monitor EDPB and Commission guidance; engage with supervisory authorities; participate in industry coordination

### Market Readiness

**Risk**: Consent management platforms slow to update for Article 88b

**Impact**: Organizations struggle to meet deadlines

**Mitigation**: Early vendor engagement; evaluate multiple solutions; plan custom development if needed

## Quick Reference: Key Dates

| Milestone | Estimated Date | Description |
|-----------|----------------|-------------|
| **Proposal published** | Nov 19, 2025 | Commission proposes Digital Omnibus |
| **Parliament/Council review** | 2026 | First reading, amendments, debate |
| **Trilogue negotiations** | 2026-2027 | Parliament-Council compromise |
| **Final adoption** | Late 2026 or 2027 | Final votes by Parliament and Council |
| **Publication** | 30-60 days after adoption | Official Journal publication |
| **Entry into force** | 20 days after publication | Estimated Q3 2027 |
| **Article 88a deadline** | EIF + 6 months | Estimated Q1 2028 |
| **Single entry point** | EIF + 18 months | Estimated Q1 2029 (ext. Q3 2029) |
| **Article 88b websites** | EIF + 24 months | Estimated Q3 2029 |
| **Article 88b browsers** | EIF + 48 months | Estimated Q3 2031 |

**EIF** = Entry Into Force

**Note**: All dates are estimates based on typical EU legislative timelines. Actual dates will be confirmed once the Regulation is adopted and published.

## Tracking the Process

### Official Sources

**EUR-Lex**: Proposal and final text
- Search: COM(2025) 837

**European Parliament**: Legislative progress
- Procedure file: Check OEIL database after assignment

**Council**: Council positions
- Public register: Consult document register

**EDPB**: Data protection guidance
- Website: edpb.europa.eu

**ENISA**: Incident reporting portal
- Website: enisa.europa.eu

### What to Watch For

**Amendments during legislative process**:
- Changes to timelines (longer or shorter)
- New exemptions or obligations
- Scope adjustments

**Commission delegated/implementing acts**:
- Technical specifications for browser signals
- Common breach notification template
- High-risk breach criteria

**Supervisory authority guidance**:
- EDPB guidelines on Articles 88a/88b
- National DPA positions
- Enforcement priorities

## Related Resources

- [Cookie Consent Reform](./cookies-eprivacy.md) - Details on Articles 88a and 88b
- [Single Entry Point for Incident Reporting](./incident-reporting.md) - ENISA portal details
- [GDPR Amendments](./gdpr-changes.md) - All GDPR changes in Omnibus
- [EU Digital Omnibus Overview](./index.md) - Complete regulation guide

## Key Takeaways

1. **Entry into force estimated Q3 2027** (20 days after Official Journal publication)
2. **Most urgent: Article 88a at 6 months** (cookie consent framework)
3. **Phased implementation**: 6, 18, 24, and 48-month deadlines
4. **Browser signals in two stages**: Websites (24 months), browsers (48 months)
5. **Legislative process ongoing**: Final text and dates may change during 2026-2027 negotiations
6. **Begin planning now**: Don't wait for final adoption to assess impact
7. **Monitor official sources**: EUR-Lex, Parliament, Council, EDPB, ENISA

The phased timeline reflects the complexity of the changes while giving organizations reasonable time to adapt. The shortest deadline (6 months for Article 88a) affects the most organizations but also delivers the biggest benefits—eliminated cookie banners and simplified analytics compliance. Organizations that begin planning now will be well-positioned to capture these benefits as soon as they become available.
