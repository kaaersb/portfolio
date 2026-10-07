# Launch night: CI kit

The starter for Workshop 3 of the guest lecture **CI/CD in the age of AI agents** (AAU CPH, October 2026).

The same ticket shop as in Session 1, now with tests, scripts and ready-made CI steps, and a few problems planted in
it for those steps to find.

## Set up (5 min)

You did this in Session 1, so it goes fast:

1. Click **Use this template** > **Create a new repository**. Make it public, under your own account.
2. In Vercel: **Add New > Project**, import the new repository, **Deploy**.
3. Put your name in `src/content.ts` and commit to `main`. It deploys.

Want to run the checks locally (optional):

```sh
npm install
npm run lint
npm test
```

## Workshop 3: add at least one CI step (30 min)

Pick a step from [`docs/ci-steps.md`](docs/ci-steps.md), the same list as on the slide.

1. Make a branch, copy a recipe from `recipes/` into `.github/workflows/`, and push.
2. Open a pull request. Watch the **Checks** tab. Vercel also deploys a preview of your branch.
3. Red? Good: this repo has problems planted in it. Fix the problem (not the step) and push again until it's green.
4. Make it a gate: protect `main` so the check has to pass before you can merge (see the bottom of `docs/ci-steps.md`).
5. Merge. CI let it in, CD put it live.

Add as many steps as you like. One deterministic and one probabilistic is a good half hour.

## Show and tell

Post your repository and a link to a pull request that went from red to green in the
[Show and tell issue](https://github.com/emilhorlyck/aau-cicd-workshop-3/issues/1).

## What's in here

| Path                             | What it is                                                                                    |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| `src/`                           | The site: `content.ts` (your text), `main.ts`, `lib/price.ts` (the price logic) and its tests |
| `tests/e2e/`                     | Playwright tests of the page                                                                  |
| `tests/a11y/`                    | An axe-core accessibility scan of the page                                                    |
| `recipes/`                       | Ready-made CI steps. Not active until you copy one into `.github/workflows/`                  |
| `recipes/probabilistic/prompts/` | The prompts the AI steps use                                                                  |
| `docs/spec.md`                   | What the site should do, used by the spec check                                               |
| `scripts/`                       | The bundle budget check and the script the AI steps use to ask a model                        |

| Script                                                        | What it does                                                  |
| ------------------------------------------------------------- | ------------------------------------------------------------- |
| `npm run dev`                                                 | Run the site on your machine                                  |
| `npm run build`                                               | Build it like Vercel does                                     |
| `npm run lint` · `npm run format:check` · `npm run typecheck` | Static checks                                                 |
| `npm test`                                                    | Unit tests                                                    |
| `npm run test:e2e` · `npm run a11y`                           | Browser tests (first time: `npx playwright install chromium`) |
| `npm run size` · `npm run audit`                              | Bundle budget and dependency audit                            |
