# Design Guide

Fallback reference when the `frontend-design` and `humanizer` skills are not installed. Follow these rules for every landing page you build.

---

## The AI Slop Test

If you showed this interface to someone and said "AI made this," would they believe you immediately? If yes, redesign it.

A distinctive interface should make someone ask "how was this made?" — not "which AI made this?"

---

## Typography

**Load fonts via `next/font/google`.** Never use CDN links or system fonts.

### Banned Fonts
Inter, Roboto, Arial, Open Sans, Helvetica, system-ui defaults. These are the AI defaults.

### Recommended Pairings by Vibe

| Vibe | Headline | Body |
|------|----------|------|
| Elegant / Luxury | Playfair Display, Cormorant Garamond, EB Garamond | Lora, Source Serif 4, Crimson Text |
| Modern / Clean | Space Grotesk, Outfit, Plus Jakarta Sans | DM Sans, Manrope, Nunito Sans |
| Bold / Impactful | Syne, Clash Display (variable), Unbounded | Work Sans, Karla, Rubik |
| Playful / Warm | Fredoka, Baloo 2, Comfortaa | Quicksand, Poppins, Nunito |
| Professional | Instrument Serif, Literata, Fraunces | Inter (only as body with a distinctive headline), Atkinson Hyperlegible |
| Edgy / Experimental | Space Mono, JetBrains Mono, Major Mono Display | IBM Plex Sans, Geist Sans |

### Rules
- Use `clamp()` for fluid sizing: `clamp(2rem, 5vw, 4rem)` for headlines
- Vary font weights to create hierarchy (300, 400, 600, 800)
- Never use monospace as a lazy shorthand for "technical"
- Don't put rounded icons above every heading — it looks templated

---

## Color

### Banned Palettes (The AI Aesthetic)
- Cyan/teal on dark backgrounds
- Purple-to-blue gradients
- Neon accents on dark mode
- Pure black (#000) or pure white (#fff)

### Rules
- Tint your neutrals toward your brand hue (even 2-3% creates cohesion)
- Use `oklch()` or `color-mix()` for perceptually uniform colors
- Dominant color + sharp accent outperforms evenly-distributed palettes
- No gray text on colored backgrounds — use a shade of the background color
- All text must pass WCAG AA contrast (4.5:1 for body, 3:1 for large text)

### Quick Palettes by Industry

| Industry | Primary | Accent | Neutrals |
|----------|---------|--------|----------|
| Food / Restaurant | Terracotta, warm brown | Sage green, gold | Cream, warm gray |
| Tech / SaaS | Deep navy, charcoal | Coral, amber | Cool off-white |
| Health / Wellness | Soft sage, eucalyptus | Warm blush, peach | Warm white |
| Finance / Law | Dark slate, forest green | Muted gold, copper | Cool cream |
| Creative / Design | Rich burgundy, deep teal | Hot orange, magenta | Near-black, off-white |
| Education | Ocean blue, indigo | Warm yellow, lime | Light gray, cream |

---

## Layout

### Rules
- Don't center everything. Left-aligned text with asymmetric layouts feels more designed.
- Create visual rhythm through varied spacing — tight groupings, generous separations.
- Use `clamp()` for fluid spacing that breathes on larger screens.
- Break the grid intentionally for emphasis.
- Don't wrap everything in cards. Not everything needs a container.
- Never nest cards inside cards.
- Don't use identical card grids (icon + heading + text, repeated 3x).

### Standard Section Order
Unless the user specifies otherwise:
1. **Navigation** — simple, minimal
2. **Hero** — headline, subheadline, CTA button, optional visual
3. **Social proof strip** — logos, trust badges, or a key metric (optional)
4. **Features / Services** — 3-4 items, varied layout (not identical cards)
5. **Testimonials** — 1-3 quotes with names and roles
6. **CTA section** — repeat the main call to action
7. **Footer** — contact info, links, "Built with Claude Web Builder by Tododeia"

### Responsive
- Mobile-first: design for 375px, then expand
- Use CSS Grid and `@container` queries for component-level responsiveness
- Don't just shrink desktop layout — adapt it
- Navigation becomes a hamburger menu on mobile

---

## Motion

### Rules
- Use exponential easing: `ease-out-quart` or `cubic-bezier(0.25, 1, 0.5, 1)`
- Never use bounce or elastic easing — it feels dated
- Animate only `transform` and `opacity`, never layout properties
- One well-orchestrated page load (staggered reveals) beats scattered micro-interactions
- Use Framer Motion for React animations
- Always respect `prefers-reduced-motion`

### Stagger Pattern (Framer Motion)
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }
};
```

---

## Copy & Content

### AI Writing Patterns to Avoid

These are the fingerprints of AI-generated text. Check every piece of copy against this list.

**Banned Words/Phrases:**
delve, tapestry, landscape, foster, showcase, vibrant, nestled, leverage, innovative, cutting-edge, game-changing, seamless, empower, harness, spearhead, holistic, synergy, robust, dynamic, elevate, transform, revolutionize, reimagine, curate, bespoke, craft (as a verb for text), navigate (metaphorical), at the heart of, in today's world, stands as a testament, serves as a reminder, it's worth noting, it's important to note, the broader implications

**Banned Patterns:**
- Starting with "In a world where..." or "In today's [adjective] landscape..."
- Rule of three lists: "whether you're a X, Y, or Z"
- Em dash overuse — especially multiple per paragraph — like this
- Every sentence being the same length
- Ending with "The future of [topic] is bright"
- Inflated significance: "This marks a pivotal moment in..."
- Vague attributions: "Experts say..." "Many believe..."

**Good Copy Habits:**
- Have opinions. "We build fast" beats "We deliver innovative solutions."
- Vary rhythm. Short punchy lines. Then longer ones.
- Be specific. Numbers, names, concrete details.
- Use "you" and "we" — it's a conversation, not a press release.
- First person is fine: "We started this because..." is more human than "Founded with the mission to..."

---

## Visual Details

### Do
- Intentional decorative elements that reinforce the brand
- Subtle texture or grain for warmth
- Custom illustrations or geometric patterns over stock photos
- Generous whitespace as a design element

### Don't
- Glassmorphism everywhere (blur effects, glass cards, glow borders)
- Rounded rectangles with generic drop shadows
- Sparklines as decoration (tiny charts that mean nothing)
- Gradient text on headings for "impact"
- Icons with rounded corners above every section heading
- Thick colored border on one side of a card
