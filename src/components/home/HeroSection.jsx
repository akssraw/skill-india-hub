import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Users, Star } from 'lucide-react';
import { gsap } from 'gsap';
import Button from '../ui/Button';
import { heroReveal } from '../../utils/animations';

// Floating stat pill — decorative element on the hero
const FloatingPill = ({ icon: Icon, label, value, className = '', ...rest }) => (
  <div className={`card-glass px-4 py-3 flex items-center gap-3 shadow-medium ${className}`} {...rest}>
    <div className="w-9 h-9 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
      <Icon size={16} className="text-primary-600" />
    </div>
    <div>
      <div className="font-display font-bold text-slate-900 text-sm leading-none">{value}</div>
      <div className="text-slate-500 text-xs mt-0.5">{label}</div>
    </div>
  </div>
);

const HeroSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If user prefers reduced motion, make all elements visible immediately
    if (prefersReduced) {
      containerRef.current?.querySelectorAll('[data-hero-badge],[data-hero-word],[data-hero-sub],[data-hero-cta],[data-hero-pill]').forEach(el => {
        el.style.opacity = '1';
      });
      return;
    }

    const ctx = gsap.context(() => {
      heroReveal(containerRef.current);

      // Floating pills entrance
      gsap.fromTo('[data-hero-pill]',
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.6, ease: 'back.out(1.4)', delay: 1 }
      );

      // Subtle float animation on pills (infinite)
      gsap.to('[data-hero-pill]', {
        y: '-=8',
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
      aria-label="Hero section"
    >
      {/* Background mesh gradient */}
      <div className="absolute inset-0 bg-hero-mesh pointer-events-none" />

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-[10%] w-[400px] h-[400px] rounded-full bg-primary-400/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 left-[5%]  w-[300px] h-[300px] rounded-full bg-secondary-400/10 blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2  right-[30%] w-[200px] h-[200px] rounded-full bg-accent-400/10  blur-[60px] pointer-events-none" />

      <div ref={containerRef} className="container-custom relative z-10 py-24 lg:py-32">
        <div className="max-w-5xl mx-auto">

          {/* Top badge */}
          <div data-hero-badge className="opacity-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-semibold mb-6">
              <Sparkles size={14} className="text-primary-500" />
              India's Premier Skill Development Platform
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-slate-900 leading-[1.02] mb-6">
            <div className="overflow-hidden">
              <span data-hero-word className="inline-block opacity-0 text-6xl sm:text-7xl lg:text-8xl">
                Unlock{' '}
              </span>
              <span data-hero-word className="inline-block opacity-0 text-6xl sm:text-7xl lg:text-8xl text-gradient-green">
                Your
              </span>
            </div>
            <div className="overflow-hidden">
              <span data-hero-word className="inline-block opacity-0 text-6xl sm:text-7xl lg:text-8xl">
                Skill{' '}
              </span>
              <span data-hero-word className="inline-block opacity-0 text-6xl sm:text-7xl lg:text-8xl text-gradient-hero">
                Potential
              </span>
            </div>
          </h1>

          {/* Subheadline */}
          <p
            data-hero-sub
            className="opacity-0 text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mb-10"
          >
            India's most comprehensive platform connecting youth with vocational training,
            internships, certifications and real employment — powered by the{' '}
            <span className="text-primary-600 font-semibold">Skill India Mission</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <div data-hero-cta className="opacity-0">
              <Button
                as={Link}
                to="/explore"
                variant="primary"
                size="lg"
                className="shadow-glow-green"
                iconRight={<ArrowRight size={18} />}
              >
                Explore Opportunities
              </Button>
            </div>
            <div data-hero-cta className="opacity-0">
              <Button
                as={Link}
                to="/roadmaps"
                variant="outline"
                size="lg"
              >
                View Career Roadmaps
              </Button>
            </div>
          </div>

          {/* Social proof strip */}
          <div data-hero-cta className="opacity-0 flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['PS', 'RV', 'AK', 'MF', 'SD'].map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: ['#10b981','#6366f1','#f59e0b','#10b981','#6366f1'][i] }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span><strong className="text-slate-900">14.5 Cr+</strong> youth trained</span>
            </div>
            <span className="dot-separator hidden sm:inline-block" />
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} className="text-accent-400 fill-accent-400" />
              ))}
              <span><strong className="text-slate-900">4.9</strong>/5 from learners</span>
            </div>
            <span className="dot-separator hidden sm:inline-block" />
            <span>Trusted by <strong className="text-slate-900">4,800+</strong> partners</span>
          </div>
        </div>

        {/* Floating pills — positioned relative to container on large screens */}
        <div className="hidden lg:block">
          <FloatingPill
            icon={TrendingUp}
            value="₹35,000/mo"
            label="Avg. starting salary"
            data-hero-pill=""
            className="absolute top-32 right-12 opacity-0"
          />
          <FloatingPill
            icon={Users}
            value="1,00,000+"
            label="Active learners"
            data-hero-pill=""
            className="absolute bottom-40 right-28 opacity-0"
          />
          <FloatingPill
            icon={Star}
            value="40+ Sectors"
            label="Career paths available"
            data-hero-pill=""
            className="absolute top-48 right-80 opacity-0"
          />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
