---
sidebar_position: 10
title: "Impact on Web Analytics and Tracking"
description: "How the Digital Omnibus affects web analytics, consent requirements, and consentless tracking solutions"
keywords: [web analytics EU, consentless analytics, GDPR analytics, cookie-free tracking, privacy-first analytics]
---

# Impact on Web Analytics and Tracking

The EU Digital Omnibus fundamentally reshapes the web analytics landscape. By creating a clear exemption for aggregated audience measurement, the regulation validates privacy-first analytics while maintaining restrictions on invasive tracking.

This page analyzes how the Omnibus affects different analytics approaches, who wins and loses, and what website operators should do to prepare.

## The Current Analytics Landscape

### Pre-Omnibus Reality

**Cookie banners everywhere:**
- Approximately 41% of EU websites display cookie banners
- Most analytics tools trigger consent requirements
- Even basic traffic measurement often requires banners

**High rejection rates:**
- 26% of users click "reject all"
- 54% accept without reading (consent fatigue)
- Result: Incomplete or unreliable data

**Data loss from consent denial:**
- Missing traffic from 20-30% of visitors
- Skewed analytics (privacy-conscious users underrepresented)
- Difficulty measuring true website performance
- Business decisions based on incomplete data

**Complex compliance burden:**
- Legal review of cookie policies
- Consent Management Platform (CMP) implementation
- Regular audits of tracking tools
- Vendor assessments and Data Processing Agreements
- Average cost: €400-€5,000+/year depending on site size

### The Analytics Consent Dilemma

Website operators face a difficult choice:

**Option 1: Require consent for analytics**
- ❌ Lose 20-30% of traffic data
- ❌ Cookie banner costs
- ❌ Poor user experience
- ✅ Use full-featured analytics tools

**Option 2: Skip analytics to avoid consent**
- ✅ No cookie banner needed
- ✅ Better user experience
- ❌ Fly blind (no performance data)
- ❌ Cannot optimize conversion, content, or UX

**Option 3: Use consentless analytics**
- ✅ No cookie banner
- ✅ Complete traffic data
- ⚠️ Limited features vs. traditional tools
- ⚠️ Legal uncertainty (until now)

## What the Omnibus Changes for Analytics

### The Game-Changing Exemption

**Article 88a(3)(c)** provides a clear legal basis for audience measurement:

> "Creating aggregated information about the usage of an online service to measure the audience of such a service, where it is carried out by the controller of that online service solely for its own use"

**No consent required when:**
1. ✅ Data is **aggregated** (not individual user tracking)
2. ✅ Processing is by the **controller** (website owner)
3. ✅ For the controller's **own use only** (not shared/sold)

### What "Aggregated" Means

**Permitted under exemption:**
- Total page views
- Unique visitors (counted, not tracked)
- Traffic sources (referrer data)
- Geographic location (country/city level)
- Device types and browsers
- Popular pages and content
- Conversion funnels (aggregate)
- Session duration statistics

**Still requires consent:**
- Individual user journey tracking across sessions
- User-level behavioral profiles
- Cross-device tracking
- Persistent user identifiers for non-aggregate purposes
- Retargeting pixels
- Detailed individual-level analytics

**The distinction**: You can **measure the audience** (how many, from where, what they view) without **tracking individuals** (who specifically, what they do over time).

### What "Controller's Own Use" Means

**Permitted:**
- Analyzing traffic to your own website
- Understanding your audience demographics
- Measuring content performance
- Optimizing user experience
- Internal business intelligence

**Requires consent:**
- Sharing analytics data with third parties
- Selling audience insights to advertisers
- Cross-site tracking networks
- Data brokers aggregating across properties
- Advertising platforms using data for targeting

**Key test**: If analytics data never leaves your control and is only used to understand your own service, you're likely exempt.

### First-Party vs. Third-Party Analytics

**First-party analytics (typical exemption scenario):**
- Analytics code on your own domain
- Data stored by you (or processor acting on your behalf)
- Data used only for your own insights
- **Result: NO CONSENT NEEDED**

**Third-party analytics (usually needs consent):**
- Analytics provider tracks across multiple sites
- Provider uses data for their own purposes (ad networks, benchmarking)
- Data shared with other parties
- Cross-site tracking and profiling
- **Result: CONSENT REQUIRED**

**Important nuance**: Using a third-party analytics **tool** is fine if:
- You remain the controller
- Provider is your processor (GDPR Article 28)
- Data is not shared beyond processing your site
- Provider doesn't use your data for their purposes

**Example:**
- ✅ **Sealmetrics**: First-party, consentless, data not shared = EXEMPT
- ✅ **Self-hosted Matomo**: First-party, your data only = EXEMPT
- ⚠️ **Google Analytics 4** (configured for no data sharing): Likely exempt if properly configured
- ❌ **Google Analytics with ads features**: Needs consent (data used for advertising)
- ❌ **Facebook Pixel**: Needs consent (cross-site tracking, ad targeting)
- ❌ **Ad network tracking**: Needs consent (third-party profiling)

## Winners and Losers

### Winners

#### 1. Consentless Analytics Providers

Platforms that already operate under privacy-first principles are **validated and advantaged**:

**Characteristics:**
- No cookies or cookieless design
- First-party data collection
- Aggregated measurement focus
- No cross-site tracking
- No data sharing or selling

**Examples:**
- Sealmetrics
- Plausible Analytics
- Fathom Analytics
- Simple Analytics
- Self-hosted Matomo (privacy mode)

**Advantage**: These tools are already compliant with Article 88a(3)(c) and can market "no consent needed under EU Digital Omnibus."

#### 2. First-Party Data Solutions

**Server-side analytics:**
- Data processed on website's own servers
- Complete control over data
- No third-party dependencies
- Naturally fits "controller's own use" requirement

**Data warehouses and BI tools:**
- Tools that aggregate first-party data
- Business intelligence platforms
- Internal analytics dashboards

#### 3. Privacy-by-Design Platforms

**Privacy-enhancing technologies (PETs):**
- Differential privacy
- Federated analytics
- On-device computation
- Aggregated-only outputs

These technologies align perfectly with the "aggregated measurement" exemption.

#### 4. Website Operators (Small to Medium)

**Small businesses and SMEs:**
- Can finally get analytics without cookie banner costs
- No CMP subscription needed (€400-€2,000/year savings)
- No legal review expenses
- Simplified compliance

**Content publishers:**
- Understand audience without consent barriers
- Optimize content based on complete data
- Improve user experience (no banners)

**Public sector:**
- Government websites can measure usage
- Universities and research sites simplified
- Public services more accessible

### Losers

#### 1. Cross-Site Tracking Networks

**Ad tech platforms relying on third-party cookies:**
- Still require consent under Article 88a(3)(c)
- Cannot benefit from audience measurement exemption
- Browser signal adoption will further impact them

**Behavioral advertising networks:**
- Cross-site profiling requires consent
- Retargeting pixels need consent
- Audience segmentation across properties needs consent

#### 2. Third-Party Cookie-Dependent Solutions

**Traditional analytics with data sharing:**
- Google Analytics with advertising features
- Analytics platforms that benchmark across clients
- Tools that monetize via data sharing

**Impact:** Must either:
- Restructure to be first-party only, OR
- Continue requiring consent (competitive disadvantage)

#### 3. Consent Management Platforms (CMPs)

**Reduced market:**
- 60% of websites may no longer need cookie banners
- Smaller addressable market for CMP vendors
- Pressure on pricing

**Counterbalance:**
- Remaining consent requirements are more complex
- Browser signal integration creates new opportunities
- Article 88a(4) compliance requires sophisticated UX

**Likely outcome:** Market contracts but remaining use cases become more sophisticated.

#### 4. Advertising Platforms Relying on Consent

**High-consent-friction models:**
- Platforms requiring granular consent
- Retargeting and behavioral advertising
- Cross-device tracking

**Challenge:** Users may set browser signals to reject tracking by default, reducing consent rates even further when Article 88b browser controls arrive (48 months).

## Browser Signals Impact on Analytics

### Article 88b Timeline

**24 months**: Websites must support machine-readable consent signals
**48 months**: Browser vendors must provide user controls

### Expected User Behavior

**Privacy-conscious defaults:**
- Browsers may ship with "reject tracking" as default
- Users who care will configure strict settings once
- Most users may keep defaults

**Impact on consent-required analytics:**
- Lower consent rates than current cookie banners
- One-time browser decision vs. per-site decision
- Could reduce tracking consent to 10-30% of users

**Impact on exempted analytics:**
- No impact—exempt is exempt
- Consentless analytics unaffected by browser signals
- Competitive advantage grows larger

### Media Service Provider Exemption

**Article 88b(3)**: Media service providers (news sites, publishers) are **EXEMPT** from browser signal requirements.

**What this means:**
- News publishers can still show cookie banners
- Can override browser signals for their own consent requests
- Protects publisher revenue models dependent on advertising

**Analytics implications:**
- Publishers can still ask for analytics + advertising consent
- May create two-tier system: publishers vs. other sites
- User experience: Some sites respect browser, others still ask

## Sealmetrics Positioning

### Already Compliant with Article 88a(3)(c)

Sealmetrics is designed precisely for the exemption criteria:

**✅ Aggregated measurement:**
- No individual user tracking across sessions
- Privacy-first architecture
- Anonymized data collection

**✅ First-party data only:**
- Data belongs to the website owner (controller)
- Sealmetrics acts as processor
- No cross-site tracking

**✅ For controller's own use:**
- Data not shared with third parties
- Not sold or monetized by Sealmetrics
- Used solely for client's audience insights

### No Consent Banners Needed

**Current advantage, future certainty:**
- Sealmetrics already operates without consent requirements
- Article 88a(3)(c) provides explicit legal basis
- Clients can confidently deploy without cookie banners

### Competitive Advantages Post-Omnibus

**1. Legal certainty:**
- Clear alignment with Article 88a(3)(c)
- No ambiguity about consent requirements
- Simplified compliance for clients

**2. Complete data:**
- No data loss from consent rejection
- Accurate audience measurement
- Better business intelligence

**3. Cost savings:**
- No cookie banner implementation
- No CMP subscription
- No ongoing legal review

**4. Better user experience:**
- No interruptions
- Faster page loads
- Privacy-respecting

**5. Future-proof for browser signals:**
- Exempt analytics unaffected by Article 88b
- No dependency on consent rates
- Stable data quality regardless of browser defaults

## Recommendations for Website Operators

### Audit Your Current Analytics Setup

**Identify consent-dependent tools:**

Create an inventory:
1. **Analytics platforms**: Which tools track users?
2. **Advertising pixels**: Facebook, Google Ads, retargeting?
3. **Third-party scripts**: Social media widgets, embedded content?
4. **Cross-site tracking**: Affiliate networks, attribution tools?

**Classify each tool:**
- ✅ **Exempt** (first-party, aggregated, own use)
- ⚠️ **Consent required** (third-party, tracking, profiling)
- ❓ **Uncertain** (need further analysis)

### Evaluate Consentless Alternatives

**For basic analytics needs:**

If you currently use consent-dependent analytics for basic traffic measurement, consider switching to:
- Consentless platforms (Sealmetrics, Plausible, Fathom)
- Self-hosted privacy-focused solutions (Matomo privacy mode)
- Server-side analytics (custom logging)

**Cost-benefit analysis:**
- Compare CMP costs + partial data vs. consentless + complete data
- Factor in user experience improvements
- Consider compliance simplification

**For advanced tracking needs:**

If you need individual user tracking, cross-device tracking, or behavioral profiling:
- Consent will still be required
- Focus on Article 88a(4) compliance (single-click refuse, 6-month cooldown)
- Prepare for Article 88b browser signals
- Optimize consent rates through transparency and value exchange

### Prepare for Browser Signal Era

**Timeline awareness:**
- 24 months (≈2027-2028): Implement browser signal support
- 48 months (≈2029-2030): Browsers deploy user controls

**Technical preparation:**
- Monitor European standardisation body standards development
- Plan infrastructure for machine-readable signals
- Consider how to handle consent/rejection programmatically
- Test compatibility with expected signal formats

**Strategic preparation:**
- Reduce dependency on consent-based tracking
- Shift to first-party data strategies
- Build direct relationships with users
- Invest in owned analytics infrastructure

### Hybrid Approach

**Many websites will use:**

**Tier 1 - No consent (Article 88a(3)(c) exempt):**
- First-party audience measurement
- Basic traffic analytics
- Content performance
- User experience optimization

**Tier 2 - Consent required:**
- Advanced behavioral tracking
- Advertising pixels
- Retargeting
- Cross-device attribution

**Implementation:**
- Load Tier 1 immediately (no consent needed)
- Request consent for Tier 2
- Ensure Tier 1 provides enough value to operate without Tier 2

### Document Your Compliance

**Privacy policy updates:**
- Explain use of Article 88a(3)(c) exemption
- Document which analytics are exempt vs. consent-based
- Describe data flows and retention

**Internal documentation:**
- Legal basis for each processing activity
- Data Processing Agreements with analytics vendors
- Technical safeguards for aggregation

**Be ready to demonstrate:**
- Data is aggregated
- Processing is for your own use only
- No sharing beyond necessary processing

## Comparison Matrix

| Analytics Type | Consent Needed? | Article 88a Basis | Browser Signals Impact | Data Quality |
|---------------|----------------|-------------------|----------------------|--------------|
| **First-party, aggregated** | ❌ No | 88a(3)(c) exemption | None (exempt) | 100% |
| **First-party, individual tracking** | ⚠️ Depends | 88a(1) or Art 6 | High (if consent basis) | Varies |
| **Third-party analytics (no sharing)** | ❌ No | 88a(3)(c) if structured properly | None (exempt) | 100% |
| **Third-party with data sharing** | ✅ Yes | 88a(1) consent | High | 10-70% |
| **Ad networks, retargeting** | ✅ Yes | 88a(1) consent | Very high | 10-30% |
| **Cross-site tracking** | ✅ Yes | 88a(1) consent | Very high | 10-30% |

## Timeline and Action Items

### Immediate (Now - 6 months after entry into force)

- [ ] Audit current analytics and tracking tools
- [ ] Classify tools as exempt vs. consent-required
- [ ] Evaluate consentless alternatives for basic analytics
- [ ] Update privacy policies to reference Article 88a
- [ ] Consider removing unnecessary cookie banners

### Short-term (6-24 months)

- [ ] Implement Article 88a(4) compliant consent UX (single-click refuse, 6-month cooldown)
- [ ] Migrate to first-party data strategies where possible
- [ ] Monitor standardization efforts for browser signals
- [ ] Train teams on new compliance requirements
- [ ] Optimize analytics stack for post-Omnibus landscape

### Medium-term (24-48 months)

- [ ] Implement browser signal support (Article 88b)
- [ ] Prepare infrastructure for machine-readable consent
- [ ] Test interoperability with browser controls
- [ ] Reduce dependency on consent-dependent tracking
- [ ] Build resilient analytics architecture

## Frequently Asked Questions

### Can I use Google Analytics without consent under the Omnibus?

**It depends on configuration:**

- **GA4 with no data sharing, no advertising features, configured for first-party use only**: Likely exempt under Article 88a(3)(c)
- **GA4 with advertising features, cross-site tracking, or data shared with Google for their purposes**: Consent required

**Key factors:**
- Are you the sole controller or is Google a joint controller?
- Is data used only for your audience measurement?
- Are advertising or remarketing features enabled?

**Recommendation**: Consult with privacy counsel on your specific GA4 configuration, or use a clearly exempt platform like Sealmetrics.

### Does "aggregated" mean I cannot see any individual page views?

**No.** "Aggregated" in Article 88a(3)(c) means the **purpose** is aggregate measurement, not that you can never see granular data.

**Permitted:**
- Viewing individual page view events (to calculate aggregates)
- Seeing a specific referrer for a specific session
- Analyzing a particular conversion path in aggregate

**Not permitted without consent:**
- Building persistent individual user profiles
- Tracking specific users across sessions for behavioral analysis
- Creating detailed dossiers on individual visitors

**Analogy**: A store can count customers and see what each person buys (to calculate totals), but cannot track individuals over time to profile their behavior.

### What about heatmaps and session recordings?

**Session recordings (Hotjar, FullStory, etc.)**: Almost certainly **require consent**.

**Reasoning:**
- Individual-level tracking
- Detailed behavioral data
- Not "aggregated measurement"
- High privacy risk

**Heatmaps**: **Possibly exempt** if truly aggregated.

**Exempt approach:**
- Aggregate click positions across all users
- No individual session identification
- Used only for UX optimization on your site

**Requires consent:**
- Individual session heatmaps
- Linked to user identities
- Shared with third parties

**Recommendation**: If you want to avoid consent, use truly aggregated heatmaps or A/B testing tools that don't track individuals.

### Can I share analytics data with my agency or consultants?

**Yes, if they are processors acting on your behalf** under GDPR Article 28.

**Structure:**
- Data Processing Agreement in place
- Processor acts only on your instructions
- Data used solely for your purposes (audience measurement)
- No independent use by processor

**No, if:**
- Processor uses data for their own purposes
- Data is shared with processor's other clients
- Processor becomes a joint controller

**Article 88a(3)(c) requires "solely for its own use"**—this is satisfied when processors provide services to you, but not when data is shared more broadly.

## Related Resources

- [Cookie Consent Reform](./cookies-eprivacy.md) - Full details on Article 88a
- [GDPR Amendments](./gdpr-changes.md) - Other GDPR changes in the Omnibus
- [EU Digital Omnibus Overview](./index.md) - Complete regulation guide

## Key Takeaways

1. **First-party, aggregated analytics = NO CONSENT NEEDED** under Article 88a(3)(c)
2. **Third-party tracking, profiling, ad tech = CONSENT REQUIRED**
3. **Winners**: Consentless analytics, first-party data, privacy-first platforms
4. **Losers**: Cross-site trackers, third-party cookie networks, consent-dependent models
5. **Browser signals coming** in 24-48 months will further impact consent-based tracking
6. **Sealmetrics is compliant** with Article 88a(3)(c) exemption
7. **Audit your analytics** to identify what needs consent and what doesn't
8. **Prepare for first-party future** by reducing consent dependencies now

The Digital Omnibus creates a clear path for privacy-respecting analytics while cracking down on invasive tracking. Website operators who embrace consentless, first-party measurement will gain competitive advantages in data quality, user experience, and compliance simplicity.
