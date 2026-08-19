/**
 * The page's section order, declared once. `page.tsx` renders in this order and
 * the nav is derived from it, so the two cannot drift apart — which is how the
 * nav came to list About before Blog while the page rendered the reverse.
 *
 * A section without `nav` is rendered but not linked (the hero, and the
 * unanchored ProofStrip / References / Gallery bands).
 */
type Section = { readonly id: string; readonly nav?: string };

export const sections: readonly Section[] = [
  { id: "top" },
  { id: "work", nav: "Projects" },
  { id: "about", nav: "About" },
  { id: "writing", nav: "Blog" },
  { id: "contact", nav: "Contact" },
];

// flatMap rather than filter().map() — `filter` does not narrow away the
// optional `nav`, and this sidesteps a type predicate.
export const navItems = sections.flatMap((section) =>
  section.nav ? [{ label: section.nav, href: `#${section.id}` }] : [],
);
