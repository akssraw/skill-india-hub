import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const CTABanner = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('[data-cta-item]'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-label="Call to action"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900" />
      <div className="absolute inset-0 bg-hero-mesh opacity-30 pointer-events-none" />

      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-secondary-500/10 blur-3xl pointer-events-none" />

      <div className="relative container-custom py-20 lg:py-28 text-center">
        <div data-cta-item className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-semibold mb-6">
          <Sparkles size={14} className="text-accent-400" />
          Your future starts today
        </div>

        <h2 data-cta-item className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl max-w-3xl mx-auto leading-tight mb-6">
          Ready to Build{' '}
          <span className="text-gradient-green">Your Future?</span>
        </h2>

        <p data-cta-item className="text-white/60 text-lg max-w-xl mx-auto mb-10">
          Join 1.45 crore+ Indians who've already taken the first step. Your skill, your career, your story — starts now.
        </p>

        <div data-cta-item className="flex flex-wrap items-center justify-center gap-4">
          <Button
            as={Link}
            to="/explore"
            variant="primary"
            size="lg"
            iconRight={<ArrowRight size={18} />}
            className="shadow-glow-green"
          >
            Start Your Journey
          </Button>
          <Button
            as={Link}
            to="/about"
            variant="ghost"
            size="lg"
            className="text-white border border-white/30 hover:bg-white/10"
          >
            Learn About the Mission
          </Button>
        </div>

        {/* Stats row */}
        <div data-cta-item className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-white/50">
          <span><strong className="text-white">Free</strong> to join</span>
          <span className="dot-separator" />
          <span><strong className="text-white">Government</strong> backed</span>
          <span className="dot-separator" />
          <span><strong className="text-white">Industry</strong> recognised</span>
          <span className="dot-separator" />
          <span><strong className="text-white">Placement</strong> support</span>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
