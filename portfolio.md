# CLAUDE CODE MEGA-PROMPT: World-Class Portfolio Website

> Copy everything below this line and paste it into Claude Code as your initial prompt.

---

## WHO I AM
I'm a student building a world-class personal portfolio website that doubles as a living, breathing digital universe — not just a static resume. It needs to be Awwwards-level quality, deeply personal, and technically impressive. I will keep updating it over time with new projects, books, media, and case studies.

## INSPIRATION SITES (study these for design DNA)
- https://thevertmenthe.dault-lafon.fr — horizontal scroll storytelling, cinematic section transitions
- https://buttermax.net — Awwwards SOTD, physics cursor, buttery 60fps, bold single-color palette
- https://www.getty.edu/tracingart/ — museum-grade editorial, scroll-driven narrative
- https://www.jessicawells.co — clean project grid, video-on-hover, personal monogram branding
- https://www.drumspirit.be — full-bleed media, embedded audio/video as structural elements
- https://www.igloo.inc — Awwwards SOTY 2024, immersive 3D scroll, chromatic aberration, shader intro

## TECH STACK (use exactly this)
- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS 4 + CSS Modules for complex animations
- **Animation**: Framer Motion (React animations) + GSAP with ScrollTrigger (scroll-driven effects)
- **Smooth Scroll**: Lenis
- **3D / Physics**: Three.js via React Three Fiber (@react-three/fiber + @react-three/drei)
- **Audio**: Howler.js (section-aware music with crossfade)
- **Content**: MDX (case studies) + JSON data files (books, movies, quotes, projects)
- **State**: Zustand (lightweight global state for music player, cursor, theme)
- **SEO**: next-sitemap, next-seo
- **Dark Mode**: next-themes
- **Deployment**: Vercel (free Hobby tier)
- **Fonts**: Google Fonts — Instrument Serif (display) + DM Sans (body) + JetBrains Mono (code)

## PROJECT STRUCTURE — scaffold this exactly

```
portfolio/
├── public/
│   ├── fonts/
│   ├── images/
│   │   ├── projects/
│   │   ├── books/
│   │   ├── movies/
│   │   └── og/                    # Open Graph images
│   ├── audio/
│   │   ├── hero-ambient.mp3       # placeholder, I'll add real files
│   │   ├── projects-electronic.mp3
│   │   ├── books-lofi.mp3
│   │   ├── casestudy-cinematic.mp3
│   │   └── quotes-ambient.mp3
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout: fonts, metadata, providers, analytics
│   │   ├── page.tsx               # Home: assembles all sections
│   │   ├── globals.css            # Tailwind base + CSS custom properties + animations
│   │   ├── case-study/
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Dynamic case study pages from MDX
│   │   └── not-found.tsx          # Custom 404 page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Floating nav, appears on scroll, magnetic hover links
│   │   │   ├── Footer.tsx         # Minimal footer with social links + physics canvas callback
│   │   │   ├── SmoothScroll.tsx   # Lenis wrapper
│   │   │   ├── LoadingScreen.tsx  # Intro animation (monogram reveal → fade out)
│   │   │   └── PageTransition.tsx # Framer Motion page transitions
│   │   ├── ui/
│   │   │   ├── MagneticButton.tsx # Buttons that attract cursor via spring physics
│   │   │   ├── CustomCursor.tsx   # Blend-mode cursor that transforms on hover targets
│   │   │   ├── TextReveal.tsx     # Split text into chars/words, stagger reveal on scroll
│   │   │   ├── ParallaxImage.tsx  # Image with scroll-linked parallax depth
│   │   │   ├── SectionHeading.tsx # Large serif heading with scroll-triggered animation
│   │   │   ├── MusicToggle.tsx    # Floating music on/off with visualizer
│   │   │   └── ScrollIndicator.tsx # "Scroll" indicator on hero
│   │   ├── sections/
│   │   │   ├── Hero.tsx           # Full-viewport, physics WebGL canvas + name + tagline
│   │   │   ├── About.tsx          # Split: parallax photo + bio text reveal + social icons
│   │   │   ├── Projects.tsx       # Horizontal scroll carousel, video-on-hover thumbnails
│   │   │   ├── CaseStudies.tsx    # Editorial cards linking to /case-study/[slug]
│   │   │   ├── Media.tsx          # YouTube embeds grid + Instagram content
│   │   │   ├── Library.tsx        # Sub-sections: Books (3D shelf) + Movies/TV (poster grid)
│   │   │   ├── Quotes.tsx         # Full-viewport typographic showcase, one quote at a time
│   │   │   └── Contact.tsx        # CTA + email + socials + physics canvas return
│   │   ├── three/
│   │   │   ├── HeroCanvas.tsx     # R3F canvas: particle field that reacts to cursor
│   │   │   ├── ParticleField.tsx  # Custom shader particles with mouse repulsion
│   │   │   ├── BookShelf.tsx      # 3D books with cover textures, tilt on hover
│   │   │   └── shaders/
│   │   │       ├── particles.vert
│   │   │       └── particles.frag
│   │   └── case-study/
│   │       ├── CaseStudyHero.tsx  # Full-bleed hero image + title parallax
│   │       ├── MetricCard.tsx     # Animated count-up stat cards
│   │       ├── PullQuote.tsx      # Large typographic quotes
│   │       ├── BeforeAfter.tsx    # Slider comparison component
│   │       └── ReadingProgress.tsx # Scroll progress bar
│   ├── data/
│   │   ├── projects.json          # { title, description, tech, thumbnail, video, link, github }
│   │   ├── books.json             # { title, author, cover, rating, review, year }
│   │   ├── movies.json            # { title, poster, rating, review, type: "movie"|"tv", year }
│   │   ├── quotes.json            # { text, author, category }
│   │   ├── social.json            # { youtube, instagram, linkedin, github, email }
│   │   └── site.json              # { name, tagline, bio, ogImage, etc }
│   ├── content/
│   │   └── case-studies/
│   │       ├── project-one.mdx    # Full case study with custom components
│   │       └── project-two.mdx
│   ├── hooks/
│   │   ├── useMousePosition.ts    # Track mouse position for cursor + physics
│   │   ├── useSectionInView.ts    # Intersection observer for section detection
│   │   ├── useMediaQuery.ts       # Responsive breakpoint hook
│   │   └── useMusicPlayer.ts      # Howler.js wrapper with crossfade logic
│   ├── stores/
│   │   ├── cursorStore.ts         # Zustand: cursor state (type, target, position)
│   │   ├── musicStore.ts          # Zustand: active track, volume, isPlaying
│   │   └── uiStore.ts            # Zustand: loading state, active section, nav visibility
│   ├── lib/
│   │   ├── mdx.ts                 # MDX compilation + frontmatter parsing
│   │   ├── fonts.ts               # Next.js font optimization config
│   │   └── utils.ts               # cn() classname merge, lerp, clamp, etc.
│   └── types/
│       └── index.ts               # TypeScript interfaces for all data models
├── .eslintrc.json
├── .gitignore
├── next.config.ts                 # MDX plugin, image domains, headers
├── tailwind.config.ts             # Custom theme: colors, fonts, animations, screens
├── tsconfig.json
├── package.json
└── README.md
```

## WHAT TO BUILD FIRST (Phase 1)

Scaffold the full project structure above with all files created (components can be placeholder/skeleton). Then fully implement these in order:

### 1. Core infrastructure
- Initialize Next.js 15 with App Router, TypeScript, Tailwind CSS 4
- Install ALL dependencies from the tech stack
- Configure `tailwind.config.ts` with custom theme:
  - Colors: dark base `#0a0a0b`, off-white text `#fafaf9`, accent coral `#E8593C`, accent blue `#3B8BD4`, accent emerald `#1D9E75`, accent amber `#BA7517`
  - Font families: Instrument Serif, DM Sans, JetBrains Mono
  - Custom animation keyframes: fadeUp, fadeIn, slideInLeft, slideInRight, scaleIn, textReveal
  - Screens: standard responsive breakpoints
- Set up `globals.css` with CSS custom properties, smooth selection color, scrollbar styling
- Configure `next.config.ts` with MDX support, image optimization domains (YouTube, Instagram)

### 2. Layout shell
- `layout.tsx`: fonts loaded via `next/font/google`, metadata with OG tags, theme provider, smooth scroll provider, custom cursor, music toggle
- `SmoothScroll.tsx`: Lenis integration wrapping children
- `Navbar.tsx`: fixed/floating nav that hides on scroll down, shows on scroll up. Links to sections via smooth scroll. Magnetic hover effect on links. Your monogram/logo on the left.
- `CustomCursor.tsx`: custom cursor that:
  - Is a circle with `mix-blend-mode: difference`
  - Grows when hovering interactive elements
  - Shows "View" text when hovering project cards
  - Shows "Play" when hovering media
  - Uses spring physics (Framer Motion `useSpring`) for smooth following
  - Hides on mobile/touch devices
- `LoadingScreen.tsx`: intro animation — your monogram/initials scale up, then the screen wipes away revealing the site. Use Framer Motion `AnimatePresence`.

### 3. Hero section
- Full viewport height
- `HeroCanvas.tsx` with React Three Fiber:
  - A particle field (500-1000 particles) rendered with `THREE.Points`
  - Custom vertex + fragment shaders:
    - Particles slowly drift/orbit
    - Mouse position passed as uniform
    - Particles repel away from cursor within a radius
    - Particles have varying sizes and subtle opacity animation
  - Dark background, particles in accent color with glow
- Your name in massive Instrument Serif (clamp 48px-120px) overlaid on the canvas
- A one-line tagline in DM Sans below
- `ScrollIndicator.tsx` at bottom: animated down arrow/line

### 4. SEO & protocols (implement in layout.tsx and next.config.ts)
- Full `<head>` metadata: title, description, keywords, author, canonical URL
- Open Graph tags: og:title, og:description, og:image, og:url, og:type
- Twitter Card tags: twitter:card, twitter:site, twitter:image
- Structured data (JSON-LD): Person schema with name, url, sameAs (social links)
- `robots.txt` allowing all crawlers
- `manifest.json` for PWA
- `sitemap.xml` auto-generation via next-sitemap
- Security headers in next.config.ts: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Content-Security-Policy
- Canonical URLs on all pages

### 5. Placeholder sections
Create skeleton components for ALL sections (About, Projects, CaseStudies, Media, Library, Quotes, Contact) with:
- A `<section>` wrapper with an `id` for scroll targeting
- Section heading using `SectionHeading.tsx`
- Placeholder content text
- Basic scroll-reveal animation using Framer Motion `useInView`

### 6. Data files
Create ALL JSON data files with 2-3 example entries each so the site has content to render. Use realistic placeholder data.

### 7. Deploy config
- `.gitignore` properly configured
- `README.md` with project description, tech stack, and setup instructions
- Ensure `npm run build` succeeds with zero errors
- Ensure `npm run dev` runs cleanly

## CRITICAL IMPLEMENTATION NOTES

1. **TypeScript strict mode** — no `any` types, proper interfaces for all data
2. **Performance** — lazy load Three.js canvas, use `next/image` for all images, code-split sections with `dynamic(() => import(...))`
3. **Accessibility** — semantic HTML (`<main>`, `<section>`, `<nav>`, `<article>`), proper heading hierarchy, alt text, focus-visible states, skip-to-content link, reduced-motion media query for all animations
4. **Mobile** — hide custom cursor, simplify/disable WebGL on mobile, touch-friendly tap targets (44px minimum), test all breakpoints
5. **Dark mode** — the site is primarily dark-themed but support light mode via next-themes with `class` strategy
6. **Fonts** — load via `next/font/google` for zero layout shift, use `font-display: swap`
7. **Music** — always require user opt-in (never autoplay), persist preference in localStorage
8. **Error boundaries** — wrap Three.js canvas in error boundary with fallback
9. **Vercel-ready** — no server-dependent features on free tier, static generation where possible

## DESIGN DIRECTION

- **Typography**: Large Instrument Serif for section titles (clamp 32px-80px). DM Sans 300/400 weight for body. High contrast between display and body text.
- **Color**: Dark base (#0a0a0b) with per-section accent colors that subtly shift as you scroll. Coral for projects, blue for case studies, emerald for quotes, amber for media/library.
- **Spacing**: Generous whitespace. Sections breathe. Don't crowd content.
- **Motion**: Everything enters with purpose. Staggered character reveals for headings. Clip-path reveals for images. Smooth 0.8-1.2s transitions with custom easing (cubic-bezier(0.16, 1, 0.3, 1)).
- **Cursor**: The custom cursor IS the design statement. It should feel alive.

## AFTER PHASE 1, I WILL ASK YOU TO BUILD:
- Phase 2: About section (parallax photo, bio text reveal, social icons)
- Phase 3: Projects section (horizontal scroll carousel, video-on-hover)
- Phase 4: Case study template (editorial MDX pages)
- Phase 5: Media section (YouTube + IG embeds)
- Phase 6: Library section (3D bookshelf + movie grid)
- Phase 7: Quotes section (typographic showcase)
- Phase 8: Music system (Howler.js section-aware crossfade)
- Phase 9: Contact + Footer
- Phase 10: Performance optimization, Lighthouse 90+, final polish

## START NOW
Begin by scaffolding the entire project structure, installing all dependencies, and fully implementing Phase 1 (steps 1-7 above). Make it production-grade from the first commit. Every file should be real, working code — no "TODO" comments, no empty shells. The skeleton sections should render properly and scroll smoothly.

When you finish, run `npm run build` to verify zero errors, then tell me the results.
