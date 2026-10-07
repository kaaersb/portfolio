import type { Link, Project, Site } from "../content";

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape text so it can be placed safely inside HTML, including attribute values. */
export function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

/** True for links that leave the site, which open in a new tab. */
export function isExternal(url: string): boolean {
  return /^https?:\/\//.test(url);
}

function renderLink(link: Link): string {
  const external = isExternal(link.url)
    ? ' target="_blank" rel="noopener noreferrer"'
    : "";
  return `<a href="${escapeHtml(link.url)}"${external}>${escapeHtml(link.label)}</a>`;
}

export function renderProject(project: Project): string {
  const tags = project.tags
    .map((tag) => `<li>${escapeHtml(tag)}</li>`)
    .join("");
  return `
    <article class="project">
      <h3><a href="${escapeHtml(project.url)}">${escapeHtml(project.title)}</a></h3>
      <p>${escapeHtml(project.description)}</p>
      <ul class="tags" aria-label="Technologies">${tags}</ul>
    </article>`;
}

/** The whole page body, built from the content in content.ts. */
export function renderPage(site: Site): string {
  const about = site.about.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
  const skills = site.skills
    .map((skill) => `<li>${escapeHtml(skill)}</li>`)
    .join("");
  const projects = site.projects.map(renderProject).join("");
  const links = site.links
    .map((link) => `<li>${renderLink(link)}</li>`)
    .join("");

  return `
    <header class="hero">
      <p class="role">${escapeHtml(site.role)}</p>
      <h1>${escapeHtml(site.name)}</h1>
      <p class="intro">${escapeHtml(site.intro)}</p>
    </header>
    <section aria-labelledby="about-heading">
      <h2 id="about-heading">About</h2>
      ${about}
      <ul class="skills" aria-label="Skills">${skills}</ul>
    </section>
    <section aria-labelledby="projects-heading">
      <h2 id="projects-heading">Projects</h2>
      <div class="projects">${projects}</div>
    </section>
    <section aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact</h2>
      <ul class="links">${links}</ul>
    </section>`;
}
