# adnansadar.com

Personal portfolio — a dark, monochrome single-page site built from the
`Portfolio Revamp.dc.html` Claude Design mockup.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui ·
Motion.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npx tsc --noEmit
npm run lint
```

**Six photos are missing from `public/`** — see
[`public/README.md`](public/README.md). Everything else works without them.

Copy `.env.example` to `.env.local` if you want the contact form to actually
send mail.

## Layout

```
src/content/     Every string on the site, typed. No copy lives in JSX.
src/lib/         cn(), Motion variants, the magnetic-cursor hook, the contact schema.
src/components/
  motion/        Reveal, Stagger, CountUp, AmbientField — the shared motion layer.
  sections/      One file per section of the page.
  ui/            shadcn/ui primitives.
src/app/         Routes: / and /blog, plus sitemap, robots, 404, and the contact server action.
```

To change wording or add an article, edit `src/content/*` — the homepage teaser
and `/blog` both read the same `articles.ts`, so they cannot drift apart.

## Notes on the port

Where this deviates from the mockup, and why:

- **Scroll animation.** The mockup used CSS `animation-timeline: view()`, which
  only Chromium ships. Every reveal is a Motion variant instead, so Safari and
  Firefox get the same page. The keyframe→variant mapping is in
  [`src/lib/motion.ts`](src/lib/motion.ts).
- **Hydration.** The mockup's runtime called `Math.random()` and read the clock
  during render. Here the watchlist, typewriter and gallery all render a fixed,
  deterministic first frame and only start moving in an effect.
- **Server-rendered content.** The typewriter and the count-up stats emit their
  *finished* state into the HTML and rewind before paint, so crawlers and no-JS
  visitors see the real code and the real numbers. A `<noscript>` rule un-hides
  every `[data-reveal]` element for the same reason.
- **Accessibility.** The mockup set `outline: none` on inputs with no
  replacement, and made the watchlist rows clickable `<div>`s. Both are fixed —
  there is a visible focus ring throughout, and the rows are Radix
  `Collapsible` triggers.
- **Reduced motion** is honoured in JS as well as CSS: no rAF loop, no
  intervals, no autoplay, and the typewriter shows its full snippet.
- **Touch devices** skip the ambient layer and the magnetic buttons entirely.
- The mockup's unused `LOG` array and its `logup` / `tape` keyframes were dead
  code and are not ported.

### Fonts

JetBrains Mono is self-hosted through `next/font`. Satoshi is loaded from
Fontshare via a stylesheet link, because `next/font` only handles Google Fonts
and local files. Dropping the Satoshi `.woff2` files into `src/fonts/` and
switching to `next/font/local` would remove that third-party request.
