/**
 * The page's anchored section order, mirrored by `page.tsx`. The nav is derived
 * from it so its links stay in the same order as the corresponding page sections.
 *
 * A section without `nav` is rendered but not linked (the hero, and the
 * unanchored ProofStrip / References / Gallery bands).
 */
type Section = { readonly id: string; readonly nav?: string };

export const sections: readonly Section[] = [
  { id: "top" },
  { id: "work", nav: "Projects" },
  { id: "writing", nav: "Blog" },
  { id: "about", nav: "About" },
  { id: "contact", nav: "Contact" },
];

// Root-relative, not bare hashes: the nav also renders on /blog, where `#work`
// resolved against the current route and went nowhere. On the homepage these
// still scroll rather than reload.
//
// flatMap rather than filter().map() — `filter` does not narrow away the
// optional `nav`, and this sidesteps a type predicate.
export const navItems = sections.flatMap((section) =>
  section.nav ? [{ label: section.nav, href: `/#${section.id}` }] : [],
);
