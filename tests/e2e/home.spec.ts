import { expect, test } from "@playwright/test";
import { site } from "../../src/content";

test("the page shows the name as the main heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.name);
});

test("every project is listed", async ({ page }) => {
  await page.goto("/");
  for (const project of site.projects) {
    await expect(
      page.getByRole("heading", { level: 3, name: project.title }),
    ).toBeVisible();
  }
});

test("the contact links are there", async ({ page }) => {
  await page.goto("/");
  for (const link of site.links) {
    await expect(page.getByRole("link", { name: link.label })).toBeVisible();
  }
});
