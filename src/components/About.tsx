"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  typographyStyles,
  layoutStyles,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "@/design-system";
import { Badge } from "@/components/ui/badge";

const techStack = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Redux", "React Query"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "Prisma"],
  },
  {
    category: "Testing",
    skills: ["Cypress", "Playwright", "Jest"],
  },
  {
    category: "Tools & Others",
    skills: ["Git", "Docker", "NPM", "Shell Scripting"],
  },
];

export default function About() {
  return (
    <section id="about" className={cn(layoutStyles.section)}>
      <div className={layoutStyles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl"
        >
          <h2 className={cn(typographyStyles.h2, "mb-12 text-center")}>
            About Me
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Bio */}
            <motion.div variants={fadeInLeft} className="space-y-4">
              <p className={typographyStyles.bodyLarge}>
                Front-End Web Developer with 4+ years of experience in
                developing and maintaining dynamic web applications. I
                specialize in React, Next.js, and TypeScript, with a strong
                focus on creating performant and user-friendly interfaces.
              </p>
              <p className={typographyStyles.body}>
                I have experience leading frontend teams and implementing best
                practices in project architecture. I am also an AI enthusiast
                and have integrated AI-powered agentic workflows in my projects
                to speed up development and improve efficiency.
              </p>
            </motion.div>

            {/* Right: Skills */}
            <motion.div variants={fadeInRight} className="space-y-6">
              {techStack.map((category) => (
                <div
                  key={category.category}
                  className="border-l-2 border-border pl-4"
                >
                  <h3 className={typographyStyles.h6}>{category.category}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
