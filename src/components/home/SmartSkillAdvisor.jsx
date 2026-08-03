import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, ArrowRight, CheckCircle, Award, Briefcase, Zap } from 'lucide-react';

const SECTORS = [
  { id: 'tech', label: 'IT & Digital Skills', icon: '💻' },
  { id: 'energy', label: 'Green Energy & Solar', icon: '⚡' },
  { id: 'health', label: 'Healthcare & Nursing', icon: '🏥' },
  { id: 'auto', label: 'Automotive & EV', icon: '🚗' },
];

const QUALIFICATIONS = [
  { id: '10th', label: '10th / Secondary' },
  { id: '12th', label: '12th / Higher Secondary' },
  { id: 'diploma', label: 'Diploma / ITI' },
  { id: 'degree', label: 'Graduate Degree' },
];

const RECOMMENDATIONS = {
  'tech-12th': {
    title: 'Full Stack Web Developer & UI Specialist',
    scheme: 'PMKVY 4.0 Digital Tech Track',
    duration: '6 Months (Paid Apprenticeship)',
    stipend: '₹12,000/mo during training',
    avgSalary: '₹35,000/mo starting',
    hiringPartners: ['TCS iON', 'Infosys Springboard', 'Tech Mahindra'],
    link: '/roadmaps?sector=technology',
  },
  'energy-12th': {
    title: 'Solar PV Technician & Smart Grid Operator',
    scheme: 'Suryamitra Skill Development Program',
    duration: '3 Months (Reskill Workshop)',
    stipend: 'Fully Govt Subsidized',
    avgSalary: '₹28,000/mo starting',
    hiringPartners: ['Tata Power Solar', 'Adani Renewables', 'Waaree'],
    link: '/roadmaps?sector=green_energy',
  },
  'health-degree': {
    title: 'Medical Lab Technician & Allied Health Lead',
    scheme: 'National Healthcare Skills Initiative',
    duration: '1 Year Clinical Residency',
    stipend: '₹15,000/mo stipend',
    avgSalary: '₹42,000/mo starting',
    hiringPartners: ['Apollo Hospitals', 'Fortis Health', 'Max Healthcare'],
    link: '/roadmaps?sector=healthcare',
  },
  'auto-diploma': {
    title: 'EV Assembly & Battery Systems Technician',
    scheme: 'Capital Goods & Automotive Sector Skill Program',
    duration: '6 Months Industry Co-op',
    stipend: '₹14,000/mo stipend',
    avgSalary: '₹38,000/mo starting',
    hiringPartners: ['Tata Motors EV', 'Ola Electric', 'Mahindra Auto'],
    link: '/roadmaps?sector=automotive',
  },
};

const SmartSkillAdvisor = () => {
  const [sector, setSector] = useState('tech');
  const [qual, setQual] = useState('12th');

  const key = `${sector}-${qual}`;
  const rec = RECOMMENDATIONS[key] || RECOMMENDATIONS['tech-12th'];

  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden my-12 rounded-3xl container-custom">
      {/* Background glow accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-slate-800 pb-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-xs font-semibold mb-3">
              <Sparkles size={14} className="text-primary-400" />
              Instant Interactive Advisor
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Find Your Ideal Skill Pathway
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Select your area of interest and qualification to see tailored government programs and salary benchmarks.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-primary-400 bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700">
            <Zap size={14} /> AI Recommendation Engine Active
          </div>
        </div>

        {/* 2-Step Selectors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step 1: Sector */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                Step 1: Choose Sector Interest
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {SECTORS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSector(s.id)}
                    className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl border text-xs font-semibold text-left transition-all duration-200 ${
                      sector === s.id
                        ? 'bg-primary-500/20 border-primary-400 text-white shadow-glow-green'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-base">{s.icon}</span>
                    <span className="truncate">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Qualification */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                Step 2: Highest Qualification
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {QUALIFICATIONS.map(q => (
                  <button
                    key={q.id}
                    onClick={() => setQual(q.id)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-medium transition-all duration-200 ${
                      qual === q.id
                        ? 'bg-secondary-500/20 border-secondary-400 text-white shadow-glow-indigo'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Result Card */}
          <div className="lg:col-span-7 bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl relative">
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-400 bg-accent-500/10 px-3 py-1 rounded-full border border-accent-500/20">
                <Award size={13} /> Recommended Career Pathway
              </span>
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                <CheckCircle size={12} /> 100% Govt Recognized
              </span>
            </div>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 leading-snug">
              {rec.title}
            </h3>

            <p className="text-xs text-primary-300 font-medium mb-6">
              Scheme: <span className="text-white font-semibold">{rec.scheme}</span>
            </p>

            {/* Benchmark stats */}
            <div className="grid grid-cols-3 gap-3 mb-6 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
              <div>
                <div className="text-[11px] text-slate-400">Duration</div>
                <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{rec.duration}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400">Stipend / Benefit</div>
                <div className="text-xs sm:text-sm font-bold text-primary-400 mt-0.5">{rec.stipend}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400">Est. Salary</div>
                <div className="text-xs sm:text-sm font-bold text-accent-400 mt-0.5">{rec.avgSalary}</div>
              </div>
            </div>

            {/* Hiring Partners */}
            <div className="mb-6">
              <div className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
                <Briefcase size={13} className="text-slate-400" /> Key Hiring Employers:
              </div>
              <div className="flex flex-wrap gap-2">
                {rec.hiringPartners.map(p => (
                  <span key={p} className="text-xs bg-slate-700/80 text-slate-200 px-3 py-1 rounded-lg border border-slate-600/50">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Action link */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700/60">
              <span className="text-xs text-slate-400">Explore step-by-step roadmap</span>
              <Link
                to={rec.link}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-slate-950 font-bold text-xs transition-colors shadow-glow-green"
              >
                View Full Roadmap <ArrowRight size={14} />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SmartSkillAdvisor;
