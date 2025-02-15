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
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto w-full max-w-3xl space-y-4 sm:space-y-6"
      >
        <h1 className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl md:text-6xl">
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
              className="text-lg text-gray-600 dark:text-gray-300 sm:text-xl md:text-2xl"
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mx-auto max-w-2xl px-4 text-base text-gray-600 dark:text-gray-300 sm:text-lg"
        >
          Front-End Web Developer with 3 years of experience in building dynamic
          web applications using React, Next.js, and TypeScript.
        </motion.p>

        <motion.div
          className="mt-6 flex w-full flex-col justify-center gap-2 px-4 sm:mt-8 sm:w-auto sm:flex-row sm:gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <Link
            href="/Adnan_Sadar_Resume.pdf"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm text-white transition-colors hover:bg-blue-700 sm:w-auto sm:text-base"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download my resume (PDF)"
          >
            <FontAwesomeIcon
              icon={faFileLines}
              className="h-4 w-4"
              aria-hidden="true"
            />
            Resume
          </Link>
          <Link
            href="https://github.com/adnansadar"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-2.5 text-sm text-white transition-colors hover:bg-gray-900 sm:w-auto sm:text-base"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub profile"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="h-4 w-4"
              aria-hidden="true"
            />
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/adnansadar/"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0077B5] px-4 py-2.5 text-sm text-white transition-colors hover:bg-[#006399] sm:w-auto sm:text-base"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with me on LinkedIn"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="h-4 w-4"
              aria-hidden="true"
            />
            LinkedIn
          </Link>
        </motion.div>
      </motion.div>

      {/* Modern Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform cursor-pointer sm:bottom-12"
        onClick={scrollToNextSection}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            scrollToNextSection();
          }
        }}
        aria-label="Scroll to About section"
      >
        <div className="flex flex-col items-center gap-2">
          <motion.span
            className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 sm:text-sm"
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
              className="h-3 w-3 text-gray-500 dark:text-gray-400 sm:h-4 sm:w-4"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
