# Skill India Hub

> India's premier platform connecting youth with vocational training, internships, certifications and employment under the Skill India Mission.

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 8 |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Icons | Lucide React |
| Smooth Scroll | Lenis |
| Animations | GSAP (GreenSock) |

## 📄 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, Mission, Stats, Programs, Roadmaps, Testimonials, Partners, CTA |
| `/explore` | Explore | Search + filter 12+ opportunities across sectors |
| `/roadmaps` | Roadmaps | 8 sector career paths with timelines |
| `/about` | About | Mission, Impact stats, Govt schemes, FAQ |
| `/contact` | Contact | Validated form, office info, map |

## ⚡ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🌐 Deployment

### Deploy to Netlify

1. Push to GitHub
2. Connect repo on [netlify.com](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. SPA routing handled via `public/_redirects` and `netlify.toml`

### Deploy to Vercel

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — zero config needed
4. SPA routing handled via `vercel.json`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, PageWrapper
│   ├── ui/            # Button, Badge, SectionHeader, StatCounter, Accordion
│   └── home/          # Hero, Mission, Stats, Programs, Roadmaps, Stories, Partners, CTA
├── data/              # opportunities, roadmaps, stats, testimonials, faqs, partners
├── hooks/             # useScrollReveal, useCounter, useFilter, useSEO
├── pages/             # Home, Explore, Roadmaps, About, Contact, NotFound
├── utils/             # animations.js, constants.js, validators.js
└── styles/            # index.css (design system)
```

## 🎨 Design System

- **Primary**: Emerald Green `#10b981`
- **Secondary**: Indigo Blue `#6366f1`
- **Accent**: Saffron Orange `#f59e0b`
- **Display Font**: Bricolage Grotesque
- **Body Font**: Inter

## ♿ Accessibility

- WCAG 2.1 AA compliant target
- Skip-to-content link
- Keyboard navigable throughout
- `prefers-reduced-motion` respected in all GSAP animations
- ARIA landmarks and labels on all sections
- Semantic HTML5

## 📦 Build Stats (gzipped)

| Chunk | Size |
|-------|------|
| React | ~70 KB |
| GSAP | ~44 KB |
| Lenis | ~5.7 KB |
| App shell | ~5 KB |
| Each page | 3–9 KB |
| **Total** | **~163 KB** |

## 📚 Documentation & Compliance

- [AI Usage Documentation](./AI_USAGE.md) - Details on AI tools used during development
- [Assets Documentation](./ASSETS.md) - Asset inventory, sourcing, and licensing verification

---

Built for the **AI WebForge Competition** · Powered by the Skill India Mission
