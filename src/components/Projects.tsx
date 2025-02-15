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
      "Built an investment research platform for users that displays financial data for 5000+ US stocks, accurate 10-year historical ratios, and advanced charting tools. The product roadmap also involves creating a personalized portfolio and watchlist management using a dashboard.",
    techStack: ["Next.js", "TypeScript", "React Query", "Redux", "Material UI"],
    github: "",
    live: "https://investorsengine.com/",
    period: "May 2024 - Ongoing",
  },
  {
    title: "Cryptocurrency Portfolio Manager",
    description:
      "Built a cryptocurrency tracking app using React and CoinGecko API, enabling users to monitor prices, market cap, and volume for 20+ cryptocurrencies.",
    techStack: ["React", "CoinGecko API", "Tailwind CSS", "Chart.js"],
    github: "https://github.com/adnansadar/Cryptocurrency-Price-Tracker",
    live: "https://my-cryptotracker.netlify.app/",
    period: "January 2021 - April 2021",
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
                className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800"
              >
                <div className="p-6">
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

                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>

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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
