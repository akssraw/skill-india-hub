import { lazy, Suspense, useEffect, useRef, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Register GSAP plugins & configure mobile optimization
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

// ─── Route-level code splitting ──────────────────────────────
const Home     = lazy(() => import('./pages/Home'));
const Explore  = lazy(() => import('./pages/Explore'));
const Roadmaps = lazy(() => import('./pages/Roadmaps'));
const About    = lazy(() => import('./pages/About'));
const Contact  = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// ─── Lenis context ─────────────────────────────────────────
const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

// ─── Page loader fallback ─────────────────────────────────────
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-full border-4 border-primary-200 border-t-primary-500 animate-spin" />
      <p className="text-slate-400 text-sm font-medium">Loading…</p>
    </div>
  </div>
);

// ─── Scroll to top on route change ─────────────────────────
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis?.current) {
      lenis.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, lenis]);

  return null;
};

// ─── Lenis smooth scroll initialization ──────────────────────
const LenisProvider = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Detect touch device — mobile devices perform best with native GPU-accelerated touch scroll
    const isTouch = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);
    
    if (isTouch) {
      // Native touch momentum scroll on mobile
      return;
    }

    const lenis = new Lenis({
      duration:    1.2,
      easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch:   false,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
};

// ─── App Shell ───────────────────────────────────────────────
const AppShell = () => (
  <>
    {/* Accessibility: skip to main content */}
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-strong focus:outline-none"
    >
      Skip to main content
    </a>

    <ScrollToTop />
    <Navbar />

    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/explore"  element={<Explore />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/about"    element={<About />} />
        <Route path="/contact"  element={<Contact />} />
        <Route path="*"         element={<NotFound />} />
      </Routes>
    </Suspense>

    <Footer />
  </>
);

// ─── Root App ────────────────────────────────────────────────
const App = () => (
  <BrowserRouter>
    <LenisProvider>
      <AppShell />
    </LenisProvider>
  </BrowserRouter>
);

export default App;
