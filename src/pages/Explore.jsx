import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, SlidersHorizontal, MapPin, Clock, IndianRupee, Briefcase, GraduationCap, Wrench, BadgeCheck, Users, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import WaveDivider from '../components/ui/WaveDivider';
import { OPPORTUNITIES } from '../data/opportunities';
import { OPPORTUNITY_CATEGORIES, OPPORTUNITY_MODES, INDIA_STATES } from '../utils/constants';
import useFilter from '../hooks/useFilter';
import useSEO from '../hooks/useSEO';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_ICON  = { Internship: Briefcase, Training: GraduationCap, Apprenticeship: Wrench, Certification: BadgeCheck };
const CATEGORY_COLOR = { Internship: 'secondary', Training: 'primary', Apprenticeship: 'accent', Certification: 'primary' };

// ─── Opportunity Card ─────────────────────────────────────────
const OpportunityCard = ({ opp }) => {
  const Icon  = CATEGORY_ICON[opp.category] || Briefcase;
  const color = CATEGORY_COLOR[opp.category] || 'primary';

  return (
    <article className="card p-6 flex flex-col gap-4 h-full hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <Badge color={color} icon={<Icon size={11} />} className="mb-2">{opp.category}</Badge>
          <h3 className="font-semibold text-slate-900 text-base leading-snug">{opp.title}</h3>
          <p className="text-sm text-slate-500 mt-0.5 truncate">{opp.organization}</p>
        </div>
        {opp.featured && (
          <span className="shrink-0 px-2 py-1 rounded-lg bg-accent-50 text-accent-700 text-[10px] font-bold uppercase tracking-wide">
            Featured
          </span>
        )}
      </div>

      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{opp.description}</p>

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
        <span className="flex items-center gap-1"><MapPin size={12} className="text-slate-400" />{opp.location}</span>
        <span className="flex items-center gap-1"><Clock size={12} className="text-slate-400" />{opp.duration}</span>
        <span className="flex items-center gap-1"><IndianRupee size={12} className="text-slate-400" />{opp.stipend}</span>
        <span className="flex items-center gap-1"><Users size={12} className="text-slate-400" />{opp.seats} seats</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {opp.tags.map(t => (
          <span key={t} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">{t}</span>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          Eligibility: <span className="text-slate-600 font-medium">{opp.eligibility}</span>
        </div>
        <Button variant="primary" size="sm" as="a" href="#" target="_blank" rel="noopener noreferrer">
          Apply Now
        </Button>
      </div>
    </article>
  );
};

// ─── Empty State ───────────────────────────────────────────────
const EmptyState = ({ onReset }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
      <Search size={30} className="text-slate-300" />
    </div>
    <h3 className="font-semibold text-slate-900 text-lg mb-2">No results found</h3>
    <p className="text-slate-500 text-sm mb-6 max-w-xs">
      Try adjusting your search or filters to find more opportunities.
    </p>
    <Button variant="outline" size="sm" onClick={onReset} icon={<X size={14} />}>
      Clear Filters
    </Button>
  </div>
);

// ─── Explore Page ──────────────────────────────────────────────
const Explore = () => {
  useSEO(
    'Explore Opportunities',
    'Browse 12+ internships, training programs, apprenticeships and certifications across IT, Healthcare, Electrician, Hospitality and more sectors in India.'
  );
  const [showFilters, setShowFilters] = useState(false);
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  const {
    query, setQuery,
    filters, updateFilter,
    resetFilters, filteredData,
    activeFilterCount, isEmpty,
  } = useFilter(OPPORTUNITIES, {
    searchFields: ['title', 'organization', 'sector', 'location'],
    filterKeys:   ['category', 'mode', 'state'],
  });

  // Page entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Animate cards on filter change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('[data-card]');
    gsap.fromTo(cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.35, ease: 'power2.out' }
    );
  }, [filteredData]);

  return (
    <PageWrapper>
      <main id="main-content">
      {/* ─── Hero / Page Header ─────────────────────────────── */}
      <div ref={heroRef} className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 lg:py-28 pb-20">
        <div className="container-custom">
          <span className="section-label !bg-white/10 !text-white/80 !border !border-white/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            Discover Opportunities
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl mb-4">
            Find Your <span className="text-gradient-green">Perfect</span><br />Opportunity
          </h1>
          <p className="text-white/60 text-lg max-w-xl mb-10">
            Search across {OPPORTUNITIES.length}+ internships, training programs, apprenticeships and certifications across India.
          </p>

          {/* Search bar */}
          <div className="flex gap-3 max-w-2xl">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                placeholder="Search by role, organisation, skill..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Search opportunities"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              )}
            </div>
            <Button
              variant={showFilters ? 'primary' : 'outline'}
              size="md"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 shrink-0"
              icon={<SlidersHorizontal size={16} />}
              onClick={() => setShowFilters(p => !p)}
            >
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>
          </div>
        </div>
        <WaveDivider />
      </div>

      {/* ─── Filters panel ──────────────────────────────────── */}
      {showFilters && (
        <div className="bg-white border-b border-slate-200 shadow-soft">
          <div className="container-custom py-5">
            <div className="flex flex-wrap gap-6 items-end">
              {/* Category */}
              <FilterSelect
                label="Category"
                value={filters.category || 'All'}
                options={OPPORTUNITY_CATEGORIES}
                onChange={v => updateFilter('category', v)}
              />
              {/* Mode */}
              <FilterSelect
                label="Mode"
                value={filters.mode || 'All Modes'}
                options={OPPORTUNITY_MODES}
                onChange={v => updateFilter('mode', v)}
              />
              {/* State */}
              <FilterSelect
                label="State"
                value={filters.state || 'All States'}
                options={INDIA_STATES}
                onChange={v => updateFilter('state', v)}
              />
              {activeFilterCount > 0 && (
                <button onClick={resetFilters} className="flex items-center gap-1.5 text-sm text-rose-500 hover:text-rose-700 font-medium mb-0.5">
                  <X size={14} /> Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── Results ────────────────────────────────────────── */}
      <div className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <p className="text-slate-600">
              Showing <strong className="text-slate-900">{filteredData.length}</strong> results
              {activeFilterCount > 0 && <span className="text-slate-400"> · {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</span>}
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {isEmpty
              ? <EmptyState onReset={resetFilters} />
              : filteredData.map(opp => (
                  <div key={opp.id} data-card>
                    <OpportunityCard opp={opp} />
                  </div>
                ))
            }
          </div>
        </div>
      </div>
      </main>
    </PageWrapper>
  );
};

// ─── Filter Select helper ─────────────────────────────────────
const FilterSelect = ({ label, value, options, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-pointer"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    </div>
  </div>
);

export default Explore;
