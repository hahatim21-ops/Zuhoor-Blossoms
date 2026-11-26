"use client";

import ProductCard from "@/components/ProductCard";
import { useDragScroll } from "@/lib/useDragScroll";
import { COMING_SOON, IN_STOCK } from "@/lib/products";
import { useInView } from "@/lib/useInView";

const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
const countWord = (n: number) => WORDS[n] ?? String(n);

function Heading({
  eyebrow,
  title,
  sub,
  visible,
  delay = 0,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  visible: boolean;
  delay?: number;
}) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 28}px)`,
        transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      }}
    >
      <p className="text-[10px] uppercase tracking-[6px] font-semibold mb-3" style={{ color: "#c9a84c" }}>{eyebrow}</p>
      <h2 className="font-serif font-light leading-tight mb-4" style={{ fontSize: "clamp(30px, 4.5vw, 52px)", color: "rgba(255,255,255,0.92)" }}>
        {title}
      </h2>
      {sub && <p className="text-sm leading-relaxed max-w-md" style={{ color: "rgba(255,255,255,0.38)" }}>{sub}</p>}
    </div>
  );
}

function Divider({ visible }: { visible: boolean }) {
  return (
    <div className="flex items-center gap-4 my-16">
      <div
        className="flex-1 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.4))", opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.2s" }}
      />
      <div style={{ color: "#c9a84c", fontSize: 18, opacity: visible ? 0.7 : 0, transition: "opacity 1s ease 0.4s" }}>✦</div>
      <div
        className="flex-1 h-px"
        style={{ background: "linear-gradient(to left, transparent, rgba(201,168,76,0.4))", opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.2s" }}
      />
    </div>
  );
}

export default function ProductsShowcase() {
  const [stockRef, stockIn] = useInView(0.2);
  const [soonRef, soonIn] = useInView(0.2);
  const [divRef, divIn] = useInView(0.3);
  const scroller = useDragScroll<HTMLDivElement>();
  const scrollBy = (dir: number) => scroller.current?.scrollBy({ left: 300 * dir, behavior: "smooth" });

  const arrowStyle = {
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(201,168,76,0.3)",
    color: "#c9a84c",
  };

  return (
    <section id="collection" className="py-24 px-6 overflow-hidden scroll-mt-16" style={{ background: "linear-gradient(180deg, #070c08 0%, #0d1810 50%, #070c08 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <div ref={stockRef} className="mb-12">
          <Heading
            eyebrow="Available Now"
            title={
              <>
                In Stock — <em className="font-light">Ready to Ship</em>
              </>
            }
            sub={`${countWord(IN_STOCK.length)} signature scents, hand-crafted and ready for your ritual. Free shipping on orders over Rs 800.`}
            visible={stockIn}
          />
        </div>
        {/* 3 columns keeps the full collection of 9 in tidy rows */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {IN_STOCK.map((p, i) => (
            <div
              key={p.id}
              style={{
                opacity: stockIn ? 1 : 0,
                transform: `translateY(${stockIn ? 0 : 48}px)`,
                transition: `opacity 0.8s ease ${0.1 + 0.06 * i}s, transform 0.8s ease ${0.1 + 0.06 * i}s`,
              }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {COMING_SOON.length > 0 && (
        <>
        <div ref={divRef}>
          <Divider visible={divIn} />
        </div>

        <div ref={soonRef} className="mb-12">
          <Heading
            eyebrow="The Next Chapter"
            title={
              <>
                Coming Soon — <em className="font-light">Notify Me</em>
              </>
            }
            sub="New scents in development. Be the first to experience them when they launch."
            visible={soonIn}
            delay={0.1}
          />
        </div>
        <div className="relative">
          <button
            onClick={() => scrollBy(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
            style={arrowStyle}
            aria-label="Scroll left"
          >
            ‹
          </button>
          <div ref={scroller} className="drag-scroll flex gap-5 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
            {COMING_SOON.map((p, i) => (
              <div
                key={p.id}
                className="flex-none w-[260px] sm:w-[280px]"
                style={{
                  scrollSnapAlign: "start",
                  opacity: soonIn ? 1 : 0,
                  transform: `translateX(${soonIn ? 0 : 48}px)`,
                  transition: `opacity 0.8s ease ${0.1 + 0.1 * i}s, transform 0.8s ease ${0.1 + 0.1 * i}s`,
                }}
              >
                <ProductCard product={p} showComingSoon />
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollBy(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
            style={arrowStyle}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
        </>
        )}
      </div>
    </section>
  );
}
