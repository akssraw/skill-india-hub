import { useState, useRef, useEffect } from 'react';
import { Cpu, Zap, HeartPulse, UtensilsCrossed, Factory, ShoppingBag, Car, Sprout, ChevronDown, TrendingUp, Award, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import WaveDivider from '../components/ui/WaveDivider';
import { ROADMAPS } from '../data/roadmaps';
import useSEO from '../hooks/useSEO';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = { Cpu, Zap, HeartPulse, UtensilsCrossed, Factory, ShoppingBag, Car, Sprout };

const COLOR_MAP = {
  primary:   { bg: 'bg-primary-50',   border: 'border-primary-100',   icon: 'text-primary-500',   line: 'bg-primary-400',   node: 'bg-primary-500',   badge: 'bg-primary-100 text-primary-700' },
  secondary: { bg: 'bg-secondary-50', border: 'border-secondary-100', icon: 'text-secondary-500', line: 'bg-secondary-400', node: 'bg-secondary-500', badge: 'bg-secondary-100 text-secondary-700' },
  accent:    { bg: 'bg-accent-50',    border: 'border-accent-100',    icon: 'text-accent-500',    line: 'bg-accent-400',    node: 'bg-accent-500',    badge: 'bg-accent-100 text-accent-700' },
  slate:     { bg: 'bg-slate-100',    border: 'border-slate-200',     icon: 'text-slate-500',     line: 'bg-slate-300',     node: 'bg-slate-400',     badge: 'bg-slate-100 text-slate-600' },
};

const DEMAND_COLOR = { 'Very High': 'text-primary-600 bg-primary-50', 'High': 'text-accent-600 bg-accent-50', 'Moderate': 'text-secondary-600 bg-secondary-50' };

// ─── Timeline Stage ────────────────────────────────────────────
const TimelineStage = ({ stage, index, isLast }) => {
  const c = COLOR_MAP[stage.color] || COLOR_MAP.slate;

  return (
    <div className="flex gap-6">
      {/* Line + Node */}
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full ${c.node} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-soft z-10`}>
          {stage.level}
        </div>
        {!isLast && <div className={`w-0.5 flex-1 ${c.line} mt-2 min-h-[48px] opacity-40`} />}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-10`}>
        <div className={`card p-5 border ${c.border}`}>
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <h4 className="font-display font-bold text-slate-900 text-lg">{stage.title}</h4>
              <span className="text-slate-500 text-sm">{stage.duration}</span>
            </div>
            {stage.salary && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold">
                <TrendingUp size={13} /> {stage.salary}
              </span>
            )}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-3">
            {stage.skills.map(s => (
              <span key={s} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                <CheckCircle2 size={10} className="text-primary-500" />
                {s}
              </span>
            ))}
          </div>

          {/* Certification */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Award size={13} className="text-accent-500 shrink-0" />
            <span>Certification: <strong className="text-slate-700">{stage.certification}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Roadmap Sector Card ───────────────────────────────────────
const RoadmapCard = ({ rm, isOpen, onToggle }) => {
  const Icon  = ICON_MAP[rm.icon];
  const c     = COLOR_MAP[rm.color] || COLOR_MAP.primary;
  const demandClass = DEMAND_COLOR[rm.demand] || '';
  const timelineRef = useRef(null);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    if (isOpen) {
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
      // Stagger timeline items
      gsap.fromTo(el.querySelectorAll('[data-stage]'),
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out', delay: 0.15 }
      );
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.35, ease: 'power2.in' });
    }
  }, [isOpen]);

  return (
    <div className={`rounded-3xl border ${c.border} overflow-hidden transition-shadow duration-300 ${isOpen ? 'shadow-strong' : 'shadow-soft hover:shadow-medium'}`}>
      {/* Card Header — always visible */}
      <button
        className={`w-full flex items-center gap-4 p-6 text-left ${c.bg} hover:opacity-90 transition-opacity`}
        onClick={() => onToggle(rm.id)}
        aria-expanded={isOpen}
      >
        <div className={`w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center shrink-0`}>
          {Icon && <Icon size={26} className={c.icon} />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-display font-bold text-slate-900 text-xl">{rm.sector}</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${demandClass}`}>{rm.demand} Demand</span>
          </div>
          <p className="text-slate-500 text-sm italic">"{rm.tagline}"</p>
        </div>

        <div className="shrink-0 text-right hidden sm:block">
          <div className="text-primary-600 font-bold text-sm">{rm.salaryRange.senior}</div>
          <div className="text-slate-400 text-xs">Senior salary</div>
        </div>

        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-primary-500 text-white rotate-180' : 'bg-white text-slate-400'}`}>
          <ChevronDown size={18} />
        </div>
      </button>

      {/* Expandable Detail */}
      <div ref={timelineRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <div className="p-6 bg-white">
          {/* Overview */}
          <p className="text-slate-600 leading-relaxed mb-6 text-sm">{rm.overview}</p>

          {/* Salary range strip */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { label: 'Entry Level', val: rm.salaryRange.entry },
              { label: 'Mid Level',   val: rm.salaryRange.mid },
              { label: 'Senior Level',val: rm.salaryRange.senior },
            ].map(s => (
              <div key={s.label} className="flex-1 min-w-[120px] p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-400 mb-1">{s.label}</div>
                <div className="font-display font-bold text-slate-900">{s.val}</div>
              </div>
            ))}
          </div>

          {/* Jobs */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Career Roles</p>
            <div className="flex flex-wrap gap-2">
              {rm.jobs.map(j => (
                <span key={j} className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 text-xs font-medium">
                  <Briefcase size={10} className="text-primary-500" /> {j}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-6">Career Progression</p>
            <div>
              {rm.stages.map((stage, i) => (
                <div key={stage.level} data-stage>
                  <TimelineStage stage={stage} index={i} isLast={i === rm.stages.length - 1} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Roadmaps Page ─────────────────────────────────────────────
const Roadmaps = () => {
  useSEO(
    'Skill Roadmaps',
    'Explore step-by-step career roadmaps for 8+ sectors including IT & AI, Electrician, Healthcare, Hospitality and more. See skills, certifications and salary at every stage.'
  );
  const [openId, setOpenId] = useState(null);
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
      gsap.fromTo(gridRef.current?.children || [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <PageWrapper>
      <main id="main-content">
      {/* Hero */}
      <div ref={heroRef} className="relative bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 text-white py-20 lg:py-32 pb-24">
        <div className="container-custom">
          <span className="section-label !bg-white/10 !text-white/80 !border !border-white/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
            Career Roadmaps
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mb-4">
            Your Career,<br />
            <span className="text-gradient-green">Mapped Out.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Step-by-step career paths for 8+ high-demand sectors. See the skills, certifications, and salary at every level.
          </p>
        </div>
        <WaveDivider />
      </div>

      {/* Grid */}
      <div className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <SectionHeader
              label={`${ROADMAPS.length} Sectors Available`}
              title="Choose Your Path"
              subtitle="Click on any sector to reveal the full career timeline, certifications, salary benchmarks, and job roles."
              titleClass="text-3xl sm:text-4xl"
            />
          </div>

          <div ref={gridRef} className="flex flex-col gap-4">
            {ROADMAPS.map(rm => (
              <RoadmapCard key={rm.id} rm={rm} isOpen={openId === rm.id} onToggle={toggle} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 text-center card-glass p-8 rounded-3xl border border-primary-100">
            <h3 className="font-display font-bold text-2xl text-slate-900 mb-3">
              Ready to start your journey?
            </h3>
            <p className="text-slate-500 mb-6">Find an internship or training program in your chosen sector.</p>
            <Button as="a" href="/explore" variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
              Explore Opportunities
            </Button>
          </div>
        </div>
      </div>
      </main>
    </PageWrapper>
  );
};

export default Roadmaps;
