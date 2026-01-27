"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const projects = [
  {
    title: "Investors Engine",
    description:
      "Worked on the frontend development of a fintech investment research platform focused on long term equity analysis and valuation tools. Also created a personalized portfolio and watchlist management system.",
    techStack: ["Next.js", "TypeScript", "React Query", "Redux", "Material UI"],
    github: "",
    live: "https://investorsengine.com/",
    period: "February 2025 - May 2025",
  },
  {
    title: "Scholar Housing",
    description:
      "Built a student housing platform focused on roommate compatibility and trusted sublease discovery for international and graduate students. Led product-driven frontend and full-stack development across authentication, onboarding, rule-based matching, and listings workflows.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL"],
    github: "https://github.com/studentbnb-housing/student-housing-frontend",
    live: "",
    period: "November 2025 - Ongoing",
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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Projects() {
  return (
    <section id="projects" className="bg-gray-50 py-20 dark:bg-gray-900">
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
            className="mb-12 text-center text-4xl font-bold"
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800"
              >
                <div className="flex flex-col justify-between p-6 h-full">
                  <div>
                    <div className="mb-4 flex items-start justify-between">
                      <h3 className="text-2xl font-semibold">{project.title}</h3>
                      <div className="flex gap-3">
                        {project.github && (
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            aria-label={`View ${project.title} source code on GitHub`}
                          >
                            <FontAwesomeIcon
                              icon={faGithub}
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </Link>
                        )}
                        <Link
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          aria-label={`Visit ${project.title} live site`}
                        >
                          <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {project.period}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
