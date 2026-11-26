"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Magnetic from "@/components/fx/Magnetic";

const GLYPHS = ["✦", "✧", "◇", "·", "∗", "°", "✦", "◈"];

/** Gently falling botanical glyphs. */
function FallingGlyphs() {
  const items = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${4 + ((4.3 * i) % 92)}%`,
    delay: `${(0.42 * i) % 8}s`,
    duration: `${9 + ((0.7 * i) % 10)}s`,
    fontSize: `${8 + (i % 4) * 4}px`,
    symbol: GLYPHS[i % GLYPHS.length],
    opacity: 0.18 + (i % 5) * 0.07,
    color: ["#4a8c6a", "#c0dccb", "#82b08e", "#a8d4b8"][i % 4],
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {items.map((g) => (
        <div
          key={g.id}
          className="absolute animate-fall font-sans"
          style={{
            left: g.left,
            top: "-24px",
            fontSize: g.fontSize,
            opacity: g.opacity,
            color: g.color,
            animationDuration: g.duration,
            animationDelay: g.delay,
            lineHeight: 1,
          }}
        >
          {g.symbol}
        </div>
      ))}
    </div>
  );
}

/** Two layered SVG waves that morph continuously at the bottom of the hero. */
function Waves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full" style={{ height: 120 }}>
        <path
          fill="rgba(192,220,203,0.22)"
          className="wave-back"
          d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
        />
        <path
          fill="#070c08"
          className="wave-front"
          d="M0,80 C180,40 360,100 540,70 C720,40 900,90 1080,65 C1260,40 1380,80 1440,70 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}

function Blob({ className, style }: { className: string; style: React.CSSProperties }) {
  return <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} style={style} />;
}

/** Expanding ripple rings drawn on a canvas, like a drop falling into water. */
function useRipples(extraDelay: number) {
  const ref = useRef<HTMLCanvasElement>(null);
  const spawnAt = useRef<(x: number, y: number) => void>(() => {});
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const ctx = canvas.getContext("2d")!;
    type Ring = { x: number; y: number; r: number; maxR: number; alpha: number; color: string; speed: number; lineWidth: number };
    let rings: Ring[] = [];
    const spawn = (color: string, speed: number, lineWidth: number) => {
      const w = canvas.width;
      const h = canvas.height;
      rings.push({ x: w / 2, y: h / 2, r: 0, maxR: 0.75 * Math.hypot(w, h), alpha: 0.7, color, speed, lineWidth });
    };
    // Interactive: a click drops a small cluster of rings where the visitor tapped.
    spawnAt.current = (x, y) => {
      const maxR = 0.4 * Math.hypot(canvas.width, canvas.height);
      rings.push({ x, y, r: 0, maxR, alpha: 0.9, color: "#c0dccb", speed: 6, lineWidth: 2.5 });
      setTimeout(() => rings.push({ x, y, r: 0, maxR, alpha: 0.8, color: "#c9a84c", speed: 4.5, lineWidth: 1.5 }), 140);
      setTimeout(() => rings.push({ x, y, r: 0, maxR, alpha: 0.7, color: "#4a8c6a", speed: 3.5, lineWidth: 1 }), 280);
    };
    const timers = [
      setTimeout(() => spawn("#4a8c6a", 5, 3), 300),
      setTimeout(() => spawn("#c0dccb", 5, 2), 480),
      setTimeout(() => spawn("#82b08e", 4, 2.5), 660),
      setTimeout(() => spawn("#4a8c6a", 3.5, 1.5), extraDelay + 560),
      setTimeout(() => spawn("#c0dccb", 3, 1), extraDelay + 760),
    ];
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rings = rings.filter((r) => r.alpha > 0.008);
      rings.forEach((r) => {
        r.r += r.speed * (1 - (r.r / r.maxR) * 0.6);
        r.alpha *= 0.968;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, 2 * Math.PI);
        ctx.strokeStyle = r.color + Math.round(255 * r.alpha).toString(16).padStart(2, "0");
        ctx.lineWidth = r.lineWidth;
        ctx.stroke();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", resize);
    };
  }, [extraDelay]);
  return { ref, spawnAt };
}

/** Smoothed (lerped) mouse position in [-1, 1] for parallax. */
function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const raf = useRef(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      const c = current.current;
      const t = target.current;
      const next = { x: lerp(c.x, t.x, 0.06), y: lerp(c.y, t.y, 0.06) };
      current.current = next;
      setPos(next);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);
  return pos;
}

export default function Hero() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const a = setTimeout(() => setStage(1), 300);
    const b = setTimeout(() => setStage(2), 1200);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);
  const { ref: canvasRef, spawnAt } = useRipples(300);
  const m = useMouseParallax();
  const sectionRef = useRef<HTMLElement>(null);
  const [spot, setSpot] = useState({ x: -999, y: -999 });

  // Scroll-linked parallax: content drifts up and fades as the hero leaves the screen.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bottleY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(135deg, #080e09 0%, #101d12 30%, #1a3d2a 65%, #2d5a42 100%)",
      }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setSpot({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onPointerLeave={() => setSpot({ x: -999, y: -999 })}
      title="Tap anywhere to make a ripple"
      onClick={(e) => {
        if ((e.target as Element).closest("a, button")) return;
        const c = canvasRef.current;
        if (!c) return;
        const r = c.getBoundingClientRect();
        spawnAt.current(e.clientX - r.left, e.clientY - r.top);
      }}
    >
      {/* Soft spotlight that follows the pointer */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background: `radial-gradient(420px circle at ${spot.x}px ${spot.y}px, rgba(192,220,203,0.09), transparent 60%)`,
        }}
      />
      <Blob
        className="blob-morph-1 w-[500px] h-[500px]"
        style={{
          top: "-10%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(74,140,106,0.18) 0%, transparent 70%)",
          translate: `${-18 * m.x}px ${-14 * m.y}px`,
        }}
      />
      <Blob
        className="blob-morph-2 w-[600px] h-[600px]"
        style={{
          bottom: "-20%",
          right: "-15%",
          background: "radial-gradient(circle, rgba(130,176,142,0.12) 0%, transparent 70%)",
          translate: `${22 * m.x}px ${18 * m.y}px`,
        }}
      />
      <Blob
        className="blob-morph-3 w-[400px] h-[400px]"
        style={{
          top: "30%",
          left: "60%",
          background: "radial-gradient(circle, rgba(26,61,42,0.35) 0%, transparent 70%)",
          translate: `${-12 * m.x}px ${-10 * m.y}px`,
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }} />
      {stage >= 2 && <FallingGlyphs />}

      {/* Ghost bottle silhouette that springs into place */}
      <motion.div className="absolute inset-0 z-10 pointer-events-none" style={{ y: bottleY }}>
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${stage >= 1 ? 1 : 0.4}) rotate(${stage >= 1 ? "0deg" : "12deg"})`,
          opacity: stage >= 1 ? 0.055 : 0,
          transition: "all 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <svg width="320" height="480" viewBox="0 0 320 480" fill="none">
          <rect x="60" y="140" width="200" height="300" rx="30" fill="white" />
          <rect x="100" y="80" width="120" height="75" rx="15" fill="white" />
          <rect x="85" y="45" width="150" height="50" rx="12" fill="white" />
          <rect x="148" y="0" width="24" height="55" rx="12" fill="white" />
          <rect x="75" y="185" width="170" height="200" rx="12" fill="rgba(255,255,255,0.4)" />
          <rect x="64" y="280" width="192" height="158" fill="rgba(74,140,106,0.45)" />
          <ellipse cx="105" cy="210" rx="18" ry="50" fill="rgba(255,255,255,0.15)" transform="rotate(-10 105 210)" />
        </svg>
      </div>
      </motion.div>

      <motion.div
        className="relative z-30 text-center px-6 max-w-3xl mx-auto flex flex-col items-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <p
          className="text-[11px] uppercase tracking-[7px] text-brand-blush/80 mb-6"
          style={{
            opacity: stage >= 1 ? 1 : 0,
            transform: `translateY(${stage >= 1 ? 0 : 20}px)`,
            transition: "all 0.8s ease 0.1s",
          }}
        >
          Luxury Arabic Bodywash · Est. 2024
        </p>
        <h1
          className="font-serif font-light text-white leading-[1.05] mb-4"
          style={{
            fontSize: "clamp(52px, 9vw, 100px)",
            opacity: stage >= 1 ? 1 : 0,
            transform: `translateY(${stage >= 1 ? 0 : 30}px)`,
            transition: "all 0.9s ease 0.25s",
            textShadow: "0 0 80px rgba(74,140,106,0.3)",
          }}
        >
          Bloom into
          <br />
          <em className="text-brand-blush" style={{ textShadow: "0 0 40px rgba(192,220,203,0.4)" }}>
            Softness
          </em>
        </h1>
        <p
          className="font-arabic text-2xl text-white/35 tracking-[5px] mb-7"
          style={{ opacity: stage >= 1 ? 1 : 0, transition: "opacity 1s ease 0.5s" }}
        >
          زهور · Blossoms
        </p>
        <div
          className="h-px bg-gradient-to-r from-transparent via-brand-rose/60 to-transparent mb-7"
          style={{ width: stage >= 2 ? "200px" : "0px", transition: "width 1s ease 0.6s" }}
        />
        <p
          className="text-white/60 text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
          style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: `translateY(${stage >= 2 ? 0 : 16}px)`,
            transition: "all 0.8s ease 0.7s",
          }}
        >
          Rare botanical extracts, ancient Arabic perfume traditions, and modern skin science — wrapped in one luxurious wash.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: `translateY(${stage >= 2 ? 0 : 20}px)`,
            transition: "all 0.8s ease 0.9s",
          }}
        >
          <Magnetic>
            <Link
              href="/products"
              className="press group relative block overflow-hidden bg-white text-brand-plum font-medium px-8 py-4 rounded-full text-sm sm:text-base transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(74,140,106,0.35)]"
            >
              <span className="relative z-10">Shop the Collection</span>
              <div className="absolute inset-0 bg-brand-blush translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/about"
              className="press block text-white border border-white/30 px-8 py-4 rounded-full text-sm sm:text-base font-medium transition-colors duration-300 hover:border-white hover:bg-white/10 backdrop-blur-sm"
            >
              Our Story
            </Link>
          </Magnetic>
        </div>
        <button
          onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-16 flex flex-col items-center gap-2 group"
          style={{ opacity: stage >= 2 ? 0.45 : 0, transition: "opacity 1s ease 1.5s" }}
          aria-label="Scroll to the collection"
        >
          <span className="text-white text-[10px] tracking-[4px] uppercase group-hover:tracking-[6px] transition-[letter-spacing] duration-300">
            Discover
          </span>
          <div className="relative w-px h-10 overflow-hidden bg-white/15">
            <span className="scroll-cue absolute left-0 top-0 w-px h-4 bg-gradient-to-b from-transparent to-white" />
          </div>
        </button>
      </motion.div>

      <Waves />
    </section>
  );
}
