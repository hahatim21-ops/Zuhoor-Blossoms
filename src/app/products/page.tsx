"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { CATEGORIES, COMING_SOON, IN_STOCK, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

const GIFT_SETS = [
  {
    id: "gift-platinum",
    name: "Platinum Gift Set",
    desc: "The ultimate luxury experience. Choose any 4 bodywashes from our collection.",
    includes: "4 Full-Size Bodywashes (250ml each)",
    price: 1799,
    symbol: "✦",
    accentColor: "#e8e0d0",
    rgb: "232,224,208",
    glowColor: "rgba(232,224,208,0.25)",
    cardGradient: "linear-gradient(135deg, #0e0c08 0%, #201c10 50%, #2e2818 100%)",
    badge: "Best Value",
  },
  {
    id: "gift-gold",
    name: "Gold Gift Set",
    desc: "Three signature scents curated for the discerning soul.",
    includes: "3 Full-Size Bodywashes (250ml each)",
    price: 1299,
    symbol: "◈",
    accentColor: "#c9a84c",
    rgb: "201,168,76",
    glowColor: "rgba(201,168,76,0.3)",
    cardGradient: "linear-gradient(135deg, #100a04 0%, #2a1808 50%, #3a2210 100%)",
    badge: "Most Popular",
  },
  {
    id: "gift-silver",
    name: "Silver Gift Set",
    desc: "A perfect introduction to the world of Zuhoor Blossoms.",
    includes: "2 Full-Size Bodywashes (250ml each)",
    price: 999,
    symbol: "∗",
    accentColor: "#a8b8b0",
    rgb: "168,184,176",
    glowColor: "rgba(168,184,176,0.2)",
    cardGradient: "linear-gradient(135deg, #080c0a 0%, #141e1a 50%, #1e2e28 100%)",
    badge: null,
  },
];

function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length)
    return (
      <div className="text-center py-16">
        <p className="font-serif text-2xl text-brand-plum mb-2">No products found</p>
        <p className="text-brand-muted text-sm">Try a different filter.</p>
      </div>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((p, i) => (
        <div key={p.id} className="page-reveal" style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}

function GiftSetCard({ set }: { set: (typeof GIFT_SETS)[number] }) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);
  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ background: set.cardGradient, border: `1px solid rgba(${set.rgb},0.25)`, boxShadow: `0 4px 30px ${set.glowColor}` }}
    >
      {set.badge && (
        <div className="absolute top-4 right-4">
          <span className="text-[9px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider" style={{ background: set.accentColor, color: "#1a0e04" }}>
            {set.badge}
          </span>
        </div>
      )}
      <div className="p-8">
        <div className="text-5xl font-serif mb-6 text-center" style={{ color: set.accentColor }}>{set.symbol}</div>
        <h3 className="font-serif font-light text-2xl mb-2 text-center" style={{ color: "rgba(255,255,255,0.88)" }}>{set.name}</h3>
        <p className="text-[10px] uppercase tracking-[3px] text-center mb-4" style={{ color: set.accentColor, opacity: 0.7 }}>{set.includes}</p>
        <p className="text-sm leading-relaxed text-center mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>{set.desc}</p>
        <p className="text-center font-serif text-3xl font-light mb-6" style={{ color: set.accentColor }}>Rs {set.price}</p>
        <button
          onClick={() => {
            addItem({ ...set, quantity: 1 });
            setAdded(true);
            setTimeout(() => setAdded(false), 2500);
          }}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: added ? "rgba(74,140,106,0.9)" : set.accentColor,
            color: added ? "white" : "#1a0e04",
            boxShadow: added ? "0 6px 24px rgba(74,140,106,0.3)" : `0 6px 24px ${set.glowColor}`,
          }}
        >
          {added ? (
            <>
              <span>✓</span> Added to Cart
            </>
          ) : (
            <>
              <ShoppingBagIcon className="w-4 h-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [category, setCategory] = useState("all");
  const filter = (list: Product[]) => (category === "all" ? list : list.filter((p) => p.category === category));
  const available = filter(IN_STOCK);
  const soon = filter(COMING_SOON);

  return (
    <>
      <div className="px-6 lg:px-8 py-14" style={{ background: "linear-gradient(180deg, #070c08 0%, #0d1810 50%, #070c08 100%)", minHeight: "100vh" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 page-reveal">
            <p className="text-[10px] uppercase tracking-[6px] font-medium mb-3" style={{ color: "#c9a84c" }}>The Full Collection</p>
            <h1 className="font-serif font-light leading-tight" style={{ fontSize: "clamp(32px, 5vw, 56px)", color: "rgba(255,255,255,0.92)" }}>
              Shop All <em className="font-light" style={{ color: "#c0dccb" }}>Bodywashes</em>
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            {CATEGORIES.map((c) => {
              const active = category === c.value;
              return (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className="relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 hover:!text-white/90"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    color: active ? "#1a0e04" : "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute -inset-px rounded-full"
                      style={{ background: "#c9a84c", boxShadow: "0 6px 20px rgba(201,168,76,0.35)" }}
                      transition={{ type: "spring", duration: 0.45, bounce: 0.2 }}
                    />
                  )}
                  <span className={`relative ${active ? "!text-[#1a0e04]" : ""}`}>{c.label}</span>
                </button>
              );
            })}
          </div>

          {available.length > 0 && (
            <div className="mb-16" key={`a-${category}`}>
              <div className="flex items-center gap-4 mb-8">
                <p className="text-[10px] uppercase tracking-[5px] whitespace-nowrap" style={{ color: "#c9a84c" }}>Available Now</p>
                <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(201,168,76,0.3), transparent)" }} />
              </div>
              <ProductGrid products={available} />
            </div>
          )}

          {soon.length > 0 && (
            <div className="mb-16" key={`s-${category}`}>
              <div className="flex items-center gap-4 mb-8">
                <p className="text-[10px] uppercase tracking-[5px] whitespace-nowrap" style={{ color: "rgba(201,168,76,0.55)" }}>Coming Soon</p>
                <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(201,168,76,0.2), transparent)" }} />
              </div>
              <ProductGrid products={soon} />
            </div>
          )}

          <div className="mt-24">
            <div className="flex items-center gap-4 mb-14">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.4))" }} />
              <p className="text-[10px] uppercase tracking-[5px] whitespace-nowrap" style={{ color: "rgba(201,168,76,0.6)" }}>Curated Collections</p>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.4))" }} />
            </div>
            <div className="text-center mb-12">
              <h2 className="font-serif font-light leading-tight" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "rgba(255,255,255,0.88)" }}>
                Gift Sets — <em className="font-light" style={{ color: "#c9a84c" }}>For Those Who Give Luxury</em>
              </h2>
              <p className="text-sm mt-3 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.35)" }}>
                Beautifully presented gift sets — the perfect way to share the Zuhoor experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GIFT_SETS.map((s) => (
                <GiftSetCard key={s.id} set={s} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
