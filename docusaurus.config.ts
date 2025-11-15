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

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // ⛔️ Edit links removed
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
          // ⛔️ Edit links removed
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
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/sealmetrics-social-card.jpg',

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
        // ⛔️ GitHub link removed
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/getting-started/overview' },
            { label: 'API Reference', to: '/api/overview' },
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
            // ⛔️ GitHub removed
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} SealMetrics. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;