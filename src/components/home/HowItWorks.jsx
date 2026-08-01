import { useRef, useEffect } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: '01',
    title: 'Search & Discover',
    desc: 'Browse 12+ categories of opportunities across 40+ sectors. Filter by location, mode, stipend and eligibility — all in one place.',
    color: 'primary',
    tips: ['No registration required to browse', 'Filter by your state', 'Compare stipends side-by-side'],
  },
  {
    num: '02',
    title: 'Enroll & Learn',
    desc: 'Apply directly to government-funded training programs or internships. Get certified by NSDC, Sector Skill Councils, or industry partners.',
    color: 'secondary',
    tips: ['Courses are free under PMKVY', 'Online, offline or hybrid modes', 'NSDC-certified instructors'],
  },
  {
    num: '03',
    title: 'Get Hired',
    desc: 'Connect with 4,800+ employer partners across India. Use our placement support, resume tips and mock interview resources to land your first job.',
    color: 'accent',
    tips: ['Direct employer connect', 'Placement tracking support', 'Post-placement assistance'],
  },
];

const COLOR = {
  primary:   { num: 'text-primary-500',   border: 'border-primary-200',   bg: 'bg-primary-50',   check: 'text-primary-500' },
  secondary: { num: 'text-secondary-500', border: 'border-secondary-200', bg: 'bg-secondary-50', check: 'text-secondary-500' },
  accent:    { num: 'text-accent-500',    border: 'border-accent-200',    bg: 'bg-accent-50',    check: 'text-accent-500' },
};

const HowItWorks = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-step]',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, stagger: 0.18, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-white" aria-label="How it works">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            Simple Process
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 mt-2">
            How It Works
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg">
            From zero to career-ready in three structured steps — designed for first-time job seekers and re-skillers alike.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-primary-200 via-secondary-200 to-accent-200" aria-hidden="true" />

          {STEPS.map(({ num, title, desc, color, tips }) => {
            const c = COLOR[color];
            return (
              <div key={num} data-step className="flex flex-col gap-5">
                {/* Number bubble */}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${c.bg} border-2 ${c.border} flex items-center justify-center shrink-0 relative z-10`}>
                    <span className={`font-display font-black text-xl ${c.num}`}>{num}</span>
                  </div>
                  <div className={`h-px flex-1 md:hidden ${c.border} border-t-2 border-dashed`} />
                </div>

                {/* Content card */}
                <div className={`card p-6 flex-1 border-t-4 ${c.border}`}>
                  <h3 className="font-display font-bold text-xl text-slate-900 mb-3">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">{desc}</p>

                  <ul className="space-y-2">
                    {tips.map(tip => (
                      <li key={tip} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 size={13} className={`${c.check} shrink-0`} />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button as={Link} to="/explore" variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
            Start Exploring Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
