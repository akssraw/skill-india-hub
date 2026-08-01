import { useRef, useEffect } from 'react';
import { ExternalLink, CheckCircle2, Users, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SCHEMES = [
  {
    acronym: 'PMKVY 4.0',
    full:    'Pradhan Mantri Kaushal Vikas Yojana',
    color:   'primary',
    icon:    GraduationCap,
    stats: [
      { label: 'Trained so far', val: '1.4 Cr+' },
      { label: 'Sectors covered', val: '40+' },
      { label: 'Training centres', val: '700+' },
    ],
    highlights: [
      'Free short-term skill training (150–300 hrs)',
      'Monetary reward of ₹8,000 after assessment',
      'Industry-relevant curriculum by SSCs',
      'RPL (Recognition of Prior Learning) track',
    ],
    who: 'School dropouts, youth aged 15–45',
    link: '#',
  },
  {
    acronym: 'NAPS',
    full:    'National Apprenticeship Promotion Scheme',
    color:   'secondary',
    icon:    Briefcase,
    stats: [
      { label: 'Enrolled apprentices', val: '49 Lakh+' },
      { label: 'Industries', val: '4,000+' },
      { label: 'Stipend support', val: '25%' },
    ],
    highlights: [
      'Govt pays 25% of stipend (up to ₹1,500/mo)',
      'On-the-job training at real companies',
      'NCVT certificate on completion',
      'Mandatory for scheduled industries',
    ],
    who: 'ITI passouts, 10th–12th students',
    link: '#',
  },
  {
    acronym: 'DDU-GKY',
    full:    'Deen Dayal Upadhyaya Grameen Kaushalya Yojana',
    color:   'accent',
    icon:    Users,
    stats: [
      { label: 'Rural youth trained', val: '11 Lakh+' },
      { label: 'States covered', val: '28',  },
      { label: 'Placement rate', val: '70%+' },
    ],
    highlights: [
      'Targets rural BPL families aged 15–35',
      '100% placement-linked program',
      'Post-placement tracking for 3 years',
      'Hostel & transport support provided',
    ],
    who: 'Rural youth from BPL families',
    link: '#',
  },
  {
    acronym: 'Jan Shikshan Sansthan',
    full:    'Ministry of Skill Development Initiative',
    color:   'primary',
    icon:    BookOpen,
    stats: [
      { label: 'Centres', val: '310+' },
      { label: 'Courses offered', val: '230+' },
      { label: 'Women beneficiaries', val: '70%' },
    ],
    highlights: [
      'Vocational training for neo-literates',
      'Women & marginalised community focus',
      'Mobile training units for remote areas',
      'Integration with SHGs and Anganwadis',
    ],
    who: 'Women, SC/ST, disabled, minority youth',
    link: '#',
  },
];

const COLOR = {
  primary:   { bg: 'bg-primary-50',   border: 'border-primary-200',   text: 'text-primary-700',   icon: 'text-primary-500',   badge: 'bg-primary-100 text-primary-700',   stat: 'text-primary-600' },
  secondary: { bg: 'bg-secondary-50', border: 'border-secondary-200', text: 'text-secondary-700', icon: 'text-secondary-500', badge: 'bg-secondary-100 text-secondary-700', stat: 'text-secondary-600' },
  accent:    { bg: 'bg-accent-50',    border: 'border-accent-200',    text: 'text-accent-700',    icon: 'text-accent-500',    badge: 'bg-accent-100 text-accent-700',     stat: 'text-accent-600' },
};

const SchemesSpotlight = () => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-scheme-card]',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-white" aria-label="Government schemes spotlight">
      <div className="container-custom">
        <div className="text-center mb-14">
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            Government Schemes
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 mt-2">
            Programs That Fund Your Future
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg">
            India runs some of the world's largest skill development schemes — all free for eligible youth. Here's a detailed breakdown.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SCHEMES.map(({ acronym, full, color, icon: Icon, stats, highlights, who, link }) => {
            const c = COLOR[color];
            return (
              <div
                key={acronym}
                data-scheme-card
                className="card p-5 sm:p-7 flex flex-col gap-5 hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
                    <Icon size={22} className={c.icon} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${c.badge} mb-1`}>
                      {acronym}
                    </span>
                    <p className="text-slate-600 text-xs leading-snug">{full}</p>
                  </div>
                </div>

                {/* Stats row */}
                <div className={`grid grid-cols-3 gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl ${c.bg} border ${c.border}`}>
                  {stats.map(s => (
                    <div key={s.label} className="text-center">
                      <div className={`font-display font-black text-sm sm:text-base lg:text-lg ${c.stat}`}>{s.val}</div>
                      <div className="text-slate-500 text-[10px] leading-tight mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <ul className="space-y-2">
                  {highlights.map(h => (
                    <li key={h} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={14} className={`${c.icon} shrink-0 mt-0.5`} />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Who qualifies:</span> {who}
                  </div>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 text-xs font-semibold ${c.text} hover:underline`}
                    aria-label={`Learn more about ${acronym}`}
                  >
                    Learn more <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SchemesSpotlight;
