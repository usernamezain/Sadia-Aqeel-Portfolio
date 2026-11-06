/**
 * Custom Cursor Follower
 * Smooth, magnetic cursor with blend-mode effects.
 */

import { gsap } from 'gsap';

export function initCustomCursor(): void {
  // Skip on touch devices
  if ('ontouchstart' in window) return;

  // Create cursor elements
  const cursorOuter = document.createElement('div');
  const cursorInner = document.createElement('div');

  cursorOuter.className = 'cursor-follower cursor-follower--outer';
  cursorInner.className = 'cursor-follower cursor-follower--inner';

  document.body.appendChild(cursorOuter);
  document.body.appendChild(cursorInner);

  // Inject cursor styles
  const style = document.createElement('style');
  style.textContent = `
    .cursor-follower {
      position: fixed;
      top: 0;
      left: 0;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      will-change: transform;
    }
    .cursor-follower--outer {
      width: 40px;
      height: 40px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      transition: width 0.3s, height 0.3s, border-color 0.3s;
    }
    .cursor-follower--inner {
      width: 8px;
      height: 8px;
      background: #e94560;
    }
    .cursor-follower.is-hovering .cursor-follower--outer,
    .cursor-follower--outer.is-hovering {
      width: 60px;
      height: 60px;
      border-color: #e94560;
    }
    .cursor-follower--inner.is-hovering {
      width: 4px;
      height: 4px;
    }
    body { cursor: none; }
    a, button, [role="button"], .magnetic { cursor: none; }
  `;
  document.head.appendChild(style);

  // Track mouse
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth follow with GSAP ticker
  gsap.ticker.add(() => {
    gsap.to(cursorInner, {
      x: mouseX - 4,
      y: mouseY - 4,
      duration: 0.1,
      ease: 'power2.out',
    });

    gsap.to(cursorOuter, {
      x: mouseX - 20,
      y: mouseY - 20,
      duration: 0.35,
      ease: 'power2.out',
    });
  });

  // Hover effects
  const hoverTargets = document.querySelectorAll('a, button, [role="button"], .magnetic');

  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorOuter.classList.add('is-hovering');
      cursorInner.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursorOuter.classList.remove('is-hovering');
      cursorInner.classList.remove('is-hovering');
    });
  });
}
