import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;

/**
 * Initialize Lenis Smooth Scroll.
 * Configured with frame-perfect GSAP ticker integration and zero input lag.
 */
export function initLenis(): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  // Destroy previous instance if re-initializing on page navigation
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }

  // Instantiate Lenis with optimal responsive settings (smooth wheel, instant touch)
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false, // Instant 1:1 touch response on mobile to prevent input lag
    touchMultiplier: 1.5,
  });

  // Synchronize Lenis scroll updates with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Synchronize Lenis animation frames with GSAP ticker
  gsap.ticker.add((time: number) => {
    lenisInstance?.raf(time * 1000);
  });

  // Prevent frame lag smoothing delays during fast scrolling
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
