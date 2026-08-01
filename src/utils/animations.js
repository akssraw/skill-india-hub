import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Easing Presets ─────────────────────────────────────────
export const ease = {
  smooth:   'power2.out',
  snappy:   'power3.out',
  elastic:  'back.out(1.4)',
  gentle:   'power1.inOut',
};

// ─── Duration Presets ────────────────────────────────────────
export const dur = {
  fast:   0.3,
  base:   0.5,
  slow:   0.8,
  xslow:  1.2,
};

// ─── Fade Up (most common scroll reveal) ─────────────────────
export const fadeUp = (targets, options = {}) => {
  const {
    delay   = 0,
    stagger = 0,
    y       = 40,
    duration = dur.slow,
    trigger,
    once    = true,
  } = options;

  const anim = gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity:  1,
      y:        0,
      duration,
      delay,
      stagger,
      ease:     ease.smooth,
    }
  );

  if (trigger) {
    ScrollTrigger.create({
      trigger,
      start:   'top 85%',
      once,
      onEnter: () => anim.play(),
    });
    anim.pause();
  }

  return anim;
};

// ─── Fade In ─────────────────────────────────────────────────
export const fadeIn = (targets, options = {}) => {
  const { delay = 0, duration = dur.base, trigger, once = true } = options;

  const anim = gsap.fromTo(
    targets,
    { opacity: 0 },
    { opacity: 1, duration, delay, ease: ease.gentle }
  );

  if (trigger) {
    ScrollTrigger.create({
      trigger,
      start:   'top 88%',
      once,
      onEnter: () => anim.play(),
    });
    anim.pause();
  }

  return anim;
};

// ─── Stagger Cards ───────────────────────────────────────────
export const staggerCards = (targets, trigger, options = {}) => {
  const { stagger = 0.1, y = 50, duration = dur.slow } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity:  1,
      y:        0,
      duration,
      stagger,
      ease:     ease.smooth,
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        once:  true,
      },
    }
  );
};

// ─── Number Counter ──────────────────────────────────────────
export const countUp = (target, endValue, options = {}) => {
  const { duration = 1.8, prefix = '', suffix = '', trigger } = options;
  const obj = { val: 0 };
  let lastVal = -1;

  const anim = gsap.to(obj, {
    val:      endValue,
    duration,
    ease:     'power2.out',
    paused:   !!trigger,
    onUpdate: () => {
      const current = Math.round(obj.val);
      if (current !== lastVal) {
        lastVal = current;
        target.textContent = `${prefix}${current.toLocaleString('en-IN')}${suffix}`;
      }
    },
  });

  if (trigger) {
    ScrollTrigger.create({
      trigger,
      start:   'top 85%',
      once:    true,
      onEnter: () => anim.play(),
    });
  }

  return anim;
};

// ─── Slide In From Left ───────────────────────────────────────
export const slideInLeft = (targets, trigger, options = {}) => {
  const { stagger = 0.08, duration = dur.slow } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, x: -60 },
    {
      opacity:  1,
      x:        0,
      duration,
      stagger,
      ease:     ease.snappy,
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        once:  true,
      },
    }
  );
};

// ─── Timeline Draw (for Roadmap) ────────────────────────────
export const drawTimeline = (line, nodes, trigger) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top 70%',
      once:  true,
    },
  });

  tl.fromTo(line,
    { scaleY: 0, transformOrigin: 'top center' },
    { scaleY: 1, duration: dur.xslow, ease: ease.smooth }
  );

  tl.fromTo(nodes,
    { opacity: 0, scale: 0, x: -20 },
    { opacity: 1, scale: 1, x: 0, stagger: 0.15, duration: dur.base, ease: ease.elastic },
    '-=0.6'
  );

  return tl;
};

// ─── Hero Entrance (word by word) ────────────────────────────
export const heroReveal = (container) => {
  const tl = gsap.timeline({ defaults: { ease: ease.smooth } });

  const label = container.querySelector('[data-hero-label]');
  const words = container.querySelectorAll('[data-hero-word]');
  const sub   = container.querySelector('[data-hero-sub]');
  const ctas  = container.querySelectorAll('[data-hero-cta]');
  const badge = container.querySelector('[data-hero-badge]');

  if (badge)  tl.fromTo(badge, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
  if (label)  tl.fromTo(label, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.1');
  if (words.length) {
    tl.fromTo(words,
      { opacity: 0, y: 60, rotateX: -10 },
      { opacity: 1, y: 0,  rotateX: 0, stagger: 0.07, duration: 0.7 },
      '-=0.2'
    );
  }
  if (sub)   tl.fromTo(sub,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
  if (ctas.length) {
    tl.fromTo(ctas,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 },
      '-=0.3'
    );
  }

  return tl;
};

// ─── Cleanup helper ─────────────────────────────────────────
export const killScrollTriggers = (triggers) => {
  if (triggers) {
    triggers.forEach(t => t && t.kill());
  }
  ScrollTrigger.getAll().forEach(st => st.kill());
};
