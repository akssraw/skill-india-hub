import { useRef, useEffect } from 'react';
import { ShieldCheck, Wifi, IndianRupee, MapPin, Clock, Users, HeartHandshake, Trophy } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: IndianRupee,
    title: 'Completely Free',
    desc: 'Training programs under PMKVY are 100% government-funded. No registration fees, no hidden costs — ever.',
    color: 'primary',
  },
  {
    icon: ShieldCheck,
    title: 'Govt. Certified',
    desc: 'All certifications are issued by NSDC, Sector Skill Councils and industry bodies — recognised by 4,800+ employers.',
    color: 'secondary',
  },
  {
    icon: Wifi,
    title: 'Online & Offline',
    desc: 'Learn on your own schedule — online from anywhere, or at 700+ PMKVY training centres across every state.',
    color: 'accent',
  },
  {
    icon: MapPin,
    title: 'Pan-India Access',
    desc: 'Opportunities available across all 28 states and 8 UTs. Rural, semi-urban and metro — everyone is covered.',
    color: 'primary',
  },
  {
    icon: HeartHandshake,
    title: 'Placement Support',
    desc: 'We don\'t just train — we place. Dedicated placement coordinators, job fairs, and employer connect events.',
    color: 'secondary',
  },
  {
    icon: Trophy,
    title: 'Industry-Led Curriculum',
    desc: 'Courses co-designed with TCS, Infosys, Apollo, Taj Hotels and 500+ more — real skills for real jobs.',
    color: 'accent',
  },
];

const COLOR = {
  primary:   { bg: 'bg-primary-50',   icon: 'text-primary-500',   border: 'hover:border-primary-200' },
  secondary: { bg: 'bg-secondary-50', icon: 'text-secondary-500', border: 'hover:border-secondary-200' },
  accent:    { bg: 'bg-accent-50',    icon: 'text-accent-500',    border: 'hover:border-accent-200' },
};

const WhyChooseUs = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-feature]',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.55, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-slate-50" aria-label="Why choose Skill India Hub">
      <div className="container-custom">
        <div className="text-center mb-14">
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            Why Skill India Hub
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 mt-2">
            Built for Every Indian Youth
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">
            The only platform that combines government backing, industry alignment, and technology to make skill development truly accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => {
            const c = COLOR[color];
            return (
              <div
                key={title}
                data-feature
                className={`card p-7 flex flex-col gap-4 border border-transparent ${c.border} transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={22} className={c.icon} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust bar */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-primary-900 to-secondary-900 text-white flex flex-wrap gap-6 items-center justify-between">
          <div className="text-sm text-white/70 font-medium">
            An initiative of the Ministry of Skill Development and Entrepreneurship, Government of India
          </div>
          <div className="flex flex-wrap gap-5 text-sm font-semibold">
            {['MSDE', 'NSDC', 'PMKVY 4.0', 'DDU-GKY', 'NAPS'].map(s => (
              <span key={s} className="px-3 py-1 rounded-full bg-white/10 border border-white/20">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
