"use client";

import Link from "next/link";
import { useInView } from "@/lib/useInView";

export default function FinalCta() {
  const [ref, inView] = useInView(0.2);
  return (
    <section className="py-24 px-6 text-center" style={{ background: "#0f1a11" }}>
      <div className="max-w-xl mx-auto">
        <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: `translateY(${inView ? 0 : 30}px)`, transition: "all 0.9s ease" }}>
          <p className="text-[10px] uppercase tracking-[6px] mb-3 font-medium" style={{ color: "#c9a84c" }}>Begin Your Ritual</p>
          <h2 className="font-serif font-light leading-tight mb-5" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "rgba(255,255,255,0.88)" }}>
            Your Skin Deserves
            <br />
            <em className="font-light" style={{ color: "#c0dccb" }}>the Finest</em>
          </h2>
          <p className="leading-relaxed mb-8 text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>
            Join thousands who have transformed their daily shower into a ceremony of luxury. Free shipping on orders over Rs 800.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 font-medium px-10 py-4 rounded-full text-base transition-all duration-300 hover:-translate-y-1"
            style={{ background: "#c9a84c", color: "#1a0e04", boxShadow: "0 12px 40px rgba(201,168,76,0.35)" }}
          >
            Shop the Collection <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
