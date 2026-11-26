"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";
import { useDragScroll } from "@/lib/useDragScroll";

const REVIEWS = [
  { name: "Zara A.", location: "Mumbai, India", flag: "🇮🇳", rating: 5, product: "Velvet Embers in Cairo", initial: "Z", text: "I ordered Velvet Embers on a whim and I genuinely cannot stop buying it. The oud lingers for hours after my shower. My family keeps asking what perfume I'm wearing — it's my bodywash!" },
  { name: "Riya S.", location: "Pune, India", flag: "🇮🇳", rating: 5, product: "Evening in Paris", initial: "R", text: "Evening in Paris feels like a luxury spa in a bottle. The rose and wood scent is so refined — nothing in this price range smells this good. I've gifted it to three friends already." },
  { name: "Mehreen K.", location: "Karachi, Pakistan", flag: "🇵🇰", rating: 5, product: "Caramel Nights in Cannes", initial: "M", text: "Caramel Nights is everything. Rich, warm, and completely addictive. I use it every single night and the scent still lingers in the morning. Worth every rupee — actually worth more." },
  { name: "Aisha F.", location: "Dubai, UAE", flag: "🇦🇪", rating: 5, product: "Bon Bons in Bahrain", initial: "A", text: "Bon Bons reminds me of the souks back home — coffee, oud, warmth. It's nostalgic and deeply luxurious at the same time. Zuhoor has created something truly special here." },
  { name: "Priya N.", location: "Bangalore, India", flag: "🇮🇳", rating: 5, product: "Velvet Embers in Cairo", initial: "P", text: "I was skeptical about a luxury bodywash at this price but one bottle changed my mind. The lather is creamy, the scent is intoxicating, and my skin feels genuinely moisturised. Obsessed." },
  { name: "Sana T.", location: "Lahore, Pakistan", flag: "🇵🇰", rating: 5, product: "Evening in Paris", initial: "S", text: "Ordered as a birthday treat for myself and I'm placing my second order already. Evening in Paris is the kind of scent that makes you feel put-together even on the laziest days." },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill={i < count ? "#c9a84c" : "rgba(255,255,255,0.1)"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/** Number that counts up from 0 when scrolled into view. */
function Counter({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const [ref, inView] = useInView(0.3);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const step = value / 93.75;
    let cur = 0;
    const id = setInterval(() => {
      cur = Math.min(cur + step, value);
      setN(Math.round(cur));
      if (cur >= value) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, value]);
  return (
    <div ref={ref} className="text-center">
      <p className="font-serif text-5xl font-light" style={{ color: "rgba(255,255,255,0.92)" }}>
        {n}
        {suffix}
      </p>
      <p className="text-sm mt-1 tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
    </div>
  );
}

function ReviewCard({ r, index }: { r: (typeof REVIEWS)[number]; index: number }) {
  const [ref, inView] = useInView(0.12);
  return (
    <div
      ref={ref}
      className="review-card flex-shrink-0 w-[300px] sm:w-[320px] rounded-2xl p-6 snap-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: `translateY(${inView ? 0 : 28}px)`,
        transition: `opacity 0.55s ease ${0.08 * index}s, transform 0.55s ease ${0.08 * index}s`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <Stars count={r.rating} />
        <span
          className="text-[9px] uppercase tracking-[2px] px-2 py-1 rounded-full"
          style={{ border: "1px solid rgba(201,168,76,0.25)", color: "rgba(201,168,76,0.7)", background: "rgba(201,168,76,0.06)" }}
        >
          {r.product}
        </span>
      </div>
      <p className="text-sm leading-relaxed mb-5 line-clamp-4" style={{ color: "rgba(255,255,255,0.55)" }}>
        <span className="font-serif text-lg leading-none mr-0.5" style={{ color: "#c9a84c" }}>&quot;</span>
        {r.text}
        <span className="font-serif text-lg leading-none ml-0.5" style={{ color: "#c9a84c" }}>&quot;</span>
      </p>
      <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
          style={{ background: "rgba(201,168,76,0.2)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}
        >
          {r.initial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: "rgba(255,255,255,0.75)" }}>
            {r.name} <span className="font-normal text-xs">{r.flag}</span>
          </p>
          <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.3)" }}>{r.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [ref, inView] = useInView(0.15);
  const dragRef = useDragScroll<HTMLDivElement>();
  return (
    <section className="overflow-hidden" style={{ background: "linear-gradient(180deg, #0f1a11, #0d1810)" }}>
      <div className="py-16 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0e1a10, #1a3d2a, #2d5a40)" }}>
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{ background: "rgba(74,140,106,0.1)" }} />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full blur-3xl animate-pulse" style={{ background: "rgba(201,168,76,0.08)", animationDelay: "1s" }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid grid-cols-3 gap-10">
            <Counter value={9} label="Signature Scents" />
            <Counter value={1200} label="Happy Customers" suffix="+" />
            <Counter value={100} label="Natural Ingredients" suffix="%" />
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            ref={ref}
            className="mb-12"
            style={{ opacity: inView ? 1 : 0, transform: `translateY(${inView ? 0 : 24}px)`, transition: "all 0.8s ease" }}
          >
            <p className="text-[10px] uppercase tracking-[6px] font-medium mb-3" style={{ color: "#c9a84c" }}>Real Stories</p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h2 className="font-serif font-light leading-tight" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "rgba(255,255,255,0.88)" }}>
                Loved by <em className="font-light" style={{ color: "#c0dccb" }}>Thousands</em>
              </h2>
              <div className="flex items-center gap-2 text-sm">
                <Stars count={5} />
                <span className="font-semibold" style={{ color: "#e8cc7a" }}>4.9</span>
                <span style={{ color: "rgba(255,255,255,0.3)" }}>· 1,200+ reviews</span>
              </div>
            </div>
          </div>
          <div ref={dragRef} className="drag-scroll flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-2 px-2">
            {REVIEWS.map((r, i) => (
              <ReviewCard key={r.name} r={r} index={i} />
            ))}
          </div>
          <p className="mt-4 text-center text-[11px] tracking-widest uppercase select-none" style={{ color: "rgba(255,255,255,0.2)" }}>
            ← drag or scroll to read more →
          </p>
        </div>
      </div>
    </section>
  );
}
