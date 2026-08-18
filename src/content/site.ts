export const site = {
  name: "Adnan Sadar",
  role: "Lead Frontend Engineer & Technical Writer",
  email: "adnansadar09@gmail.com",
  location: "Pune, India · IST",
  education: "MS CS — SUNY Buffalo",
  url: "https://adnansadar.com",
  resume: {
    href: "/resume.pdf",
    filename: "Adnan_Sadar_Resume.pdf",
    meta: "PDF · 126 KB",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/adnansadar" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Blog", href: "/blog" },
  ],
  nav: [
    { label: "Projects", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Blog", href: "#writing" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export const hero = {
  headline: {
    lead: "Lead Frontend Engineer",
    joiner: " & ",
    trail: "Technical Writer.",
  },
  blurb:
    "I build scalable frontend architectures — clean React / Next.js ecosystems, real-time data interfaces, and design systems that hold up as teams grow. Five years shipping product, two of them leading the frontend.",
  image: {
    src: "/hero.jpeg",
    alt: "Portrait of Adnan Sadar",
  },
} as const;

export const about = {
  eyebrow: "/ ABOUT",
  heading:
    "Five years of frontend, two of them responsible for other people's code.",
  body: "I specialise in React, Next.js and TypeScript — performant interfaces backed by architecture a team can actually maintain. I've led a frontend team of five, set conventions and tooling for new products, and shipped a full-stack platform end to end on my own. I write about the work, and lean on AI-assisted workflows to move faster without giving up rigour. Off the clock: long walks around Niagara and too many coffees.",
} as const;

export const contact = {
  heading: "Hiring for a Lead Frontend role?",
  blurb:
    "Two pages, no fluff — architecture decisions, team leadership, shipped outcomes.",
  formNote: "Typically replies within a day · Pune, IST",
} as const;
