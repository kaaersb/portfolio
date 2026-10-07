import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("the page has no accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  const summary = results.violations.map(
    (v) => `${v.id}: ${v.help} (${v.nodes.length})`,
  );
  expect(summary).toEqual([]);
});
