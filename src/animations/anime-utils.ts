/**
 * Anime.js Micro-Animations
 * Lightweight animations for UI interactions — loaders, hovers, SVG morphing.
 */

import anime from 'animejs';

/** Animate SVG path drawing */
export function drawSVGPath(selector: string, duration = 2000): anime.AnimeInstance {
  return anime({
    targets: selector,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutQuart',
    duration,
    delay: (_el: HTMLElement, i: number) => i * 200,
  });
}

/** Wavy/wiggly line animation */
export function animateWavyLine(selector: string): anime.AnimeInstance {
  return anime({
    targets: selector,
    d: [
      { value: 'M0,50 Q25,30 50,50 T100,50 T150,50 T200,50' },
      { value: 'M0,50 Q25,70 50,50 T100,50 T150,50 T200,50' },
    ],
    easing: 'easeInOutSine',
    duration: 3000,
    loop: true,
    direction: 'alternate',
  });
}

/** Staggered dots/particles animation */
export function animateParticles(selector: string): anime.AnimeInstance {
  return anime({
    targets: selector,
    translateX: () => anime.random(-30, 30),
    translateY: () => anime.random(-30, 30),
    scale: [0, 1],
    opacity: [0, 0.6],
    easing: 'easeOutExpo',
    duration: 1500,
    delay: (_el: HTMLElement, i: number) => i * 50,
  });
}

/** Morphing shape animation between two SVG paths */
export function morphShape(
  selector: string,
  pathA: string,
  pathB: string,
  duration = 2000
): anime.AnimeInstance {
  return anime({
    targets: selector,
    d: [{ value: pathA }, { value: pathB }],
    easing: 'easeInOutQuad',
    duration,
    loop: true,
    direction: 'alternate',
  });
}

/** Typewriter text reveal */
export function typewriterEffect(selector: string, speed = 30): void {
  const el = document.querySelector(selector) as HTMLElement;
  if (!el) return;

  const text = el.textContent || '';
  el.textContent = '';
  el.style.visibility = 'visible';

  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

/** Smooth counter animation */
export function animateCounter(
  selector: string,
  target: number,
  duration = 2000
): void {
  const el = document.querySelector(selector) as HTMLElement;
  if (!el) return;

  const obj = { value: 0 };
  anime({
    targets: obj,
    value: target,
    round: 1,
    easing: 'easeInOutExpo',
    duration,
    update: () => {
      el.textContent = obj.value.toString();
    },
  });
}

export { anime };
