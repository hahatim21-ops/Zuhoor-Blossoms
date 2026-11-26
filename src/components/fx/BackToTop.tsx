"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

/** Floating back-to-top button whose gold ring fills as you scroll the page. */
export default function BackToTop() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 12 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          whileHover={{ y: -3 }}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: "rgba(7,12,8,0.85)", backdropFilter: "blur(10px)", boxShadow: "0 8px 30px rgba(0,0,0,0.35)" }}
          aria-label="Back to top"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(201,168,76,0.18)" strokeWidth="2" />
            <motion.circle cx="24" cy="24" r="22" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" style={{ pathLength: progress }} />
          </svg>
          <ArrowUpIcon className="w-4 h-4 relative" style={{ color: "#c9a84c" }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
