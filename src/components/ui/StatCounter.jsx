import { useEffect, useRef } from 'react';
import useCounter from '../../hooks/useCounter';

/**
 * StatCounter — animated number counter card.
 * Fires GSAP count-up animation when scrolled into view.
 */
const StatCounter = ({ label, value, suffix = '', prefix = '', icon: Icon, color = 'primary' }) => {
  const { ref, displayRef } = useCounter(value, { suffix, prefix, duration: 2 });

  const colorMap = {
    primary:   { bg: 'bg-primary-50',   icon: 'text-primary-500',   border: 'border-primary-100' },
    secondary: { bg: 'bg-secondary-50', icon: 'text-secondary-500', border: 'border-secondary-100' },
    accent:    { bg: 'bg-accent-50',    icon: 'text-accent-500',    border: 'border-accent-100' },
  };

  const c = colorMap[color] || colorMap.primary;

  return (
    <div
      ref={ref}
      className={`card flex flex-col items-center text-center p-8 border ${c.border} group hover:shadow-card-hover transition-all duration-300`}
    >
      {Icon && (
        <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={26} className={c.icon} />
        </div>
      )}
      <div className="font-display font-bold text-4xl sm:text-5xl text-slate-900 tracking-tight">
        <span ref={displayRef}>{prefix}0{suffix}</span>
      </div>
      <p className="mt-2 text-slate-500 font-medium text-sm">{label}</p>
    </div>
  );
};

export default StatCounter;
