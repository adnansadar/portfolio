export type Reference = {
  name: string;
  role: string;
  quote: string;
};

export const references: Reference[] = [
  {
    name: "Manavi Thorve",
    role: "Senior Software Engineer, LitmusBlox",
    quote:
      "I had the pleasure of working with Adnan closely at PeopleBlox. He's really hardworking and has in-depth knowledge of the technology he's working on, with a strong hold on frontend technologies like React and Redux along with Next.js. He entirely set up the initial code and created solid guidelines to maintain it — and it's still helping us. He's also a calm person and works well even under pressure or difficult deadlines.",
  },
  {
    name: "Aishwarya Kasture",
    role: "Sr. UI/UX Designer, LitmusBlox",
    quote:
      "As a designer, I collaborated with Adnan on multiple projects, and his ability to understand design requirements and seamlessly integrate them into development was invaluable. He consistently took the initiative to improve the user experience and optimise functionality. His attention to detail and strong coding skills made our collaboration smooth and highly productive — a true team player.",
  },
  {
    name: "Gaurav Sonar",
    role: "Senior Software Engineer, LitmusBlox",
    quote:
      "Adnan has been a true leader and mentor to me at PeopleBlox. His expertise in React, Redux and Next.js, and his ability to set up the architecture and establish strong codebase guidelines, has been essential to our team's success. His calm demeanour makes him a highly likable teammate who handles pressure effortlessly. He guided me from the ground up.",
  },
];

export const referencesHeading = {
  title: "References",
  meta: "WORKED WITH ME AT LITMUSBLOX",
} as const;
