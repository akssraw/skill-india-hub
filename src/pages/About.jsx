import { useRef, useEffect } from 'react';
import { Target, Eye, Shield, Users, Award, MapPin, Layers, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import Accordion from '../components/ui/Accordion';
import Button from '../components/ui/Button';
import WaveDivider from '../components/ui/WaveDivider';
import { STATS } from '../data/stats';
import { FAQS } from '../data/faqs';
import { Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

gsap.registerPlugin(ScrollTrigger);

const STAT_ICON_MAP = { Users, Award, Briefcase, MapPin, Layers };

const SCHEMES = [
  {
    name: 'PMKVY',
    full: 'Pradhan Mantri Kaushal Vikas Yojana',
    color: 'primary',
    desc: 'India\'s flagship skill development scheme providing free, short-term training and certification to youth across 40+ sectors.',
    highlights: ['Free training', 'Monetary reward post-assessment', '700+ Sector Skill Councils'],
  },
  {
    name: 'NSDC',
    full: 'National Skill Development Corporation',
    color: 'secondary',
    desc: 'A Public-Private Partnership under Ministry of Skill Development. NSDC funds and promotes skill development through approved Training Partners.',
    highlights: ['4,800+ Training Partners', 'QP-NOS standardised courses', 'RPL certification'],
  },
  {
    name: 'DDU-GKY',
    full: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana',
    color: 'accent',
    desc: 'A placement-linked rural skill development scheme targeting poor rural youth aged 15–35, with post-placement tracking.',
    highlights: ['100% placement focus', 'Rural youth priority', 'Post-placement support'],
  },
  {
    name: 'NAPS',
    full: 'National Apprenticeship Promotion Scheme',
    color: 'primary',
    desc: 'Provides 25% of prescribed stipend by Government to promote apprenticeship training across industries in India.',
    highlights: ['Industry OJT', 'Govt. stipend support', 'NCVT certification'],
  },
];

const SCHEME_COLORS = {
  primary:   'border-primary-100   bg-primary-50   text-primary-700   badge-bg:bg-primary-100',
  secondary: 'border-secondary-100 bg-secondary-50 text-secondary-700',
  accent:    'border-accent-100    bg-accent-50    text-accent-700',
};

const About = () => {
  useSEO(
    'About — Skill India Mission',
    'Learn about Skill India Hub, its mission to empower 14.5 crore+ youth, government schemes like PMKVY and NSDC, impact statistics, and frequently asked questions.'
  );
  const heroRef      = useRef(null);
  const missionRef   = useRef(null);
  const statsRef     = useRef(null);
  const schemesRef   = useRef(null);
  const faqRef       = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(heroRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });

      // Mission section
      gsap.fromTo(missionRef.current?.querySelectorAll('[data-anim]') || [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: missionRef.current, start: 'top 80%', once: true } }
      );

      // Stats counters
      statsRef.current?.querySelectorAll('[data-counter]').forEach(counter => {
        const target = parseInt(counter.dataset.target, 10);
        const suffix = counter.dataset.suffix || '';
        const obj    = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 2, ease: 'power2.out',
          onUpdate: () => { counter.textContent = Math.round(obj.val).toLocaleString('en-IN') + suffix; },
          scrollTrigger: { trigger: statsRef.current, start: 'top 75%', once: true },
        });
      });

      // Schemes cards
      gsap.fromTo(schemesRef.current?.querySelectorAll('[data-scheme]') || [],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: schemesRef.current, start: 'top 80%', once: true } }
      );

      // FAQ
      gsap.fromTo(faqRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: faqRef.current, start: 'top 85%', once: true } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <PageWrapper>
      <main id="main-content">
      {/* ─── Hero ───────────────────────────────────── */}
      <div ref={heroRef} className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white py-20 lg:py-32 pb-24">
        <div className="container-custom">
          <span className="section-label !bg-white/10 !text-white/80 !border !border-white/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
            About Skill India Hub
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mb-6 max-w-3xl">
            Building a <span className="text-gradient-green">Skilled</span> &amp;<br />
            Empowered India
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            Skill India Hub is a digital platform under the National Skill Development Corporation (NSDC), designed to connect India's youth with quality vocational training, industry internships, and meaningful employment.
          </p>
        </div>
        <WaveDivider />
      </div>

      {/* ─── Mission & Vision ──────────────────────────────── */}
      <section ref={missionRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Mission */}
            <div>
              <div data-anim className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Target size={24} className="text-primary-500" />
                </div>
                <h2 className="font-display font-bold text-3xl text-slate-900">Our Mission</h2>
              </div>
              <p data-anim className="text-slate-600 leading-relaxed text-lg mb-6">
                To democratise access to quality vocational training and employment opportunities for every young Indian, regardless of geography, background or economic status.
              </p>
              <ul data-anim className="space-y-3">
                {[
                  'Free access to government-funded training programs',
                  'Industry-aligned skill certifications',
                  'Direct employer connections across 40+ sectors',
                  'Career guidance and placement support',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-slate-700 text-sm">
                    <CheckCircle2 size={16} className="text-primary-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Vision */}
            <div className="space-y-6">
              <div data-anim className="card p-8 border-l-4 border-l-secondary-500">
                <div className="flex items-center gap-3 mb-3">
                  <Eye size={20} className="text-secondary-500" />
                  <h3 className="font-display font-bold text-xl text-slate-900">Our Vision</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  A Skilled India where every young person has the knowledge, skills and opportunity to participate in and contribute to India's economic growth — by 2030.
                </p>
              </div>

              <div data-anim className="card p-8 border-l-4 border-l-accent-500">
                <div className="flex items-center gap-3 mb-3">
                  <Shield size={20} className="text-accent-500" />
                  <h3 className="font-display font-bold text-xl text-slate-900">Our Values</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['Inclusivity', 'Transparency', 'Excellence', 'Innovation', 'Accessibility', 'Impact'].map(v => (
                    <span key={v} className="flex items-center gap-1.5 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Impact Stats ──────────────────────────────────── */}
      <section ref={statsRef} className="section-padding bg-slate-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="section-label !bg-white/10 !text-white/80 !border !border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
              Our Impact
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl mt-4 text-white">
              Numbers That Matter
            </h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto">
              Real data from the Ministry of Skill Development and Entrepreneurship.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
            {STATS.map(stat => {
              const Icon = STAT_ICON_MAP[stat.icon];
              return (
                <div key={stat.id} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                  {Icon && <Icon size={24} className="text-primary-400 mx-auto mb-3" />}
                  <div className="font-display font-black text-3xl sm:text-4xl text-white mb-1">
                    <span data-counter data-target={stat.value} data-suffix={stat.suffix}>
                      0{stat.suffix}
                    </span>
                  </div>
                  <p className="text-white/50 text-xs font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Government Schemes ────────────────────────────── */}
      <section ref={schemesRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <SectionHeader
              label="Government Initiatives"
              title="Schemes Powering Skill India"
              subtitle="Our platform aggregates opportunities under these flagship government programs — all verified and accessible."
              titleClass="text-3xl sm:text-4xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SCHEMES.map(scheme => (
              <div
                key={scheme.name}
                data-scheme
                className="card p-7 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1.5 rounded-xl font-display font-black text-lg ${
                    scheme.color === 'primary'   ? 'bg-primary-100 text-primary-700' :
                    scheme.color === 'secondary' ? 'bg-secondary-100 text-secondary-700' :
                    'bg-accent-100 text-accent-700'
                  }`}>{scheme.name}</span>
                  <span className="text-slate-500 text-sm font-medium">{scheme.full}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{scheme.desc}</p>
                <ul className="space-y-1.5">
                  {scheme.highlights.map(h => (
                    <li key={h} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={14} className="text-primary-500 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────── */}
      <section ref={faqRef} className="section-padding bg-slate-50" id="faq">
        <div className="container-custom">
          <div className="text-center mb-14">
            <SectionHeader
              label="Got Questions?"
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about Skill India Hub and the government skill programs."
              titleClass="text-3xl sm:text-4xl"
            />
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion items={FAQS} />
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-500 mb-4">Still have questions?</p>
            <Button as={Link} to="/contact" variant="primary" iconRight={<ArrowRight size={16} />}>
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      </main>
    </PageWrapper>
  );
};

export default About;
