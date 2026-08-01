// ─── Site Constants ──────────────────────────────────────────
export const SITE_NAME    = 'Skill India Hub';
export const SITE_TAGLINE = 'Empowering India\'s Youth Through Skills';
export const NAV_HEIGHT   = 72; // px — keep in sync with CSS var

// ─── Navigation Links ────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',        href: '/' },
  { label: 'Explore',     href: '/explore' },
  { label: 'Roadmaps',    href: '/roadmaps' },
  { label: 'About',       href: '/about' },
  { label: 'Contact',     href: '/contact' },
];

// ─── Social Links ─────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { name: 'LinkedIn',  href: 'https://linkedin.com',  icon: 'Linkedin' },
  { name: 'Twitter',   href: 'https://twitter.com',   icon: 'Twitter' },
  { name: 'YouTube',   href: 'https://youtube.com',   icon: 'Youtube' },
  { name: 'Instagram', href: 'https://instagram.com', icon: 'Instagram' },
];

// ─── Filter Options ──────────────────────────────────────────
export const OPPORTUNITY_CATEGORIES = [
  'All', 'Internship', 'Training', 'Apprenticeship', 'Certification',
];

export const OPPORTUNITY_MODES = [
  'All Modes', 'Online', 'Offline', 'Hybrid',
];

export const INDIA_STATES = [
  'All States', 'Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'West Bengal',
];

// ─── Roadmap Sectors ─────────────────────────────────────────
export const SECTORS = [
  { id: 'it-ai',         label: 'IT & AI',         color: 'secondary' },
  { id: 'electrician',   label: 'Electrician',      color: 'accent'    },
  { id: 'healthcare',    label: 'Healthcare',       color: 'primary'   },
  { id: 'hospitality',   label: 'Hospitality',      color: 'accent'    },
  { id: 'manufacturing', label: 'Manufacturing',    color: 'secondary' },
  { id: 'retail',        label: 'Retail',           color: 'primary'   },
  { id: 'automotive',    label: 'Automotive',       color: 'accent'    },
  { id: 'agriculture',   label: 'Agriculture',      color: 'primary'   },
];

// ─── Government Schemes ──────────────────────────────────────
export const GOVT_SCHEMES = [
  { name: 'PMKVY',    full: 'Pradhan Mantri Kaushal Vikas Yojana' },
  { name: 'NSDC',     full: 'National Skill Development Corporation' },
  { name: 'DDU-GKY',  full: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana' },
  { name: 'NAPS',     full: 'National Apprenticeship Promotion Scheme' },
  { name: 'STRIVE',   full: 'Skills Strengthening for Industrial Value Enhancement' },
];
