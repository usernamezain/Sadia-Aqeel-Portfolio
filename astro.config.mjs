// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://sadiaaqeel.com',

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
    react(),
  ],

  image: {
    // Use sharp for image optimization (auto-WebP, AVIF conversion)
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        quality: 80,
      },
    },
  },

  vite: {
    build: {
      // Code splitting for optimal loading
      rollupOptions: {
        output: {
          // Default chunking is fine
        },
      },
      // Minify for production
      cssMinify: 'lightningcss',
    },
    // Pre-bundle GSAP and Three.js so Vite never throws 504 Outdated Optimize Dep
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger', 'three'],
    },
    // Tree-shake unused code
    ssr: {
      noExternal: ['gsap', 'three'],
    },
  },

  // Prefetch links for instant navigation
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  // Build output optimization
  output: 'static',
  compressHTML: true,
});
