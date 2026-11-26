"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { HeartIcon, ShoppingBagIcon, BellIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { SIZES, priceFor, type Product, type Size } from "@/lib/products";
import BottleSvg from "./BottleSvg";

function Stars({ rating }: { rating: number | null }) {
  if (!rating) return null;
  const r = Math.round(rating);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`text-sm ${i <= r ? "text-brand-gold" : "text-brand-sand/40"}`}>★</span>
      ))}
    </div>
  );
}

function SizePicker({ selected, onChange }: { selected: Size; onChange: (s: Size) => void }) {
  return (
    <div className="flex gap-2 mt-3">
      {SIZES.map((s) => {
        const active = selected.value === s.value;
        return (
          <button
            key={s.value}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange(s);
            }}
            className="flex-1 py-1.5 rounded-lg text-[10px] font-medium uppercase tracking-wider border transition-all duration-200"
            style={{
              borderColor: active ? "#c9a84c" : "rgba(201,168,76,0.2)",
              background: active ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.03)",
              color: active ? "#c9a84c" : "rgba(255,255,255,0.4)",
              boxShadow: active ? "0 0 10px rgba(201,168,76,0.2)" : "none",
            }}
          >
            {s.value}
          </button>
        );
      })}
    </div>
  );
}

/** Product card with 3D mouse-tilt, cursor-following glare, and slide-up "Add to Cart". */
export default function ProductCard({ product }: { product: Product; showComingSoon?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [wish, setWish] = useState(false);
  const [added, setAdded] = useState(false);
  const [notified, setNotified] = useState(false);
  const [size, setSize] = useState<Size>(SIZES[0]);
  const addItem = useCart((s) => s.addItem);
  const { formatPrice } = useCurrency();
  const soon = !product.inStock;
  const price = priceFor(product, size.value);
  const glow = product.glowColor || "rgba(201,168,76,0.3)";

  return (
    <Link href={`/products/${product.id}`} className="group block" style={{ perspective: "900px" }} data-cursor="View" draggable={false}>
      <div
        ref={cardRef}
        onMouseMove={(e) => {
          if (!cardRef.current) return;
          const r = cardRef.current.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          setTilt({ x: 9 * y, y: -(9 * x) });
          if (glareRef.current) {
            glareRef.current.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
            glareRef.current.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
          }
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setTilt({ x: 0, y: 0 });
          setHover(false);
        }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: product.cardGradient || "linear-gradient(135deg, #0d0810 0%, #1a1028 100%)",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hover ? "translateY(-6px)" : ""}`,
          transition: hover
            ? "transform 0.08s linear, box-shadow 0.35s"
            : "transform 0.55s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s",
          boxShadow: hover
            ? `0 28px 65px -12px ${glow}, 0 0 0 1px rgba(201,168,76,0.4)`
            : `0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,${soon ? "0.18" : "0.25"})`,
          willChange: "transform",
        }}
      >
        {soon && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-0"
            style={{
              background:
                "linear-gradient(135deg, transparent 0%, rgba(201,168,76,0.06) 40%, transparent 60%, rgba(201,168,76,0.04) 100%)",
              animation: "goldShimmer 4s ease-in-out infinite",
            }}
          />
        )}
        <div className="card-shine" />
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl transition-opacity duration-300"
          style={
            {
              "--gx": "50%",
              "--gy": "50%",
              background: "radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.07) 0%, transparent 55%)",
              opacity: hover ? 1 : 0,
            } as React.CSSProperties
          }
        />

        <div className="relative h-56 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 60%, ${product.glowColor || "rgba(201,168,76,0.25)"} 0%, transparent 65%)`,
              opacity: hover ? 1 : 0.5,
            }}
          />
          {product.images?.[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.name}
              draggable={false}
              className="h-44 w-auto object-contain select-none rounded-xl"
              style={{
                transform: hover ? "scale(1.1) translateY(-6px)" : "scale(1)",
                transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
                filter: hover ? `drop-shadow(0 16px 28px ${product.glowColor || "rgba(201,168,76,0.35)"})` : "none",
              }}
            />
          ) : (
            <div
              style={{
                transform: hover ? "scale(1.1) translateY(-6px)" : "scale(1)",
                transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            >
              <BottleSvg color={product.accentColor} symbol={product.symbol} />
            </div>
          )}

          <div className="absolute top-3 left-3 z-20">
            {product.badge && (
              <span
                className="text-[9px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider"
                style={
                  soon
                    ? { background: "rgba(201,168,76,0.15)", color: "#e8cc7a", border: "1px solid rgba(201,168,76,0.35)" }
                    : { background: "rgba(201,168,76,0.9)", color: "#1a0e04" }
                }
              >
                {product.badge}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              setWish(!wish);
            }}
            className="absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-20"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.08)" }}
            aria-label="Toggle wishlist"
          >
            {wish ? <HeartSolid className="w-4 h-4" style={{ color: "#e8cc7a" }} /> : <HeartIcon className="w-4 h-4 text-white/50" />}
          </button>

          {!soon && (
            <div
              className="absolute inset-x-0 bottom-0 p-3 z-20"
              style={{
                transform: hover ? "translateY(0)" : "translateY(110%)",
                transition: "transform 0.38s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addItem({ ...product, id: `${product.id}-${size.value}`, price, size: size.value });
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2200);
                }}
                className="w-full text-sm font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
                style={{
                  background: added ? "rgba(74,140,106,0.9)" : "rgba(201,168,76,0.92)",
                  color: added ? "white" : "#1a0e04",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                  transform: added ? "scale(0.97)" : "scale(1)",
                }}
              >
                {added ? (
                  <>
                    <span className="text-base">✓</span> Added — {formatPrice(price)}
                  </>
                ) : (
                  <>
                    <ShoppingBagIcon className="w-4 h-4" /> Add to Cart · {formatPrice(price)}
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div
          className="p-5"
          style={{ borderTop: `1px solid rgba(201,168,76,${soon ? "0.1" : "0.18"})`, background: "rgba(0,0,0,0.2)" }}
        >
          <p className="text-[9px] uppercase tracking-[3px] mb-1" style={{ color: "rgba(201,168,76,0.55)" }}>{product.scent}</p>
          <h3
            className="font-serif font-light leading-tight mb-1"
            style={{ fontSize: "clamp(15px, 2vw, 18px)", color: soon ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.92)" }}
          >
            {product.name}
          </h3>
          <p className="text-[11px] leading-relaxed mb-3 line-clamp-2" style={{ color: "rgba(255,255,255,0.28)" }}>{product.story}</p>
          {product.rating && (
            <div className="flex items-center gap-2 mb-3">
              <Stars rating={product.rating} />
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>({product.reviewCount})</span>
            </div>
          )}
          {!soon && (
            <>
              <SizePicker selected={size} onChange={setSize} />
              <div className="flex items-baseline gap-2 mt-3">
                <span className="font-semibold text-base" style={{ color: "#e8cc7a" }}>{formatPrice(price)}</span>
                <span className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>/ {size.value}</span>
              </div>
            </>
          )}
          {soon && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setNotified(true);
                setTimeout(() => setNotified(false), 3000);
              }}
              className="w-full mt-1 py-2.5 rounded-xl text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                background: notified ? "rgba(74,140,106,0.2)" : "rgba(201,168,76,0.08)",
                border: `1px solid rgba(201,168,76,${notified ? "0.5" : "0.25"})`,
                color: notified ? "#82b08e" : "rgba(201,168,76,0.65)",
              }}
            >
              {notified ? (
                <>
                  <span>✓</span> You&apos;ll be notified
                </>
              ) : (
                <>
                  <BellIcon className="w-3.5 h-3.5" /> Notify Me
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
