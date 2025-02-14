"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const roles = [
  "Software Engineer",
  "Frontend Developer",
  "React & Next.js Enthusiast",
];

export default function Hero() {
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-4 sm:space-y-6 w-full max-w-3xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 leading-tight">
          Hi, I&apos;m Adnan Sadar 👋
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-1 sm:gap-2"
        >
          {roles.map((role, index) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300"
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4"
        >
          Front-End Web Developer with 3 years of experience in building dynamic
          web applications using React, Next.js, and TypeScript.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mt-6 sm:mt-8 w-full sm:w-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <Link
            href="/Adnan_Sadar_Resume.pdf"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
            target="_blank"
          >
            <FontAwesomeIcon icon={faFileLines} className="w-4 h-4" />
            Resume
          </Link>
          <Link
            href="https://github.com/adnansadar"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors text-sm sm:text-base"
            target="_blank"
          >
            <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/adnansadar/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0077B5] hover:bg-[#006399] text-white rounded-lg transition-colors text-sm sm:text-base"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
            LinkedIn
          </Link>
        </motion.div>
      </motion.div>

      {/* Modern Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNextSection}
      >
        <div className="flex flex-col items-center gap-2">
          <motion.span
            className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
