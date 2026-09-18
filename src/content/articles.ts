/**
 * An in-body screenshot. Mirrors `Shot` in case-studies.ts — the intrinsic size
 * drives the frame's aspect ratio so nothing is ever cropped — but the caption
 * is optional and there is no browser chrome; that treatment is reserved for
 * shipped-product shots on the case studies.
 */
export type Figure = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

/**
 * A run of body text.
 *
 * Runs rather than a markup string: the writing is about CSS class names, so
 * backticks and asterisks appear in the prose itself and any inline syntax
 * would need escaping. These three are the only treatments the posts use.
 */
export type Inline =
  | string
  | { code: string }
  | { strong: string }
  | { em: string };

/** Body text — a plain string, or runs when it carries inline treatment. */
export type Rich = string | Inline[];

/** One item of post body copy. Rendered by the switch in article-body.tsx. */
export type ArticleBlock =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: Rich }
  | { kind: "list"; items: Rich[] }
  | { kind: "code"; code: string }
  | { kind: "rule" }
  | { kind: "figure"; figure: Figure };

export type Article = {
  /**
   * URL segment under /blog. A row with neither `slug` nor `href` is unwritten
   * and renders as a static "Coming soon" line rather than a dead link.
   */
  slug?: string;
  /** Display date. Fixed two-part shape so the rows' 92px column stays aligned. */
  date: string;
  /** ISO, for <time datetime> and og:article:published_time. */
  published: string;
  /** Set only after a substantive editorial update; never use the build date. */
  modified?: string;
  title: string;
  /** The row's trailing meta line. */
  tags: string;
  keywords: string[];
  /** Meta description, and the dek under the h1. */
  blurb: string;
  /** An external destination for a piece not mirrored here. Beats `slug`. */
  href?: string;
  /** Omitted by posts with nothing to show — the page opens on the prose. */
  cover?: Figure;
  body: ArticleBlock[];
  /** Where the piece first ran, credited in the post header. */
  origin?: { label: string; href: string };
};

/* Newest first — the rows render in array order. */
export const articles: Article[] = [
  {
    slug: "how-i-built-a-claude-code-agent-to-fix-css-architecture-nigh",
    date: "2025 · 07",
    published: "2025-07-27",
    title:
      "How I Built a Claude Code Sub Agent to Fix CSS Architecture Nightmares",
    tags: "Claude Code · CSS architecture",
    keywords: [
      "Claude Code",
      "Agents",
      "Artificial Intelligence (AI)",
      "Css",
      "Bootstrap",
      "NextJS",
    ],
    blurb: "How I used a Claude Code subagent to diagnose global CSS collisions in Next.js, namespace selectors, and migrate styles to CSS Modules.",
    origin: {
      label: "Peerlist",
      href: "https://peerlist.io/adnansadar/articles/how-i-built-a-claude-code-agent-to-fix-css-architecture-nigh",
    },
    cover: {
      src: "/post-css-agent-cover.webp",
      width: 931,
      height: 489,
      alt: "A terminal listing four /css-architecture-fixer commands (analyze, fix, migrate-to-modules and namespace), each under a comment describing what it does.",
    },
    body: [
      { kind: "h2", text: "The Problem: CSS That Works... Until It Doesn't" },
      {
        kind: "p",
        text: "Last week, I was stressed out over a bug that made no sense. My Next.js app's styling worked perfectly on first load. But navigate to another page and come back? Total chaos.",
      },
      {
        kind: "list",
        items: [
          "Table widths would break unexpectedly",
          "Modal headers and content styling disappeared",
          "Button colors changed between page visits",
          "Everything magically fixed itself on refresh",
        ],
      },
      {
        kind: "p",
        text: "If you've worked with large codebases, you know this feeling. The CSS works, then it doesn't, then it does again. It's like playing whack-a-mole with stylesheets.",
      },

      { kind: "h2", text: "Discovering the Root Cause" },
      {
        kind: "p",
        text: [
          "After hours of debugging, I finally found the culprit: ",
          { strong: "global CSS conflicts" },
          ". Even with Claude Code and Cursor, I was going around in circles until i had to manually look for files where these conflicts were occurring and then pointing it out.",
        ],
      },
      { kind: "p", text: "The numbers were staggering:" },
      {
        kind: "list",
        items: [
          [
            { code: ".modal-content" },
            " appeared in 8+ different component files",
          ],
          [{ code: ".btn" }, " was defined in 12+ places"],
          "Same story for dozens of other common class names",
        ],
      },
      {
        kind: "p",
        text: "In a global CSS world, the last imported file wins. So depending on your navigation path and Next.js's code splitting, you'd get different styles. No wonder it felt random.",
      },

      { kind: "rule" },

      { kind: "h2", text: "Building the Solution" },
      {
        kind: "p",
        text: "Instead of manually refactoring thousands of lines of CSS over several days, I decided to spend my weekend building a Claude Code subagent to automate the entire process.",
      },
      {
        kind: "figure",
        figure: {
          src: "/post-css-agent-01.png",
          width: 997,
          height: 1325,
          alt: "The agent's markdown definition, listing its purpose against global class name collisions and Bootstrap overrides, then four numbered capabilities: CSS conflict audit, namespace generation, CSS Modules migration, and validation and reporting.",
          caption:
            "The agent definition: purpose, then one section per phase of the job.",
        },
      },
      {
        kind: "figure",
        figure: {
          src: "/post-css-agent-02.png",
          width: 1143,
          height: 1200,
          alt: "The file .claude/agents/css-architecture-fixer.js open in an editor, showing a CSSArchitectureFixer class with auditCSSConflicts, generateNamespaces, migrateToModules and validateMigration methods, each commented with its phase number.",
          caption:
            "The implementation behind it: one method per phase, collapsed to their signatures.",
        },
      },
      {
        kind: "p",
        text: "The CSS Architecture Fixer Agent works in four phases:",
      },

      { kind: "h3", text: "Phase 1: Audit & Detection" },
      {
        kind: "list",
        items: [
          "Scans the entire codebase for duplicate class names",
          "Identifies Bootstrap class overrides",
          "Maps component-to-CSS relationships",
          "Generates a conflict severity report",
        ],
      },

      { kind: "h3", text: "Phase 2: Smart Namespacing" },
      {
        kind: "list",
        items: [
          "Creates unique namespaces using three strategies:",
          ["Feature-based: ", { code: ".auth-login-button" }],
          ["Component-based: ", { code: ".login-form-button" }],
          ["BEM-like: ", { code: ".login__form--button" }],
          "Preserves Bootstrap utility classes (this was tricky!)",
          "Updates both CSS and JSX files automatically",
        ],
      },

      { kind: "h3", text: "Phase 3: CSS Modules Migration" },
      {
        kind: "list",
        items: [
          "Converts traditional CSS imports to CSS Modules",
          [
            "Transforms ",
            { code: ".btn" },
            " → ",
            { code: "styles.btn" },
            " in components",
          ],
          "Handles SCSS features like variables, mixins, and nesting",
          "Updates all import statements",
        ],
      },

      { kind: "h3", text: "Phase 4: Validation" },
      {
        kind: "list",
        items: [
          "Verifies all classes are properly scoped",
          "Ensures no visual regressions",
          "Checks that Bootstrap utilities still work",
          "Generates a migration report",
        ],
      },

      { kind: "h2", text: "Using the Agent" },
      { kind: "p", text: "The best part? It's incredibly simple to use:" },
      {
        kind: "code",
        code: `# Find all CSS conflicts in your codebase

/css-architecture-fixer analyze

# Fix conflicts for a specific component

/css-architecture-fixer fix --component components/auth/Login.jsx

# Migrate an entire feature to CSS Modules

/css-architecture-fixer migrate-to-modules --feature auth

# Apply smart namespacing across all CSS files

/css-architecture-fixer namespace --pattern feature-component`,
      },

      { kind: "rule" },

      {
        kind: "h2",
        text: "I'm still improving the agent. Some ideas I'm exploring:",
      },
      {
        kind: "list",
        items: [
          "Visual regression testing with screenshots",
          "Integration with design systems",
        ],
      },
      {
        kind: "p",
        text: [
          {
            em: "If you're interested in the implementation details or want to build something similar, feel free to reach out. Always happy to share learnings with fellow developers.",
          },
        ],
      },
    ],
  },
  {
    slug: "first-impressions-with-comet-browser-for-real-world-workflow",
    date: "2025 · 07",
    published: "2025-07-20",
    title:
      "First impressions: Testing Perplexity's Comet Browser for real workflows",
    tags: "AI agents · Browser tooling",
    keywords: [
      "Artificial Intelligence (AI)",
      "Agents",
      "Comet browser",
      "Perplexity",
    ],
    blurb:
      "I asked Perplexity's Comet assistant to turn a page of rough course notes into a structured Google Doc. It navigated the UI and did it in three minutes, then hit a wall at the file picker.",
    origin: {
      label: "Peerlist",
      href: "https://peerlist.io/adnansadar/articles/first-impressions-with-comet-browser-for-real-world-workflow",
    },
    cover: {
      src: "/post-comet-cover.webp",
      width: 1920,
      height: 1008,
      alt: "Comet's new-tab page: an 'Ask anything or @mention a tab' prompt above widget tiles for a clock, unanswered email, an NVDA price chart and news.",
    },
    body: [
      {
        kind: "p",
        text: "As a frontend engineer diving into UX/UI fundamentals, I'm always looking for tools that can streamline my learning workflow. Yesterday, I decided to put Perplexity's Comet browser assistant to the test with a practical scenario.",
      },
      { kind: "h2", text: "The Setup" },
      {
        kind: "p",
        text: 'I was going through Meta\'s "Principles of UX/UI Design" course on Coursera, specifically reading about empathy tools and artifacts in the UX process. Instead of juggling between tabs or taking scattered notes, I thought: why not try Comet\'s assistant sidebar to capture and organize my thoughts in real-time?',
      },
      {
        kind: "figure",
        figure: {
          src: "/post-comet-01.png",
          width: 2526,
          height: 1335,
          alt: "The Coursera reading 'Empathy tools: Artifacts in the UX process' on the left, with Comet's assistant sidebar on the right holding rough notes and the request to format them into a new Google Doc.",
          caption:
            "Rough notes and three screenshots dropped straight into the assistant sidebar, next to the page they came from.",
        },
      },
      { kind: "h2", text: "The Experience" },
      {
        kind: "p",
        text: "I started dropping rough notes and screenshots directly into the assistant sidebar as I read. Then came the interesting part - I asked Comet to transfer everything into a structured Google Doc.",
      },
      {
        kind: "p",
        text: "Initially, it tried to be helpful by emailing me manual instructions (not quite what I wanted). But when I explicitly asked it to do the work for me, things got impressive. Comet opened a new tab, navigated to Google Docs, created a new document with an appropriate title, and copied over my notes in a clean, structured format. The whole process took about 3 minutes.",
      },
      {
        kind: "figure",
        figure: {
          src: "/post-comet-02.png",
          width: 2514,
          height: 1225,
          alt: "A Google Doc titled 'Artifacts in the UX Process: Systematic Overview' holding the notes as a numbered outline, with bracketed [IMAGE: ...] placeholders where the screenshots should sit.",
          caption:
            "The document Comet created and filled in, with [IMAGE: Tilly Persona - image.jpg] standing in for the screenshots it could not attach.",
        },
      },
      { kind: "h2", text: "The Limitation" },
      {
        kind: "p",
        text: 'Here\'s where it hit a wall: screenshots. When I asked it to include the images I\'d attached in the sidebar, Comet tried to upload them by triggering the file picker dialog. But once that OS-level window opened, it couldn\'t see or interact with any elements - makes perfect sense since Comet operates within the browser, not the operating system. You can see in the Google Doc that it cleverly added placeholders like "[IMAGE: Tilly Persona - image.jpg]" and organized spots for each screenshot, but couldn\'t actually attach them.',
      },
      { kind: "h2", text: "My Take" },
      {
        kind: "p",
        text: "Despite the screenshot hiccup, this felt like a genuine productivity win. As someone who's worked with Claude Code agents and Cursor's background agents for development workflows, this browser-based automation was refreshingly different. Instead of manipulating code, it was navigating actual UI - pretty cool to see in action.",
      },
      {
        kind: "p",
        text: "I've used Comet before for creating calendar events from chat and summarizing YouTube videos, both of which worked flawlessly. This Google Docs experience reinforced that browser agents are getting seriously capable for everyday workflows.",
      },
      { kind: "h2", text: "The Bigger Picture" },
      {
        kind: "p",
        text: "This small experiment saved me from the usual dance of switching tabs, copying content to ChatGPT or Claude for organization, then pasting back. For someone learning UX/UI while maintaining engineering work, these micro-efficiencies add up.",
      },
      {
        kind: "p",
        text: "Browser-based agents feel like they're hitting a sweet spot - not replacing our tools, but making the connections between them smoother.",
      },
    ],
  },
  {
    slug: "from-a-9-to-5-in-india-to-an-ms-in-the-us",
    date: "2024 · 07",
    published: "2024-07-15",
    title: "From a 9–5 in India to an MS in the US: Why I'm Moving to Buffalo",
    tags: "Grad school · Moving abroad",
    keywords: [
      "MS in US",
      "Study abroad",
      "GRE",
      "TOEFL",
      "F1 visa",
      "University at Buffalo",
      "Graduate school",
    ],
    blurb:
      "Layoffs at work, nine months of GRE prep after hours, five applications reduced to a spreadsheet, and a visa interview that lasted five minutes. How I ended up moving from Pune to Buffalo.",
    body: [
      {
        kind: "p",
        text: "In exactly two weeks, I'll be leaving India to start an MS in Computer Science at the University at Buffalo.",
      },
      {
        kind: "p",
        text: "For most of the last year, this plan existed as GRE preparation, university spreadsheets, SOP drafts, recommendation letters, application portals, bank statements and visa-slot trackers. Now my visa is approved, my flight is booked for July 29, I have a house waiting for me in Buffalo, and my room is slowly filling up with things that somehow need to fit into two suitcases.",
      },
      { kind: "p", text: "The decision itself started much earlier." },

      { kind: "h2", text: "The layoffs that made me rethink my plans" },
      {
        kind: "p",
        text: "In early 2023, layoffs started happening at my company, LitmusBlox. Some senior employees were let go, and seeing people with considerably more experience than me lose their jobs forced me to think seriously about my own career.",
      },
      {
        kind: "p",
        text: "I saw two realistic options. I could start preparing for another software engineering job, which meant getting back into DSA, interviews and everything that comes with a job switch. Or I could use this point in my career to pursue something I had considered before: a master's degree abroad.",
      },
      {
        kind: "p",
        text: "Graduate school wasn't the obvious choice for me. Since my undergraduate years, I had wanted to start working as soon as possible. I enjoy building things, solving practical problems and seeing a visible result much more than spending months studying theory. Going from earning a salary and working on actual products back to assignments and exams felt like a step backwards in some ways.",
      },
      {
        kind: "p",
        text: "At the same time, I wasn't completely satisfied with how I had approached my undergraduate degree. I had often been more focused on getting a good GPA than on understanding every subject deeply. After working professionally for a couple of years, I also had a better idea of why some of those fundamentals mattered.",
      },
      {
        kind: "p",
        text: "A master's gave me a chance to revisit computer science with a different perspective.",
      },
      {
        kind: "p",
        text: "There were practical motivations as well. I wanted international exposure, the experience of living independently, and the chance to meet people from backgrounds very different from mine. I also wanted to work in the US for a few years after graduating. The software industry there, the earning potential and having a degree from a good US university all played a role.",
      },
      {
        kind: "p",
        text: "My parents naturally preferred having me closer to home, but they were supportive. The harder person to convince was probably myself.",
      },

      { kind: "h2", text: "GRE prep after work" },
      {
        kind: "p",
        text: "I started preparing for the GRE in May 2023 while continuing my job at LitmusBlox. My workday was roughly 9:30 AM to 6:30 PM in a hybrid setup, so most weekdays followed the same basic pattern: work, dinner and a short break, followed by GRE preparation from around 9 to 11 PM.",
      },
      {
        kind: "p",
        text: "Some evenings went according to plan. Others definitely didn't.",
      },
      {
        kind: "p",
        text: "There were days when I would sit down after work, open a practice set and realize within a few minutes that I was struggling to keep my eyes open. On particularly tiring weeks, I sometimes stopped studying entirely for two or three days before getting back into the routine. Gym sessions became less frequent, and weekends that would normally have been free started disappearing into preparation.",
      },
      {
        kind: "p",
        text: "I mostly self-studied using Manhattan Prep, Magoosh, ETS material and videos from The Tested Tutor. Quant came more naturally to me.",
      },
      { kind: "p", text: "GRE Verbal did not." },
      {
        kind: "p",
        text: "Coming from an ICSE/ISC background, I thought I was reasonably comfortable with English, but GRE vocabulary was a different level. I spent a lot of time going through Magoosh and other online flashcards while trying to improve my verbal score.",
      },
      {
        kind: "p",
        text: [
          "Across five mock tests, I scored ",
          { strong: "304, 311, 305, 298 and 311" },
          ". My target for the actual test was 315+.",
        ],
      },
      { kind: "p", text: ["I scored ", { strong: "307" }, "."] },
      {
        kind: "p",
        text: "I wasn't happy with it. Looking back, one weakness in my preparation was that my plan was probably too flexible. Since I had designed the schedule myself, I could also change it whenever work became tiring or I simply didn't feel like studying. That helped me survive nine months of preparation alongside a job, but I probably would have benefited from more structure.",
      },
      {
        kind: "p",
        text: [
          "I took the TOEFL around October 2023 as well. After months of GRE preparation, it felt considerably easier. I prepared for around two weeks and scored ",
          { strong: "102" },
          ".",
        ],
      },
      {
        kind: "p",
        text: "The thing I remember most clearly about TOEFL was actually the test centre. During my listening section, people around me had already reached their speaking sections and were answering into their microphones. Trying to follow one voice through your headphones while several people are speaking around you is a surprisingly effective concentration test.",
      },
      {
        kind: "p",
        text: "I was also struck by how many people were there taking the GRE and TOEFL. Until then, studying abroad had mostly existed as my own private plan. Sitting in a room full of people trying to do something similar made the competition feel much more real.",
      },

      { kind: "h2", text: "Turning the application process into a spreadsheet" },
      {
        kind: "p",
        text: "Once the exams were mostly done, university shortlisting became the next project.",
      },
      {
        kind: "p",
        text: "I researched somewhere around 20 universities and, naturally, eventually reduced one of the biggest decisions of my life to an Excel spreadsheet.",
      },
      {
        kind: "p",
        text: "I compared CS rankings, tuition, expected living expenses, location, credits, admission difficulty and job opportunities. I used Admissions.fyi, Yocket, Reddit, university websites and conversations with friends, and I managed the entire application process myself rather than going through a consultant.",
      },
      {
        kind: "p",
        text: "In the end, I applied to five universities: Arizona State University, University at Buffalo, Clemson University, University of Houston and University of North Texas.",
      },
      {
        kind: "p",
        text: "Cost influenced the list more than I originally expected. There were universities I liked, including NC State and some California options, but once I calculated tuition and living expenses, the total cost became difficult to justify. Rankings mattered, but I didn't want to spend substantially more money just to move a few places higher on a list.",
      },
      {
        kind: "p",
        text: "The application process also involved plenty of less glamorous work.",
      },
      {
        kind: "p",
        text: "I went through around four or five drafts of my Statement of Purpose. The experiences and ideas were mine, while I used ChatGPT to help refine grammar, flow and sentence structure, and then asked family and close friends to review it. The hardest part was starting without sounding like every other person writing about a “passion for technology.”",
      },
      {
        kind: "p",
        text: "My professional experience ended up becoming an important part of the story. At LitmusBlox, I had moved from university projects to software where maintainability, performance and reliability mattered because real people were using what we built. That experience had made me more interested in understanding what sat underneath the tools and frameworks I was already using.",
      },
      {
        kind: "p",
        text: "Letters of Recommendation were more awkward.",
      },
      {
        kind: "p",
        text: "I needed three and approached a mix of professors and managers. By then, it had been roughly two and a half years since I had properly interacted with some of my professors. Sending a WhatsApp message after years of silence and immediately asking for a recommendation letter isn't a particularly comfortable way to restart a conversation.",
      },
      {
        kind: "p",
        text: "Some responded quickly. Others required reminders as application deadlines got closer. A few times I had to call because messages had gone unanswered. I also ended up visiting college twice to get signatures. Some recommenders asked me to prepare a rough draft or send points about my work before they made their changes.",
      },
      {
        kind: "p",
        text: [
          "By the time the exams, applications and transcript work were done, I had already spent around ",
          { strong: "₹1,03,000" },
          ", and that was before the visa process had even started.",
        ],
      },

      { kind: "rule" },

      { kind: "h2", text: "Rejections first, then Buffalo" },
      { kind: "p", text: "My first application results were rejections." },
      {
        kind: "p",
        text: "Even if you know a university is competitive, opening a rejection email after months of preparation is disappointing. For a while, I still wasn't sure whether all of this preparation was actually going to lead anywhere.",
      },
      {
        kind: "p",
        text: "Then, in February 2024, I received my first admit.",
      },
      { kind: "p", text: [{ strong: "University at Buffalo." }] },
      { kind: "p", text: "That was the first time the plan felt real." },
      {
        kind: "p",
        text: "I later received admits from Clemson and the University of North Texas as well, but my main choice eventually came down to UNT and UB. Buffalo had the stronger ranking, good student reviews, a well-regarded CS program and comparatively reasonable living costs. I also spoke with one or two students and alumni through people I knew and asked them about professors, courses and the job market.",
      },
      {
        kind: "p",
        text: "UB felt like the best balance between academics, reputation and cost.",
      },
      {
        kind: "p",
        text: "The Systems track was another reason it appealed to me. I don't come from an AI/ML background; my professional work has been closer to software engineering, and areas such as databases and networking feel more naturally connected to what I've already worked on. The Systems capstone, which is related to databases, also felt much more familiar than suddenly trying to reposition myself entirely around AI.",
      },
      {
        kind: "p",
        text: "By July, I had decided that Systems was the direction I wanted to pursue. I've been looking through courses in algorithms, security, data-intensive computing, networks, operating systems, computer architecture and databases.",
      },
      {
        kind: "p",
        text: "I'm slightly nervous about going back to exams after more than two years in industry, so I've been practicing DSA again and working on a personal project before leaving.",
      },
      { kind: "p", text: "Then there is Buffalo itself." },
      {
        kind: "p",
        text: "Coming from India, the weather is probably going to be the biggest shock. I had read about the major 2022 Buffalo snowstorm while researching the university, which didn't exactly make the transition sound easier.",
      },
      {
        kind: "p",
        text: "Strangely, seeing snowfall for the first time is also one of the things I'm most excited about.",
      },
      { kind: "p", text: "Ask me again after my first winter." },

      { kind: "h2", text: "The visa and leaving LitmusBlox" },
      {
        kind: "p",
        text: [
          "My I-20 arrived on ",
          { strong: "February 22, 2024" },
          ". After that came proof-of-funds documentation, bank statements and the usual financial paperwork, but the most stressful part of the visa process turned out to be simply getting an appointment.",
        ],
      },
      {
        kind: "p",
        text: "Suitable slots would disappear for weeks and then suddenly appear without much warning. I installed visa-slot trackers and joined Telegram and Discord groups where people posted availability updates. For a while, checking for appointments became part of my daily routine.",
      },
      {
        kind: "p",
        text: "It took me roughly three weeks to finally get one.",
      },
      {
        kind: "p",
        text: "My biometrics and interview were about a week apart, which meant making the Pune-to-Mumbai journey twice within the same week. After weeks of checking trackers, organizing documents and reading other people's interview experiences, the actual interview at the US consulate lasted about five minutes.",
      },
      {
        kind: "p",
        text: "I was asked whether I had relatives in the US and what I planned to do after graduation. I had read Reddit threads and watched YouTube videos beforehand but didn't rehearse answers with anyone. I felt reasonably confident explaining my own plans.",
      },
      {
        kind: "p",
        text: "Still, until the interviewing officer makes the decision, there is always some uncertainty.",
      },
      {
        kind: "p",
        text: ["My visa was approved on ", { strong: "June 3" }, "."],
      },
      {
        kind: "p",
        text: "At almost the same time, another part of my life was ending.",
      },
      {
        kind: "p",
        text: "I had informed LitmusBlox about my plans months earlier when I asked my CTO for an LOR, but leaving at the end of May was still difficult. Many of us had joined the company as freshers, and over time the team had become quite close. I liked the work, the people and the overall environment.",
      },
      {
        kind: "p",
        text: "The difficult part was that I wasn't leaving something I disliked. I was leaving a job and team I genuinely enjoyed for something far less certain.",
      },
      {
        kind: "p",
        text: "There have definitely been moments when I've wondered whether walking away just as my career was progressing is the right move, particularly with the software job market already being difficult.",
      },
      { kind: "p", text: "I probably won't know the answer for a while." },

      { kind: "rule" },

      { kind: "h2", text: "Preparing to actually move" },
      {
        kind: "p",
        text: "Once the visa was approved, the questions changed very quickly.",
      },
      {
        kind: "p",
        text: "Where am I going to live? Who am I going to live with? What exactly am I supposed to take halfway across the world?",
      },
      {
        kind: "p",
        text: "I started searching for housing around the end of May through UB WhatsApp and Facebook groups. Someone in one of the Indian student groups created a Google Form and Excel sheet where incoming students could enter their roommate preferences, likes, dislikes and home states.",
      },
      { kind: "p", text: "It worked surprisingly well." },
      {
        kind: "p",
        text: [
          "I eventually found four housemates. None of us knew each other beforehand, and all of us are from different states in India. We finalized a house near UB South Campus for around ",
          { strong: "$1,400 a month" },
          ", split between the four of us.",
        ],
      },
      {
        kind: "p",
        text: "There is one minor concern: none of us has actually seen the house.",
      },
      {
        kind: "p",
        text: "We've seen the photos online. For now, the four of us are simply trusting that reality looks reasonably similar.",
      },
      {
        kind: "p",
        text: "Packing started properly in early July. I have two checked bags, one cabin bag and a Notion page that has gradually turned into a combination of packing checklist, document tracker and “buy after reaching Buffalo” list. University health requirements added another set of tasks, including MMR and TB documentation, finding old vaccination records, and completing dental and eye check-ups before leaving.",
      },
      {
        kind: "p",
        text: "None of these things is particularly difficult on its own.",
      },
      {
        kind: "p",
        text: "Together, moving countries feels like one very long checklist.",
      },

      { kind: "h2", text: "Two weeks to go" },
      {
        kind: "p",
        text: "The last couple of months haven't only been paperwork and preparation. I've been meeting close friends and relatives before leaving, and my colleagues and I also took a trip to Matheran.",
      },
      {
        kind: "p",
        text: "My parents are excited for me, but naturally emotional and a little worried as well.",
      },
      {
        kind: "p",
        text: "I understand why. I've never really lived independently before. Most of my life has been spent in a familiar environment: family around me, people I already know, familiar roads, my car and bike, my own room and a steady income.",
      },
      {
        kind: "p",
        text: "In Buffalo, even the ordinary things will be new. I'll have to learn to cook properly, manage expenses, live with people I have never met, navigate a new city and return to academics after spending the last couple of years working.",
      },
      {
        kind: "p",
        text: "I'm naturally introverted too, so part of this experience for me is seeing whether I can get better at talking to people I don't already know and becoming comfortable outside my usual environment.",
      },
      {
        kind: "p",
        text: [
          "As I'm writing this, most of the preparation is finally done. My visa is approved, my job has ended, the house is finalized and my flight is booked for ",
          { strong: "July 29" },
          ".",
        ],
      },
      {
        kind: "p",
        text: "In two weeks, I'll leave Pune for Mumbai with two suitcases and a cabin bag. From there, I'll fly through Istanbul and New York before finally reaching Buffalo. It will be my first trip to the US and my first international journey alone.",
      },
      {
        kind: "p",
        text: "I'm excited to see Niagara Falls, experience snowfall, meet my classmates and housemates, and find out what everyday life in the US actually feels like.",
      },
      {
        kind: "p",
        text: "I don't know how difficult the courses will be, and I definitely don't know how I'll handle a Buffalo winter.",
      },
      {
        kind: "p",
        text: "What I do know is that by the time I finish this degree, I want to understand computer science better, become much more independent, meet people I would never have met otherwise, and feel confident that I can manage myself outside the environment I've always known.",
      },
      {
        kind: "p",
        text: "Hopefully, I'll also be starting the next phase of my career somewhere in the US.",
      },
      {
        kind: "p",
        text: "For now, though, there is a more immediate problem.",
      },
      { kind: "p", text: "I still need to finish packing." },
    ],
  },
];

/** The single source for a row's destination — an external href wins over a slug. */
export function articleHref(
  article: Pick<Article, "slug" | "href">
): string | undefined {
  return article.href ?? (article.slug ? `/blog/${article.slug}` : undefined);
}

export function findArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/**
 * What the row list needs — deliberately not `body`.
 *
 * Both `ArticleRows` and the `Writing` section are client components that import
 * this module, so every field reachable from what they render gets serialized
 * into their bundle. Handing them the full `Article` would ship each post's
 * entire text to two pages that display nothing but its title.
 */
export type ArticleRow = Pick<
  Article,
  "date" | "title" | "tags" | "slug" | "href"
>;

export const articleRows: ArticleRow[] = articles.map(
  ({ date, title, tags, slug, href }) => ({ date, title, tags, slug, href })
);

export const writing = {
  title: "Latest writing",
  blurb:
    "Notes on frontend architecture, AI-assisted workflows, and the tools I put through real work.",
} as const;
