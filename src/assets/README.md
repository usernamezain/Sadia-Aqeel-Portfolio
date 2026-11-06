# Assets — Media Files

This folder contains all optimized media assets for the portfolio.
Astro's built-in image optimization (via sharp) will automatically:
- Convert images to WebP/AVIF
- Resize for responsive breakpoints
- Generate srcset attributes

## Folder Structure

```
assets/
├── images/           # Optimized images (use Astro's <Image> component)
│   ├── hero/         # Hero section images
│   ├── projects/     # Project thumbnails & galleries
│   ├── about/        # Profile photos & about imagery
│   └── backgrounds/  # Decorative background textures
├── icons/            # SVG icons and icon sprites
├── videos/           # Background videos, reels (keep small)
└── lottie/           # Lottie JSON animation files
```

## Guidelines

1. **Images**: Use `.webp` or `.jpg` — Astro will auto-optimize
2. **Icons**: Use SVG format for scalability
3. **Videos**: Keep under 5MB, use `.mp4` (H.264) or `.webm`
4. **Lottie**: Export as `.json` from After Effects
5. **Naming**: Use kebab-case: `project-bloom-thumb.webp`
