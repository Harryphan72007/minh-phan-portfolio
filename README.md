# Minh Phan — ML Engineering & Systems Portfolio

[![Deploy portfolio](https://github.com/Harryphan72007/minh-phan-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Harryphan72007/minh-phan-portfolio/actions/workflows/deploy.yml)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Accessibility](https://img.shields.io/badge/accessibility-keyboard%20%2B%20reduced%20motion-0F766E)

Recruiter-focused portfolio for Minh Phan, a Computer Science student at the University of Minnesota Twin Cities working across ML systems, computer vision, and production-minded software engineering.

**Live site:** [harryphan72007.github.io/minh-phan-portfolio](https://harryphan72007.github.io/minh-phan-portfolio/)

![Portfolio desktop preview](docs/portfolio-preview.png)

## Purpose

The portfolio presents verifiable project and research evidence without inflating unfinished work, private employer code, or unconfirmed links. It is designed for quick recruiter review while retaining enough technical depth for engineering conversations.

## Highlights

- ML-engineering-oriented candidate summary
- Case studies for *The Shape of Noise*, the aerial benchmark, and NoteFlow
- Software engineering internship and undergraduate research experience
- Public CTB at ICML 2026 manuscript links and measured robustness results
- Skills organized by engineering workflow rather than keyword volume
- Downloadable résumé and verified contact links
- Responsive navigation and accessible interactive components
- Keyboard-visible focus states and reduced-motion support
- Canonical metadata, structured data, Open Graph image, `robots.txt`, and sitemap
- Automated validation and GitHub Pages deployment

## Technology

| Layer | Tools |
| --- | --- |
| Interface | React 19, TypeScript, hand-authored CSS |
| Runtime | Vinext, Vite, Next.js-compatible application structure |
| Quality | ESLint, TypeScript compiler, Node test runner |
| Delivery | Static export, GitHub Actions, GitHub Pages |

## Project structure

```text
app/
  page.tsx             portfolio content, case studies, and interactions
  globals.css          visual system, responsive behavior, and accessibility
  layout.tsx           search, social, and canonical metadata
public/                résumé, favicon, social preview, robots, and sitemap
scripts/               static export, preview server, and résumé generation
tests/                 content, accessibility, metadata, and export checks
.github/workflows/     validation and GitHub Pages deployment
```

## Run locally

Requires Node.js 22.13 or newer and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run typecheck
npm test
```

`npm test` builds the application, exports the GitHub Pages artifact under the repository base path, and validates content, metadata, accessibility hooks, and public assets.

To inspect the exact Pages artifact locally:

```bash
npm run build:pages -- --base-path=/minh-phan-portfolio
npm run preview:pages
```

Open `http://localhost:4173/minh-phan-portfolio/`.

## Deployment

The GitHub Actions workflow validates and publishes `main` to GitHub Pages. It runs:

1. Dependency installation
2. Linting
3. Type checking
4. Build and artifact tests
5. Static artifact upload
6. GitHub Pages deployment

The `.openai/hosting.json` file also binds this source to its existing OpenAI Sites project.

The repository name and base path are referenced by the package scripts, deployment workflow, metadata, `robots.txt`, and sitemap. Update those locations together if the repository is renamed.

## Updating personal information

Profile links are centralized in `profileLinks` near the top of `app/page.tsx`. Add professional links only after confirming their destinations.

The downloadable résumé is `public/quang-minh-phan-resume.pdf`. Rebuild it with:

```bash
python -m pip install reportlab
python scripts/make_resume.py
```

Review the generated PDF visually before publishing it.

## Accuracy policy

- Employment and volunteer research are labeled separately.
- *The Shape of Noise* is described as accepted to CTB at ICML 2026 and links to the public manuscript.
- Aerial benchmark results remain `TBD` until real runs exist.
- NoteFlow screenshots and records are explicitly synthetic.
- Mega-ASR is described as internship experience; private employer code and checkpoints are not published.
- No third-party repository, metric, or professional link is added without verification.

## Content and reuse

This repository contains personal résumé content, biographical information, and original visual assets in addition to source code. No repository license is currently granted.
