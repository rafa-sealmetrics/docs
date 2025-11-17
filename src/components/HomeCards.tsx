import React from 'react';
import Link from '@docusaurus/Link';
import {useColorMode} from '@docusaurus/theme-common';

const HomeCards: React.FC = () => {
  const {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';

  const cards = [
    {
      title: 'Getting Started',
      description:
        'Learn the basics of SealMetrics — installation, setup, and how cookieless analytics works.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#00A47C" viewBox="0 0 24 24">
          <path d="M3 13h18v-2H3v2zm0 6h12v-2H3v2zm0-12h18V5H3v2z" />
        </svg>
      ),
      link: '/docs/getting-started',
    },
    {
      title: 'Reports',
      description:
        'Explore reports for traffic sources, funnels, ROAS, and conversions — all privacy-compliant.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#00A47C" viewBox="0 0 24 24">
          <path d="M2 3h20l-8 9v5l-4 4v-9L2 3z" />
        </svg>
      ),
      link: '/docs/getting-started/reports',
    },
    {
      title: 'API Reference',
      description:
        'Full API documentation — endpoints, authentication, and examples for developers.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#00A47C" viewBox="0 0 24 24">
          <path d="M10 4v3H5v10h14V7h-5V4h7v16H3V4h7z" />
        </svg>
      ),
      link: '/docs/api/overview',
    },
    {
      title: 'Legal & Compliance',
      description:
        'Understand how SealMetrics meets GDPR, CNIL, and ePrivacy standards — no cookies required.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#00A47C" viewBox="0 0 24 24">
          <path d="M12 1l8 4v6c0 5.25-3.5 10.74-8 12-4.5-1.26-8-6.75-8-12V5l8-4z" />
        </svg>
      ),
      link: '/docs/legal/compliance',
    },
    {
      title: 'Changelog',
      description:
        'Track the latest updates, feature releases, and improvements across SealMetrics.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#00A47C" viewBox="0 0 24 24">
          <path d="M12 8v5h5v-2h-3V8h-2zm0-6C6.48 2 2 6.48 2 12s4.48 10 10 10 
          10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 
          0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 
          8-3.59 8-8 8z" />
        </svg>
      ),
      link: '/docs/changelog',
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
            <h3
              style={{
                color: '#00A47C',
                marginLeft: '0.5rem',
                fontSize: '1rem',
                marginBottom: 0,
                fontWeight: 600,
              }}
            >
              <Link to={card.link} style={{ textDecoration: 'none', color: '#00A47C' }}>
                {card.title}
              </Link>
            </h3>
          </div>
          <p
            style={{
              fontSize: '0.85rem',
              color: isDark ? '#E0E0E0' : '#333',
              lineHeight: '1.5rem',
            }}
          >
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HomeCards;