/**
 * Portfolio Data — Sadia Aqeel
 * Central data store for all portfolio content.
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  thumbnail: string;
  images: string[];
  year: number;
  client?: string;
  featured: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

/** Site-wide metadata */
export const siteConfig = {
  name: 'Sadia Aqeel',
  title: 'Sadia Aqeel — Graphic Designer & Visual Storyteller',
  description:
    'Graphic designer who turns ideas into visuals that speak, connect, and inspire. Specializing in brand identity, social media graphics, UI/UX, posters, and custom typography.',
  url: 'https://sadiaaqeel.com',
  ogImage: '/assets/portfolio/brand-identity-showcase-1.png',
  locale: 'en_US',
  email: 'sadiaa.creativestudio@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sadia-aqeel-6529a7279',
  twitterHandle: '@sadiaaqeel',
  keywords:
    'Sadia Aqeel, Sadia Aqeel graphic designer, graphic designer portfolio, brand identity designer, logo designer, packaging designer, social media graphic designer, visual storyteller, typography artist, Figma UI UX designer, editorial book covers',
  location: 'Available Worldwide',
};

/** Navigation items */
export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
];

/** Services offered */
export const services = [
  {
    id: 'brand-identity',
    title: 'Logo & Brand Identity',
    description: 'Crafting bold, memorable logos and complete brand identity systems that capture brand personality.',
    icon: 'palette',
  },
  {
    id: 'social-media',
    title: 'Social Media Graphics',
    description: 'Eye-catching Instagram posts, carousel ads, promotional graphics, and channel headers designed to engage.',
    icon: 'monitor',
  },
  {
    id: 'posters-flyers',
    title: 'Business Posters & Flyers',
    description: 'High-impact promotional posters, commercial flyers, and event graphics that command attention.',
    icon: 'printer',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Figma Design',
    description: 'Modern desktop landing pages, mobile app interfaces, SaaS dashboards, and digital product mockups.',
    icon: 'pen-tool',
  },
  {
    id: 'book-covers',
    title: 'Book Covers & Editorial',
    description: 'Enchanting book jackets, children book illustrations, and print editorial layouts with wrap typography.',
    icon: 'box',
  },
  {
    id: 'typography',
    title: 'Custom Typography & Art',
    description: 'Handcrafted 3D lettering, neon gradient layouts, monograms, and custom artistic typographic prints.',
    icon: 'play',
  },
];

/** Skills & tools */
export const skills: Skill[] = [
  { name: 'Social Media Design', level: 96 },
  { name: 'Logo Design & Branding', level: 95 },
  { name: 'Figma & UI/UX', level: 92 },
  { name: 'Business Posters & Flyers', level: 94 },
  { name: 'Adobe Photoshop', level: 93 },
  { name: 'Adobe Illustrator', level: 95 },
  { name: 'Book Cover Design', level: 90 },
  { name: 'Typography & Lettering', level: 91 },
  { name: 'Color Theory & Composition', level: 94 },
  { name: 'Brand Systems & Mockups', level: 92 },
];

/** Stats */
export const stats = [
  { value: '180+', label: 'Design Projects' },
  { value: '65+', label: 'Happy Clients' },
  { value: '100%', label: 'Creative Dedication' },
  { value: '4+', label: 'Years Experience' },
];

/** Social links */
export const socialLinks: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/sadia-aqeel-6529a7279', icon: 'linkedin' },
  { platform: 'Email', url: 'mailto:sadiaa.creativestudio@gmail.com', icon: 'mail' },
  { platform: 'Behance', url: 'https://behance.net/sadiaaqeel', icon: 'behance' },
  { platform: 'Instagram', url: 'https://instagram.com/sadiaa.creativestudio', icon: 'instagram' },
];

/** About data */
export const about = {
  name: 'Sadia Aqeel',
  role: 'Graphic Designer & Visual Storyteller',
  email: 'sadiaa.creativestudio@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sadia-aqeel-6529a7279',
  tagline: 'Turning simple ideas into visuals that speak, connect, and inspire.',
  bio: `I’m Sadia, a graphic designer who turns ideas into visuals that speak, connect, and inspire. For me, design isn’t just about making things look good — it’s about telling stories through color, typography, composition, and creativity.

From bold brand identities to eye-catching social media graphics and thoughtful digital designs, I love experimenting with ideas and transforming them into visuals with personality.

I’m constantly learning, exploring new styles, and pushing my creativity further — because every great design starts with a simple idea and a creative mind.`,
  skillsList: [
    'Social media posts & campaign carousels',
    'Business posters, flyers & commercial ads',
    'Logo designs & complete brand identity systems',
    'Book cover pages & publishing spreads',
    'Figma web UI & mobile app interfaces',
    'Custom 3D typography & monogram art'
  ],
  experience: [
    {
      role: 'Lead Graphic Designer',
      company: 'Sadia Creative Studio',
      period: '2022 — Present',
      description: 'Designing brand identities, social media campaigns, print collateral, and UI mockups for global clients.',
    },
    {
      role: 'Visual Communications Specialist',
      company: 'Digital Brand Agency',
      period: '2021 — 2022',
      description: 'Crafted digital marketing graphics, promotional banners, product posters, and corporate social templates.',
    },
    {
      role: 'Freelance Graphic Designer',
      company: 'Independent Studio',
      period: '2020 — 2021',
      description: 'Delivered custom logos, book covers, restaurant promotional posters, and custom typography projects.',
    },
  ],
};

/** Project categories for filtering */
export const projectCategories = [
  'All',
  'Brand Identity',
  'Social Media',
  'Posters',
  'UI/UX & Figma',
  'Editorial & Books',
  'Typography',
];

/** Detailed project list showcasing all curated portfolio assets */
export const projects: Project[] = [
  // Brand Identity
  {
    id: 'nexacore-brand-mockup',
    title: 'NexaCore — Tech Brand Identity System',
    category: 'Brand Identity',
    tags: ['Logo Design', 'Brand Identity', 'Mockup'],
    description: 'Comprehensive dark mode brand identity presentation and corporate stationery system for NexaCore.',
    thumbnail: '/assets/portfolio/nexacore-brand-mockup-1.png',
    images: [
      '/assets/portfolio/nexacore-brand-mockup-1.png',
      '/assets/portfolio/nexacore-brand-mockup-2.png',
      '/assets/portfolio/nexacore-brand-mockup-3.png',
      '/assets/portfolio/nexacore-logo-badge.png'
    ],
    year: 2024,
    client: 'NexaCore Technologies',
    featured: true,
  },
  {
    id: 'aura-brand-system',
    title: 'Aura & Vanguard — Brand Style Guides',
    category: 'Brand Identity',
    tags: ['Brand System', 'Guidelines', 'Editorial'],
    description: 'Editorial brand guidelines, color palette architecture, and visual identity standards.',
    thumbnail: '/assets/portfolio/brand-identity-showcase-1.png',
    images: [
      '/assets/portfolio/brand-identity-showcase-1.png',
      '/assets/portfolio/brand-identity-showcase-2.png'
    ],
    year: 2024,
    client: 'Aura Studio',
    featured: true,
  },
  {
    id: 'doodle-drip-apparel',
    title: 'Doodle Drip — Streetwear Brand Identity',
    category: 'Brand Identity',
    tags: ['Logo Design', 'Streetwear', 'Illustration'],
    description: 'Vibrant, playful emblem and logo design crafted for a streetwear clothing brand.',
    thumbnail: '/assets/portfolio/doodle-drip-logo.png',
    images: ['/assets/portfolio/doodle-drip-logo.png'],
    year: 2024,
    client: 'Doodle Drip Apparel',
    featured: true,
  },
  {
    id: 'little-wonder-kids',
    title: 'Little Wonder — Children Studio Branding',
    category: 'Brand Identity',
    tags: ['Branding', 'Whimsical', 'Identity'],
    description: 'Charming and friendly brand mark for an early childhood creative learning studio.',
    thumbnail: '/assets/portfolio/little-wonder-logo.png',
    images: ['/assets/portfolio/little-wonder-logo.png'],
    year: 2024,
    client: 'Little Wonder Studio',
    featured: false,
  },
  {
    id: 'lumino-ronforce-logos',
    title: 'Lumino Studio & Ron Force — Crest Logos',
    category: 'Brand Identity',
    tags: ['Logo Design', 'Typography', 'Crest'],
    description: 'Minimalist corporate agency emblem and bold athletic performance crest mark.',
    thumbnail: '/assets/portfolio/lumino-studio-logo.png',
    images: [
      '/assets/portfolio/lumino-studio-logo.png',
      '/assets/portfolio/ron-force-logo.png'
    ],
    year: 2024,
    client: 'Various Clients',
    featured: false,
  },
  {
    id: 'sadia-business-cards',
    title: 'Sadia Creative Studio & Cheezious Business Cards',
    category: 'Brand Identity',
    tags: ['Business Card', 'Gold Foil', 'Mockup'],
    description: 'Premium tactile business card design with gold foil print finish and corporate restaurant card.',
    thumbnail: '/assets/portfolio/sadia-creative-studio-business-card.png',
    images: [
      '/assets/portfolio/sadia-creative-studio-business-card.png',
      '/assets/portfolio/cheezious-corporate-business-card.png'
    ],
    year: 2024,
    client: 'Sadia Creative Studio',
    featured: true,
  },

  // Social Media
  {
    id: 'botanicq-haircare-campaign',
    title: 'BotanicQ — Natural Hair & Skincare Campaign',
    category: 'Social Media',
    tags: ['Social Media', 'Product Ad', 'Botanical'],
    description: 'Organic botanical product posters and Instagram feed graphics for BotanicQ Hair Oil and Shampoo.',
    thumbnail: '/assets/portfolio/botanicq-hair-oil-poster.png',
    images: [
      '/assets/portfolio/botanicq-hair-oil-poster.png',
      '/assets/portfolio/botanicq-shampoo-post.png',
      '/assets/portfolio/botanicq-social-carousel-1.png',
      '/assets/portfolio/botanicq-social-carousel-2.png',
      '/assets/portfolio/botanicq-social-carousel-3.png'
    ],
    year: 2024,
    client: 'BotanicQ Organics',
    featured: true,
  },
  {
    id: 'maison-vintage-perfume',
    title: 'Maison Vintage — Luxury Perfume Ad',
    category: 'Social Media',
    tags: ['Social Media', 'Luxury', 'Perfume'],
    description: 'Moody, aesthetic dark vintage fragrance product campaign for high-end luxury audience.',
    thumbnail: '/assets/portfolio/dark-vintage-luxury-perfume.png',
    images: ['/assets/portfolio/dark-vintage-luxury-perfume.png'],
    year: 2024,
    client: 'Maison Perfumes',
    featured: true,
  },
  {
    id: 'skincare-glow-feed',
    title: 'Radiant Glow — Skincare Instagram Feed',
    category: 'Social Media',
    tags: ['Social Media', 'Beauty', 'Pastel'],
    description: 'Pastel aesthetic lifestyle beauty graphics created for social media skincare launches.',
    thumbnail: '/assets/portfolio/skincare-glow-instagram-post.png',
    images: ['/assets/portfolio/skincare-glow-instagram-post.png'],
    year: 2024,
    client: 'Radiant Skincare',
    featured: false,
  },
  {
    id: 'agency-digital-posts',
    title: 'Apex Marketing & Digital Growth Posts',
    category: 'Social Media',
    tags: ['Social Media', 'Agency', 'Banners'],
    description: 'Bold agency announcement posters, growth hacks carousels, and promotional templates.',
    thumbnail: '/assets/portfolio/apex-marketing-agency-banner.png',
    images: [
      '/assets/portfolio/apex-marketing-agency-banner.png',
      '/assets/portfolio/digital-growth-services-post.png',
      '/assets/portfolio/growth-hacks-carousel-cover.png',
      '/assets/portfolio/creative-agency-promo-post.png'
    ],
    year: 2024,
    client: 'Apex Marketing Agency',
    featured: true,
  },
  {
    id: 'supermarket-retail-post',
    title: 'Bachat Bazar Supermarket Campaign',
    category: 'Social Media',
    tags: ['Retail', 'Advertising', 'Social'],
    description: 'High-visibility retail promotion campaign banner highlighting super deals and price callouts.',
    thumbnail: '/assets/portfolio/bilal-bachat-bazar-supermarket.png',
    images: ['/assets/portfolio/bilal-bachat-bazar-supermarket.png'],
    year: 2024,
    client: 'Bilal Bachat Bazar',
    featured: false,
  },
  {
    id: 'sadia-youtube-header',
    title: 'Sadia Creative — YouTube Channel Art',
    category: 'Social Media',
    tags: ['YouTube Banner', 'Channel Art', 'Social'],
    description: 'Cinematic wide-aspect channel banner artwork designed for digital design & tutorial YouTube channel.',
    thumbnail: '/assets/portfolio/sadia-youtube-channel-art.png',
    images: ['/assets/portfolio/sadia-youtube-channel-art.png'],
    year: 2024,
    client: 'Self Project',
    featured: false,
  },

  // Posters
  {
    id: 'biryani-food-poster',
    title: 'Royal Biryani — Gourmet Food Poster',
    category: 'Posters',
    tags: ['Food & Beverage', 'Poster', 'Print'],
    description: 'Mouthwatering commercial restaurant promo poster with vibrant colors and rich food typography.',
    thumbnail: '/assets/portfolio/biryani-delight-food-poster.png',
    images: ['/assets/portfolio/biryani-delight-food-poster.png'],
    year: 2024,
    client: 'Royal Flavors Restaurant',
    featured: true,
  },
  {
    id: 'zinger-stacker-ad',
    title: 'Crispy Zinger Stacker — Fast Food Ad',
    category: 'Posters',
    tags: ['Advertising', 'Food', 'Poster'],
    description: 'Bold commercial advertisement poster for fast-food burger campaign.',
    thumbnail: '/assets/portfolio/zinger-stacker-burger-poster.png',
    images: ['/assets/portfolio/zinger-stacker-burger-poster.png'],
    year: 2024,
    client: 'Zinger Express',
    featured: true,
  },
  {
    id: 'audiopro-headphones-poster',
    title: 'AudioPro — Wireless Headphones Poster',
    category: 'Posters',
    tags: ['Tech', 'Advertising', 'Poster'],
    description: 'Sleek dark mode tech product advertisement highlighting audio clarity and wireless features.',
    thumbnail: '/assets/portfolio/audio-pro-wireless-headphones.png',
    images: ['/assets/portfolio/audio-pro-wireless-headphones.png'],
    year: 2024,
    client: 'AudioPro Sound',
    featured: true,
  },
  {
    id: 'urban-fashion-sale',
    title: 'Urban Fashion — Autumn Sale Poster',
    category: 'Posters',
    tags: ['Fashion', 'Poster', 'Retail'],
    description: 'Contemporary streetwear seasonal promo poster featuring bold typography and modern grid layout.',
    thumbnail: '/assets/portfolio/urban-fashion-autumn-sale.png',
    images: ['/assets/portfolio/urban-fashion-autumn-sale.png'],
    year: 2024,
    client: 'Urban Fashion Co.',
    featured: false,
  },
  {
    id: 'sadia-design-services-flyer',
    title: 'Sadia Design Services — Studio Flyer',
    category: 'Posters',
    tags: ['Flyer', 'Services', 'Self Promo'],
    description: 'Creative studio promotional banner showcasing graphic design offerings and client benefits.',
    thumbnail: '/assets/portfolio/sadia-design-services-flyer.png',
    images: ['/assets/portfolio/sadia-design-services-flyer.png'],
    year: 2024,
    client: 'Sadia Creative Studio',
    featured: false,
  },
  {
    id: 'rivaj-vitaminc-poster',
    title: 'Rivaj Vitamin C Serum Promo Poster',
    category: 'Posters',
    tags: ['Cosmetics', 'Skincare', 'Poster'],
    description: 'Clean cosmetic skincare campaign poster featuring fresh citrus color palette and bottle showcase.',
    thumbnail: '/assets/portfolio/rivaj-vitamin-c-serum.png',
    images: ['/assets/portfolio/rivaj-vitamin-c-serum.png'],
    year: 2024,
    client: 'Rivaj Cosmetics',
    featured: false,
  },

  // Editorial & Books
  {
    id: 'magic-story-tree-book',
    title: 'The Magic Story Tree — Children Book Cover',
    category: 'Editorial & Books',
    tags: ['Book Cover', 'Illustration', 'Publishing'],
    description: 'Enchanting illustrated children book cover and full wrap spine jacket spread.',
    thumbnail: '/assets/portfolio/magic-story-tree-book-cover.png',
    images: [
      '/assets/portfolio/magic-story-tree-book-cover.png',
      '/assets/portfolio/magic-story-spine-spread.png'
    ],
    year: 2024,
    client: 'Story Tree Publishing',
    featured: true,
  },
  {
    id: 'fairytale-forest-book',
    title: 'Fairytale Forest — Fantasy Novel Cover',
    category: 'Editorial & Books',
    tags: ['Illustration', 'Fantasy', 'Novel Cover'],
    description: 'Whimsical fantasy fiction front cover design with rich treehouse illustration and title art.',
    thumbnail: '/assets/portfolio/fairytale-forest-book-cover.png',
    images: ['/assets/portfolio/fairytale-forest-book-cover.png'],
    year: 2024,
    client: 'Fantasy House Press',
    featured: true,
  },

  // UI/UX & Figma
  {
    id: 'aura-marketing-app-ui',
    title: 'Aura List — Mobile Marketing App UI',
    category: 'UI/UX & Figma',
    tags: ['UI/UX', 'App Design', 'Figma'],
    description: 'Comprehensive mobile SaaS app interface design with dark glassmorphism analytics cards.',
    thumbnail: '/assets/portfolio/aura-list-marketing-app-ui.png',
    images: ['/assets/portfolio/aura-list-marketing-app-ui.png'],
    year: 2024,
    client: 'Aura Tech',
    featured: true,
  },
  {
    id: 'tejar-ecommerce-landing',
    title: 'Tejar — E-Commerce Web Landing Page',
    category: 'UI/UX & Figma',
    tags: ['Web Design', 'Landing Page', 'E-Commerce'],
    description: 'High-converting desktop landing page architecture for a multi-category online retail platform.',
    thumbnail: '/assets/portfolio/tejar-ecommerce-landing-page.png',
    images: ['/assets/portfolio/tejar-ecommerce-landing-page.png'],
    year: 2024,
    client: 'Tejar Shopping',
    featured: true,
  },
  {
    id: 'pro-controller-product-ui',
    title: 'Pro Controller — Gaming Product Page UI',
    category: 'UI/UX & Figma',
    tags: ['Product Design', 'Dark UI', 'Figma'],
    description: 'Sleek dark metallic product showcase UI with interactive feature hotspots and specification breakdown.',
    thumbnail: '/assets/portfolio/pro-gaming-controller-ui.png',
    images: ['/assets/portfolio/pro-gaming-controller-ui.png'],
    year: 2024,
    client: 'Pro Play Devices',
    featured: false,
  },
  {
    id: 'dashboard-saas-layouts',
    title: 'Analytics Dashboard & SaaS Hero Layouts',
    category: 'UI/UX & Figma',
    tags: ['Dashboard', 'SaaS', 'Web Layout'],
    description: 'SaaS analytics web dashboard wireframes, digital product presentation cards, and landing page heroes.',
    thumbnail: '/assets/portfolio/dashboard-analytics-wireframe.png',
    images: [
      '/assets/portfolio/dashboard-analytics-wireframe.png',
      '/assets/portfolio/modern-saas-hero-landing.png',
      '/assets/portfolio/digital-product-card-ui.png'
    ],
    year: 2024,
    client: 'Figma Showcase',
    featured: false,
  },

  // Typography
  {
    id: 'tropical-island-typography',
    title: 'Tropical Island — 3D Custom Lettering',
    category: 'Typography',
    tags: ['Typography', 'Lettering', 'Custom 3D'],
    description: 'Handcrafted 3D custom typography artwork featuring rich natural textures and vibrant depth.',
    thumbnail: '/assets/portfolio/tropical-island-custom-typography.png',
    images: ['/assets/portfolio/tropical-island-custom-typography.png'],
    year: 2024,
    client: 'Typography Series',
    featured: true,
  },
  {
    id: 'love-gradient-and-monogram-r',
    title: 'Love Neon Gradient & Monogram R Art',
    category: 'Typography',
    tags: ['Typography', 'Neon', '3D Monogram'],
    description: 'Vibrant neon gradient typographic artwork and 3D metallic chrome monogram R emblem.',
    thumbnail: '/assets/portfolio/love-neon-gradient-typography.png',
    images: [
      '/assets/portfolio/love-neon-gradient-typography.png',
      '/assets/portfolio/monogram-r-typography-art.png',
      '/assets/portfolio/inspirational-design-quote-post.png',
      '/assets/portfolio/jumma-mubarak-editorial-poster.png'
    ],
    year: 2024,
    client: 'Creative Lab',
    featured: true,
  }
];