"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronDown,
  faBriefcase,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import { typographyStyles } from "@/design-system";
import { useTypingAnimation } from "@/hooks";
import { Button } from "@/components/ui/button";

const roles = [
  "Lead Frontend Engineer",
  "Full Stack Engineer",
  "AI Workflow Builder",
];

export default function Hero() {
  const { displayText, isTyping, isDeleting } = useTypingAnimation({
    phrases: roles,
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseDuration: 2000,
    delayStart: 400,
  });

  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24 md:px-8 md:py-32">
      <motion.div
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-4xl space-y-6 sm:space-y-8"
      >
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.6 }}
          className="text-[60px] font-bold leading-none tracking-tight text-foreground"
        >
          Hi, I am Adnan Sadar 👋
        </motion.h1>

        {/* Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex min-h-[3rem] items-center justify-center gap-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="text-xl font-medium text-muted-foreground md:text-2xl lg:text-3xl">
            {displayText}
          </span>
          <span
            className={cn(
              "ml-1 inline-block h-[1.2em] w-[3px] bg-foreground",
              isTyping || isDeleting ? "opacity-100" : "animate-blink"
            )}
            aria-hidden="true"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className={cn(
            typographyStyles.bodyLarge,
            "mx-auto max-w-2xl text-muted-foreground"
          )}
        >
          Building data-driven applications that transform complex problems into
          elegant solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row"
        >
          <Button
            onClick={() => scrollToSection("projects")}
            variant="default"
            size="default"
            className="gap-2"
            aria-label="View my work"
          >
            <FontAwesomeIcon
              icon={faBriefcase}
              className="h-4 w-4"
              aria-hidden="true"
            />
            View Work
          </Button>

          <Button variant="secondary" size="default" className="gap-2" asChild>
            <Link
              href="/Adnan_Sadar_Resume.pdf"
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
          </Button>

          <Button
            onClick={() => scrollToSection("contact")}
            variant="ghost"
            size="default"
            className="gap-2 border border-border"
            aria-label="Contact me"
          >
            <FontAwesomeIcon
              icon={faEnvelope}
              className="h-4 w-4"
              aria-hidden="true"
            />
            Contact
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection("about")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              scrollToSection("about");
            }
          }}
          aria-label="Scroll to About section"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                className="h-4 w-4 text-muted-foreground"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
