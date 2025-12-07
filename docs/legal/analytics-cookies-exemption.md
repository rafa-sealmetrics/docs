---
sidebar_position: 2
title: "Analytics Cookies: Consent Exemption Requirements"
description: "AEPD and EU guidance on when analytics cookies are exempt from consent requirements"
keywords: [analytics cookies, consent exemption, AEPD, Spanish DPA, cookie consent, GDPR analytics, first-party analytics]
---

# Analytics Cookies: Consent Exemption Requirements

Analytics cookies can be exempt from consent requirements under specific conditions defined by EU data protection authorities, including Spain's AEPD (Agencia Española de Protección de Datos). This guide explains when analytics tools can operate without cookie banners and what requirements must be met.

## Legal Framework

### ePrivacy Directive Article 5(3)

**Current rule** (until EU Digital Omnibus takes effect):

Storage of information or accessing information stored in terminal equipment requires **consent**, except when:

> "The sole purpose is to carry out the transmission of a communication over an electronic communications network, or as strictly necessary in order for the provider of an information society service explicitly requested by the subscriber or user to provide the service."

**Key question**: Do analytics cookies qualify as "strictly necessary" for the service explicitly requested?

### Evolving Interpretation

Data protection authorities across the EU have developed guidance on when analytics qualifies for exemption. The most detailed frameworks come from:

- **CNIL** (France) - First to publish analytics exemption criteria (2020, updated 2024)
- **AEPD** (Spain) - Adopted similar framework (2024)
- **ICO** (UK) - Post-Brexit guidance on analytics cookies
- **EDPB** - European-level guidance on cookies and similar technologies

## AEPD Requirements (Spain)

### Compliance Deadline

**January 11, 2024**: Organizations using analytics cookies must comply with AEPD requirements or obtain consent.

### Three Core Requirements for Exemption

To qualify for consent exemption, **all three** conditions must be met:

#### 1. User Notification

**Requirement**: Inform users of analytics cookie use through privacy policy

**Implementation**:
- Clear statement in privacy policy
- Description of analytics purposes
- What data is collected
- Retention periods
- Rights of data subjects

**Not required**:
- Cookie banner for exempt analytics
- Active user consent
- Granular cookie preferences (for exempt cookies only)

#### 2. Cookie Lifespan Limitation

**Requirement**: Limit cookies' lifespan to **13 months** maximum

**Key details**:
- No automatic renewal on new visits
- Cookie expires after 13 months from placement
- If user returns after expiration, new consent would be required (if cookie were subject to consent)
- For exempt analytics, new cookie can be placed after expiration

**Technical implementation**:
```javascript
// Example: Setting 13-month expiry
const expires = new Date();
expires.setMonth(expires.getMonth() + 13);
document.cookie = `analytics_id=value; expires=${expires.toUTCString()}; path=/`;
```

#### 3. Data Retention Cap

**Requirement**: Ensure data retention does not exceed **25 months**

**What this means**:
- Raw analytics data must be deleted or anonymized after 25 months
- Aggregated reports can be retained indefinitely (no personal data)
- Applies to data collected via cookies, not just cookies themselves

**Example timeline**:
- Month 0: Cookie placed
- Month 13: Cookie expires (can be renewed on next visit)
- Month 25: All raw data from original cookie must be deleted

### Permitted Analytics Activities

The AEPD identifies specific measurements that may qualify for exemption:

#### Traffic and Performance Statistics

**Permitted**:
- Total page views
- Unique visitors (counted, not tracked cross-session)
- Pages visited
- Referrer information (where visitor came from)
- Entry and exit pages
- Bounce rate (aggregated)
- Time on page (aggregated)
- Device type, browser, screen size
- Geographic location (country/region level)
- Page load time statistics
- Scroll depth (aggregated)
- User actions: clicks, selections (aggregated)

**Key principle**: Statistics for **publisher's own use** to understand and improve their website.

### Prohibited Uses (Require Consent)

**Not exempt**:
- Cross-site tracking
- User profiling for advertising
- Sharing analytics data with third parties for their purposes
- Retargeting or remarketing
- Behavioral advertising
- Matching analytics data with other datasets for non-analytics purposes
- Tracking users across multiple websites or apps
- Building individual user profiles over time

### Third-Party Analytics Service Requirements

When using external analytics providers (e.g., Google Analytics, Matomo hosted service), additional guarantees required:

#### 1. Documented Tool Configuration Evaluation

**Requirement**: Written assessment demonstrating analytics tool is configured for exemption compliance

**Must document**:
- Which features are enabled/disabled
- Data sharing settings
- IP anonymization implementation
- Cross-site tracking disabled
- Advertising features disabled
- Data retention settings

#### 2. Contractual Commitment Not to Reuse Data

**Requirement**: Contract with analytics provider must prohibit using data for provider's own purposes

**Data Processing Agreement must include**:
- Provider acts as processor only (GDPR Article 28)
- Data used solely for providing analytics service to controller
- No independent use of data by provider
- No sharing with other clients or third parties
- No use for improving provider's own products

#### 3. GDPR Compliance for Data Transfers

**Requirement**: If data transferred outside EU, must comply with GDPR Chapter V

**Mechanisms**:
- Standard Contractual Clauses (SCCs)
- Adequacy decision (if available)
- Additional safeguards per Schrems II

**Practical impact**: Google Analytics transfers to US have been problematic; providers keeping data in EU are safer.

## Comparison with CNIL (France)

### CNIL Exemption Criteria

The French DPA (CNIL) developed similar framework:

**CNIL-recognized compliant tools**:
- AT Internet
- Matomo (self-hosted in exempt mode)
- Piano Analytics
- Others meeting criteria

**Key difference from AEPD**: CNIL publishes list of approved tools; AEPD does not (organizations must self-assess).

### CNIL vs. AEPD Requirements

| Aspect | CNIL | AEPD |
|--------|------|------|
| **Cookie lifespan** | 13 months | 13 months |
| **Data retention** | 25 months | 25 months |
| **IP anonymization** | Required (at collection) | Implied by data minimization |
| **Cross-site tracking** | Prohibited | Prohibited |
| **Own purposes only** | Required | Required |
| **Third-party guarantees** | Required | Required |
| **Approved vendor list** | Yes (published) | No |

**Convergence**: Both authorities follow similar principles; organizations compliant with CNIL likely compliant with AEPD.

## Google Analytics Compliance

### Google Analytics 4 (GA4)

**Can GA4 be exempt from consent?**

**Likely NO** under AEPD/CNIL frameworks without significant configuration changes:

**Problems with default GA4**:
1. **Data sharing with Google**: Data used by Google for its own purposes (improving products, advertising)
2. **Cross-property tracking**: Tracks users across sites using same GA4 property
3. **Google Signals**: Links analytics to Google account data (advertising integration)
4. **US data transfers**: Data transferred to US (Schrems II concerns)
5. **No full IP anonymization at collection**: IP addresses processed before anonymization

**Could GA4 ever be exempt?**

**Theoretically yes, if**:
- Disable all data sharing with Google
- Disable Google Signals
- Disable all advertising features
- Implement strict IP anonymization
- Ensure data stays in EU
- Obtain contractual commitment from Google not to reuse data

**Practically**: Very difficult; Google's business model conflicts with exemption requirements.

**AEPD position**: No explicit statement, but exemption requirements effectively exclude default GA4.

### Universal Analytics (Deprecated)

**Status**: Sunset July 1, 2023

**Historical note**: Even with IP anonymization, Universal Analytics faced similar challenges for consent exemption.

## Compliant Analytics Solutions

### Characteristics of Exempt Analytics

**Requirements for consent exemption**:

✅ **First-party only**: Data collected directly by website owner
✅ **No cross-site tracking**: Data not matched across domains
✅ **No user profiling**: No individual behavioral analysis over time
✅ **No data sharing**: Data not shared with third parties for their purposes
✅ **Aggregated measurement**: Statistics, not individual tracking
✅ **Own purposes**: Used solely by website owner to understand their site
✅ **13-month cookies**: Cookie lifespan limited
✅ **25-month retention**: Raw data deleted after 25 months
✅ **IP anonymization**: IP addresses not stored or processed beyond necessary

### Examples of Compliant Approaches

#### Self-Hosted Matomo (Exempt Configuration)

**Why compliant**:
- Self-hosted (full data control)
- IP anonymization at collection
- No cross-site tracking
- No data sharing
- First-party cookies only

**Required configuration**:
- Enable IP anonymization (at least last 2 octets)
- Disable user tracking across sites
- Set cookie lifetime to 13 months
- Set data retention to 25 months
- No third-party integrations

#### Sealmetrics

**Why compliant**:
- Cookieless by design (no cookie lifespan issue)
- First-party data only
- No cross-site tracking
- No individual user profiling
- Aggregated measurement
- Data not shared with third parties
- Used solely for client's own analytics

**Alignment with AEPD**:
- Meets all AEPD exemption criteria
- No cookie banner required
- Compliant with Digital Omnibus Article 88a(3)(c) when it takes effect

#### Server-Side Analytics

**Why compliant** (if properly configured):
- No client-side cookies needed
- Full control over data processing
- IP anonymization at collection
- No third-party dependencies

**Requirements**:
- Implement IP anonymization in server logs
- Do not track individuals over time
- Aggregate data for statistical purposes only
- 25-month data retention limit

## Practical Implementation Guide

### Step 1: Assess Current Analytics

**Questions to ask**:

1. **What analytics tools are we using?**
   - Google Analytics? Matomo? Custom solution? Sealmetrics?

2. **How is data being used?**
   - Only for our own traffic insights?
   - Shared with advertising platforms?
   - Used for user profiling?

3. **Where is data stored?**
   - EU? US? Elsewhere?
   - Do we control the infrastructure?

4. **What cookies are set?**
   - Lifespan? Purpose? First-party or third-party?

5. **Is data shared with third parties?**
   - Analytics provider's use of data?
   - Integration with ad networks?

### Step 2: Determine Exemption Eligibility

**Checklist for exemption**:

- [ ] Analytics used only for own purposes (understanding our website)
- [ ] No cross-site tracking
- [ ] No individual user profiling for advertising
- [ ] First-party cookies only (if cookies used)
- [ ] Cookie lifespan ≤ 13 months
- [ ] Data retention ≤ 25 months
- [ ] IP addresses anonymized
- [ ] No data sharing with third parties for their purposes
- [ ] If using third-party service: DPA prohibiting data reuse
- [ ] Users informed via privacy policy

**If all checked**: Exemption likely applies (no consent banner needed)

**If any unchecked**: Consent required

### Step 3: Configure Analytics for Compliance

**If using Google Analytics**:
- Consider switching to exempt-eligible alternative
- If keeping GA4: Expect to need consent banner

**If using Matomo**:
- Self-host if possible
- Enable IP anonymization (2 bytes minimum)
- Disable user ID tracking across visits
- Set 13-month cookie, 25-month retention
- Document configuration

**If using Sealmetrics**:
- Default configuration already compliant
- Update privacy policy to mention analytics
- No further action needed

### Step 4: Update Privacy Policy

**Required disclosures**:

```markdown
## Analytics

We use [analytics tool name] to understand how visitors use our website. This helps us improve content and user experience.

**Data collected**:
- Pages visited
- Referrer information
- Device type and browser
- Geographic location (country/region)
- Time spent on pages
- [other specific metrics]

**Purpose**: Website performance analysis and improvement

**Legal basis**: Legitimate interest (GDPR Article 6(1)(f))

**Data retention**: 25 months maximum

**Your rights**: You can object to analytics processing. Contact [email] to exercise your rights.

**Analytics provider**: [If third-party] [Provider name] acts as our data processor and does not use data for their own purposes.
```

### Step 5: Document Compliance

**Maintain records**:
- Configuration settings of analytics tools
- Data Processing Agreement with provider (if applicable)
- Assessment of exemption criteria
- Privacy policy version showing analytics disclosure
- Data retention and deletion procedures

**For audits/complaints**: Be ready to demonstrate:
- Analytics is for own purposes only
- No data sharing beyond necessary processing
- Technical measures (IP anonymization, retention limits)
- User information provided

## Enforcement and Risks

### AEPD Enforcement

**Compliance checks**:
- AEPD can audit analytics implementations
- Requests for configuration documentation
- Assessment of cookie practices

**Penalties for non-compliance**:
- GDPR fines (up to €20M or 4% global revenue)
- Requirement to implement cookie consent banner
- Data deletion orders

**Risk areas**:
- Google Analytics without consent
- Exceeding 25-month retention
- Cross-site tracking without consent
- False claims of exemption

### User Complaints

**Users can file complaints** with AEPD if:
- Analytics cookies placed without consent when required
- Privacy policy inadequate
- Data retention excessive
- Rights not respected

**Best practice**: Be conservative in exemption assessment; when in doubt, obtain consent.

## Timeline: Current Rules vs. Digital Omnibus

### Current (2024)

**Legal basis**: ePrivacy Directive Article 5(3) + AEPD interpretation

**Exemption criteria**: Narrowly interpreted ("strictly necessary" + AEPD requirements)

**Compliance**: Many analytics implementations require consent

### Future (2027-2028, estimated)

**Legal basis**: GDPR Article 88a(3)(c) (Digital Omnibus)

**Exemption criteria**: Explicitly recognized for "aggregated audience measurement for own use"

**Impact**: Broader exemption, clearer legal certainty, more analytics implementations without consent

**Learn more**: [EU Digital Omnibus - Cookie Consent Reform](./omnibus/cookies-eprivacy.md)

### Continuity

Organizations complying with AEPD requirements today will be well-positioned for Digital Omnibus:

**AEPD requirements** (2024):
- Own purposes only ✅
- No cross-site tracking ✅
- No data sharing ✅
- IP anonymization ✅
- Retention limits ✅

**Article 88a(3)(c)** (future):
- Own use only ✅
- Aggregated measurement ✅
- By controller ✅

**Alignment**: AEPD-compliant analytics likely exempt under Digital Omnibus too.

## Related Resources

- [EU Digital Omnibus - Cookie Consent Reform](./omnibus/cookies-eprivacy.md) - Future framework for analytics exemption
- [EU Digital Omnibus - Impact on Analytics](./omnibus/impact-analytics.md) - How Omnibus affects analytics industry
- [GDPR and Cookieless Analytics](./gdpr-cookieless-analytics.md) - GDPR compliance without cookies

## Sources and Further Reading

**AEPD (Spain)**:
- [AEPD Cookie Guidelines](https://www.aepd.es) (Spanish)
- [AEPD Public Administration Web Analytics Guide](https://www.aepd.es/guides/guidelines-cookies-web-analytics-public-administration-websites.pdf)

**CNIL (France)**:
- [CNIL Analytics Exemption Criteria](https://www.cnil.fr/en/cookies-and-other-trackers/rules/cookies/how-comply-cookies-and-trackers)
- [CNIL List of Compliant Tools](https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications)

**EDPB**:
- [EDPB Guidelines 05/2020 on Consent](https://edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en)

**Industry Analysis**:
- [Didomi: Analytics Cookies in Spain](https://www.didomi.io/blog/analytics-cookies-consent-spain-update-aepd)
- [Data Guidance: AEPD Cookie Guide](https://www.dataguidance.com/news/spain-aepd-releases-updated-cookie-guide-line-edpbs-0)

## Key Takeaways

1. **Analytics CAN be exempt from consent** under specific AEPD criteria
2. **Three requirements**: User notification, 13-month cookies, 25-month retention
3. **Own purposes only**: No data sharing, cross-site tracking, or advertising use
4. **Third-party analytics**: Require contractual guarantees against data reuse
5. **Google Analytics**: Difficult to qualify for exemption in default configuration
6. **Compliant alternatives**: Self-hosted Matomo, Sealmetrics, server-side analytics
7. **Privacy policy disclosure**: Required even for exempt analytics
8. **Digital Omnibus alignment**: AEPD-compliant analytics likely exempt under future EU framework
9. **Conservative approach recommended**: When uncertain, obtain consent
10. **Document compliance**: Maintain records of configuration and assessment

Analytics without consent is legally possible—but only when genuinely used for website improvement, not tracking, profiling, or monetization. The AEPD framework provides a clear path for privacy-respecting measurement that aligns with the upcoming Digital Omnibus regulation.
