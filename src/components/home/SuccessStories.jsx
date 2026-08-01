import { useState, useRef, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, MapPin, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '../../data/testimonials';
import SectionHeader from '../ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const AVATAR_COLORS = {
  primary:   'from-primary-400 to-primary-600',
  secondary: 'from-secondary-400 to-secondary-600',
  accent:    'from-accent-400 to-accent-600',
};

const TestimonialCard = ({ t, isActive }) => (
  <div
    className={`card p-8 flex flex-col gap-6 transition-all duration-500 ${
      isActive ? 'opacity-100 scale-100 shadow-strong' : 'opacity-0 scale-95 absolute pointer-events-none'
    }`}
    aria-hidden={!isActive}
  >
    {/* Quote icon */}
    <Quote size={32} className="text-primary-200 shrink-0" fill="currentColor" />

    {/* Quote text */}
    <blockquote className="text-slate-700 text-lg leading-relaxed font-medium flex-1">
      "{t.quote}"
    </blockquote>

    {/* Before → After */}
    <div className="flex items-center gap-3 text-sm p-4 rounded-xl bg-slate-50">
      <div className="text-slate-400 line-through">{t.beforeRole}</div>
      <TrendingUp size={16} className="text-primary-500 shrink-0" />
      <div className="text-primary-700 font-semibold">{t.afterRole}</div>
    </div>

    {/* Author */}
    <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${AVATAR_COLORS[t.color]} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
        {t.initials}
      </div>
      <div>
        <div className="font-semibold text-slate-900">{t.name}</div>
        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
          <MapPin size={10} />
          {t.city} · {t.program}
        </div>
      </div>
      <div className="ml-auto text-right">
        <div className="text-primary-600 font-bold text-sm">{t.salaryGrowth}</div>
        <div className="text-xs text-slate-400">Income growth</div>
      </div>
    </div>
  </div>
);

const SuccessStories = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef(null);
  const autoRef    = useRef(null);

  const prev = () => setCurrent(p => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent(p => (p + 1) % TESTIMONIALS.length);

  // Auto-advance every 6s
  useEffect(() => {
    autoRef.current = setInterval(next, 6000);
    return () => clearInterval(autoRef.current);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-slate-50" aria-label="Success stories">
      <div className="container-custom">
        <div className="text-center mb-14">
          <SectionHeader
            label="Success Stories"
            title="Real Youth, Real Impact"
            subtitle="Thousands of young Indians have transformed their lives through Skill India Hub. Here are their stories."
            titleClass="text-4xl sm:text-5xl"
          />
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Carousel */}
          <div className="relative min-h-[400px]">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.id} t={t} isActive={i === current} />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex items-center gap-2" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to story ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-8 h-2.5 bg-primary-500'
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => { prev(); clearInterval(autoRef.current); }}
                aria-label="Previous story"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-all duration-200"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => { next(); clearInterval(autoRef.current); }}
                aria-label="Next story"
                className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-all duration-200"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
