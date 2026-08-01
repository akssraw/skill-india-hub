import { useRef, useEffect } from 'react';
import { PARTNERS } from '../../data/partners';

const PartnerLogos = () => {
  const trackRef = useRef(null);

  // Pause on hover, resume on leave
  const pause  = () => trackRef.current?.style && (trackRef.current.style.animationPlayState = 'paused');
  const resume = () => trackRef.current?.style && (trackRef.current.style.animationPlayState = 'running');

  // Duplicate array for seamless loop
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-14 bg-white border-y border-slate-100 overflow-hidden" aria-label="Our partners">
      <div className="container-custom mb-8 text-center">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
          Trusted by India's Leading Organisations
        </p>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex items-center gap-0 animate-marquee"
          style={{ width: 'max-content' }}
        >
          {doubled.map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="flex items-center justify-center mx-8 group cursor-default"
              title={p.name}
            >
              <span
                className="font-display font-black text-xl tracking-tight transition-all duration-300"
                style={{ color: '#cbd5e1' }}
                onMouseEnter={e => e.target.style.color = p.color}
                onMouseLeave={e => e.target.style.color = '#cbd5e1'}
              >
                {p.abbr}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
