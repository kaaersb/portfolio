import { defineConfig, devices } from "@playwright/test";

// Locally, Playwright builds the site and serves it on :4173.
// In CI, set BASE_URL (for example a Vercel preview URL) to test that instead.
const baseURL = process.env.BASE_URL ?? "http://localhost:4173";
const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

export default defineConfig({
  testDir: "tests",
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    // Vercel protects preview deployments; this header lets the tests through.
    extraHTTPHeaders: bypass
      ? { "x-vercel-protection-bypass": bypass }
      : undefined,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm run build && npm run preview",
        url: baseURL,
        reuseExistingServer: !process.env.CI,
      },
});
