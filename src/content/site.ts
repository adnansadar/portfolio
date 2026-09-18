export const site = {
  name: "Adnan Sadar",
  role: "Lead Frontend Engineer & Technical Writer",
  email: "adnansadar09@gmail.com",
  location: "Pune, India · IST",
  education: "MS CS · SUNY Buffalo",
  url: "https://adnansadar.com",
  resume: {
    href: "/resume.pdf",
    filename: "Adnan_Sadar_Resume.pdf",
    meta: "PDF · 126 KB",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/adnansadar" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/adnansadar/" },
    { label: "Blog", href: "/blog" },
  ],
} as const;

export const hero = {
  headline: {
    lead: "Lead Frontend Engineer",
    joiner: " & ",
    trail: "Technical Writer.",
  },
  blurb:
    "I build frontend and full-stack products with React, Next.js and TypeScript: real-time data interfaces, maintainable design systems, and platforms shipped end to end. Five years shipping product, two of them leading the frontend.",
  image: {
    src: "/hero.webp",
    alt: "Portrait of Adnan Sadar",
  },
} as const;

export const about = {
  heading:
    "Five years of frontend, two of them responsible for other people's code.",
  body: "I specialise in React, Next.js and TypeScript, building performant interfaces backed by architecture a team can actually maintain. I've led a frontend team of five, set conventions and tooling for new products, and shipped a full-stack platform end to end on my own. I write about the work, and lean on AI-assisted workflows to move faster without giving up rigour. Off the clock: long walks around Niagara and too many coffees.",
} as const;

export const contact = {
  heading: "Hiring for a frontend or full-stack role?",
  blurb:
    "Two pages, no fluff: architecture decisions, team leadership, shipped outcomes.",
  formNote: "Typically replies within a day · Pune, IST",
} as const;
