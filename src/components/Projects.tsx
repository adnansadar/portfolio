"use client";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  typographyStyles,
  layoutStyles,
  fadeInUp,
  staggerContainer,
} from "@/design-system";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const PlaceholderImage = ({
  emoji,
  title,
}: {
  emoji: string;
  title: string;
}) => {
  return (
    <div className="flex h-full w-full items-center justify-center border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="text-center">
        <div className="mb-3 text-5xl">{emoji}</div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

const getProjectEmoji = (title: string): string => {
  if (title.includes("Investors")) return "📊";
  if (title.includes("Scholar")) return "🏠";
  if (title.includes("PeopleBlox")) return "👥";
  return "💻";
};

const projects = [
  {
    title: "Investors Engine",
    description:
      "An investment research platform displaying financial data for 10,000+ US stocks with advanced charting tools. Built a responsive UI with complex data visualizations, custom tables, and real-time portfolio tracking.",
    techStack: [
      "Next.js",
      "TypeScript",
      "React Query",
      "Redux",
      "Material UI",
      "Apache ECharts",
    ],
    github: "",
    live: "https://investorsengine.com/",
    period: "February 2025 - May 2025",
    screenshot: "/projects_investors_engine.png",
    featured: true,
    caseStudyUrl: "/projects/investors-engine",
  },
  {
    title: "Scholar Housing",
    description:
      "Built a student housing platform focused on roommate compatibility and trusted sublease discovery for international and graduate students. Led product-driven frontend and full-stack development across authentication, onboarding, rule-based matching, and listings workflows.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "PostgreSQL",
    ],
    github: "https://github.com/studentbnb-housing/student-housing-frontend",
    live: "",
    period: "November 2025 - Ongoing",
    screenshot: "/projects_scholarhousing.png",
    featured: false,
  },
  {
    title: "PeopleBlox",
    description:
      "Led a team of 5 frontend developers to build a competency assessment tool that significantly reduced employee evaluation time. Architected the frontend solution using Next.js, React, TypeScript, and Redux with RTK Query for optimized data fetching.",
    techStack: ["Next.js", "React", "TypeScript", "Redux", "RTK Query"],
    github: "",
    live: "",
    period: "June 2022 - June 2024",
    screenshot: "/projects_peopleblox.png",
    featured: false,
    isPrivate: true,
  },
];

export default function Projects() {
  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className={cn(layoutStyles.section, "bg-muted/30")}>
      <div className={layoutStyles.container}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl"
        >
          <h2 className={cn(typographyStyles.h2, "mb-4 text-center")}>
            Featured Projects
          </h2>
          <p
            className={cn(
              typographyStyles.bodyLarge,
              "mx-auto mb-12 max-w-2xl text-center"
            )}
          >
            Projects that demonstrate my expertise in building data-driven
            applications
          </p>

          <div className="space-y-8">
            {/* Featured Project - Full Width */}
            {featuredProject && (
              <motion.div variants={fadeInUp}>
                <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
                    <div className="relative aspect-video overflow-hidden bg-muted/50 lg:aspect-auto lg:min-h-[400px]">
                      {featuredProject.screenshot ? (
                        <Image
                          src={featuredProject.screenshot}
                          alt={`${featuredProject.title} screenshot`}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <PlaceholderImage
                          emoji="📊"
                          title="Dashboard Preview"
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-between p-8">
                      <div>
                        {/* Featured Badge */}
                        <div className="mb-3">
                          <Badge
                            variant="default"
                            className="text-xs uppercase tracking-wide"
                          >
                            Featured Project
                          </Badge>
                        </div>

                        <div className="mb-4 flex items-start justify-between">
                          <h3 className={typographyStyles.h4}>
                            {featuredProject.title}
                          </h3>
                          <div className="flex gap-3">
                            {featuredProject.github && (
                              <Link
                                href={featuredProject.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                                aria-label={`View ${featuredProject.title} source code on GitHub`}
                              >
                                <FontAwesomeIcon
                                  icon={faGithub}
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </Link>
                            )}
                            {featuredProject.live && (
                              <Link
                                href={featuredProject.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                                aria-label={`Visit ${featuredProject.title} live site`}
                              >
                                <FontAwesomeIcon
                                  icon={faArrowUpRightFromSquare}
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </Link>
                            )}
                          </div>
                        </div>

                        <p
                          className={cn(
                            typographyStyles.body,
                            "text-muted-foreground"
                          )}
                        >
                          {featuredProject.description}
                        </p>
                      </div>

                      <div className="mt-6">
                        {/* Tech stack badges */}
                        <div className="mb-4 flex flex-wrap gap-2">
                          {featuredProject.techStack.map((tech) => (
                            <Badge key={tech} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        {/* Period */}
                        <div
                          className={cn(
                            typographyStyles.bodySmall,
                            "mb-4 text-muted-foreground"
                          )}
                        >
                          {featuredProject.period}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                          {featuredProject.live && (
                            <Button
                              variant="default"
                              size="default"
                              className="w-full sm:w-auto"
                              asChild
                            >
                              <Link
                                href={featuredProject.live}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Live
                                <FontAwesomeIcon
                                  icon={faArrowUpRightFromSquare}
                                  className="ml-2 h-4 w-4"
                                />
                              </Link>
                            </Button>
                          )}
                          {/* {featuredProject.caseStudyUrl && (
                          <Link
                            href={featuredProject.caseStudyUrl}
                            className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors duration-200 group"
                          >
                            Read Case Study
                            <span className="transition-transform duration-200 group-hover:translate-x-1">
                              →
                            </span>
                          </Link>
                        )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Other Projects - Grid */}
            {otherProjects.length > 0 && (
              <div className={layoutStyles.gridCols2}>
                {otherProjects.map((project) => (
                  <motion.div key={project.title} variants={fadeInUp}>
                    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                      <div className="relative aspect-video overflow-hidden">
                        {project.screenshot ? (
                          <Image
                            src={project.screenshot}
                            alt={`${project.title} screenshot`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <PlaceholderImage
                            emoji={getProjectEmoji(project.title)}
                            title={`${project.title} Preview`}
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <div className="mb-4 flex items-start justify-between">
                          <h3 className={typographyStyles.h5}>
                            {project.title}
                          </h3>

                          {project.isPrivate ? (
                            <Badge variant="outline" className="text-xs">
                              Private Project
                            </Badge>
                          ) : (
                            <div className="flex gap-3">
                              {project.github && (
                                <Link
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground transition-colors hover:text-foreground"
                                  aria-label={`View ${project.title} source code on GitHub`}
                                >
                                  <FontAwesomeIcon
                                    icon={faGithub}
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </Link>
                              )}
                              {project.live && (
                                <Link
                                  href={project.live}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted-foreground transition-colors hover:text-foreground"
                                  aria-label={`Visit ${project.title} live site`}
                                >
                                  <FontAwesomeIcon
                                    icon={faArrowUpRightFromSquare}
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </Link>
                              )}
                            </div>
                          )}
                        </div>

                        <p
                          className={cn(
                            typographyStyles.body,
                            "mb-4 text-muted-foreground"
                          )}
                        >
                          {project.description}
                        </p>

                        <div className="mb-4 flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <Badge key={tech} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div
                          className={cn(
                            typographyStyles.bodySmall,
                            "text-muted-foreground"
                          )}
                        >
                          {project.period}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
