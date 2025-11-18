import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SealMetrics Docs',
  tagline: 'Privacy-first analytics documentation',
  favicon: 'img/favicon.ico',

  url: 'https://docs.sealmetrics.com',
  baseUrl: '/',

  organizationName: 'rafa-sealmetrics',
  projectName: 'docs',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  future: { v4: true },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // 🚀 META TAGS PARA LLMs - Robots directives
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: undefined,
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: {
          showReadingTime: true,
          routeBasePath: '/blog',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: undefined,
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        // 🚀 SITEMAP optimizado
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/sealmetrics-social-card.jpg',

    // 🚀 META TAGS PARA LLMs - Keywords y description
    metadata: [
      {
        name: 'keywords',
        content: 'consentless analytics, GDPR analytics, cookieless tracking, privacy-first analytics, Google Analytics alternative, web analytics without consent, CNIL compliant analytics',
      },
      {
        name: 'description',
        content: 'Complete documentation for Sealmetrics - the consentless analytics platform that captures 100% of your traffic data while staying GDPR compliant. No cookie banners needed.',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:image',
        content: 'https://docs.sealmetrics.com/img/sealmetrics-social-card.jpg',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],

    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
      disableSwitch: false,
    },

    navbar: {
      title: '',
      logo: {
        alt: 'SealMetrics Logo',
        src: 'img/logo.svg',
      },
      items: [
        { label: 'Documentation', to: '/intro', position: 'left' },
        { label: 'API Reference', to: '/api/overview', position: 'left' },
        { label: 'Changelog', to: '/changelog', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { href: 'https://sealmetrics.com', label: 'Website', position: 'right' },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/getting-started' },
            { label: 'API Reference', to: '/api/overview' },
            { label: 'Server Status', href: 'https://app.comply.org/attest/sealmetrics' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'LinkedIn', href: 'https://linkedin.com/company/sealmetrics' },
            { label: 'X (Twitter)', href: 'https://twitter.com/sealmetrics' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Changelog', to: '/changelog' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} SealMetrics. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },

    // -------------------------
    // 🚀 ALGOLIA DOCSEARCH
    // -------------------------
    algolia: {
      appId: 'CGIHF419IR',
      apiKey: '379d9732cb8663ed4de3e2d0d59ce1b0',
      indexName: 'Sealmetrics Docs',
      contextualSearch: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;