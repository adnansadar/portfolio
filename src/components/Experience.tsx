"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import {
  typographyStyles,
  layoutStyles,
  staggerContainer,
} from "@/design-system";
import { Card } from "@/components/ui/card";

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

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export default function Experience() {
  return (
    <section id="experience" className={layoutStyles.section}>
      <div className={layoutStyles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-4xl"
        >
          <h2 className={cn(typographyStyles.h2, "mb-12 text-center")}>
            Work Experience
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative border-l-2 border-border pl-8"
              >
                <div className="absolute -left-3 top-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-foreground">
                    <FontAwesomeIcon
                      icon={faBuilding}
                      className="h-3 w-3 text-primary-foreground"
                    />
                  </div>
                </div>

                <Card className="p-6 transition-all hover:bg-muted/50">
                  <h3 className={typographyStyles.h5}>{exp.title}</h3>
                  <div className="mt-1 font-semibold text-foreground">
                    {exp.company}
                  </div>
                  <div
                    className={cn(
                      typographyStyles.bodySmall,
                      "mt-1 flex items-center gap-2 text-muted-foreground"
                    )}
                  >
                    <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
                    {exp.period}
                  </div>
                  <ul className="mt-4 space-y-3">
                    {exp.points.map((point, idx) => (
                      <li
                        key={idx}
                        className={cn(
                          typographyStyles.body,
                          "text-muted-foreground"
                        )}
                      >
                        • {point}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
