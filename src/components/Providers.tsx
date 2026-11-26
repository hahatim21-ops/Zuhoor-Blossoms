"use client";

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { CurrencyProvider } from "@/lib/currency";
import { useCart } from "@/lib/cart";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useCart.persist.rehydrate();
  }, []);
  // reducedMotion="user" tones Framer Motion down for visitors who ask for less motion.
  return (
    <MotionConfig reducedMotion="user">
      <CurrencyProvider>{children}</CurrencyProvider>
    </MotionConfig>
  );
}
