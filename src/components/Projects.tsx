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
    github: "https://github.com/adnansadar/investors-engine",
    live: "https://investors-engine.vercel.app",
    period: "May 2024 - Ongoing",
  },
  {
    title: "Cryptocurrency Portfolio Manager",
    description:
      "Built a cryptocurrency tracking app using React and CoinGecko API, enabling users to monitor prices, market cap, and volume for 20+ cryptocurrencies.",
    techStack: ["React", "CoinGecko API", "Tailwind CSS", "Chart.js"],
    github: "https://github.com/adnansadar/crypto-portfolio",
    live: "https://crypto-portfolio-tracker.vercel.app",
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
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-12"
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold">{project.title}</h3>
                    <div className="flex gap-3">
                      <Link
                        href={project.github}
                        target="_blank"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                      >
                        <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                      </Link>
                      <Link
                        href={project.live}
                        target="_blank"
                        className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                      >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full"
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
