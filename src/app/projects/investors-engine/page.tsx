"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";
import {
  typographyStyles,
  layoutStyles,
  fadeInUp,
  staggerContainer,
} from "@/design-system";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Placeholder component for screenshots
function PlaceholderImage({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center border border-gray-200 dark:border-gray-800">
      <div className="text-center">
        <div className="text-5xl mb-3">{emoji}</div>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
      </div>
    </div>
  );
}

// Feature card component
function FeatureCard({
  title,
  description,
  technologies,
  screenshot,
  emoji,
}: {
  title: string;
  description: string;
  technologies: string[];
  screenshot?: string;
  emoji: string;
}) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="overflow-hidden">
        {/* Screenshot area */}
        <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
          {screenshot ? (
            <Image src={screenshot} alt={title} fill className="object-cover" />
          ) : (
            <PlaceholderImage emoji={emoji} title={title} />
          )}
        </div>

        {/* Content */}
        <CardContent className="p-6">
          <h3 className={typographyStyles.h5}>{title}</h3>
          <p className={cn(typographyStyles.body, "mt-2 text-muted-foreground")}>
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Challenge card component
function ChallengeCard({
  challenge,
  problem,
  solution,
  result,
}: {
  challenge: string;
  problem: string;
  solution: string;
  result: string;
}) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="p-6 md:p-8">
        <h3 className={cn(typographyStyles.h5, "mb-6")}>{challenge}</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Problem</h4>
            <p className={typographyStyles.body}>{problem}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Solution</h4>
            <p className={typographyStyles.body}>{solution}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Result</h4>
            <p className={cn(typographyStyles.body, "text-primary font-medium")}>
              {result}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function InvestorsEngineCaseStudy() {
  const features = [
    {
      title: "Stock Screener",
      description:
        "Advanced filtering system allowing users to search and filter through 10,000+ stocks using multiple criteria including market cap, sector, P/E ratio, and dividend yield. Implemented efficient state management with React Query for server state and Redux for UI state.",
      technologies: ["React Query", "Redux", "TypeScript"],
      emoji: "🔍",
    },
    {
      title: "Interactive Charts",
      description:
        "High-performance financial charts built with Apache ECharts, featuring candlestick patterns, technical indicators (RSI, MACD, Bollinger Bands), and customizable timeframes. Optimized for smooth interactions even with large datasets.",
      technologies: ["Apache ECharts", "TypeScript", "React"],
      emoji: "📈",
    },
    {
      title: "Portfolio Tracker",
      description:
        "Real-time portfolio management system with P/L calculations, position tracking, and performance analytics. Integrated with live market data to provide up-to-date valuations and returns.",
      technologies: ["React Query", "Redux", "TypeScript"],
      emoji: "💼",
    },
    {
      title: "Financial Statements",
      description:
        "Custom-built financial tables using Tanstack Table to display income statements, balance sheets, and cash flow statements with sorting, filtering, and historical comparison capabilities.",
      technologies: ["Tanstack Table", "TypeScript", "Material UI"],
      emoji: "📊",
    },
    {
      title: "Watchlist Management",
      description:
        "Persistent watchlist functionality allowing users to track their favorite stocks with real-time updates. Implemented with optimistic UI updates and efficient data synchronization.",
      technologies: ["React Query", "Redux Persist", "TypeScript"],
      emoji: "⭐",
    },
    {
      title: "Company Profiles",
      description:
        "Detailed company pages with comprehensive information including business overview, key metrics, financials, and analyst ratings. Built using Next.js dynamic routing for optimal SEO and performance.",
      technologies: ["Next.js", "TypeScript", "Material UI"],
      emoji: "🏢",
    },
  ];

  const challenges = [
    {
      challenge: "Handling Large Datasets",
      problem:
        "Displaying and filtering 10,000+ stocks caused significant performance issues, with slow initial loads and laggy interactions. The sheer volume of data made traditional rendering approaches impractical.",
      solution:
        "Implemented virtualized lists for rendering only visible items, used React Query's caching and pagination features to load data incrementally, and added debounced search inputs to reduce unnecessary API calls. Also employed code splitting to load heavy components on demand.",
      result:
        "Reduced initial load time by 60% and achieved smooth 60fps scrolling even with thousands of items. Search response time improved from 2s to under 200ms.",
    },
    {
      challenge: "Complex State Management",
      problem:
        "Managing interconnected states across filters, watchlists, portfolios, and user preferences became increasingly difficult. Changes in one part of the application needed to reflect across multiple components, leading to prop drilling and state synchronization issues.",
      solution:
        "Adopted a hybrid state management approach: React Query for server state (stocks data, financial data) and Redux Toolkit for client state (UI preferences, filters, user settings). This separation of concerns made the codebase more maintainable and debugging easier.",
      result:
        "State management bugs reduced by 70%, development velocity increased as new features could be added without breaking existing functionality, and the codebase became significantly more maintainable.",
    },
    {
      challenge: "Real-time Data Updates",
      problem:
        "Stock prices needed to update in real-time without requiring manual page refreshes, but polling too frequently caused excessive API calls and increased server costs.",
      solution:
        "Implemented smart polling with React Query's refetch intervals, using longer intervals (30s) for background data and shorter intervals (5s) for actively viewed stocks. Added visibility change detection to pause polling when the tab is inactive.",
      result:
        "Reduced API calls by 30% while maintaining fresh data. Users receive timely updates without impacting performance or server costs.",
    },
    {
      challenge: "Responsive Charts",
      problem:
        "Financial charts were difficult to read and interact with on mobile devices. Touch gestures conflicted with chart interactions, and small screens couldn't display all the information effectively.",
      solution:
        "Redesigned chart interface for mobile-first experience with touch-optimized controls, collapsible legend panels, and simplified technical indicators. Implemented responsive chart configurations that adjust complexity based on screen size.",
      result:
        "Mobile engagement increased by 45%. Charts now work seamlessly across all devices with intuitive touch interactions.",
    },
  ];

  const techCategories = [
    {
      category: "Frontend",
      technologies: ["Next.js 14", "React 18", "TypeScript", "Material UI"],
    },
    {
      category: "State Management",
      technologies: ["Redux Toolkit", "React Query (RTK Query)"],
    },
    {
      category: "Data Visualization",
      technologies: ["Apache ECharts", "Tanstack Table"],
    },
    {
      category: "Build Tools",
      technologies: ["Webpack", "ESLint", "Prettier"],
    },
    {
      category: "Deployment",
      technologies: ["Vercel"],
    },
  ];

  const results = [
    {
      category: "User Impact",
      items: [
        "Saved investors 15+ hours weekly on research",
        "Enabled analysis of 10,000+ stocks in one platform",
        "Reduced time to find opportunities by 40%",
      ],
    },
    {
      category: "Technical Achievements",
      items: [
        "90+ Lighthouse performance score",
        "Reduced API calls by 30% through caching",
        "Responsive UI across all devices",
      ],
    },
    {
      category: "Personal Growth",
      items: [
        "Deepened expertise in state management",
        "Mastered data visualization techniques",
        "Gained financial domain knowledge",
      ],
    },
  ];

  const lessons = [
    {
      number: 1,
      title: "Start with user needs, not technical features",
      description:
        "Initially focused on implementing impressive technical capabilities, but learned that understanding user workflows and pain points should drive feature development. User-centric design leads to better adoption and satisfaction.",
    },
    {
      number: 2,
      title: "Performance optimization is ongoing, not one-time",
      description:
        "Performance isn't a checkbox to tick off during initial development. As the application grows and user patterns emerge, continuous monitoring and optimization are required to maintain a smooth experience.",
    },
    {
      number: 3,
      title: "Type safety prevents production bugs",
      description:
        "TypeScript caught numerous potential runtime errors during development. The upfront investment in type definitions paid off significantly by preventing bugs from reaching production and improving code maintainability.",
    },
    {
      number: 4,
      title: "Documentation aids collaboration",
      description:
        "Well-documented APIs, component props, and state management patterns made it easier to onboard new team members and collaborate effectively. Clear documentation reduced back-and-forth questions and improved development velocity.",
    },
  ];

  const screenshots = [
    {
      emoji: "🏠",
      title: "Dashboard Overview",
      caption: "Main landing page with key metrics and market overview",
    },
    {
      emoji: "🔍",
      title: "Stock Screener",
      caption: "Advanced filtering interface with real-time results",
    },
    {
      emoji: "📈",
      title: "Interactive Charts",
      caption: "Price history with technical indicators and drawing tools",
    },
    {
      emoji: "💼",
      title: "Portfolio Tracker",
      caption: "Holdings and performance analytics dashboard",
    },
    {
      emoji: "📊",
      title: "Financial Statements",
      caption: "Income statement view with historical comparison",
    },
    {
      emoji: "📱",
      title: "Mobile Experience",
      caption: "Responsive design optimized for mobile devices",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section
          className={cn(
            "relative min-h-[60vh] flex items-center",
            "px-4 py-20 sm:py-24 md:py-32"
          )}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto w-full"
          >
            {/* Back Link */}
            <motion.div variants={fadeInUp}>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to Projects
              </Link>
            </motion.div>

            {/* Title */}
            <motion.h1 variants={fadeInUp} className={typographyStyles.h1}>
              Investors Engine
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className={cn(typographyStyles.h5, "text-muted-foreground mt-4")}
            >
              Investment Research Platform for Long-Term Equity Analysis
            </motion.p>

            {/* Metadata Cards */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
            >
              {[
                { label: "Role", value: "Lead Frontend Engineer" },
                { label: "Timeline", value: "February 2025 - May 2025" },
                { label: "Status", value: "Live" },
              ].map((item) => (
                <Card key={item.label} className="p-4">
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                  <div className="font-semibold mt-1">{item.value}</div>
                </Card>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp}>
              <Button
                variant="default"
                size="lg"
                className="mt-8"
                asChild
              >
                <a
                  href="https://investorsengine.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Live Site
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="ml-2"
                  />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Overview Section */}
        <section className={cn(layoutStyles.section, "max-w-4xl mx-auto px-4 bg-muted/30")}>
          <h2 className={cn(typographyStyles.h3, "mb-8")}>Overview</h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.p variants={fadeInUp} className="text-lg leading-loose">
              Investors Engine is a comprehensive investment research platform
              designed to help long-term equity investors analyze and track over
              10,000 US stocks. The platform provides real-time financial data,
              advanced charting tools, customizable screeners, and portfolio
              tracking capabilities—all in a clean, intuitive interface. Built for
              both novice and experienced investors, it consolidates scattered
              financial information into a single, powerful research hub.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg leading-loose">
              The challenge was building a data-intensive application that
              remained performant and user-friendly despite handling massive
              datasets. Financial data visualization requires precision and
              clarity, while the sheer volume of stocks and metrics demanded
              careful optimization. The interface needed to feel fast and
              responsive even when displaying complex charts, tables with
              thousands of rows, and real-time updates across multiple data
              points.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg leading-loose">
              As the lead frontend engineer, I architected the entire UI, made
              critical technology decisions, and implemented the core features
              including the stock screener, interactive charting system, portfolio
              tracker, and financial statement displays. I also established
              frontend best practices, implemented the state management
              architecture, and optimized performance to ensure the application
              scaled effectively as the user base and data volume grew.
            </motion.p>
          </motion.div>
        </section>

        {/* Key Features Section */}
        <section className={cn(layoutStyles.section, "max-w-6xl mx-auto px-4")}>
          <h2 className={cn(typographyStyles.h3, "mb-12 text-center")}>
            Key Features
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className={layoutStyles.gridCols2}
          >
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </motion.div>
        </section>

        {/* Technical Implementation Section */}
        <section className={cn(layoutStyles.section, "max-w-4xl mx-auto px-4 bg-muted/30")}>
          <h2 className={cn(typographyStyles.h3, "mb-12")}>
            Technical Implementation
          </h2>

          {/* Architecture Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Card className="p-8 mb-12">
              <h3 className={cn(typographyStyles.h5, "mb-4")}>Architecture</h3>
            <p className="text-lg leading-loose mb-6">
              The frontend is built on Next.js 14 with React 18 and TypeScript,
              providing a robust foundation for scalability and type safety.
              Material UI serves as the component library, ensuring consistent
              design and accessibility. The state management strategy combines
              Redux Toolkit for UI state and React Query for server state,
              creating a clear separation of concerns that improved code
              maintainability and debugging efficiency.
            </p>
            <p className="text-lg leading-loose">
              For data visualization, Apache ECharts handles complex financial
              charts with thousands of data points, while Tanstack Table powers
              the customizable financial statement tables. The application is
              deployed on Vercel with automatic deployments from the main branch,
              ensuring rapid iteration and reliable production updates.
            </p>
            </Card>
          </motion.div>

          {/* Technical Decisions */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <motion.div
              variants={fadeInUp}
              className="border-l-4 border-primary pl-6"
            >
              <h4 className={typographyStyles.h6}>
                React Query + Redux: Hybrid State Management
              </h4>
              <p className="text-lg leading-loose mt-3">
                Rather than forcing all state into a single paradigm, I chose to
                combine React Query for server state (stock data, financials,
                real-time prices) with Redux Toolkit for client state (UI
                preferences, filters, user settings). This separation made the
                codebase more intuitive—server data with built-in caching and
                refetching logic stayed in React Query, while UI state that needed
                to persist across sessions lived in Redux with Redux Persist. The
                result was cleaner code, easier debugging, and better performance
                through automatic cache invalidation and optimistic updates.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="border-l-4 border-primary pl-6"
            >
              <h4 className={typographyStyles.h6}>
                Apache ECharts for Financial Visualization
              </h4>
              <p className="text-lg leading-loose mt-3">
                After evaluating several charting libraries including Chart.js and
                Recharts, I selected Apache ECharts for its superior performance
                with large datasets and extensive customization options. ECharts
                handles thousands of candlestick data points smoothly while
                supporting advanced features like technical indicators, drawing
                tools, and multi-axis charts. The library's canvas rendering
                ensures smooth interactions even on lower-end devices, and its
                flexible theming system allowed for seamless dark mode integration.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="border-l-4 border-primary pl-6"
            >
              <h4 className={typographyStyles.h6}>
                Tanstack Table: Headless UI for Custom Tables
              </h4>
              <p className="text-lg leading-loose mt-3">
                Financial statements required specialized table functionality—multi-level
                sorting, column hiding, row grouping, and historical comparisons.
                Tanstack Table's headless approach provided the data management
                logic without imposing UI constraints, allowing me to build custom
                table designs that matched the application's aesthetic while
                leveraging battle-tested sorting, filtering, and pagination logic.
                This flexibility was crucial for creating tables that felt native
                to the platform rather than generic components.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="border-l-4 border-primary pl-6"
            >
              <h4 className={typographyStyles.h6}>Performance Optimization</h4>
              <p className="text-lg leading-loose mt-3">
                Performance was achieved through multiple strategies: React Query's
                intelligent caching reduced redundant API calls; code splitting
                with Next.js dynamic imports ensured users only loaded the
                JavaScript they needed; virtualized lists rendered only visible
                table rows; and memoization with useMemo and useCallback prevented
                unnecessary re-renders. Additionally, I implemented progressive
                loading patterns where essential data loaded first, followed by
                secondary information, creating the perception of faster load times
                even with large datasets.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Challenges & Solutions Section */}
        <section className={cn(layoutStyles.section, "max-w-6xl mx-auto px-4")}>
          <h2 className={cn(typographyStyles.h3, "mb-12 text-center")}>
            Challenges & Solutions
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className={layoutStyles.gridCols2}
          >
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.challenge} {...challenge} />
            ))}
          </motion.div>
        </section>

        {/* Tech Stack Section */}
        <section className={cn(layoutStyles.section, "max-w-4xl mx-auto px-4 bg-muted/30")}>
          <h2 className={cn(typographyStyles.h3, "mb-12 text-center")}>
            Tech Stack
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className={layoutStyles.gridCols2}
          >
            {techCategories.map((category) => (
              <motion.div
                key={category.category}
                variants={fadeInUp}
              >
                <Card className="p-6">
                  <h3 className={cn(typographyStyles.h6, "mb-4")}>
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Results & Impact Section */}
        <section className={cn(layoutStyles.section, "max-w-6xl mx-auto px-4")}>
          <h2 className={cn(typographyStyles.h3, "mb-12 text-center")}>
            Results & Impact
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className={layoutStyles.gridCols3}
          >
            {results.map((result) => (
              <motion.div
                key={result.category}
                variants={fadeInUp}
              >
                <Card className="p-6">
                  <h3 className={cn(typographyStyles.h6, "mb-4")}>
                    {result.category}
                  </h3>
                  <ul className="space-y-3">
                    {result.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className={typographyStyles.body}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Lessons Learned Section */}
        <section className={cn(layoutStyles.section, "max-w-4xl mx-auto px-4 bg-muted/30")}>
          <h2 className={cn(typographyStyles.h3, "mb-12 text-center")}>
            Lessons Learned
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {lessons.map((lesson) => (
              <motion.div
                key={lesson.number}
                variants={fadeInUp}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {lesson.number}
                </div>
                <div>
                  <h3 className={cn(typographyStyles.h6, "mb-2")}>
                    {lesson.title}
                  </h3>
                  <p className="text-lg leading-loose text-muted-foreground">
                    {lesson.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Screenshots Gallery */}
        <section className={cn(layoutStyles.section, "max-w-6xl mx-auto px-4")}>
          <h2 className={cn(typographyStyles.h3, "mb-12 text-center")}>
            Gallery
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className={layoutStyles.gridCols2}
          >
            {screenshots.map((screenshot) => (
              <motion.div
                key={screenshot.title}
                variants={fadeInUp}
              >
                <Card className="overflow-hidden">
                  <div className="aspect-video">
                    <PlaceholderImage
                      emoji={screenshot.emoji}
                      title={screenshot.title}
                    />
                  </div>
                  <div className="p-4">
                    <p className={cn(typographyStyles.bodySmall, "text-center")}>
                      {screenshot.caption}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Footer */}
        <section
          className={cn(
            layoutStyles.section,
            "bg-primary text-primary-foreground"
          )}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto px-4 text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className={cn(typographyStyles.h3, "mb-4")}
            >
              Interested in working together?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className={cn(typographyStyles.bodyLarge, "mb-8 opacity-90")}
            >
              Let's build something amazing.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-black hover:bg-gray-100"
                asChild
              >
                <Link href="/#projects">
                  View More Projects
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/#contact">
                  Contact Me
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
