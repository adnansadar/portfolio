import type { ArchRow } from "@/content/case-studies";
import { cn } from "@/lib/utils";

const TONE = {
  strong: "border-white/[0.42] bg-white/[0.07] text-white",
  default: "border-white/[0.12] bg-white/[0.03] text-ink-100",
  dim: "border-white/[0.09] text-ink-400",
} as const;

/** The short vertical tick joining one band of the stack to the next. */
function Connector() {
  return <div aria-hidden className="ml-[22px] h-3.5 w-px bg-white/[0.16]" />;
}

/**
 * The little stacked system diagram in each case study's sticky column.
 * Deliberately hand-rolled: it is a bespoke composition, not a UI primitive.
 */
export function ArchitectureDiagram({
  eyebrow,
  rows,
  footnote,
}: {
  eyebrow: string;
  rows: ArchRow[];
  footnote: string;
}) {
  return (
    <div className="panel mt-7 rounded-2xl border border-white/[0.09] p-[22px]">
      <div className="font-mono text-[11px] tracking-[0.08em] text-ink-700">
        {eyebrow}
      </div>

      <div className="mt-4 flex flex-col gap-[9px] font-mono text-[12.5px]">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="contents">
            {rowIndex > 0 ? <Connector /> : null}
            <div
              className={cn(
                "gap-[9px]",
                row.length === 1 ? "contents" : "grid",
                row.length === 2 && "grid-cols-2",
                row.length >= 3 && "grid-cols-3"
              )}
            >
              {row.map((node) => (
                <div
                  key={node.label}
                  className={cn(
                    "rounded-[10px] border px-3.5 py-[11px]",
                    row.length >= 3 && "px-2.5",
                    TONE[node.tone ?? "default"]
                  )}
                >
                  {node.label}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-1.5 text-[11px] text-ink-700">{footnote}</div>
      </div>
    </div>
  );
}
