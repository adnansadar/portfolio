export type DesignProject = {
  title: string;
  eyebrow: string;
  description: string;
  site: { href: string; domain: string };
  tags: string[];
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
};

export const designProjects: DesignProject[] = [
  {
    title: "DeNova Bio",
    eyebrow: "UI/UX exploration · Biotechnology",
    description:
      "An exploration in scientific storytelling: a premium biotechnology landing page shaped through editorial art direction, responsive layouts and motion-led interaction.",
    site: {
      href: "https://denovabio.vercel.app/",
      domain: "denovabio.vercel.app",
    },
    tags: [
      "Art direction",
      "UI/UX",
      "Motion design",
      "Responsive UI",
      "Frontend development",
    ],
    image: {
      src: "/shot-denova-bio-hero.png",
      width: 1849,
      height: 1230,
      alt: "DeNova Bio landing page concept with a deep-blue clinical interface, large editorial headline and biotechnology imagery",
    },
  },
];

export const designsHeading = {
  title: "Design Engineering",
  introduction:
    "Interface studies where visual direction, interaction and frontend craft are developed together.",
} as const;
