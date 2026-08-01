import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Zap, HeartPulse, UtensilsCrossed, Factory, ShoppingBag, Car, Sprout, ArrowRight, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = { Cpu, Zap, HeartPulse, UtensilsCrossed, Factory, ShoppingBag, Car, Sprout };

const COLOR_MAP = {
  primary:   { bg: 'bg-primary-50',   border: 'border-primary-100',   icon: 'text-primary-500',   badge: 'bg-primary-100 text-primary-700' },
  secondary: { bg: 'bg-secondary-50', border: 'border-secondary-100', icon: 'text-secondary-500', badge: 'bg-secondary-100 text-secondary-700' },
  accent:    { bg: 'bg-accent-50',    border: 'border-accent-100',    icon: 'text-accent-500',    badge: 'bg-accent-100 text-accent-700' },
};

const DEMAND_COLOR = {
  'Very High': 'text-primary-600 bg-primary-50',
  'High':      'text-accent-600 bg-accent-50',
  'Moderate':  'text-secondary-600 bg-secondary-50',
};

// Import roadmaps for preview (first 4)
import { ROADMAPS } from '../../data/roadmaps';

const RoadmapPreview = () => {
  const sectionRef = useRef(null);
  const preview    = ROADMAPS.slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-roadmap-card]',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-white" aria-label="Career roadmaps">
      <div className="container-custom">
        <div className="text-center mb-14">
          <SectionHeader
            label="Career Paths"
            title="Skill Roadmaps"
            subtitle="Structured step-by-step career paths showing exactly what to learn, earn and achieve in your chosen sector."
            titleClass="text-4xl sm:text-5xl"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {preview.map((rm) => {
            const Icon  = ICON_MAP[rm.icon];
            const c     = COLOR_MAP[rm.color] || COLOR_MAP.primary;
            const demandClass = DEMAND_COLOR[rm.demand] || DEMAND_COLOR.High;

            return (
              <Link
                key={rm.id}
                to="/roadmaps"
                data-roadmap-card
                className={`group card p-6 flex flex-col gap-5 border ${c.border} hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {Icon && <Icon size={26} className={c.icon} />}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-display font-bold text-slate-900 text-lg">{rm.sector}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${demandClass}`}>
                      {rm.demand}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs italic mb-3">"{rm.tagline}"</p>

                  {/* Salary range */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <TrendingUp size={12} className="text-primary-500" />
                    <span className="text-slate-500">Up to </span>
                    <span className="font-semibold text-primary-600">{rm.salaryRange.senior}</span>
                  </div>
                </div>

                {/* Steps count */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>{rm.stages.length} career stages</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200 text-primary-500" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button as={Link} to="/roadmaps" variant="outline" size="lg" iconRight={<ArrowRight size={18} />}>
            Explore All 8 Roadmaps
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoadmapPreview;
