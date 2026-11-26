"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * Gold follower ring (desktop mouse only). It lags the pointer on a spring,
 * swells over anything clickable, and shows a label over elements with data-cursor="…".
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mq.matches && !reduce.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as Element | null;
      const labelled = el?.closest?.("[data-cursor]") as HTMLElement | null;
      const control = el?.closest?.("a, button, select, input, textarea, label, [role='button']") as HTMLElement | null;
      // A button nested inside a labelled card (e.g. Add to Cart) gets the plain hover ring, not the label.
      const nestedControl = !!(labelled && control && control !== labelled && labelled.contains(control));
      setLabel(labelled && !nestedControl ? labelled.dataset.cursor || null : null);
      setHovering(!!control);
    };
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 72 : hovering ? 44 : 26;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[80] pointer-events-none flex items-center justify-center rounded-full"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        scale: pressed ? 0.85 : 1,
        backgroundColor: label ? "rgba(201,168,76,0.92)" : hovering ? "rgba(201,168,76,0.14)" : "rgba(201,168,76,0)",
        borderColor: label ? "rgba(201,168,76,0)" : "rgba(201,168,76,0.7)",
      }}
      transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
      initial={false}
    >
      <div className="absolute inset-0 rounded-full border" style={{ borderColor: "inherit" }} />
      <AnimatePresence>
        {label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="text-[10px] uppercase tracking-[2px] font-medium"
            style={{ color: "#1a0e04" }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
