# Minh Phan — Software Engineering & ML Systems Portfolio

Recruiter-focused personal portfolio for Minh Phan (Quang Minh Phan), a
Computer Science student at the University of Minnesota. The site presents
verified software engineering, machine-learning systems, computer-vision, and
research experience without inflating unfinished work or unverified links.

![Portfolio desktop preview](docs/portfolio-preview.png)

## What is included

- Internship-oriented hero and candidate summary
- Three verified project case studies
- Software engineering internship and undergraduate research experience
- Concise ICML 2026 workshop acceptance and measured robustness results
- Skills grouped by practical workflow
- Education, résumé download, verified GitHub contact, and GitHub profile
- Responsive navigation, accessible dialogs, reduced-motion support, and
  keyboard-visible focus states
- Open Graph image, structured data, canonical metadata, `robots.txt`, and
  `sitemap.xml`
- Static export and deployment workflow for GitHub Pages

## Tech stack

- React 19 and TypeScript
- Vinext (Vite-powered Next.js-compatible runtime)
- Hand-authored responsive CSS
- Node.js test runner
- GitHub Actions and GitHub Pages

## Project structure

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Portfolio content, case studies, interactions, and JSON-LD |
| `app/globals.css` | Visual system, layout, responsive behavior, and accessibility |
| `app/layout.tsx` | Search and social metadata |
| `public/` | Résumé, favicon, social preview, robots, and sitemap |
| `scripts/export-pages.mjs` | Produces the base-path-safe static Pages artifact |
| `scripts/preview-pages.mjs` | Serves the exported artifact locally |
| `scripts/make_resume.py` | Rebuilds the résumé PDF |
| `tests/portfolio.test.mjs` | Content, accessibility, metadata, and export checks |
| `.github/workflows/deploy.yml` | Validates and deploys `main` to GitHub Pages |

## Run locally

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm run lint
npm run typecheck
npm test
```

`npm test` builds the Vinext application, exports it with the repository base
path, and runs the content and artifact assertions.

To inspect the exact GitHub Pages artifact:

```bash
npm run build:pages -- --base-path=/minh-phan-portfolio
npm run preview:pages
```

Open `http://localhost:4173/minh-phan-portfolio/`.

## Deploy to GitHub Pages

The workflow deploys on pushes to `main` and can also be started manually. In
the GitHub repository, set **Settings → Pages → Build and deployment → Source**
to **GitHub Actions**. The intended public URL is:

`https://harryphan72007.github.io/minh-phan-portfolio/`

The repository name and base path are configured in:

- `package.json`
- `.github/workflows/deploy.yml`
- `app/layout.tsx`
- `public/robots.txt`
- `public/sitemap.xml`

Update all five together if the repository is renamed.

## Update personal details

Profile links are centralized in `profileLinks` near the top of `app/page.tsx`.
Only add LinkedIn, email, manuscript, or OpenReview URLs after confirming the
real destinations.

The downloadable résumé is `public/quang-minh-phan-resume.pdf`. Its tracked
generator requires Python and ReportLab:

```bash
python -m pip install reportlab
python scripts/make_resume.py
```

Review the generated PDF visually before publishing it.

## Accuracy policy

This portfolio intentionally distinguishes employment from volunteer research,
uses “accepted” rather than “published” for the CTB at ICML 2026 work, and
labels unavailable repositories and unverified professional links as omitted. Add claims,
metrics, technologies, and URLs only when they can be verified.
