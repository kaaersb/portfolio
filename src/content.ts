// Everything on the page comes from this file. Replace the placeholders with your own details.

export type Project = {
  title: string;
  description: string;
  tags: string[];
  url: string;
};

export type Link = {
  label: string;
  url: string;
};

export type Site = {
  name: string;
  role: string;
  intro: string;
  about: string[];
  skills: string[];
  projects: Project[];
  links: Link[];
};

export const site: Site = {
  name: "Your Name",
  role: "Software engineering student at Aalborg University",
  intro:
    "I build web applications and the pipelines that ship them. This site is deployed by its own CI/CD pipeline.",
  about: [
    "A few sentences about who you are, what you study and what kind of work you are looking for.",
    "A sentence about what you enjoy building, or what you are learning right now.",
  ],
  skills: [
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "GitHub Actions",
    "Docker",
  ],
  projects: [
    {
      title: "This portfolio",
      description:
        "A static site with a full delivery pipeline: lint, build and accessibility checks, an AI review on every pull request, and a preview deployment for every branch.",
      tags: ["Vite", "GitHub Actions", "Vercel"],
      url: "https://github.com/kaaersb/portfolio",
    },
    {
      title: "Project two",
      description:
        "One or two sentences on what it does, what you built and what you learned.",
      tags: ["Tag", "Tag"],
      url: "https://github.com/kaaersb",
    },
    {
      title: "Project three",
      description:
        "One or two sentences on what it does, what you built and what you learned.",
      tags: ["Tag", "Tag"],
      url: "https://github.com/kaaersb",
    },
  ],
  links: [
    { label: "GitHub", url: "https://github.com/kaaersb" },
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
    { label: "Email", url: "mailto:you@example.com" },
  ],
};
