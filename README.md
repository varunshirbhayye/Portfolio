# Varun Shirbhayye: portfolio

Personal portfolio for Varun Shirbhayye, M.Tech student in Data Science & AI at IIT Bhilai. In page order: **About**, **Experience & education**, **Research work**, **Selected projects**, **Technical skills**, **Notable achievements** and a closing **Let's talk** contact block.

Built with Next.js 16 (App Router, static export), React 19, TypeScript, Tailwind CSS v4 and Lenis (smooth scrolling). The look follows Razorpay's AI Buildathon page: warm ink, paper-white type, one amber accent. There's no backend and no secrets: `npm run build` produces a folder of static files that any static host can serve.

## Quick start

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000, hot reload
npm run check      # lint + type-check + production build
npm run preview    # serve the built site from out/ locally
```

## Updating content

All text lives in `src/content/`. Components only render it.

| File                         | Contents                                                   |
| ---------------------------- | ---------------------------------------------------------- |
| `src/content/profile.ts`     | Name, affiliation, intro, email, profile links, resume, nav |
| `src/content/background.ts`  | The internship and education                                |
| `src/content/research.ts`    | Research blocks: the PGARC thesis (in progress) and the MPG paper |
| `src/content/projects.ts`    | Project blocks                                              |
| `src/content/skills.ts`      | Skill cards, one list per row of the pyramid                |
| `src/content/achievements.ts`| Contest results                                             |
| `src/content/types.ts`       | The TypeScript shapes for all of the above                  |

College logos live in `public/education/` (`iit-bhilai.webp`, `iiit-nagpur.webp`, paths and sizes set in `background.ts`): the JPEGs in `archive/photos/` with the white background made transparent, so they sit on the card's paper panel. Until a file exists, its slot shows a placeholder frame. The IBM logo in the internship box is `public/experience/ibm.svg` (the public-domain 8-bar logo from Wikimedia Commons, recoloured to the site's off-white).

Skill logos live in `public/skills/`. Most are [Devicon](https://devicon.dev) colour logos (MIT); LangGraph, Qdrant, Ultralytics and Linux come from [Simple Icons](https://simpleicons.org) (CC0), and SQL/NoSQL use generic [Lucide](https://lucide.dev) marks (ISC). All brand logos are trademarks of their owners. Each row is centred under the one above; on phones, rows longer than four cards split into two shorter rows.

`archive/` holds content that was removed from the site (case studies, research threads and other drafts). It is not built or linted; copy pieces back into `src/content/` when re-adding a section, and delete the folder once it's no longer needed.

## Project structure

```
src/
  app/
    layout.tsx               Fonts, metadata, nav, footer, smooth scroll, reveal on scroll
    page.tsx                 Home page: all sections in order
    globals.css              Design tokens and component styles
    og.png/route.tsx         1200×630 social preview, rendered at build time to og.png
    sitemap.ts, robots.ts, icon.svg, not-found.tsx
  components/
    layout/                  Nav (with the phone menu), SiteFooter, SmoothScroll (Lenis), RevealOnScroll
    scene/                   The night-desk scene behind the first screen (canvas, procedural)
    sections/                About, Background (internship + education), Research, Projects, Skills, Achievements, Contact
    ui/                      PaperButton, list helpers, Panel (metrics, external links), FlipDeck (skill cards)
  content/                   All site content (see above)
  lib/site.ts                Production URL and base-path helpers
archive/                     Removed content, kept for re-adding later
```

## Design notes

- **Palette.** Dark only: ink `#0e0b08`, paper `#f0e7d6` for text, amber `#d9a353` for accents.
- **Type.** Figtree for text and Geist Mono for labels, both under the SIL Open Font License and self-hosted by `next/font`, so the repo can be public. Figtree replaced Satoshi, whose licence forbids sharing the font file through a public repository; don't add Satoshi's files back if the repo is public.
- **Motion.** Sections fade up once as they scroll into view, and the skill cards flip on hover. Both are skipped under `prefers-reduced-motion`.
- **Scene.** The first screen sits over a lamplit desk and rainy city window, drawn on canvas from fixed seeds (no images). It animates only while on screen, and under `prefers-reduced-motion` it is static.

## Deployment

### Vercel (recommended)

1. Push the repository to GitHub (public or private).
2. In Vercel, choose **Add New → Project** and import the repo. The framework is detected as Next.js, and the default build settings work as they are.
3. Deploy. `VERCEL_PROJECT_PRODUCTION_URL` is set automatically, so canonical URLs, the sitemap and Open Graph images use your production domain. If you add a custom domain, set `NEXT_PUBLIC_SITE_URL` to it in **Project → Settings → Environment Variables** and redeploy.

### Netlify

Build command `npm run build`, publish directory `out`. Set `NEXT_PUBLIC_SITE_URL` to the site URL.

### GitHub Pages

1. In the repo, go to **Settings → Pages** and set the source to **GitHub Actions**.
2. Push to `main`. `.github/workflows/deploy.yml` builds the site and publishes `out/`; every later push to `main` redeploys.
3. The workflow reads the Pages URL from the repo settings and sets `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_BASE_PATH` itself, so a user site (`<user>.github.io`), a project site (`<user>.github.io/<repo>`) and a custom domain all work without changes.

### Any other static host

Run `npm run build` and upload the contents of `out/`. Configure the host to serve `404.html` for unknown paths.

## Environment variables

All are optional. See `.env.example`.

| Variable                | Purpose                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Production URL for canonical links, sitemap, robots.txt and absolute Open Graph URLs. Without it (and outside Vercel), the sitemap is empty and no canonical tag is emitted. |
| `NEXT_PUBLIC_BASE_PATH` | Sub-path for project-site hosting, e.g. `/portfolio`                                     |

## Contact form

The site deliberately has no contact form. It offers a `mailto:` link in the hero and the closing contact block, so nothing ever claims to have sent a message it didn't. To add a form later, use a hosted form service (Formspree, Netlify Forms, Web3Forms) or a serverless function, and show a success message only after the service confirms delivery.
