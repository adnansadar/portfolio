/**
 * The single root element every page renders into.
 *
 * Not cosmetic. Next's app-router scroll handler calls `scrollIntoView()` on
 * the top-level nodes a page returns, and these pages returned three siblings —
 * nav, main, footer. Combined with the `scroll-behavior: smooth` on <html> in
 * globals.css, each call starts an animation rather than a jump, they race, and
 * on a page tall enough to scroll the footer's wins: clicking into a post left
 * the reader at the bottom of it. One root leaves exactly one target, and its
 * top is the top of the page.
 *
 * Fixing it here rather than by dropping `scroll-behavior: smooth` keeps the
 * animated jumps the homepage's #work / #about nav links rely on — scoping that
 * rule to `:has(:target)` instead turns out to apply the style too late to
 * affect the scroll it is meant to animate.
 *
 * The flex column is what `<main className="flex-1">` needs to go on pinning
 * the footer to the bottom of short pages.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-full flex-1 flex-col">{children}</div>;
}
