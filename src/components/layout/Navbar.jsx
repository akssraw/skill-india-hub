import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Zap, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import Button from '../ui/Button';
import { NAV_LINKS, SITE_NAME } from '../../utils/constants';

const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const mobileMenuRef = useRef(null);
  const navRef        = useRef(null);

  // ─── Scroll detection ───────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Mobile menu GSAP animation ────────────────────────────
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (mobileOpen) {
      gsap.fromTo(menu,
        { opacity: 0, y: -12, pointerEvents: 'none' },
        { opacity: 1, y: 0,  pointerEvents: 'auto', duration: 0.25, ease: 'power2.out' }
      );
      // Stagger nav items
      gsap.fromTo(menu.querySelectorAll('a, button'),
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, stagger: 0.04, duration: 0.2, ease: 'power2.out', delay: 0.1 }
      );
    } else {
      gsap.to(menu,
        { opacity: 0, y: -8, pointerEvents: 'none', duration: 0.2, ease: 'power2.in' }
      );
    }
  }, [mobileOpen]);

  // ─── Close on route change ─────────────────────────────────
  const closeMobile = () => setMobileOpen(false);

  // ─── Prevent body scroll when mobile menu open ─────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navBg = scrolled
    ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-slate-100/80'
    : 'bg-transparent';

  const logoTextColor = scrolled ? 'text-slate-900' : 'text-slate-900';

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
        style={{ height: 'var(--nav-height)' }}
      >
        <div className="container-custom h-full flex items-center justify-between">

          {/* ─── Logo ──────────────────────────────────────── */}
          <Link
            to="/"
            onClick={closeMobile}
            className="flex items-center gap-2.5 group"
            aria-label={`${SITE_NAME} - Home`}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-soft group-hover:shadow-glow-green transition-shadow duration-300">
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-display font-bold text-[17px] tracking-tight ${logoTextColor}`}>
                Skill India
              </span>
              <span className="text-[10px] font-semibold text-primary-500 tracking-widest uppercase">
                Hub
              </span>
            </div>
          </Link>

          {/* ─── Desktop Nav ───────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink
                key={href}
                to={href}
                end={href === '/'}
                className={({ isActive }) => [
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
                ].join(' ')}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* ─── Desktop CTA ───────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              as={Link}
              to="/explore"
              variant="primary"
              size="sm"
              iconRight={<ChevronRight size={15} />}
            >
              Get Started
            </Button>
          </div>

          {/* ─── Mobile Hamburger ──────────────────────────── */}
          <button
            onClick={() => setMobileOpen(p => !p)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ─── Mobile Menu ─────────────────────────────────────── */}
      <div
        ref={mobileMenuRef}
        className="md:hidden fixed inset-0 top-[72px] z-40 bg-white/95 backdrop-blur-md opacity-0"
        style={{ pointerEvents: mobileOpen ? 'auto' : 'none' }}
        aria-hidden={!mobileOpen}
      >
        <nav className="container-custom py-6 flex flex-col gap-2" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <NavLink
              key={href}
              to={href}
              end={href === '/'}
              onClick={closeMobile}
              className={({ isActive }) => [
                'flex items-center justify-between px-4 py-4 rounded-xl text-base font-semibold transition-all duration-150',
                isActive
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-slate-700 hover:bg-slate-50',
              ].join(' ')}
            >
              {label}
              <ChevronRight size={16} className="text-slate-400" />
            </NavLink>
          ))}

          <div className="mt-4 pt-4 border-t border-slate-100">
            <Button
              as={Link}
              to="/explore"
              variant="primary"
              size="md"
              className="w-full justify-center"
              onClick={closeMobile}
              iconRight={<ChevronRight size={16} />}
            >
              Get Started Free
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
