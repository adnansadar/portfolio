"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";

// List of work experiences
const experiences = [
  {
    title: "Software Engineer",
    company: "LitmusBlox",
    period: "June 2022 - May 2024",
    points: [
      "Led a frontend team of 5 developers to design and deliver PeopleBlox, a competency assessment tool, achieving a significant reduction in employee evaluation time using Next.js, React, TypeScript, Redux, and RTK Query.",
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
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-12"
          >
            Work Experience
          </motion.h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700"
              >
                <div className="absolute -left-3 top-0">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <FontAwesomeIcon icon={faBuilding} className="w-3 h-3 text-white" />
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <div className="text-blue-600 dark:text-blue-400 font-medium mt-1">
                    {exp.company}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1 text-sm">
                    <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
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
