import { useEffect, useRef } from 'react';
import { countUp } from '../utils/animations';

/**
 * useCounter — animates a number from 0 to `end` when element enters viewport.
 *
 * @param {number} end        - Target number
 * @param {object} options    - { prefix, suffix, duration }
 * @returns {{ ref, displayRef }} - ref: trigger element, displayRef: text element
 */
const useCounter = (end, options = {}) => {
  const ref        = useRef(null);
  const displayRef = useRef(null);

  useEffect(() => {
    const trigger  = ref.current;
    const display  = displayRef.current;
    if (!trigger || !display) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      // Show final value immediately without animation
      const formatted = Math.round(end).toLocaleString('en-IN');
      display.textContent = `${options.prefix ?? ''}${formatted}${options.suffix ?? ''}`;
      return;
    }

    const anim = countUp(display, end, { ...options, trigger });

    return () => anim.kill();
  }, [end]);

  return { ref, displayRef };
};

export default useCounter;
