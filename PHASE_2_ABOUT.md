# PHASE 2 — ABOUT SECTION
## Art-Driven Portfolio | World-Class Execution

---

## CONTEXT
You are continuing to build a world-class, art-driven personal portfolio website.
Phase 1 (infrastructure, layout, hero, skeleton sections) is already complete and building successfully.

DO NOT touch Phase 1 files unless you need to wire up a new component into the existing layout.
Check the existing codebase first — understand the design system, color tokens, fonts, and animation conventions already in place — then build Phase 2 to match seamlessly.

Run `npm run build` at the end. Zero errors required.

---

## PHASE 2 GOAL
Build the **About Section** — a cinematic, editorial, deeply personal section that makes visitors feel like they *know* you before they've even read a word. It should feel like opening a beautifully designed magazine spread.

This is not a boring "Hi, I'm [Name]" block. It is a full-screen experience.

---

## WHAT TO BUILD — STEP BY STEP

### Step 1 — Section Shell & Scroll Trigger
- Create `src/components/sections/AboutSection.tsx`
- Full viewport height section (`min-h-screen`), dark background (use existing design tokens)
- Register it in the main page after the Hero section
- Use `IntersectionObserver` or Framer Motion `useInView` to trigger all animations when section enters viewport
- Add `id="about"` for anchor navigation

---

### Step 2 — Parallax Photo Block
- Large-format portrait/photo taking up ~45% of the section width on desktop, full width on mobile
- Use Next.js `<Image>` with a placeholder image path: `/public/images/about-photo.jpg` — create a placeholder file note in that location
- Implement **CSS parallax** on scroll: the image moves at 0.6x the scroll speed of the page (translateY effect using `useScroll` + `useTransform` from Framer Motion)
- Add a subtle **grain texture overlay** on the image (use a CSS pseudo-element with SVG noise filter or a semi-transparent PNG grain layer)
- On desktop: image is left-aligned, text is right. On mobile: image is top, text below
- Add a thin 1px border frame around the image that draws in on scroll (stroke animation using SVG or CSS clip-path)

---

### Step 3 — Bio Text Reveal
- Headline: Large display text (e.g. "Designer. Builder. Curious Human.") — use the existing display font from Phase 1
- Body copy: 2–3 paragraphs of placeholder bio text with `[REPLACE WITH YOUR BIO]` markers
- **Staggered word-by-word or line-by-line reveal animation**: each line fades + slides up with 80ms stagger between lines, triggered by `useInView`
- Use a **text mask reveal** technique — words start hidden behind a clip-path or overflow:hidden container, then slide up into view
- Include a subtle **"currently"** block: a small pill/badge showing what you're currently working on, studying, or obsessed with. e.g. `Currently: Building in public 🚀` — make it easy to update in a data file
- Add a small decorative typographic element — a large faded number or symbol in the background (like "001" or "©") using absolute positioning

---

### Step 4 — Trait/Value Tags
- A row of 4–6 animated tags/chips below the bio: e.g. `Product Design`, `AI/ML`, `Next.js`, `Storytelling`, `Systems Thinking`
- Tags animate in with a staggered pop/scale effect on scroll
- On hover: tags subtly scale up + change background to an accent color from the design system
- Store tag data in `src/data/about.ts` so it's easy to update

---

### Step 5 — Stats Row
- 3–4 minimal stat blocks in a horizontal row:
  - `X+ Projects Built`
  - `X Books Read This Year`
  - `X Countries Visited` (or another personal stat)
  - `X Years Building`
- Each stat number **counts up** from 0 when section enters viewport using a lightweight counter animation (write a `useCountUp` custom hook)
- Stats stored in `src/data/about.ts`
- Clean typographic treatment — large number, small label below

---

### Step 6 — Social Icons Row
- A horizontal row of social links: GitHub, LinkedIn, YouTube, Instagram, Twitter/X
- Use `lucide-react` icons or inline SVGs for each platform
- On hover: icon lifts up with a subtle translateY(-4px) + color shift
- Each link opens in a new tab with `rel="noopener noreferrer"`
- Add a small animated underline or dot that appears under the active/hovered icon
- Store links in `src/data/about.ts` as a typed object so they're easy to update
- Add a "Download CV" button styled as a bordered pill — links to `/public/files/cv.pdf` (create a placeholder note for the file)

---

### Step 7 — Cursor Interaction (Physics Layer)
- The photo block should have a **magnetic cursor effect**: when the user's cursor gets within 100px of the photo, the photo gently drifts 8–12px toward the cursor (lerp-based, smooth)
- Use a `useMagneticEffect` custom hook that takes a ref and returns transform values
- Apply this same hook to the "Download CV" button

---

### Step 8 — Mobile Responsiveness
- Stack layout vertically on screens below 768px
- Photo goes to top, full width, with reduced parallax (or disable parallax on mobile for performance)
- Font sizes scale down gracefully using clamp() or responsive Tailwind classes
- Touch targets for social icons minimum 44x44px
- Test that all animations still trigger correctly on mobile scroll

---

### Step 9 — Data File
Create `src/data/about.ts` with this structure:

```typescript
export const aboutData = {
  headline: "Designer. Builder. Curious Human.",
  currently: "Building in public 🚀",
  bio: [
    "[REPLACE: Paragraph 1 — who you are, your origin story]",
    "[REPLACE: Paragraph 2 — what drives you, your obsessions]",
    "[REPLACE: Paragraph 3 — what you're building toward]",
  ],
  traits: [
    "Product Design",
    "AI/ML",
    "Next.js",
    "Storytelling",
    "Systems Thinking",
    "First Principles",
  ],
  stats: [
    { value: 12, label: "Projects Built", suffix: "+" },
    { value: 24, label: "Books Read", suffix: "" },
    { value: 3, label: "Years Building", suffix: "" },
    { value: 5, label: "Countries Visited", suffix: "" },
  ],
  socials: {
    github: "https://github.com/YOURUSERNAME",
    linkedin: "https://linkedin.com/in/YOURUSERNAME",
    youtube: "https://youtube.com/@YOURUSERNAME",
    instagram: "https://instagram.com/YOURUSERNAME",
    twitter: "https://twitter.com/YOURUSERNAME",
  },
  cvPath: "/files/cv.pdf",
};
```

All values with `YOURUSERNAME` or `REPLACE` are placeholder markers — do NOT hardcode fake names.

---

### Step 10 — Wire Up & Verify
- Import `AboutSection` into the main page file
- Confirm it renders correctly after the Hero
- Check that scroll-triggered animations don't fire prematurely (use `once: true` on `useInView`)
- Confirm no layout shift (CLS) from image loading — use `width`, `height`, and `placeholder="blur"` on the Next.js Image component
- Run `npm run build` — zero errors, zero warnings if possible
- Run `npm run dev` and visually verify the section looks world-class

---

## DESIGN PRINCIPLES TO FOLLOW
- Every element should feel **intentional** — no default browser styles leaking through
- Whitespace is your friend — don't crowd the section
- Animation should **enhance**, not distract — nothing should move that doesn't need to
- Typography hierarchy must be crystal clear: display → headline → body → label
- The section should feel like it belongs in the same universe as the Hero — consistent grain, consistent color temperature, consistent motion language

---

## FILES TO CREATE OR MODIFY
```
src/
  components/
    sections/
      AboutSection.tsx          ← NEW
    ui/
      MagneticWrapper.tsx       ← NEW (reusable magnetic cursor component)
  hooks/
    useCountUp.ts               ← NEW
    useMagneticEffect.ts        ← NEW
  data/
    about.ts                    ← NEW
public/
  images/
    about-photo.jpg             ← CREATE PLACEHOLDER (empty file + README note)
  files/
    cv.pdf                      ← CREATE PLACEHOLDER (empty file + README note)
```

Modify:
- `src/app/page.tsx` — add `<AboutSection />` after `<HeroSection />`

---

## DONE CRITERIA
- [ ] About section renders after Hero with no layout breaks
- [ ] Parallax photo scrolls at 0.6x speed
- [ ] Bio text reveals line by line on scroll
- [ ] Stats count up from 0 on enter
- [ ] Social icons are linked and hover-animated
- [ ] Magnetic cursor effect works on photo and CV button
- [ ] Fully responsive on mobile
- [ ] `npm run build` passes with zero errors
- [ ] Section feels like it belongs in a top-10 Awwwards portfolio
