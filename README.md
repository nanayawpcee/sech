# St. Elizabeth Catholic Hospital — Next.js Website

A fully redesigned, production-ready Next.js 14 website for **St. Elizabeth Catholic Hospital (SECH)**, Duayaw Nkwanta, Ghana.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14 | App Router, SSG, metadata |
| React | 18 | UI components |
| TypeScript | 5 | Type safety |
| Framer Motion | 11 | Animations (optional upgrade) |
| CSS Variables | — | Design tokens (no Tailwind dependency) |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout — Navbar, Footer, Modal provider
│   ├── page.tsx              # Home page
│   ├── not-found.tsx         # 404 page
│   ├── about/page.tsx        # About, mission, team, timeline
│   ├── services/
│   │   ├── page.tsx          # All services grid
│   │   └── [slug]/page.tsx   # Individual service detail (SSG)
│   ├── news/
│   │   ├── page.tsx          # All news articles
│   │   └── [slug]/page.tsx   # Individual article (SSG)
│   ├── contact/page.tsx      # Contact form + map
│   └── appointment/page.tsx  # Full-page booking form
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Sticky nav with scroll effect + mobile drawer
│   │   └── Footer.tsx        # Multi-column footer
│   ├── sections/
│   │   ├── HeroCarousel.tsx  # Auto-advancing 3-slide hero with canvas patterns
│   │   ├── StatsBar.tsx      # Animated count-up stats
│   │   ├── ServicesGrid.tsx  # 8/10 service cards with hover effects
│   │   ├── AboutSection.tsx  # Split layout with floating badge
│   │   ├── EmergencyBanner.tsx # Pulsing red emergency strip
│   │   ├── NewsSection.tsx   # News cards grid
│   │   └── ContactSection.tsx # Dark contact form + info
│   └── ui/
│       ├── AnimateIn.tsx     # Scroll-triggered reveal wrapper
│       ├── AppointmentModal.tsx        # 3-step modal form
│       ├── AppointmentModalProvider.tsx # Global modal context
│       ├── AppointmentPageForm.tsx     # Inline 3-step form for /appointment
│       ├── BookButton.tsx    # Client button that opens the modal
│       └── PageHero.tsx      # Reusable inner-page hero banner
│
├── lib/
│   └── data.ts               # All site data: services, news, team, stats
│
└── styles/
    └── globals.css           # CSS variables, reset, utility classes, animations
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
# → Open http://localhost:3000

# 3. Build for production
npm run build
npm start
```

---

## Key Features

### 🎠 Hero Carousel
- 3 auto-advancing slides (5.5 s interval)
- Canvas-drawn background patterns (crosshatch / waves / dots)
- Animated slide-up heading & subtitle on each transition
- Progress dot navigation

### 📅 Appointment Booking Modal
- Triggered from any "Book Appointment" button sitewide
- 3-step wizard: Personal Info → Appointment Details → Review
- Insurance toggle, appointment type selector, time slots
- Validation on each step before advancing
- Success state with personalised confirmation message
- Accessible: closes on Escape key and backdrop click

### 🗂 Routing
| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, services preview, about, emergency, news, contact |
| `/services` | Full services grid |
| `/services/[slug]` | Service detail with sidebar booking card |
| `/about` | Mission, values, animated timeline, team cards |
| `/news` | All news articles |
| `/news/[slug]` | Article detail with related stories sidebar |
| `/contact` | Map + contact form |
| `/appointment` | Full-page 3-step booking form |

### 🎨 Design System
All colours, typography, shadows, and transitions live in `globals.css` as CSS variables — easy to theme without touching component code.

---

## Customisation

- **Add a service**: append to `SERVICES` in `src/lib/data.ts`
- **Add a news article**: append to `NEWS` in `src/lib/data.ts`
- **Change brand colours**: edit `--primary`, `--accent` in `globals.css`
- **Connect a real API**: replace the `setTimeout` stubs in `AppointmentModal.tsx` and `AppointmentPageForm.tsx` with `fetch` calls to your backend

---

## Deployment

Optimised for **Vercel** (zero-config):

```bash
npx vercel
```

Or any Node.js host:
```bash
npm run build && npm start
```

---

*Built for St. Elizabeth Catholic Hospital, Duayaw Nkwanta, Ghana — A CHAG Member Institution.*
# sech
