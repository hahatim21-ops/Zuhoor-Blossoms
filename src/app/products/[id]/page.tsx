"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeftIcon,
  ShoppingBagIcon,
  HeartIcon,
  BellIcon,
  ShieldCheckIcon,
  TruckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { PRODUCTS, SIZES, priceFor, type Product, type Size } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import BottleSvg from "@/components/BottleSvg";
import Footer from "@/components/Footer";

function Stars({ rating }: { rating: number | null }) {
  if (!rating) return null;
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`text-lg ${i <= Math.round(rating) ? "text-brand-gold" : "text-white/15"}`}>★</span>
      ))}
    </div>
  );
}

function SizeSelect({
  product,
  selected,
  onChange,
  formatPrice,
}: {
  product: Product;
  selected: Size;
  onChange: (s: Size) => void;
  formatPrice: (n: number) => string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[4px] mb-3" style={{ color: "rgba(201,168,76,0.6)" }}>Select Size</p>
      <div className="flex gap-3">
        {SIZES.map((s) => {
          const active = selected.value === s.value;
          return (
            <button
              key={s.value}
              onClick={() => onChange(s)}
              className="flex-1 py-3 px-4 rounded-xl border transition-all duration-200 text-left"
              style={{
                borderColor: active ? "#c9a84c" : "rgba(255,255,255,0.1)",
                background: active ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.03)",
                boxShadow: active ? "0 0 20px rgba(201,168,76,0.15)" : "none",
              }}
            >
              <p className="text-xs font-semibold mb-0.5" style={{ color: active ? "#e8cc7a" : "rgba(255,255,255,0.55)" }}>{s.value}</p>
              <p className="text-sm font-medium" style={{ color: active ? "#c9a84c" : "rgba(255,255,255,0.3)" }}>
                {formatPrice(priceFor(product, s.value))}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ScentNotes({ scent }: { scent: string }) {
  const notes = scent.split("·").map((s) => s.trim()).filter(Boolean);
  return (
    <div className="flex flex-wrap gap-2">
      {notes.map((n) => (
        <span
          key={n}
          className="text-[10px] uppercase tracking-[2px] px-3 py-1.5 rounded-full"
          style={{ border: "1px solid rgba(201,168,76,0.3)", color: "rgba(201,168,76,0.8)", background: "rgba(201,168,76,0.06)" }}
        >
          {n}
        </span>
      ))}
    </div>
  );
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id) || null;
  const addItem = useCart((s) => s.addItem);
  const { formatPrice } = useCurrency();
  const [size, setSize] = useState<Size>(SIZES[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wish, setWish] = useState(false);
  const [notified, setNotified] = useState(false);

  if (!product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: "linear-gradient(180deg, #070c08 0%, #0d1810 100%)" }}>
        <p className="font-serif text-3xl" style={{ color: "rgba(255,255,255,0.7)" }}>Product not found</p>
        <Link href="/products" className="px-8 py-3 rounded-full text-sm font-medium" style={{ background: "#c9a84c", color: "#1a0e04" }}>
          Back to Shop
        </Link>
      </div>
    );

  const unit = priceFor(product, size.value);
  const soon = !product.inStock;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id && p.inStock).slice(0, 4);

  return (
    <>
      <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #070c08 0%, #0d1810 50%, #070c08 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm mb-10 transition-colors duration-200 hover:opacity-100"
            style={{ color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to collection
          </Link>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div
              className="md:sticky top-24 rounded-3xl flex flex-col items-center justify-center py-10 px-8 overflow-hidden relative page-reveal"
              style={{
                background: product.cardGradient,
                border: "1px solid rgba(201,168,76,0.2)",
                boxShadow: `0 0 80px ${product.glowColor}`,
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 55%, ${product.glowColor} 0%, transparent 60%)` }}
              />
              <div className="relative z-10 flex items-center justify-center" style={{ height: 320 }}>
                {product.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-auto object-contain select-none rounded-2xl"
                    style={{ filter: `drop-shadow(0 20px 40px ${product.glowColor})` }}
                  />
                ) : (
                  <BottleSvg color={product.accentColor} symbol={product.symbol} className="w-48 h-72" />
                )}
              </div>
              {product.productLine && (
                <div
                  className="relative z-10 mt-6 px-4 py-2 rounded-full text-[10px] uppercase tracking-[3px]"
                  style={{ border: "1px solid rgba(201,168,76,0.25)", color: "rgba(201,168,76,0.65)", background: "rgba(0,0,0,0.3)" }}
                >
                  {product.productLine} Collection
                </div>
              )}
            </div>

            <div className="py-4 page-reveal" style={{ animationDelay: "0.12s", opacity: 0 }}>
              <p className="text-[10px] uppercase tracking-[5px] mb-3" style={{ color: "#c9a84c" }}>{product.badge || "Zuhoor Blossoms"}</p>
              <h1 className="font-serif font-light leading-tight mb-3" style={{ fontSize: "clamp(28px, 4vw, 52px)", color: "rgba(255,255,255,0.92)" }}>
                {product.name}
              </h1>
              {product.rating && (
                <div className="flex items-center gap-3 mb-5">
                  <Stars rating={product.rating} />
                  <span className="font-medium text-sm" style={{ color: "#e8cc7a" }}>{product.rating}</span>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>· {product.reviewCount} reviews</span>
                </div>
              )}
              <p
                className="font-serif font-light italic leading-relaxed mb-6 border-l-2 pl-4"
                style={{ fontSize: "clamp(14px, 1.8vw, 18px)", color: "rgba(255,255,255,0.55)", borderColor: "rgba(201,168,76,0.4)" }}
              >
                &quot;{product.story}&quot;
              </p>
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[4px] mb-3" style={{ color: "rgba(201,168,76,0.6)" }}>Scent Notes</p>
                <ScentNotes scent={product.scent} />
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>{product.description}</p>
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[4px] mb-3" style={{ color: "rgba(201,168,76,0.6)" }}>Key Benefits</p>
                <ul className="space-y-2">
                  {product.keyBenefits.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                      <span style={{ color: "#c9a84c", fontSize: 8 }}>✦</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] uppercase tracking-[2px] px-3 py-1 rounded-full"
                    style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.03)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mb-7 h-px" style={{ background: "linear-gradient(to right, rgba(201,168,76,0.3), transparent)" }} />

              {soon ? (
                <div className="p-6 rounded-2xl text-center" style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.04)" }}>
                  <p className="font-serif text-lg mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>Coming Soon</p>
                  <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>Be the first to know when this scent launches.</p>
                  <button
                    onClick={() => {
                      setNotified(true);
                      setTimeout(() => setNotified(false), 3000);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium uppercase tracking-wider transition-all duration-300"
                    style={{
                      background: notified ? "rgba(74,140,106,0.2)" : "rgba(201,168,76,0.1)",
                      border: `1px solid rgba(201,168,76,${notified ? "0.5" : "0.3"})`,
                      color: notified ? "#82b08e" : "rgba(201,168,76,0.8)",
                    }}
                  >
                    {notified ? (
                      <>
                        <span>✓</span> You&apos;ll be notified
                      </>
                    ) : (
                      <>
                        <BellIcon className="w-4 h-4" /> Notify Me at Launch
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <SizeSelect product={product} selected={size} onChange={setSize} formatPrice={formatPrice} />
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                      <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-lg transition-colors duration-200 hover:text-white" style={{ color: "rgba(255,255,255,0.4)" }}>
                        −
                      </button>
                      <span className="px-5 py-3 font-medium min-w-[44px] text-center" style={{ color: "rgba(255,255,255,0.8)" }}>{qty}</span>
                      <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-lg transition-colors duration-200 hover:text-white" style={{ color: "rgba(255,255,255,0.4)" }}>
                        +
                      </button>
                    </div>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                      Total: <span style={{ color: "#e8cc7a" }}>{formatPrice(unit * qty)}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      addItem({ ...product, id: `${product.id}-${size.value}`, price: unit, size: size.value }, qty);
                      setAdded(true);
                      setTimeout(() => setAdded(false), 2500);
                    }}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-medium text-sm mb-3 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: added ? "rgba(74,140,106,0.9)" : "#c9a84c",
                      color: added ? "white" : "#1a0e04",
                      boxShadow: added ? "0 8px 32px rgba(74,140,106,0.3)" : "0 8px 32px rgba(201,168,76,0.35)",
                    }}
                  >
                    {added ? (
                      <>
                        <span>✓</span> Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBagIcon className="w-4 h-4" /> Add to Cart — {formatPrice(unit * qty)}
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setWish(!wish)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      border: `1px solid rgba(201,168,76,${wish ? "0.5" : "0.15"})`,
                      color: wish ? "#e8cc7a" : "rgba(255,255,255,0.35)",
                      background: wish ? "rgba(201,168,76,0.08)" : "transparent",
                    }}
                  >
                    {wish ? (
                      <>
                        <HeartSolid className="w-4 h-4" /> Saved to Wishlist
                      </>
                    ) : (
                      <>
                        <HeartIcon className="w-4 h-4" /> Save to Wishlist
                      </>
                    )}
                  </button>
                </>
              )}

              <div className="grid grid-cols-3 gap-3 mt-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  { icon: <ShieldCheckIcon className="w-5 h-5" />, label: "Secure Checkout" },
                  { icon: <TruckIcon className="w-5 h-5" />, label: "Free Shipping Rs 800+" },
                  { icon: <ArrowPathIcon className="w-5 h-5" />, label: "30-Day Returns" },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col items-center gap-1.5 text-center">
                    <span style={{ color: "#c9a84c" }}>{f.icon}</span>
                    <span className="text-[10px] leading-tight" style={{ color: "rgba(255,255,255,0.3)" }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-24">
              <div className="flex items-center gap-4 mb-10">
                <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.3))" }} />
                <p className="text-[10px] uppercase tracking-[5px] whitespace-nowrap" style={{ color: "rgba(201,168,76,0.6)" }}>You May Also Like</p>
                <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.3))" }} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
