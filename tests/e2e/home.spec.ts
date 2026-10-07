import { expect, test } from "@playwright/test";

test("the page shows the event", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("the total updates when you pick tickets", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Tickets").fill("3");
  await expect(page.locator("output")).not.toHaveText("");
  const one = Number(await page.locator("output").textContent());
  await page.getByLabel("I'm a student").check();
  await expect(page.locator("output")).not.toHaveText(String(one));
});
