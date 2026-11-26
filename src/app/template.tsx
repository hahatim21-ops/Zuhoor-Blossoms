"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

// Only animate on in-site navigation, never on the very first load,
// so server-rendered content is visible immediately (good for speed and SEO).
let hasNavigated = false;

/** Soft fade-and-rise between pages (a template remounts on every navigation). */
export default function Template({ children }: { children: React.ReactNode }) {
  const animate = hasNavigated;
  useEffect(() => {
    hasNavigated = true;
  }, []);
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 14, filter: "blur(6px)" } : false}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
