"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CHAPTERS = [
  {
    num: "01",
    eyebrow: "The Origin",
    title: "Born in the\nHeart of Arabia",
    body: "For centuries, the Arabian Peninsula has been the birthplace of the world's most coveted fragrances. Oud, rose, and saffron — ingredients so precious, they were once traded as currency along the Silk Road.",
    bg: "linear-gradient(135deg, #060d07 0%, #0e1a10 30%, #1a3320 65%, #243d28 100%)",
    accentColor: "#4a8c6a",
    dimColor: "rgba(74,140,106,0.15)",
    particles: ["✦", "⭐", "🌙", "✦", "⭐", "✦", "🌙", "⭐"],
    visual: "🏜️",
    visualLabel: "Ancient Arabia",
  },
  {
    num: "02",
    eyebrow: "The Harvest",
    title: "Gathered at\nNature's Peak",
    body: "Our Damask roses are hand-picked at dawn — before the morning dew dries — when their fragrance is most intense. Jasmine blossoms are collected only after sunset. Every ingredient, at its perfect moment.",
    bg: "linear-gradient(135deg, #081008 0%, #183524 45%, #2d5a3d 80%, #3d7050 100%)",
    accentColor: "#a8d4b8",
    dimColor: "rgba(168,212,184,0.14)",
    particles: ["🌿", "🌱", "🍃", "🌿", "🌱", "🍃", "🌿", "🌱"],
    visual: "🌿",
    visualLabel: "The Botanical Gardens",
  },
  {
    num: "03",
    eyebrow: "The Craft",
    title: "Science Meets\nAncient Tradition",
    body: "Six rare botanicals. Cold-process extraction. Master perfumers who have spent decades understanding how fragrance lives on skin. No shortcuts. No synthetic substitutes. Only the truth of nature.",
    bg: "linear-gradient(135deg, #060d0a 0%, #0f2018 40%, #1a3530 72%, #2a5048 100%)",
    accentColor: "#82b8a8",
    dimColor: "rgba(130,184,168,0.12)",
    particles: ["💧", "✨", "💫", "✨", "💧", "✨", "💫", "💧"],
    visual: "⚗️",
    visualLabel: "The Atelier",
  },
  {
    num: "04",
    eyebrow: "The Experience",
    title: "Your Story\nBegins Here",
    body: "Every bottle holds a journey. Every lather tells a story. From the gardens of the East to your morning ritual — Zuhoor Blossoms is the bridge between ancient luxury and your everyday life.",
    bg: "linear-gradient(135deg, #0a160b 0%, #1e3820 35%, #2d5035 65%, #4a7a52 100%)",
    accentColor: "#c0dccb",
    dimColor: "rgba(192,220,203,0.1)",
    particles: ["✦", "✿", "°", "✦", "✿", "·", "✦", "✿"],
    visual: "✨",
    visualLabel: "Your Daily Ritual",
  },
];

const PARTICLE_POS = [
  { left: "8%", top: "15%" },
  { left: "82%", top: "12%" },
  { left: "20%", top: "75%" },
  { left: "70%", top: "68%" },
  { left: "45%", top: "8%" },
  { left: "92%", top: "45%" },
  { left: "5%", top: "50%" },
  { left: "55%", top: "85%" },
  { left: "33%", top: "28%" },
  { left: "78%", top: "30%" },
  { left: "15%", top: "90%" },
  { left: "62%", top: "20%" },
];

function Particles({ particles, active }: { particles: string[]; active: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PARTICLE_POS.map((p, i) => (
        <div
          key={i}
          className="absolute select-none"
          style={{
            left: p.left,
            top: p.top,
            fontSize: `${14 + (i % 4) * 5}px`,
            opacity: active ? 0.08 + (i % 5) * 0.04 : 0,
            transform: active ? "scale(1) translateY(0)" : "scale(0.4) translateY(24px)",
            transition: `opacity 0.8s ease ${0.06 * i}s, transform 0.8s ease ${0.06 * i}s`,
          }}
        >
          {particles[i % particles.length]}
        </div>
      ))}
    </div>
  );
}

/** Scroll-pinned storytelling: four chapters crossfade as you scroll through a 400vh track. */
export default function AboutPage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!trackRef.current) return;
      const r = trackRef.current.getBoundingClientRect();
      const scrollable = r.height - window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / scrollable));
      setProgress(p);
      setActive(Math.min(CHAPTERS.length - 1, Math.floor(p * CHAPTERS.length)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = CHAPTERS[active];

  const goTo = (i: number) => {
    if (!trackRef.current) return;
    const r = trackRef.current.getBoundingClientRect();
    const scrollable = r.height - window.innerHeight;
    const frac = i / CHAPTERS.length + 0.01;
    window.scrollTo({ top: r.top + window.scrollY + frac * scrollable, behavior: "smooth" });
  };

  return (
    <div ref={trackRef} className="relative" style={{ height: `${CHAPTERS.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {CHAPTERS.map((c, i) => (
          <div key={c.num} className="absolute inset-0 transition-opacity duration-700" style={{ background: c.bg, opacity: active === i ? 1 : 0 }} />
        ))}
        {CHAPTERS.map((c, i) => (
          <div
            key={c.num + "-glow"}
            className="absolute inset-0 pointer-events-none transition-opacity duration-700"
            style={{ background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${c.dimColor} 0%, transparent 70%)`, opacity: active === i ? 1 : 0 }}
          />
        ))}
        {CHAPTERS.map((c, i) => (
          <Particles key={c.num + "-p"} particles={c.particles} active={active === i} />
        ))}

        <div
          className="absolute bottom-4 right-4 font-serif font-bold select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(100px, 22vw, 280px)", color: "rgba(255,255,255,0.035)", transition: "color 0.5s" }}
        >
          {current.num}
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20">
          {CHAPTERS.map((c, i) => (
            <button key={c.num} onClick={() => goTo(i)} className="group flex items-center gap-2.5 justify-end" aria-label={`Go to chapter ${c.num}`}>
              <span
                className="text-[9px] tracking-widest uppercase transition-all duration-200 whitespace-nowrap opacity-0 group-hover:opacity-100"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {c.eyebrow}
              </span>
              <div
                className="rounded-full transition-all duration-400"
                style={{
                  width: active === i ? 28 : 7,
                  height: 7,
                  background: active === i ? current.accentColor : "rgba(255,255,255,0.28)",
                  boxShadow: active === i ? `0 0 10px ${current.accentColor}80` : "none",
                }}
              />
            </button>
          ))}
        </div>

        <div className="absolute top-8 left-8 z-20">
          <span className="text-[10px] uppercase tracking-[5px] transition-all duration-500" style={{ color: "rgba(255,255,255,0.35)" }}>
            {current.num} / 0{CHAPTERS.length} · {current.eyebrow}
          </span>
        </div>

        {CHAPTERS.map((c, i) => (
          <div
            key={c.num + "-content"}
            className="absolute inset-0 flex items-center justify-center px-8 sm:px-14 lg:px-20"
            style={{
              opacity: active === i ? 1 : 0,
              transform: active === i ? "translateY(0) scale(1)" : active > i ? "translateY(-32px) scale(0.98)" : "translateY(32px) scale(0.98)",
              transition: "opacity 0.65s ease, transform 0.65s ease",
              pointerEvents: active === i ? "auto" : "none",
            }}
          >
            <div className="max-w-3xl w-full">
              <p className="text-[11px] uppercase tracking-[6px] font-medium mb-5" style={{ color: c.accentColor }}>{c.eyebrow}</p>
              <h2
                className="font-serif font-light text-white leading-[1.08] mb-6"
                style={{ fontSize: "clamp(40px, 6.5vw, 88px)", textShadow: `0 0 80px ${c.accentColor}25`, whiteSpace: "pre-line" }}
              >
                {c.title}
              </h2>
              <div className="mb-6 rounded-full" style={{ width: 72, height: 2, background: `linear-gradient(to right, ${c.accentColor}, transparent)` }} />
              <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl">{c.body}</p>
              <div className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="text-xl">{c.visual}</span>
                <span className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>{c.visualLabel}</span>
              </div>
              {i === CHAPTERS.length - 1 && (
                <div className="mt-8">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-sm transition-all duration-300 hover:-translate-y-1"
                    style={{ background: c.accentColor, color: "#1a0a0e", boxShadow: `0 10px 36px ${c.accentColor}45` }}
                  >
                    Begin Your Journey <span className="text-base">→</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/[0.08]">
          <div
            className="h-full transition-all duration-150"
            style={{
              width: `${progress * 100}%`,
              background: `linear-gradient(to right, ${current.accentColor}, ${CHAPTERS[Math.min(active + 1, CHAPTERS.length - 1)].accentColor})`,
            }}
          />
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-700"
          style={{ opacity: active === 0 && progress < 0.02 ? 0.55 : 0 }}
        >
          <span className="text-white text-[9px] tracking-[5px] uppercase">Scroll to Explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent animate-bounce" />
        </div>
      </div>
    </div>
  );
}
