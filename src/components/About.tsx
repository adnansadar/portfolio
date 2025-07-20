"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faTerminal, faVial } from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";

const techStack = [
  {
    category: "Frontend",
    icon: <FontAwesomeIcon icon={faReact} className="h-6 w-6" />,
    skills: ["React", "Next.js", "TypeScript", "Redux", "React Query"],
  },
  {
    category: "Backend",
    icon: <FontAwesomeIcon icon={faTerminal} className="h-6 w-6" />,
    skills: ["Node.js", "Express", "PostgreSQL", "Prisma"],
  },
  {
    category: "Testing",
    icon: <FontAwesomeIcon icon={faVial} className="h-6 w-6" />,
    skills: ["Cypress", "Playwright", "Jest"],
  },
  {
    category: "Tools & Others",
    icon: <FontAwesomeIcon icon={faCode} className="h-6 w-6" />,
    skills: ["Git", "Docker", "NPM", "Shell Scripting"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mx-auto max-w-6xl"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-8 text-center text-4xl font-bold"
          >
            About Me
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-12 max-w-3xl text-center text-lg text-gray-600 dark:text-gray-300"
          >
            Front-End Web Developer with 4+ years of experience in developing
            and maintaining dynamic web applications. I specialize in React,
            Next.js, and TypeScript, with a strong focus on creating performant
            and user-friendly interfaces. I have experience leading frontend
            teams and implementing best practices in project architecture. I am
            also an AI enthusiast and have integrated AI-powered agentic
            workflows in my projects to speed up development and improve
            efficiency.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {techStack.map((category) => (
              <motion.div
                key={category.category}
                variants={itemVariants}
                className="rounded-lg bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800"
              >
                <div className="mb-4 flex items-center gap-3">
                  {category.icon}
                  <h3 className="text-xl font-semibold">{category.category}</h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <FontAwesomeIcon icon={faCode} className="h-4 w-4" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
