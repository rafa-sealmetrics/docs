import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', '44c'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/authors',
    component: ComponentCreator('/blog/authors', '0b7'),
    exact: true
  },
  {
    path: '/blog/cookieless-analytics-guide',
    component: ComponentCreator('/blog/cookieless-analytics-guide', 'd8a'),
    exact: true
  },
  {
    path: '/blog/cookieless-analytics-vs-cookie-based',
    component: ComponentCreator('/blog/cookieless-analytics-vs-cookie-based', 'e15'),
    exact: true
  },
  {
    path: '/blog/gdpr-compliant-analytics-framework',
    component: ComponentCreator('/blog/gdpr-compliant-analytics-framework', '081'),
    exact: true
  },
  {
    path: '/blog/long-term-analytics-data-retention',
    component: ComponentCreator('/blog/long-term-analytics-data-retention', '4e8'),
    exact: true
  },
  {
    path: '/blog/real-time-tracking-consent',
    component: ComponentCreator('/blog/real-time-tracking-consent', 'bff'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/analytics',
    component: ComponentCreator('/blog/tags/analytics', '268'),
    exact: true
  },
  {
    path: '/blog/tags/cnil',
    component: ComponentCreator('/blog/tags/cnil', '141'),
    exact: true
  },
  {
    path: '/blog/tags/consentless',
    component: ComponentCreator('/blog/tags/consentless', 'f69'),
    exact: true
  },
  {
    path: '/blog/tags/cookieless',
    component: ComponentCreator('/blog/tags/cookieless', '5c9'),
    exact: true
  },
  {
    path: '/blog/tags/cookieless-analytics',
    component: ComponentCreator('/blog/tags/cookieless-analytics', '3c9'),
    exact: true
  },
  {
    path: '/blog/tags/cookies',
    component: ComponentCreator('/blog/tags/cookies', 'c6a'),
    exact: true
  },
  {
    path: '/blog/tags/data-retention',
    component: ComponentCreator('/blog/tags/data-retention', '8b3'),
    exact: true
  },
  {
    path: '/blog/tags/gdpr',
    component: ComponentCreator('/blog/tags/gdpr', '70b'),
    exact: true
  },
  {
    path: '/blog/tags/gdpr-compliance',
    component: ComponentCreator('/blog/tags/gdpr-compliance', '3dd'),
    exact: true
  },
  {
    path: '/blog/tags/legitimate-interest',
    component: ComponentCreator('/blog/tags/legitimate-interest', 'f0b'),
    exact: true
  },
  {
    path: '/blog/tags/long-term-analytics',
    component: ComponentCreator('/blog/tags/long-term-analytics', '347'),
    exact: true
  },
  {
    path: '/blog/tags/privacy',
    component: ComponentCreator('/blog/tags/privacy', 'b74'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', '5de'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'b74'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'be4'),
        routes: [
          {
            path: '/tags',
            component: ComponentCreator('/tags', 'ce1'),
            exact: true
          },
          {
            path: '/tags/acquisition',
            component: ComponentCreator('/tags/acquisition', '1b8'),
            exact: true
          },
          {
            path: '/tags/aepd',
            component: ComponentCreator('/tags/aepd', '8a2'),
            exact: true
          },
          {
            path: '/tags/analytics',
            component: ComponentCreator('/tags/analytics', '894'),
            exact: true
          },
          {
            path: '/tags/analytics-accuracy',
            component: ComponentCreator('/tags/analytics-accuracy', '4da'),
            exact: true
          },
          {
            path: '/tags/analytics-architecture',
            component: ComponentCreator('/tags/analytics-architecture', '0d8'),
            exact: true
          },
          {
            path: '/tags/analytics-infrastructure',
            component: ComponentCreator('/tags/analytics-infrastructure', 'c27'),
            exact: true
          },
          {
            path: '/tags/analytics-integrity',
            component: ComponentCreator('/tags/analytics-integrity', '173'),
            exact: true
          },
          {
            path: '/tags/anonymization',
            component: ComponentCreator('/tags/anonymization', '962'),
            exact: true
          },
          {
            path: '/tags/api',
            component: ComponentCreator('/tags/api', '042'),
            exact: true
          },
          {
            path: '/tags/attribution',
            component: ComponentCreator('/tags/attribution', '436'),
            exact: true
          },
          {
            path: '/tags/benefits',
            component: ComponentCreator('/tags/benefits', '174'),
            exact: true
          },
          {
            path: '/tags/bot-filtering',
            component: ComponentCreator('/tags/bot-filtering', '51e'),
            exact: true
          },
          {
            path: '/tags/changelog',
            component: ComponentCreator('/tags/changelog', 'bc9'),
            exact: true
          },
          {
            path: '/tags/cnil',
            component: ComponentCreator('/tags/cnil', '6a8'),
            exact: true
          },
          {
            path: '/tags/compliance',
            component: ComponentCreator('/tags/compliance', '1bf'),
            exact: true
          },
          {
            path: '/tags/consentless',
            component: ComponentCreator('/tags/consentless', '790'),
            exact: true
          },
          {
            path: '/tags/consentless-analytics',
            component: ComponentCreator('/tags/consentless-analytics', 'f69'),
            exact: true
          },
          {
            path: '/tags/consentless-tracking',
            component: ComponentCreator('/tags/consentless-tracking', '018'),
            exact: true
          },
          {
            path: '/tags/conversions',
            component: ComponentCreator('/tags/conversions', '0cd'),
            exact: true
          },
          {
            path: '/tags/cookieless',
            component: ComponentCreator('/tags/cookieless', 'd75'),
            exact: true
          },
          {
            path: '/tags/dashboard',
            component: ComponentCreator('/tags/dashboard', '539'),
            exact: true
          },
          {
            path: '/tags/data-accuracy',
            component: ComponentCreator('/tags/data-accuracy', 'a44'),
            exact: true
          },
          {
            path: '/tags/data-flow',
            component: ComponentCreator('/tags/data-flow', 'db2'),
            exact: true
          },
          {
            path: '/tags/data-processing',
            component: ComponentCreator('/tags/data-processing', 'a53'),
            exact: true
          },
          {
            path: '/tags/data-retention',
            component: ComponentCreator('/tags/data-retention', '471'),
            exact: true
          },
          {
            path: '/tags/data-storage',
            component: ComponentCreator('/tags/data-storage', '151'),
            exact: true
          },
          {
            path: '/tags/definitions',
            component: ComponentCreator('/tags/definitions', 'f10'),
            exact: true
          },
          {
            path: '/tags/documentation',
            component: ComponentCreator('/tags/documentation', '9e6'),
            exact: true
          },
          {
            path: '/tags/eprivacy',
            component: ComponentCreator('/tags/eprivacy', '07e'),
            exact: true
          },
          {
            path: '/tags/events',
            component: ComponentCreator('/tags/events', '254'),
            exact: true
          },
          {
            path: '/tags/facebook-ads',
            component: ComponentCreator('/tags/facebook-ads', 'bf5'),
            exact: true
          },
          {
            path: '/tags/first-party-tracker',
            component: ComponentCreator('/tags/first-party-tracker', '2f2'),
            exact: true
          },
          {
            path: '/tags/first-steps',
            component: ComponentCreator('/tags/first-steps', '097'),
            exact: true
          },
          {
            path: '/tags/funnel',
            component: ComponentCreator('/tags/funnel', '69c'),
            exact: true
          },
          {
            path: '/tags/funnel-analysis',
            component: ComponentCreator('/tags/funnel-analysis', 'af0'),
            exact: true
          },
          {
            path: '/tags/gdpr',
            component: ComponentCreator('/tags/gdpr', '59f'),
            exact: true
          },
          {
            path: '/tags/getting-started',
            component: ComponentCreator('/tags/getting-started', '4b7'),
            exact: true
          },
          {
            path: '/tags/implementation',
            component: ComponentCreator('/tags/implementation', 'cee'),
            exact: true
          },
          {
            path: '/tags/installation',
            component: ComponentCreator('/tags/installation', 'c74'),
            exact: true
          },
          {
            path: '/tags/limits',
            component: ComponentCreator('/tags/limits', '9e9'),
            exact: true
          },
          {
            path: '/tags/marketing-performance',
            component: ComponentCreator('/tags/marketing-performance', '6ed'),
            exact: true
          },
          {
            path: '/tags/metrics',
            component: ComponentCreator('/tags/metrics', '71f'),
            exact: true
          },
          {
            path: '/tags/micro-conversions',
            component: ComponentCreator('/tags/micro-conversions', '7f2'),
            exact: true
          },
          {
            path: '/tags/overview',
            component: ComponentCreator('/tags/overview', '55f'),
            exact: true
          },
          {
            path: '/tags/pageviews',
            component: ComponentCreator('/tags/pageviews', '63c'),
            exact: true
          },
          {
            path: '/tags/performance',
            component: ComponentCreator('/tags/performance', '69d'),
            exact: true
          },
          {
            path: '/tags/pixel',
            component: ComponentCreator('/tags/pixel', 'f89'),
            exact: true
          },
          {
            path: '/tags/platform',
            component: ComponentCreator('/tags/platform', '1aa'),
            exact: true
          },
          {
            path: '/tags/privacy',
            component: ComponentCreator('/tags/privacy', '856'),
            exact: true
          },
          {
            path: '/tags/privacy-compliance',
            component: ComponentCreator('/tags/privacy-compliance', 'c7f'),
            exact: true
          },
          {
            path: '/tags/privacy-first',
            component: ComponentCreator('/tags/privacy-first', '88a'),
            exact: true
          },
          {
            path: '/tags/privacy-first-analytics',
            component: ComponentCreator('/tags/privacy-first-analytics', '678'),
            exact: true
          },
          {
            path: '/tags/processing',
            component: ComponentCreator('/tags/processing', '780'),
            exact: true
          },
          {
            path: '/tags/queue-system',
            component: ComponentCreator('/tags/queue-system', '2d3'),
            exact: true
          },
          {
            path: '/tags/real-time-analytics',
            component: ComponentCreator('/tags/real-time-analytics', '6f4'),
            exact: true
          },
          {
            path: '/tags/reconciliation',
            component: ComponentCreator('/tags/reconciliation', '50a'),
            exact: true
          },
          {
            path: '/tags/reports',
            component: ComponentCreator('/tags/reports', 'cc6'),
            exact: true
          },
          {
            path: '/tags/reports-overview',
            component: ComponentCreator('/tags/reports-overview', '7f4'),
            exact: true
          },
          {
            path: '/tags/revenue',
            component: ComponentCreator('/tags/revenue', 'de8'),
            exact: true
          },
          {
            path: '/tags/roas',
            component: ComponentCreator('/tags/roas', 'ba4'),
            exact: true
          },
          {
            path: '/tags/scaling',
            component: ComponentCreator('/tags/scaling', '37a'),
            exact: true
          },
          {
            path: '/tags/sealmetrics',
            component: ComponentCreator('/tags/sealmetrics', '409'),
            exact: true
          },
          {
            path: '/tags/setup',
            component: ComponentCreator('/tags/setup', '848'),
            exact: true
          },
          {
            path: '/tags/superprivacy-tracking',
            component: ComponentCreator('/tags/superprivacy-tracking', '965'),
            exact: true
          },
          {
            path: '/tags/tracker-setup',
            component: ComponentCreator('/tags/tracker-setup', 'e59'),
            exact: true
          },
          {
            path: '/tags/tracking',
            component: ComponentCreator('/tags/tracking', '2d0'),
            exact: true
          },
          {
            path: '/tags/traffic-quality',
            component: ComponentCreator('/tags/traffic-quality', 'ee7'),
            exact: true
          },
          {
            path: '/tags/traffic-sources',
            component: ComponentCreator('/tags/traffic-sources', 'b49'),
            exact: true
          },
          {
            path: '/tags/traffic-spikes',
            component: ComponentCreator('/tags/traffic-spikes', 'f8a'),
            exact: true
          },
          {
            path: '/tags/walkthrough',
            component: ComponentCreator('/tags/walkthrough', '223'),
            exact: true
          },
          {
            path: '/',
            component: ComponentCreator('/', '8d8'),
            routes: [
              {
                path: '/api/appendix/',
                component: ComponentCreator('/api/appendix/', '239'),
                exact: true
              },
              {
                path: '/api/appendix/troubleshooting',
                component: ComponentCreator('/api/appendix/troubleshooting', '004'),
                exact: true
              },
              {
                path: '/api/appendix/understanding-rate-limits',
                component: ComponentCreator('/api/appendix/understanding-rate-limits', '57f'),
                exact: true
              },
              {
                path: '/api/authentication/',
                component: ComponentCreator('/api/authentication/', '462'),
                exact: true
              },
              {
                path: '/api/authentication/api-authentication',
                component: ComponentCreator('/api/authentication/api-authentication', '7b8'),
                exact: true
              },
              {
                path: '/api/authentication/how-to-obtain-api-token',
                component: ComponentCreator('/api/authentication/how-to-obtain-api-token', 'c1f'),
                exact: true
              },
              {
                path: '/api/authentication/login-endpoint',
                component: ComponentCreator('/api/authentication/login-endpoint', '600'),
                exact: true
              },
              {
                path: '/api/core-api-endpoints/',
                component: ComponentCreator('/api/core-api-endpoints/', '8b2'),
                exact: true
              },
              {
                path: '/api/core-api-endpoints/account-endpoints',
                component: ComponentCreator('/api/core-api-endpoints/account-endpoints', 'dc7'),
                exact: true
              },
              {
                path: '/api/core-api-endpoints/api-endpoints',
                component: ComponentCreator('/api/core-api-endpoints/api-endpoints', '99a'),
                exact: true
              },
              {
                path: '/api/core-api-endpoints/funnel-endpoint',
                component: ComponentCreator('/api/core-api-endpoints/funnel-endpoint', 'd85'),
                exact: true
              },
              {
                path: '/api/core-api-endpoints/pages-endpoint',
                component: ComponentCreator('/api/core-api-endpoints/pages-endpoint', 'ab9'),
                exact: true
              },
              {
                path: '/api/core-api-endpoints/roas-evolution-endpoint',
                component: ComponentCreator('/api/core-api-endpoints/roas-evolution-endpoint', 'fd1'),
                exact: true
              },
              {
                path: '/api/core-api-endpoints/set-click-endpoint',
                component: ComponentCreator('/api/core-api-endpoints/set-click-endpoint', '050'),
                exact: true
              },
              {
                path: '/api/event-tracking/',
                component: ComponentCreator('/api/event-tracking/', '3ab'),
                exact: true
              },
              {
                path: '/api/event-tracking/conversions-endpoint',
                component: ComponentCreator('/api/event-tracking/conversions-endpoint', 'bbb'),
                exact: true
              },
              {
                path: '/api/event-tracking/microconversions-endpoint',
                component: ComponentCreator('/api/event-tracking/microconversions-endpoint', 'f54'),
                exact: true
              },
              {
                path: '/api/implementation-guide/',
                component: ComponentCreator('/api/implementation-guide/', 'b66'),
                exact: true
              },
              {
                path: '/api/implementation-guide/implementation-guides',
                component: ComponentCreator('/api/implementation-guide/implementation-guides', '578'),
                exact: true
              },
              {
                path: '/api/introduction/',
                component: ComponentCreator('/api/introduction/', '692'),
                exact: true
              },
              {
                path: '/api/introduction/introduction-sealmetrics-api',
                component: ComponentCreator('/api/introduction/introduction-sealmetrics-api', '80d'),
                exact: true
              },
              {
                path: '/api/overview',
                component: ComponentCreator('/api/overview', '641'),
                exact: true
              },
              {
                path: '/category/affiliates--partners',
                component: ComponentCreator('/category/affiliates--partners', '01c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/category/platform-internals',
                component: ComponentCreator('/category/platform-internals', '913'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/category/privacy-first-tracking',
                component: ComponentCreator('/category/privacy-first-tracking', 'b5f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/category/tracking--attribution-settings',
                component: ComponentCreator('/category/tracking--attribution-settings', '6c2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/changelog',
                component: ComponentCreator('/changelog', 'dc5'),
                exact: true
              },
              {
                path: '/faq/',
                component: ComponentCreator('/faq/', 'd00'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/faq/attribution',
                component: ComponentCreator('/faq/attribution', 'f34'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/faq/consentless-analytics',
                component: ComponentCreator('/faq/consentless-analytics', '9a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/faq/ga4-vs-sealmetrics',
                component: ComponentCreator('/faq/ga4-vs-sealmetrics', 'e9d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/faq/glossary',
                component: ComponentCreator('/faq/glossary', '22d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/faq/implementation',
                component: ComponentCreator('/faq/implementation', '538'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/faq/legal-compliance',
                component: ComponentCreator('/faq/legal-compliance', '6b4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/faq/privacy-technical',
                component: ComponentCreator('/faq/privacy-technical', '05b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/faq/product',
                component: ComponentCreator('/faq/product', '0a3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/features/consentless-analytics/benefits-consentless-analytics',
                component: ComponentCreator('/features/consentless-analytics/benefits-consentless-analytics', '428'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/features/consentless-analytics/how-consentless-tracking-works',
                component: ComponentCreator('/features/consentless-analytics/how-consentless-tracking-works', '54a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/features/event-tracking-and-custom-data/understanding-event-properties',
                component: ComponentCreator('/features/event-tracking-and-custom-data/understanding-event-properties', '247'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/features/privacy-first-tracking/1st-party-tracker',
                component: ComponentCreator('/features/privacy-first-tracking/1st-party-tracker', 'a7f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/features/privacy-first-tracking/if-no-userid-how-attribution-works',
                component: ComponentCreator('/features/privacy-first-tracking/if-no-userid-how-attribution-works', '82c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/features/privacy-first-tracking/privacy-by-design-principles',
                component: ComponentCreator('/features/privacy-first-tracking/privacy-by-design-principles', 'b24'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/features/privacy-first-tracking/super-privacy-mode-and-isolated-hits',
                component: ComponentCreator('/features/privacy-first-tracking/super-privacy-mode-and-isolated-hits', 'b36'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/features/privacy-first-tracking/what-we-track-vs-what-we-dont',
                component: ComponentCreator('/features/privacy-first-tracking/what-we-track-vs-what-we-dont', '627'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/features/privacy-first-tracking/why-sealmetrics-not-blocked-by-adblockers',
                component: ComponentCreator('/features/privacy-first-tracking/why-sealmetrics-not-blocked-by-adblockers', '323'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/first-steps/',
                component: ComponentCreator('/first-steps/', '483'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/first-steps/first-party-tracker',
                component: ComponentCreator('/first-steps/first-party-tracker', '71d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/first-steps/first-steps-with-sealmetrics',
                component: ComponentCreator('/first-steps/first-steps-with-sealmetrics', 'a97'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/first-steps/how-sealmetrics-works',
                component: ComponentCreator('/first-steps/how-sealmetrics-works', '4e7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/first-steps/how-superprivacy-tracking-works',
                component: ComponentCreator('/first-steps/how-superprivacy-tracking-works', 'b76'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/first-steps/how-to-measure-conversions',
                component: ComponentCreator('/first-steps/how-to-measure-conversions', '030'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/first-steps/quick-journey',
                component: ComponentCreator('/first-steps/quick-journey', '512'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/first-steps/see-your-data-flow',
                component: ComponentCreator('/first-steps/see-your-data-flow', '6f3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/first-steps/setting-up-trackers',
                component: ComponentCreator('/first-steps/setting-up-trackers', '803'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/first-steps/why-sealmetrics-measures-without-consent',
                component: ComponentCreator('/first-steps/why-sealmetrics-measures-without-consent', 'b2a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/getting-started/',
                component: ComponentCreator('/getting-started/', 'e2e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/getting-started/reports/',
                component: ComponentCreator('/getting-started/reports/', 'ac7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/getting-started/reports/acquisition',
                component: ComponentCreator('/getting-started/reports/acquisition', '141'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/getting-started/reports/dashboard',
                component: ComponentCreator('/getting-started/reports/dashboard', 'a5f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/getting-started/reports/definitions',
                component: ComponentCreator('/getting-started/reports/definitions', '3db'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/getting-started/reports/roas-evolution',
                component: ComponentCreator('/getting-started/reports/roas-evolution', 'a15'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/getting-started/reports/sales-funnel',
                component: ComponentCreator('/getting-started/reports/sales-funnel', '54c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/implementation/',
                component: ComponentCreator('/implementation/', '30f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/implementation/content-site-structure/',
                component: ComponentCreator('/implementation/content-site-structure/', '79c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/implementation/content-site-structure/content-grouping',
                component: ComponentCreator('/implementation/content-site-structure/content-grouping', '0c1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/implementation/ecommerce-conversion-tracking/',
                component: ComponentCreator('/implementation/ecommerce-conversion-tracking/', 'b43'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/implementation/ecommerce-conversion-tracking/conversion-funnel-tracking',
                component: ComponentCreator('/implementation/ecommerce-conversion-tracking/conversion-funnel-tracking', '915'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/implementation/ecommerce-conversion-tracking/ecommerce-setup-guide',
                component: ComponentCreator('/implementation/ecommerce-conversion-tracking/ecommerce-setup-guide', '2b9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/implementation/ecommerce-conversion-tracking/event-properties-guide',
                component: ComponentCreator('/implementation/ecommerce-conversion-tracking/event-properties-guide', '448'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/implementation/tracking-methods/',
                component: ComponentCreator('/implementation/tracking-methods/', 'bba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/implementation/tracking-methods/how-to-track-ajax-forms',
                component: ComponentCreator('/implementation/tracking-methods/how-to-track-ajax-forms', 'dfd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/implementation/tracking-methods/how-to-track-react',
                component: ComponentCreator('/implementation/tracking-methods/how-to-track-react', '264'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/implementation/tracking-methods/how-to-track-spa-sites',
                component: ComponentCreator('/implementation/tracking-methods/how-to-track-spa-sites', '81d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/implementation/tracking-methods/ignore-page-view',
                component: ComponentCreator('/implementation/tracking-methods/ignore-page-view', '180'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/integrations/',
                component: ComponentCreator('/integrations/', '202'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/integrations/google-tag-manager/gtm-msr-appspot-and-tag-blocking',
                component: ComponentCreator('/integrations/google-tag-manager/gtm-msr-appspot-and-tag-blocking', 'f25'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/intro',
                component: ComponentCreator('/intro', '6da'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/legal/',
                component: ComponentCreator('/legal/', 'd96'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/legal/compliance-overview/',
                component: ComponentCreator('/legal/compliance-overview/', '47a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/legal/compliance-overview/how-sealmetrics-blocks-bot-traffic',
                component: ComponentCreator('/legal/compliance-overview/how-sealmetrics-blocks-bot-traffic', 'bd8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/legal/compliance-overview/is-sealmetrics-privacy-compliant',
                component: ComponentCreator('/legal/compliance-overview/is-sealmetrics-privacy-compliant', '047'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/legal/compliance-overview/legal-faq',
                component: ComponentCreator('/legal/compliance-overview/legal-faq', 'da9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/legal/GDPR-and-ePrivacy/',
                component: ComponentCreator('/legal/GDPR-and-ePrivacy/', 'c66'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/legal/GDPR-and-ePrivacy/do-session-ids-require-consent',
                component: ComponentCreator('/legal/GDPR-and-ePrivacy/do-session-ids-require-consent', 'eac'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/metrics-insights/attribution-model',
                component: ComponentCreator('/metrics-insights/attribution-model', 'ce1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/metrics-insights/direct-traffic',
                component: ComponentCreator('/metrics-insights/direct-traffic', '014'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/metrics-insights/how-sealmetrics-calculates-entrances',
                component: ComponentCreator('/metrics-insights/how-sealmetrics-calculates-entrances', '030'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/metrics-insights/how-sealmetrics-calculates-seo-traffic',
                component: ComponentCreator('/metrics-insights/how-sealmetrics-calculates-seo-traffic', 'e50'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/metrics-insights/how-to-change-utm-parameters',
                component: ComponentCreator('/metrics-insights/how-to-change-utm-parameters', '602'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/metrics-insights/how-to-track-google-ads-campaigns',
                component: ComponentCreator('/metrics-insights/how-to-track-google-ads-campaigns', '6b1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/metrics-insights/how-to-track-social-ads-campaigns',
                component: ComponentCreator('/metrics-insights/how-to-track-social-ads-campaigns', 'fc6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/metrics-insights/referral-vs-direct-traffic',
                component: ComponentCreator('/metrics-insights/referral-vs-direct-traffic', 'b61'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/metrics-insights/rejoined-traffic',
                component: ComponentCreator('/metrics-insights/rejoined-traffic', '81e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/metrics-insights/understanding-not-set',
                component: ComponentCreator('/metrics-insights/understanding-not-set', 'f5d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/metrics-insights/understanding-referrer-loss-and-direct-traffic',
                component: ComponentCreator('/metrics-insights/understanding-referrer-loss-and-direct-traffic', '030'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/metrics-insights/what-is-a-term',
                component: ComponentCreator('/metrics-insights/what-is-a-term', 'f1f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/metrics-insights/why-more-conversions-than-erp',
                component: ComponentCreator('/metrics-insights/why-more-conversions-than-erp', 'f35'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/account-setup/find-account-id',
                component: ComponentCreator('/platform/account-setup/find-account-id', 'c5a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/account-setup/how-to-add-domains',
                component: ComponentCreator('/platform/account-setup/how-to-add-domains', '9db'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/account-setup/how-to-add-new-account',
                component: ComponentCreator('/platform/account-setup/how-to-add-new-account', '9d9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/account-setup/how-to-change-timezone',
                component: ComponentCreator('/platform/account-setup/how-to-change-timezone', '3cb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/account-setup/how-to-delete-account',
                component: ComponentCreator('/platform/account-setup/how-to-delete-account', '58d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/affiliates-and-partners/how-to-share-your-affiliate-link',
                component: ComponentCreator('/platform/affiliates-and-partners/how-to-share-your-affiliate-link', '483'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/internals/accessing-real-time-data',
                component: ComponentCreator('/platform/internals/accessing-real-time-data', '359'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/internals/bot-traffic-filtering',
                component: ComponentCreator('/platform/internals/bot-traffic-filtering', '809'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/internals/breakfast-report',
                component: ComponentCreator('/platform/internals/breakfast-report', 'e30'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/internals/data-accuracy-and-reconciliation',
                component: ComponentCreator('/platform/internals/data-accuracy-and-reconciliation', '5d8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/internals/event-vs-pageview-processing',
                component: ComponentCreator('/platform/internals/event-vs-pageview-processing', '669'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/internals/how-sealmetrics-consolidates-data',
                component: ComponentCreator('/platform/internals/how-sealmetrics-consolidates-data', '702'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/internals/how-sealmetrics-stores-data',
                component: ComponentCreator('/platform/internals/how-sealmetrics-stores-data', '4d3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/internals/system-performance-and-limits',
                component: ComponentCreator('/platform/internals/system-performance-and-limits', '88e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/internals/using-subdomain-differentiation',
                component: ComponentCreator('/platform/internals/using-subdomain-differentiation', '477'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/tracking-and-attribution-settings/bypass-pos-or-referrer',
                component: ComponentCreator('/platform/tracking-and-attribution-settings/bypass-pos-or-referrer', '394'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/tracking-and-attribution-settings/global-vs-superprivacy-tracker',
                component: ComponentCreator('/platform/tracking-and-attribution-settings/global-vs-superprivacy-tracker', 'be8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/user-management/authorized-ips',
                component: ComponentCreator('/platform/user-management/authorized-ips', '6fe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/user-management/change-password',
                component: ComponentCreator('/platform/user-management/change-password', '23a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/user-management/create-admin-user',
                component: ComponentCreator('/platform/user-management/create-admin-user', 'f0e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/user-management/how-to-add-new-user',
                component: ComponentCreator('/platform/user-management/how-to-add-new-user', '445'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/platform/user-management/roles-management',
                component: ComponentCreator('/platform/user-management/roles-management', '614'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/privacy-and-consentless/',
                component: ComponentCreator('/privacy-and-consentless/', '253'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/privacy-and-consentless/country-determination-timezone',
                component: ComponentCreator('/privacy-and-consentless/country-determination-timezone', '288'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/privacy-and-consentless/faq',
                component: ComponentCreator('/privacy-and-consentless/faq', 'da5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/privacy-and-consentless/how-sealmetrics-protects-user-privacy',
                component: ComponentCreator('/privacy-and-consentless/how-sealmetrics-protects-user-privacy', '582'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/privacy-and-consentless/key-benefits',
                component: ComponentCreator('/privacy-and-consentless/key-benefits', '062'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/privacy-and-consentless/what-is-consentless-analytics',
                component: ComponentCreator('/privacy-and-consentless/what-is-consentless-analytics', '271'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/reports/',
                component: ComponentCreator('/reports/', '98e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/reports/acquisition',
                component: ComponentCreator('/reports/acquisition', 'cf3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/reports/dashboard',
                component: ComponentCreator('/reports/dashboard', '406'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/reports/definitions',
                component: ComponentCreator('/reports/definitions', 'a61'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/reports/roas-evolution',
                component: ComponentCreator('/reports/roas-evolution', 'bcc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/reports/sales-funnel',
                component: ComponentCreator('/reports/sales-funnel', '524'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', '697'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
