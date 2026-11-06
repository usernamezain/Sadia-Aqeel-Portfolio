/**
 * GSAP Animation Utilities
 * Centralized GSAP setup with ScrollTrigger for the portfolio.
 * All animations are lazy-initialized and respect prefers-reduced-motion.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once
gsap.registerPlugin(ScrollTrigger);

/** Check if user prefers reduced motion */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/** Default GSAP settings for smooth feel */
gsap.defaults({
  ease: 'expo.out',
  duration: 1,
});

/**
 * Initialize scroll-triggered reveal animations.
 * Targets all elements with [data-animate] attribute.
 */
export function initScrollAnimations(): void {
  if (prefersReducedMotion()) return;

  const animatedElements = document.querySelectorAll('[data-animate]');

  animatedElements.forEach((el) => {
    const animType = el.getAttribute('data-animate');
    const delay = parseFloat(el.getAttribute('data-delay') || '0');
    const duration = parseFloat(el.getAttribute('data-duration') || '1');

    const baseProps: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    };

    switch (animType) {
      case 'fade-up':
        gsap.to(el, { ...baseProps, y: 0 });
        break;
      case 'fade-down':
        gsap.to(el, { ...baseProps, y: 0 });
        break;
      case 'fade-left':
        gsap.to(el, { ...baseProps, x: 0 });
        break;
      case 'fade-right':
        gsap.to(el, { ...baseProps, x: 0 });
        break;
      case 'scale-up':
        gsap.to(el, { ...baseProps, scale: 1 });
        break;
      case 'reveal':
        gsap.to(el, { ...baseProps, clipPath: 'inset(0% 0 0 0)' });
        break;
      default:
        gsap.to(el, { ...baseProps });
    }
  });
}

/**
 * Staggered reveal for groups of elements.
 * Usage: <div data-stagger-parent> <div data-stagger-child>...
 */
export function initStaggerAnimations(): void {
  if (prefersReducedMotion()) return;

  const parents = document.querySelectorAll('[data-stagger-parent]');

  parents.forEach((parent) => {
    const children = parent.querySelectorAll('[data-stagger-child]');
    const staggerDelay = parseFloat(parent.getAttribute('data-stagger-delay') || '0.1');

    gsap.fromTo(
      children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: staggerDelay,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: parent,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

/**
 * Smooth text split reveal animation.
 * Splits text into words/chars and animates them in.
 */
export function initTextReveal(): void {
  if (prefersReducedMotion()) return;

  const textElements = document.querySelectorAll('[data-text-reveal]');

  textElements.forEach((el) => {
    const text = el.textContent || '';
    const splitType = el.getAttribute('data-text-reveal') || 'words';

    if (splitType === 'chars') {
      el.innerHTML = text
        .split('')
        .map((char) => `<span class="char" style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');
    } else {
      el.innerHTML = text
        .split(' ')
        .map((word) => `<span class="word" style="display:inline-block; overflow:hidden"><span style="display:inline-block">${word}</span></span>`)
        .join(' ');
    }

    const targets = el.querySelectorAll(splitType === 'chars' ? '.char' : '.word > span');

    gsap.fromTo(
      targets,
      { y: '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: splitType === 'chars' ? 0.02 : 0.06,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

/**
 * Parallax effect on scroll.
 * Usage: <element data-parallax="0.3">
 */
export function initParallax(): void {
  if (prefersReducedMotion()) return;

  const parallaxElements = document.querySelectorAll('[data-parallax]');

  parallaxElements.forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-parallax') || '0.3');

    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

/**
 * Magnetic hover effect for buttons and interactive elements.
 * Usage: <element class="magnetic">
 */
export function initMagneticHover(): void {
  if (prefersReducedMotion()) return;

  const magneticElements = document.querySelectorAll('.magnetic');

  magneticElements.forEach((el) => {
    const htmlEl = el as HTMLElement;

    htmlEl.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = htmlEl.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(htmlEl, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    htmlEl.addEventListener('mouseleave', () => {
      gsap.to(htmlEl, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    });
  });
}

import { initLenis } from './lenis';

/**
 * Initialize all GSAP animations and Lenis smooth scroll.
 * Call this once from the main layout's client script.
 */
export function initAllAnimations(): void {
  if (prefersReducedMotion()) return;

  initLenis();
  initScrollAnimations();
  initStaggerAnimations();
  initTextReveal();
  initParallax();
  initMagneticHover();

  // Refresh ScrollTrigger after all animations are set up
  ScrollTrigger.refresh();
}

// Re-export gsap and ScrollTrigger for direct use
export { gsap, ScrollTrigger };
