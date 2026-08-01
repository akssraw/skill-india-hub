import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, IndianRupee, ArrowRight, Briefcase, GraduationCap, Wrench, BadgeCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OPPORTUNITIES } from '../../data/opportunities';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import SectionHeader from '../ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const FILTERS = ['All', 'Internship', 'Training', 'Apprenticeship', 'Certification'];

const CATEGORY_ICON = {
  Internship:     Briefcase,
  Training:       GraduationCap,
  Apprenticeship: Wrench,
  Certification:  BadgeCheck,
};

const CATEGORY_COLOR = {
  Internship:     'secondary',
  Training:       'primary',
  Apprenticeship: 'accent',
  Certification:  'primary',
};

const OpportunityCard = ({ opp }) => {
  const Icon  = CATEGORY_ICON[opp.category] || Briefcase;
  const color = CATEGORY_COLOR[opp.category] || 'primary';

  return (
    <div className="card p-6 flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <Badge color={color} icon={<Icon size={11} />} className="mb-2">
            {opp.category}
          </Badge>
          <h3 className="font-semibold text-slate-900 text-base leading-snug group-hover:text-primary-600 transition-colors">
            {opp.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{opp.organization}</p>
        </div>
        {opp.featured && (
          <span className="shrink-0 px-2 py-1 rounded-lg bg-accent-50 text-accent-600 text-[10px] font-bold uppercase tracking-wide">
            Featured
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <MapPin size={12} className="text-slate-400" />
          {opp.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} className="text-slate-400" />
          {opp.duration}
        </span>
        <span className="flex items-center gap-1">
          <IndianRupee size={12} className="text-slate-400" />
          {opp.stipend}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {opp.tags.slice(0, 3).map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Deadline: <span className="text-slate-600 font-medium">
            {new Date(opp.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </span>
        <Button
          as={Link}
          to="/explore"
          variant="outline"
          size="sm"
          className="text-xs px-3 py-1.5"
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};

const FeaturedPrograms = () => {
  const [active, setActive] = useState('All');
  const sectionRef = useRef(null);
  const gridRef    = useRef(null);

  const filtered = OPPORTUNITIES.filter(o =>
    active === 'All' || o.category === active
  ).slice(0, 6);

  // Scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Re-animate cards on filter change
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current?.querySelectorAll('[data-opp-card]') || [],
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out' }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [active]);

  return (
    <section ref={sectionRef} className="section-padding bg-slate-50" aria-label="Featured programs">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
          <SectionHeader
            label="Opportunities"
            title={<>Featured<br />Programs</>}
            subtitle="Handpicked internships, training and apprenticeships from top organisations."
            align="left"
            titleClass="text-3xl sm:text-4xl lg:text-5xl"
          />
          <Button as={Link} to="/explore" variant="outline" size="sm" iconRight={<ArrowRight size={15} />} className="shrink-0">
            View All
          </Button>
        </div>

        {/* Filter tabs — horizontally scrollable on mobile */}
        <div
          className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
          role="tablist"
          aria-label="Filter programs"
        >
          {FILTERS.map(f => (
            <button
              key={f}
              role="tab"
              aria-selected={active === f}
              onClick={() => setActive(f)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === f
                  ? 'bg-primary-500 text-white shadow-soft'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(opp => (
            <div key={opp.id} data-opp-card>
              <OpportunityCard opp={opp} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Button as={Link} to="/explore" variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
            Explore All Opportunities
          </Button>
          <p className="mt-3 text-sm text-slate-400">
            {OPPORTUNITIES.length}+ opportunities across 8+ sectors
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
