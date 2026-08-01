import { Link } from 'react-router-dom';
import { Zap, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

// Social icons as inline SVGs (lucide-react dropped brand icons)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
import { SITE_NAME, NAV_LINKS, SOCIAL_LINKS } from '../../utils/constants';

const FOOTER_LINKS = {
  Platform: [
    { label: 'Explore Opportunities', href: '/explore' },
    { label: 'Skill Roadmaps',        href: '/roadmaps' },
    { label: 'Success Stories',       href: '/about#stories' },
    { label: 'Partner with Us',       href: '/contact' },
  ],
  'Govt. Schemes': [
    { label: 'PMKVY',    href: '#' },
    { label: 'NSDC',     href: '#' },
    { label: 'DDU-GKY',  href: '#' },
    { label: 'NAPS',     href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact',  href: '/contact' },
    { label: 'Privacy',  href: '#' },
    { label: 'Terms',    href: '#' },
  ],
};

const iconMap = {
  Linkedin:  LinkedinIcon,
  Twitter:   TwitterIcon,
  Youtube:   YoutubeIcon,
  Instagram: InstagramIcon,
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">

      {/* ─── Main Footer ─────────────────────────────────────── */}
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Zap size={18} className="text-white" fill="white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-[17px] text-white tracking-tight">Skill India</span>
                <span className="text-[10px] font-semibold text-primary-400 tracking-widest uppercase">Hub</span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              India's premier platform connecting youth with vocational training, internships, certifications and employment under the Skill India Mission.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="mailto:info@skillindiahub.gov.in" className="flex items-center gap-2 text-slate-400 hover:text-primary-400 transition-colors">
                <Mail size={14} />
                info@skillindiahub.gov.in
              </a>
              <a href="tel:+911800123456" className="flex items-center gap-2 text-slate-400 hover:text-primary-400 transition-colors">
                <Phone size={14} />
                1800-123-4567 (Toll Free)
              </a>
              <span className="flex items-center gap-2 text-slate-400">
                <MapPin size={14} />
                NSDC, New Delhi – 110 001
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-2">
              {SOCIAL_LINKS.map(({ name, href, icon }) => {
                const Icon = iconMap[icon];
                return (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-500 hover:text-white transition-all duration-200"
                  >
                    {Icon && <Icon size={15} />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">{category}</h3>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-slate-400 hover:text-primary-400 text-sm transition-colors duration-150 flex items-center gap-1 group"
                    >
                      {label}
                      {href === '#' && (
                        <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Bottom Bar ──────────────────────────────────────── */}
      <div className="border-t border-slate-800">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {year} Skill India Hub. A National Skill Development Corporation Initiative.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span className="w-px h-3 bg-slate-700" />
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Use</a>
            <span className="w-px h-3 bg-slate-700" />
            <a href="#" className="hover:text-slate-300 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
