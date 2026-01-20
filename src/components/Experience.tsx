"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";

// List of work experiences
const experiences = [
  {
    title: "Lead Frontend Engineer",
    company: "FoundersHub AI",
    period: "June 2025 - November 2025",
    points: [
      "Executed comprehensive frontend architecture revamp, reducing build times by 50% and improving application performance by 20% through strategic code splitting, SCSS design tokens, and DRY principles.",
      "Implemented agentic AI workflows using Cursor AI and Claude Code subagents, streamlining design iterations, development cycles, and automated code reviews.",
    ],
  },
  {
    title: "Lead Frontend Engineer",
    company: "PeopleBlox",
    period: "June 2022 - June 2024",
    points: [
      "Led a frontend team of 5 developers as a founding engineer to design and deliver PeopleBlox, a competency assessment tool, achieving a significant reduction in employee evaluation time using Next.js, React, TypeScript, Redux, and RTK Query.",
      "Worked with the management and dev teams to define a workflow enhancing development efficiency by 25%. Involved in architecting the software solution and establishing a tech stack for new and existing products.",
    ],
  },
  {
    title: "Software Engineer Intern (Full-Time)",
    company: "LitmusBlox",
    period: "August 2021 - May 2022",
    points: [
      "Developed the front-end for the Universal Chatbot Application, utilizing React.js, Redux, and Bootstrap, and implemented a decision tree structure with vanilla JavaScript, reducing client side page load time by 15%.",
      "Enhanced a large-scale recruitment platform by developing a Manual Screening process in React using class components, improving screening accuracy considerably. Wrote comprehensive end-to-end test cases in Cypress to ensure quality.",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export default function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mx-auto max-w-4xl"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-12 text-center text-4xl font-bold"
          >
            Work Experience
          </motion.h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative border-l-2 border-gray-200 pl-8 dark:border-gray-700"
              >
                <div className="absolute -left-3 top-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="h-3 w-3 text-white"
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800">
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <div className="mt-1 font-medium text-blue-600 dark:text-blue-400">
                    {exp.company}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
                    {exp.period}
                  </div>
                  <ul className="mt-4 space-y-3">
                    {exp.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="text-gray-600 dark:text-gray-300"
                      >
                        • {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
