import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="shell relative pb-10">
      <div className="border-t border-white/[0.07] pt-6" />
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[0.06em] text-ink-700">
        <span>
          © {new Date().getFullYear()} {site.name.toUpperCase()}
        </span>
        <span>BUILT WITH NEXT.JS · TAILWIND · MOTION</span>
      </div>
    </footer>
  );
}
