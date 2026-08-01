import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { staggerCards, fadeUp, slideInLeft } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollReveal — attaches GSAP ScrollTrigger-based reveal animations
 * to a ref element and its children.
 *
 * @param {('fadeUp'|'stagger'|'slideLeft')} type - Animation type
 * @param {object} options - Passed through to the animation function
 * @returns {React.RefObject} - Attach this ref to your container element
 */
const useScrollReveal = (type = 'fadeUp', options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ctx;

    // Use GSAP context for proper cleanup
    ctx = gsap.context(() => {
      switch (type) {
        case 'stagger': {
          const items = options.selector
            ? el.querySelectorAll(options.selector)
            : el.children;
          staggerCards(items, el, options);
          break;
        }
        case 'slideLeft': {
          const items = options.selector
            ? el.querySelectorAll(options.selector)
            : [el];
          slideInLeft(items, el, options);
          break;
        }
        case 'fadeUp':
        default: {
          fadeUp(el, { ...options, trigger: el });
          break;
        }
      }
    }, el);

    return () => {
      ctx && ctx.revert();
    };
  }, [type]);

  return ref;
};

export default useScrollReveal;
