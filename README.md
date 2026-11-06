# Sadia Aqeel — Senior Brand & Visual Identity Designer

A bespoke, high-performance portfolio website built with **Astro 5**, **React**, **GSAP**, and **TypeScript**. Designed for high visual fidelity, seamless motion design, interactive swatches, and sub-second page performance.

---

## ✨ Features

- **Custom Signature Preloader**: Vector path stroke drawing and responsive OpenType-calculated signature typography.
- **Interactive Service Swatches**: Deck system with SVG chromatic displacement filter and dynamic depth tilt.
- **Glassmorphism Contact Experience**: Real-time cursor-tracking specular border highlights, inner radial spotlight, segmented spring budget slider, and live UTC clock.
- **Curated Case Studies & Gallery**: Categorized showcase for Brand Identity, Social Posts, Posters, Packaging, and UI/UX with responsive previews.
- **Smooth Inertia Scrolling & Motion**: Integrated Lenis smooth scroll and GSAP timelines with `prefers-reduced-motion` compliance.

---

## 🛠️ Tech Stack

- **Framework**: [Astro 5](https://astro.build/)
- **UI & Islands**: [React 19](https://react.dev/)
- **Animation**: [GSAP](https://greensock.com/gsap/), [Lenis](https://github.com/darkroomengineering/lenis), [Anime.js](https://animejs.com/)
- **Typography Engine**: [OpenType.js](https://opentype.js.org/)
- **Styling**: Scoped CSS architecture, Glassmorphism, CSS Custom Properties

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 22.12.0`
- **npm** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/usernamezain/Sadia-Aqeel-Portfolio.git

# Navigate to directory
cd Sadia-Aqeel-Portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to view the live development server.

### Production Build

```bash
# Build static site output to /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```text
├── public/                 # Static assets, fonts, favicons & portfolio gallery
│   ├── assets/             # Curated showcase images, process, & capsules
│   └── fonts/              # Variable typography (Satoshi, ClashDisplay, Lastoria)
├── src/
│   ├── animations/         # Lenis smooth scroll, GSAP helpers & cursor logic
│   ├── components/         # Astro & React interactive components (Preloader, Swatches, Dock, Nav)
│   ├── data/               # Portfolio projects, client reviews & services data
│   ├── layouts/            # BaseLayout with SEO & metadata
│   ├── pages/              # Routing (index, work, services, about, contact, 404)
│   ├── styles/             # Scoped stylesheets & global tokens
│   └── utils/              # Performance monitors & SEO helpers
├── astro.config.mjs
└── package.json
```

---

## 📄 License

Private portfolio. All artwork, brand identities, and visual assets are copyright © Sadia Aqeel.
