/**
 * SEO Utilities — Sadia Aqeel Portfolio
 * Helpers for generating rich structured data (JSON-LD), OpenGraph tags,
 * Twitter Cards, and canonical URLs for maximum search visibility.
 */

import { siteConfig, services } from '../data/portfolio';

export interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
}

/** Generate full, search-optimized page title */
export function getPageTitle(pageTitle?: string): string {
  if (!pageTitle) return siteConfig.title;
  if (pageTitle.includes('Sadia Aqeel')) return pageTitle;
  return `${pageTitle} — ${siteConfig.name}`;
}

/** Generate JSON-LD Person structured data for Google Knowledge Graph */
export function getPersonSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.name,
    alternateName: ['Sadia', 'Sadia Aqeel Design', 'Sadia Creative Studio'],
    url: siteConfig.url,
    image: `${siteConfig.url}/assets/hero/portrait.jpg`,
    jobTitle: 'Graphic Designer & Visual Storyteller',
    description: siteConfig.description,
    email: `mailto:${siteConfig.email}`,
    sameAs: [
      siteConfig.linkedin,
      'https://instagram.com/sadiaa.creativestudio',
      'https://behance.net/sadiaaqeel',
    ],
    knowsAbout: [
      'Graphic Design',
      'Brand Identity Systems',
      'Logo Design',
      'Social Media Graphics & Campaign Posts',
      'Business Posters & Commercial Flyers',
      'Editorial Book Covers',
      'UI/UX & Figma Design',
      'Custom Typography & Lettering',
      'Packaging Design',
      'Adobe Creative Suite (Photoshop, Illustrator)',
    ],
    worksFor: {
      '@type': 'ProfessionalService',
      name: 'Sadia Creative Studio',
      url: siteConfig.url,
    },
  });
}

/** Generate JSON-LD ProfessionalService schema for top-ranking studio presence */
export function getProfessionalServiceSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/#service`,
    name: 'Sadia Aqeel — Creative Studio',
    url: siteConfig.url,
    image: `${siteConfig.url}/assets/portfolio/brand-identity-showcase-1.png`,
    description: siteConfig.description,
    founder: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    areaServed: 'Worldwide',
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Graphic Design Services',
      itemListElement: services.map((s, idx) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          position: idx + 1,
          name: s.title,
          description: s.description,
        },
      })),
    },
  });
}

/** Generate JSON-LD for a portfolio piece */
export function getProjectSchema(project: {
  title: string;
  description: string;
  thumbnail: string;
  year: number;
  category?: string;
}): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    genre: project.category || 'Graphic Design',
    image: `${siteConfig.url}${project.thumbnail}`,
    dateCreated: `${project.year}`,
    creator: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  });
}

/** Generate JSON-LD for the website */
export function getWebsiteSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: `${siteConfig.name} — Graphic Designer Portfolio`,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
    },
  });
}

/** Generate breadcrumb schema */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  });
}
