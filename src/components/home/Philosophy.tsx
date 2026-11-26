"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useInView } from "@/lib/useInView";

const BOTANICALS = [
  { name: "Damask Rose", origin: "Bulgaria", note: "Top", symbol: "✿", color: "rgba(201,123,138,0.6)", glow: "rgba(201,123,138,0.35)", desc: "Harvested at dawn from the Valley of Roses" },
  { name: "Aged Oud", origin: "Oman", note: "Base", symbol: "◈", color: "rgba(180,140,80,0.6)", glow: "rgba(180,140,80,0.35)", desc: "Rare resin from 15-year aged agarwood" },
  { name: "Jasmine Absolute", origin: "Egypt", note: "Heart", symbol: "✦", color: "rgba(240,180,210,0.6)", glow: "rgba(240,180,210,0.35)", desc: "Moonlit blossoms picked by hand at peak perfume" },
  { name: "Iranian Saffron", origin: "Iran", note: "Heart", symbol: "∗", color: "rgba(201,168,76,0.6)", glow: "rgba(201,168,76,0.35)", desc: "Hand-harvested threads worth more than gold" },
  { name: "Sandalwood", origin: "India", note: "Base", symbol: "°", color: "rgba(180,140,100,0.6)", glow: "rgba(180,140,100,0.3)", desc: "Sustainably sourced creamy Mysore sandalwood" },
  { name: "Bergamot", origin: "Italy", note: "Top", symbol: "◇", color: "rgba(140,190,80,0.6)", glow: "rgba(140,190,80,0.3)", desc: "Cold-pressed from Calabrian bergamot rind" },
];

const LINES = [
  { text: "This is not soap.", size: "clamp(32px, 5.5vw, 72px)", italic: false },
  { text: "This is a ceremony.", size: "clamp(32px, 5.5vw, 72px)", italic: true },
  { text: "", size: "0", italic: false },
  { text: "Centuries of Arabic ritual.", size: "clamp(16px, 2vw, 26px)", italic: false },
  { text: "Rare botanicals, hand-harvested.", size: "clamp(16px, 2vw, 26px)", italic: false },
  { text: "One breathtaking lather.", size: "clamp(16px, 2vw, 26px)", italic: false },
];

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.16 * i },
  }),
};

function BotanicalCard({ item, index }: { item: (typeof BOTANICALS)[number]; index: number }) {
  const [ref, inView] = useInView(0.1);
  const [hover, setHover] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative cursor-pointer"
      style={{
        opacity: inView ? 1 : 0,
        transform: `translateY(${inView ? 0 : 40}px)`,
        transition: `opacity 0.7s ease ${0.1 * index}s, transform 0.7s ease ${0.1 * index}s`,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${item.glow} 0%, transparent 70%)`,
          opacity: hover ? 1 : 0,
          filter: "blur(18px)",
          transform: "scale(1.3)",
        }}
      />
      <div
        className="relative rounded-2xl p-6 text-center transition-all duration-300 overflow-hidden"
        style={{
          background: hover ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${hover ? item.color : "rgba(255,255,255,0.08)"}`,
          transform: hover ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hover ? `0 20px 50px -10px ${item.glow}` : "none",
        }}
      >
        <div
          className="text-4xl mb-3 font-serif transition-transform duration-300"
          style={{ color: item.color, transform: hover ? "scale(1.2) rotate(5deg)" : "scale(1)" }}
        >
          {item.symbol}
        </div>
        <div className="text-[9px] uppercase tracking-[3px] mb-1 font-medium" style={{ color: "rgba(201,168,76,0.55)" }}>
          {item.note} · {item.origin}
        </div>
        <h3 className="font-serif text-base mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>{item.name}</h3>
        <p
          className="text-xs leading-relaxed transition-all duration-300"
          style={{ color: "rgba(255,255,255,0.38)", opacity: hover ? 1 : 0, maxHeight: hover ? 60 : 0, overflow: "hidden" }}
        >
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default function Philosophy() {
  const [headRef, headIn] = useInView(0.2);
  return (
    <section className="overflow-hidden" style={{ background: "linear-gradient(180deg, #070c08 0%, #0d1810 50%, #070c08 100%)" }}>
      <div className="relative py-24 sm:py-32 px-6 text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(74,140,106,0.12) 0%, transparent 70%)" }}
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.p
            className="text-[10px] uppercase tracking-[7px] mb-10"
            style={{ color: "rgba(201,168,76,0.65)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            The Zuhoor Philosophy
          </motion.p>
          <div className="flex flex-col items-center gap-3 mb-10">
            {LINES.map((l, i) =>
              l.text ? (
                <motion.p
                  key={i}
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="leading-tight text-center"
                  style={{
                    fontSize: l.size,
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontWeight: 300,
                    fontStyle: l.italic ? "italic" : "normal",
                    color: l.italic ? "#c0dccb" : "rgba(255,255,255,0.88)",
                    textShadow: l.italic ? "0 0 60px rgba(192,220,203,0.25)" : "none",
                  }}
                >
                  {l.text}
                </motion.p>
              ) : (
                <div key={i} className="h-4" />
              ),
            )}
          </div>
          <motion.div
            className="mx-auto mb-8 rounded-full"
            style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)" }}
            initial={{ width: 0 }}
            whileInView={{ width: "160px" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p
            className="text-sm leading-relaxed mx-auto max-w-md"
            style={{ color: "rgba(255,255,255,0.38)" }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Experience it once — and you will never go back to ordinary.
          </motion.p>
        </div>
      </div>

      <div className="py-20 px-6" style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div className="max-w-6xl mx-auto">
          <div
            ref={headRef}
            className="text-center mb-14"
            style={{ opacity: headIn ? 1 : 0, transform: `translateY(${headIn ? 0 : 30}px)`, transition: "all 0.8s ease" }}
          >
            <p className="text-[10px] uppercase tracking-[6px] font-medium mb-3" style={{ color: "#c9a84c" }}>What&apos;s Inside</p>
            <h2 className="font-serif font-light leading-tight mb-4" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "rgba(255,255,255,0.92)" }}>
              Nature&apos;s Rarest <em className="font-light">Botanicals</em>
            </h2>
            <p className="text-sm max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
              Hover to explore each ingredient — where it comes from, and why it belongs in your ritual.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {BOTANICALS.map((b, i) => (
              <BotanicalCard key={b.name} item={b} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
