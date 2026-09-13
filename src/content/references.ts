export type Reference = {
  name: string;
  role: string;
  quote: string;
};

/*
  Quotes are reproduced verbatim from each person's LinkedIn recommendation,
  including their own spelling ("optimize", "demeanor") where it differs from
  the British spelling the rest of the site uses. These are attributed words
  under a named person, so they are not edited to house style.
*/
export const references: Reference[] = [
  {
    name: "Manavi Thorve",
    role: "Senior Software Engineer, LitmusBlox",
    quote:
      "I had the pleasure of working with Adnan closely at PeopleBlox. I can definitely say he's really hardworking and has in depth knowledge of the technology he's working on. He has a strong hold on Frontend technologies like React, Redux along with Next.js framework. He entirely setup the initial code and created solid guidelines to maintain the code and it's still helping us. Also, he's a calm person and works well even under pressure or difficult deadlines.",
  },
  {
    name: "Aishwarya Kasture",
    role: "Sr. UI/UX Designer, LitmusBlox",
    quote:
      "As a designer, I collaborated with Adnan on multiple projects, and his ability to understand design requirements and seamlessly integrate them into the development process was invaluable. Adnan consistently demonstrated a proactive approach, taking the initiative to improve the user experience and optimize functionality. His attention to detail and strong coding skills made our collaboration smooth and highly productive. Adnan is a true team player. His communication skills, willingness to assist others, and collaborative nature contributed to a positive work environment. I highly recommend Adnan for any software development role. His technical prowess, problem-solving mindset, and collaborative spirit make him an asset to any team.",
  },
  {
    name: "Gaurav Sonar",
    role: "Senior Software Engineer, LitmusBlox",
    quote:
      "I had the pleasure of working closely with Adnan at PeopleBlox, where he has been a true leader and mentor to me. He is an incredibly hardworking and knowledgeable leader. His expertise in frontend technologies like React, Redux, and Next.js, as well as his ability to set up the architecture and establish strong codebase guidelines, has been essential to our team's success. Adnan's calm demeanor and approachable nature make him a highly likable teammate, who handles pressure effortlessly. He has guided me from the ground up, I am truly grateful for everything I have learned from him.",
  },
];

export const referencesHeading = {
  title: "References",
} as const;
