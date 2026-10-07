import { describe, expect, it } from "vitest";
import { site } from "../content";
import { escapeHtml, isExternal, renderPage, renderProject } from "./render";

describe("escapeHtml", () => {
  it("escapes characters that have a meaning in HTML", () => {
    expect(escapeHtml(`<a href="x">Tom & Jerry's</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&#39;s&lt;/a&gt;",
    );
  });

  it("leaves plain text alone", () => {
    expect(escapeHtml("Hello, world")).toBe("Hello, world");
  });
});

describe("isExternal", () => {
  it("treats http and https links as external", () => {
    expect(isExternal("https://github.com")).toBe(true);
    expect(isExternal("http://example.com")).toBe(true);
  });

  it("treats mailto and relative links as internal", () => {
    expect(isExternal("mailto:you@example.com")).toBe(false);
    expect(isExternal("/cv.pdf")).toBe(false);
  });
});

describe("renderProject", () => {
  it("escapes project text so content cannot inject HTML", () => {
    const html = renderProject({
      title: "<script>alert(1)</script>",
      description: "x",
      tags: [],
      url: "https://example.com",
    });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });
});

describe("renderPage", () => {
  it("has exactly one h1, with the name", () => {
    const html = renderPage(site);
    expect(html.match(/<h1>/g)).toHaveLength(1);
    expect(html).toContain(`<h1>${escapeHtml(site.name)}</h1>`);
  });

  it("renders every project", () => {
    const html = renderPage(site);
    expect(html.match(/class="project"/g)).toHaveLength(site.projects.length);
  });
});
