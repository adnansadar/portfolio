"use client";

import { createContext, useContext } from "react";

/**
 * Set by <Stagger>. Tells a nested <Reveal> to inherit the parent's
 * hidden/visible state instead of running its own whileInView — that is what
 * makes staggerChildren actually stagger.
 */
export const StaggerContext = createContext(false);

export const useInStagger = () => useContext(StaggerContext);
