import { useRef, useEffect } from 'react';
import { Target, Flame, Briefcase } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    icon: Target,
    color: 'primary',
    title: 'Skill',
    description: 'Access 40+ sector-specific vocational training programs certified by NSDC and industry leaders.',
  },
  {
    icon: Flame,
    color: 'secondary',
    title: 'Empower',
    description: 'Build confidence with hands-on apprenticeships, mentorship, and government-backed certifications.',
  },
  {
    icon: Briefcase,
    color: 'accent',
    title: 'Employ',
    description: 'Connect directly with 4,800+ hiring partners across India and land your first meaningful job.',
  },
];

const colorMap = {
  primary:   { bg: 'bg-primary-50',   border: 'border-primary-100',   icon: 'text-primary-500',   num: 'text-primary-200'   },
  secondary: { bg: 'bg-secondary-50', border: 'border-secondary-100', icon: 'text-secondary-500', num: 'text-secondary-200' },
  accent:    { bg: 'bg-accent-50',    border: 'border-accent-100',    icon: 'text-accent-500',    num: 'text-accent-200'    },
};

const MissionStrip = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-pillar]'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding bg-slate-50" aria-label="Mission pillars">
      <div className="container-custom" ref={ref}>

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            Our Mission
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 mt-2">
            Skill. Empower. Employ.
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Three pillars that define the Skill India journey — from zero to career-ready.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map(({ icon: Icon, color, title, description }, i) => {
            const c = colorMap[color];
            return (
              <div
                key={title}
                data-pillar
                className={`relative rounded-3xl border ${c.border} ${c.bg} p-8 overflow-hidden group hover:shadow-medium transition-shadow duration-300`}
              >
                {/* Big number watermark */}
                <span
                  aria-hidden="true"
                  className={`absolute -top-4 -right-2 font-display font-black text-[120px] leading-none select-none pointer-events-none ${c.num}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={26} className={c.icon} aria-hidden="true" />
                </div>

                <h3 className="relative font-display font-bold text-2xl text-slate-900 mb-3">{title}</h3>
                <p className="relative text-slate-600 leading-relaxed text-sm">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MissionStrip;
