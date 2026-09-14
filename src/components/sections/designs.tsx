import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { designProjects, designsHeading } from "@/content/designs";

export function Designs() {
  const project = designProjects[0];

  return (
    <section
      id="designs"
      className="shell relative pt-[clamp(72px,10vh,120px)] pb-[clamp(48px,7vh,80px)]"
    >
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4 border-b border-white/[0.08] pb-[22px]">
        <h2 className="text-[clamp(26px,3vw,44px)] font-black tracking-[-0.03em]">
          {designsHeading.title}
        </h2>
        <p className="max-w-[54ch] text-[15px] leading-relaxed text-ink-400">
          {designsHeading.introduction}
        </p>
      </div>

      <Reveal
        variant="splitIn"
        duration={1.1}
        className="relative mt-[clamp(32px,5vw,64px)] overflow-hidden rounded-[22px] border border-[#8bb8dc]/20 bg-[#0b1d2c]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,184,220,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(139,184,220,.09) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative grid lg:grid-cols-[minmax(300px,.78fr)_minmax(0,1.32fr)]">
          <div className="flex flex-col justify-between p-[clamp(24px,4vw,52px)] lg:min-h-[560px]">
            <div>
              <div className="font-mono text-xs tracking-[0.12em] text-[#8bb8dc] uppercase">
                01 · {project.eyebrow}
              </div>
              <h3 className="mt-7 text-[clamp(38px,5vw,68px)] leading-[0.92] font-black tracking-[-0.045em] text-white">
                {project.title}
              </h3>
              <p className="mt-7 max-w-[42ch] text-base leading-[1.65] text-[#b9c8d5]">
                {project.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="h-auto rounded-md border-[#8bb8dc]/25 bg-[#8bb8dc]/[0.05] px-3 py-[7px] text-[12.5px] font-normal text-[#d6e4ef]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              asChild
              size="cta"
              className="mt-10 w-fit bg-[#a8cff0] text-[#07131d] transition-transform hover:-translate-y-0.5 hover:bg-[#c2ddf3]"
            >
              <a href={project.site.href} target="_blank" rel="noopener">
                View live experience
                <span aria-hidden>↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Button>
          </div>

          <div className="relative flex min-h-[320px] items-center border-t border-[#8bb8dc]/15 p-3 sm:min-h-[440px] sm:p-5 lg:min-h-[560px] lg:border-t-0 lg:border-l">
            <div
              className="relative w-full overflow-hidden rounded-[14px] border border-[#b8daf4]/15 bg-[#07131d]"
              style={{
                aspectRatio: `${project.image.width} / ${project.image.height}`,
              }}
            >
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 62vw"
                className="object-contain"
              />

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,29,.04),rgba(7,19,29,.2))]"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
