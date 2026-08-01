import { useRef, useEffect } from 'react';
import { Users, Award, Briefcase, MapPin, Layers } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STATS } from '../../data/stats';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = { Users, Award, Briefcase, MapPin, Layers };

const colorMap = {
  primary:   { bg: 'bg-primary-50',   icon: 'text-primary-500',   value: 'text-primary-600' },
  secondary: { bg: 'bg-secondary-50', icon: 'text-secondary-500', value: 'text-secondary-600' },
  accent:    { bg: 'bg-accent-50',    icon: 'text-accent-500',    value: 'text-accent-600' },
};

const StatsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Animate each counter on scroll with high-performance DOM update caching
      el.querySelectorAll('[data-counter]').forEach((counter) => {
        const target = parseInt(counter.dataset.target, 10);
        const suffix = counter.dataset.suffix || '';
        const obj    = { val: 0 };
        let lastVal  = -1;

        gsap.to(obj, {
          val: target,
          duration: prefersReduced ? 0 : 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            const current = Math.round(obj.val);
            if (current !== lastVal) {
              lastVal = current;
              counter.textContent = current.toLocaleString('en-IN') + suffix;
            }
          },
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        });
      });

      // Section fade in
      gsap.fromTo(el.querySelectorAll('[data-stat-card]'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-white"
      aria-label="Impact statistics"
    >
      <div className="container-custom">

        <div className="text-center mb-14">
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            Our Impact
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 mt-2">
            Numbers That Speak
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Real impact, verified data. The Skill India Mission is transforming lives at scale.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {STATS.map((stat) => {
            const Icon = ICON_MAP[stat.icon];
            const c    = colorMap[stat.color] || colorMap.primary;

            return (
              <div
                key={stat.id}
                data-stat-card
                className="card p-4 sm:p-6 lg:p-8 text-center flex flex-col items-center gap-2.5 sm:gap-3 group hover:-translate-y-1 transition-transform duration-300"
              >
                {Icon && (
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${c.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={20} className={`${c.icon} sm:w-[22px] sm:h-[22px]`} />
                  </div>
                )}

                <div className={`font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight ${c.value}`}>
                  <span
                    data-counter
                    data-target={stat.value}
                    data-suffix={stat.suffix}
                  >
                    0{stat.suffix}
                  </span>
                </div>

                <p className="text-slate-500 text-[11px] sm:text-xs lg:text-sm font-medium leading-tight">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom attribution */}
        <p className="text-center text-xs text-slate-400 mt-8">
          * Data as of FY 2024–25 · Source: Ministry of Skill Development and Entrepreneurship
        </p>
      </div>
    </section>
  );
};

export default StatsSection;
