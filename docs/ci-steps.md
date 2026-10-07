# CI steps you can add

The same steps as on the slide. Each one is a recipe: copy the file into `.github/workflows/`, push, and open a pull
request. Every recipe runs a script you can also run on your own machine first.

Some of them will go red the first time. That's on purpose: this repo has a few problems planted in it. Make the step
green by fixing the problem, not by deleting the step.

## Deterministic: same input, same answer, every time

| #   | Step                            | Recipe                                                                    | Run it locally                          | Effort |
| --- | ------------------------------- | ------------------------------------------------------------------------- | --------------------------------------- | ------ |
| 01  | Lint and format check           | [`01-lint.yml`](../recipes/deterministic/01-lint.yml)                     | `npm run lint` · `npm run format:check` | Easy   |
| 02  | Type check                      | [`02-typecheck.yml`](../recipes/deterministic/02-typecheck.yml)           | `npm run typecheck`                     | Easy   |
| 03  | Unit tests                      | [`03-unit-tests.yml`](../recipes/deterministic/03-unit-tests.yml)         | `npm test`                              | Easy   |
| 04  | Production build must pass      | [`04-build.yml`](../recipes/deterministic/04-build.yml)                   | `npm run build`                         | Easy   |
| 05  | End-to-end tests on the preview | [`05-e2e-on-preview.yml`](../recipes/deterministic/05-e2e-on-preview.yml) | `npm run test:e2e`                      | Hard   |
| 06  | Dependency vulnerability scan   | [`06-audit.yml`](../recipes/deterministic/06-audit.yml)                   | `npm run audit`                         | Easy   |
| 07  | Secret scanning                 | [`07-secret-scan.yml`](../recipes/deterministic/07-secret-scan.yml)       | needs Docker or gitleaks                | Medium |
| 08  | Performance and bundle budget   | [`08-bundle-budget.yml`](../recipes/deterministic/08-bundle-budget.yml)   | `npm run build && npm run size`         | Medium |
| 09  | Accessibility check             | [`09-a11y.yml`](../recipes/deterministic/09-a11y.yml)                     | `npm run a11y`                          | Medium |

## Probabilistic: a judgement, where an AI agent reads, looks and decides

These need a model key saved as a repository secret (Settings > Secrets and variables > Actions):

- `ANTHROPIC_API_KEY` for Claude (console.anthropic.com), or
- `AI_API_KEY` for any OpenAI-compatible API, plus two repository _variables_: `AI_BASE_URL` and `MODEL`. Google's
  free tier works: key from aistudio.google.com,
  `AI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai`, `MODEL=gemini-2.5-flash`.

The prompt is the configuration: change the file in [`prompts/`](../recipes/probabilistic/prompts), change the check.

| #   | Step                                                 | Recipe                                                                        | Gate?                            | Effort |
| --- | ---------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------- | ------ |
| 01  | AI code review on the pull request                   | [`01-ai-review.yml`](../recipes/probabilistic/01-ai-review.yml)               | Comments only                    | Easy   |
| 02  | Does the change do what it says, and match the spec? | [`02-spec-check.yml`](../recipes/probabilistic/02-spec-check.yml)             | Fails on `VERDICT: FAIL`         | Medium |
| 03  | Security review of the diff                          | [`03-security-review.yml`](../recipes/probabilistic/03-security-review.yml)   | Fails on a high-severity finding | Medium |
| 04  | Claude Code reviews with inline comments             | [`04-ai-review-claude.yml`](../recipes/probabilistic/04-ai-review-claude.yml) | Comments only                    | Medium |

Not in a recipe yet, from the slide: architecture fit against your ADRs, exploratory testing on the preview, visual
review of screenshot diffs, copy and tone of voice, "do the tests test the change?", "do the docs still match?".
Write your own: copy `02-spec-check.yml`, write a new prompt, and decide what should fail the build.

## Make it a gate

A step that goes red but still lets you merge is only advice. To make it a gate:
Settings > Rules > Rulesets > New branch ruleset > target `main` > **Require a pull request before merging** and
**Require status checks to pass** > add your checks.
