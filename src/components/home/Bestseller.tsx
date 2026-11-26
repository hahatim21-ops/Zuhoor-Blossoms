"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/lib/cart";
import { PRODUCTS, SIZES, priceFor, type Size } from "@/lib/products";
import BottleSvg from "@/components/BottleSvg";

const product = PRODUCTS.find((p) => p.id === "2")!;

const ITEM: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
};

function NotePill({ note }: { note: string }) {
  return (
    <span
      className="text-[9px] uppercase tracking-[2px] px-3 py-1.5 rounded-full"
      style={{ border: "1px solid rgba(201,168,76,0.3)", color: "rgba(201,168,76,0.8)", background: "rgba(201,168,76,0.06)" }}
    >
      {note}
    </span>
  );
}

export default function Bestseller() {
  const addItem = useCart((s) => s.addItem);
  const [size, setSize] = useState<Size>(SIZES[0]);
  const [added, setAdded] = useState(false);
  const price = priceFor(product, size.value);
  const notes = product.scent.split("·").map((s) => s.trim()).filter(Boolean);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const sx = useSpring(tiltX, { stiffness: 120, damping: 14 });
  const sy = useSpring(tiltY, { stiffness: 120, damping: 14 });

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #080e09 0%, #101d12 40%, #0d1810 100%)", minHeight: "85vh" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 70% at 30% 50%, ${product.glowColor} 0%, transparent 65%)` }}
      />
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-full relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-20">
        <div
          className="flex-1 flex items-center justify-center"
          style={{ perspective: 1000 }}
          onPointerMove={(e) => {
            if (e.pointerType !== "mouse") return;
            const r = e.currentTarget.getBoundingClientRect();
            tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 18);
            tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
          }}
          onPointerLeave={() => {
            tiltX.set(0);
            tiltY.set(0);
          }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 55%, ${product.glowColor} 0%, transparent 60%)`,
                filter: "blur(40px)",
                scale: 1.5,
              }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="relative z-10"
              style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }}
              initial={{ clipPath: "inset(100% 0% 0% 0% round 16px)", opacity: 0.4 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0% round 16px)", opacity: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
            >
              <div className="float-y">
                {product.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    draggable={false}
                    className="h-[420px] w-auto object-contain select-none rounded-2xl"
                    style={{ filter: `drop-shadow(0 24px 48px ${product.glowColor})` }}
                  />
                ) : (
                  <BottleSvg color={product.accentColor} symbol={product.symbol} className="w-56 h-80" />
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="flex-1 max-w-md"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        >
          <motion.div variants={ITEM}>
            <p className="text-[10px] uppercase tracking-[6px] mb-4" style={{ color: "#c9a84c" }}>Our Bestseller</p>
            <h2 className="font-serif font-light leading-tight mb-2" style={{ fontSize: "clamp(32px, 4vw, 56px)", color: "rgba(255,255,255,0.92)" }}>
              {product.name}
            </h2>
            <p className="text-sm mb-5" style={{ color: "rgba(201,168,76,0.55)", fontVariant: "small-caps", letterSpacing: "2px" }}>
              {product.productLine} Collection
            </p>
          </motion.div>
          <motion.div variants={ITEM} className="flex flex-wrap gap-2 mb-5">
            {notes.map((n) => (
              <NotePill key={n} note={n} />
            ))}
          </motion.div>
          <motion.p
            variants={ITEM}
            className="font-serif font-light italic text-base leading-relaxed mb-6 pl-4"
            style={{ color: "rgba(255,255,255,0.45)", borderLeft: "2px solid rgba(201,168,76,0.4)" }}
          >
            &quot;{product.story}&quot;
          </motion.p>
          <motion.div variants={ITEM} className="mb-5">
            <p className="text-[10px] uppercase tracking-[4px] mb-3" style={{ color: "rgba(201,168,76,0.6)" }}>Select Size</p>
            <div className="flex gap-3">
              {SIZES.map((s) => {
                const active = size.value === s.value;
                return (
                  <button
                    key={s.value}
                    onClick={() => setSize(s)}
                    className="flex-1 py-3 px-4 rounded-xl border transition-all duration-200 text-left"
                    style={{
                      borderColor: active ? "#c9a84c" : "rgba(255,255,255,0.1)",
                      background: active ? "rgba(201,168,76,0.12)" : "rgba(255,255,255,0.03)",
                      boxShadow: active ? "0 0 20px rgba(201,168,76,0.15)" : "none",
                    }}
                  >
                    <p className="text-xs font-semibold mb-0.5" style={{ color: active ? "#e8cc7a" : "rgba(255,255,255,0.55)" }}>{s.value}</p>
                    <p className="text-sm font-medium" style={{ color: active ? "#c9a84c" : "rgba(255,255,255,0.3)" }}>Rs {priceFor(product, s.value)}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>
          <motion.div variants={ITEM}>
          <button
            onClick={() => {
              addItem({ ...product, id: `${product.id}-${size.value}`, price, size: size.value });
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
                <ShoppingBagIcon className="w-4 h-4" /> Add to Cart — Rs {price}
              </>
            )}
          </button>
          <Link href="/products" className="block text-center text-sm transition-colors duration-200 hover:opacity-80" style={{ color: "rgba(255,255,255,0.3)" }}>
            View Full Collection →
          </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
