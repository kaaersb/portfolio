# Portfolio

My portfolio site, and the pipeline that ships it.

**Live:** https://portfolio-kaare.vercel.app

The site is a small static page built with Vite and TypeScript. All the text lives in
[`src/content.ts`](src/content.ts), and [`src/lib/render.ts`](src/lib/render.ts) turns it into HTML.

## The pipeline

Every change goes through a pull request. Nothing reaches `main` without passing the checks, and anything on `main`
is live a minute later.

```
branch ──► pull request ──┬─► Lint and format     (gate)
                          ├─► Build               (gate)
                          ├─► Accessibility       (gate)
                          ├─► AI code review      (advisory comment)
                          └─► Vercel preview URL
                                     │
                      all gates green ▼
                                   merge ──► main ──► Vercel production deploy
```

### Continuous delivery

The repository is connected to [Vercel](https://vercel.com). A push to `main` builds the site with `npm run build` and
deploys it to production. Every pull request gets its own preview deployment, and Vercel posts the URL on the pull
request, so a change can be looked at in a real browser before it is merged.

### Deterministic CI: same input, same answer

These run in GitHub Actions on every pull request and on every push to `main`. Each one runs a script you can also run
locally.

| Workflow                                         | What it checks                                                                               | Locally                                 |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------- | --------------------------------------- |
| [Lint and format](.github/workflows/01-lint.yml) | ESLint finds mistakes such as unused variables; Prettier checks the formatting is consistent | `npm run lint` · `npm run format:check` |
| [Build](.github/workflows/04-build.yml)          | The production build succeeds, so a merge can never break the deploy                         | `npm run build`                         |
| [Accessibility](.github/workflows/09-a11y.yml)   | Builds the site and scans it with axe-core in a real Chromium against WCAG 2 A and AA rules  | `npm run a11y`                          |

### Probabilistic CI: a judgement from an AI agent

[AI code review](.github/workflows/01-ai-review.yml) sends the pull request's title, description and diff to Claude,
using the prompt in [`recipes/probabilistic/prompts/review.md`](recipes/probabilistic/prompts/review.md), and posts the
answer as a comment on the pull request. It is advisory: it never fails the build, because a model's judgement can vary
from run to run. The model key is stored as the repository secret `ANTHROPIC_API_KEY`.

### Protected `main`

A branch ruleset on `main` requires a pull request and requires **Lint and format**, **Build** and **Accessibility** to
pass before anything can merge. Force pushes are blocked. So the deterministic checks are gates, and the AI review is
advice that a person reads.

## Running it locally

```bash
npm install
npm run dev          # the site on http://localhost:5173
npm test             # unit tests for the rendering
npm run lint
npx playwright install chromium   # first time only
npm run test:e2e     # browser tests of the page
npm run a11y         # accessibility scan
```

## Changing the content

Edit [`src/content.ts`](src/content.ts) on a branch and open a pull request. The checks run, Vercel posts a preview,
and merging puts it live.

## Background

Built as the final assignment for the guest lecture _CI/CD in the age of AI agents_ (AAU CPH, October 2026), starting
from the workshop's CI kit. The unused recipes are still in [`recipes/`](recipes/) and can be switched on by copying
them into `.github/workflows/`.
