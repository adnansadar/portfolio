import { CaseStudyPanel } from "@/components/sections/case-study-panel";
import { caseStudies, caseStudiesHeading } from "@/content/case-studies";

/** Each study's screenshot, live widget and numbers, plus a link to the site. */
export function CaseStudies() {
  return (
    <section id="work" className="shell relative pt-[clamp(72px,10vh,120px)] pb-10">
      <div className="flex flex-wrap items-baseline justify-between gap-[18px] border-b border-white/[0.08] pb-[22px]">
        <h2 className="text-[clamp(26px,3vw,44px)] font-black tracking-[-0.03em]">
          {caseStudiesHeading.title}
        </h2>
        <span className="font-mono text-xs text-ink-700">
          {caseStudiesHeading.meta}
        </span>
      </div>

      {caseStudies.map((study, i) => (
        <CaseStudyPanel key={study.title} study={study} first={i === 0} />
      ))}
    </section>
  );
}
