import React from 'react';
import Link from '@docusaurus/Link';
import {useColorMode} from '@docusaurus/theme-common';

const ReportCards: React.FC = () => {
  const {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';

  const cards = [
    {
      title: 'SealMetrics Dashboard',
      description:
        'Overview of visits, page views, conversions, and micro-conversions — your central analytics hub.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#00A47C" viewBox="0 0 24 24">
          <path d="M3 13h2v-2H3v2zm4 0h2v-6H7v6zm4 0h2V5h-2v8zm4 0h2V9h-2v4zm4 0h2V3h-2v10z" />
        </svg>
      ),
      link: '/docs/getting-started/reports/dashboard',
    },
    {
      title: 'Traffic Source Analysis',
      description:
        'Analyze acquisition sources, ROAS, and performance by medium, campaign, and device.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#00A47C" viewBox="0 0 24 24">
          <path d="M3 13h18v-2H3v2zm0 6h12v-2H3v2zm0-12h18V5H3v2z" />
        </svg>
      ),
      link: '/docs/getting-started/reports/acquisition',
    },
    {
      title: 'ROAS Evolution Report',
      description:
        'Measure Return on Ad Spend over time and compare performance by source, medium, or campaign.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#00A47C" viewBox="0 0 24 24">
          <path d="M3 17h2v-2H3v2zm4 0h2v-6H7v6zm4 0h2V9h-2v8zm4 0h2V5h-2v12zm4 0h2v-9h-2v9z" />
        </svg>
      ),
      link: '/docs/getting-started/reports/roas-evolution',
    },
    {
      title: 'Sales Funnel Report',
      description:
        'Visualize user behavior through funnel stages — from micro-conversions to completed sales.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#00A47C" viewBox="0 0 24 24">
          <path d="M2 3h20l-8 9v5l-4 4v-9L2 3z" />
        </svg>
      ),
      link: '/docs/getting-started/reports/sales-funnel',
    },
    {
      title: 'Definitions',
      description:
        'Learn the meaning of all key SealMetrics metrics — entrances, conversions, revenue, and advanced KPIs.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#00A47C" viewBox="0 0 24 24">
          <path d="M4 4h16v2H4V4zm0 4h16v2H4V8zm0 4h10v2H4v-2zm0 4h10v2H4v-2z" />
        </svg>
      ),
      link: '/docs/getting-started/reports/definitions',
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem',
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            border: isDark ? '1px solid #2F2F2F' : '1px solid #E5E5E5',
            borderRadius: '12px',
            padding: '1.5rem',
            backgroundColor: isDark ? '#1C1C1C' : '#FFFFFF',
            boxShadow: isDark
              ? '0 2px 8px rgba(0,0,0,0.6)'
              : '0 2px 8px rgba(0,0,0,0.05)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = isDark
              ? '0 4px 12px rgba(0,0,0,0.8)'
              : '0 4px 12px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = isDark
              ? '0 2px 8px rgba(0,0,0,0.6)'
              : '0 2px 8px rgba(0,0,0,0.05)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
            {card.icon}
            <h3 style={{ color: '#00A47C', marginLeft: '0.5rem', fontSize: '1rem', marginBottom: 0 }}>
              <Link to={card.link} style={{ textDecoration: 'none', color: '#00A47C' }}>
                {card.title}
              </Link>
            </h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: isDark ? '#E0E0E0' : '#333', lineHeight: '1.5rem' }}>
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReportCards;