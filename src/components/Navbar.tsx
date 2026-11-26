"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserIcon, ShoppingBagIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useCart } from "@/lib/cart";
import Logo from "./Logo";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);
  const openCart = useCart((s) => s.openCart);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      // Tuck the bar away while reading downward; bring it back on any upward scroll.
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 160);
        lastY.current = y;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(7,12,8,0.98)" : "rgba(7,12,8,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          transform: hidden && !mobileOpen ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 420ms cubic-bezier(0.23,1,0.32,1), background-color 300ms ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="Zuhoor Blossoms home">
              <div className="transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[8deg]">
                <Logo size={38} color="#c9a84c" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-[15px] font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.92)" }}>
                  Zuhoor
                </span>
                <span
                  className="font-serif text-[11px] tracking-[3px] uppercase font-normal -mt-0.5 transition-[letter-spacing] duration-500 group-hover:tracking-[4px]"
                  style={{ color: "#c9a84c" }}
                >
                  Blossoms
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {LINKS.map((l) => {
                const active = isActive(pathname, l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="nav-link text-sm tracking-wide transition-colors duration-200 hover:!text-white"
                    style={{ color: active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)" }}
                  >
                    {l.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute left-0 right-0 -bottom-[6px] h-px"
                        style={{ background: "#c9a84c", boxShadow: "0 0 8px rgba(201,168,76,0.8)" }}
                        transition={{ type: "spring", duration: 0.45, bounce: 0.2 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/account"
                className="hidden sm:flex p-2 transition-colors hover:!text-white"
                style={{ color: isActive(pathname, "/account") ? "#c9a84c" : "rgba(255,255,255,0.45)" }}
                aria-label="Account"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
              <button
                onClick={openCart}
                className="relative flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(201,168,76,0.45)]"
                style={{ background: "#c9a84c", color: "#1a0e04" }}
                aria-label="Open cart"
              >
                <ShoppingBagIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 1.6, opacity: 0.4 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", duration: 0.45, bounce: 0.45 }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 text-white text-[10px] font-semibold rounded-full flex items-center justify-center ring-2 ring-brand-charcoal"
                      style={{ background: "#1a3d2a" }}
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <button
                className="md:hidden p-2 transition-colors"
                style={{ color: "rgba(255,255,255,0.55)" }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mobileOpen ? "x" : "bars"}
                    className="block"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {mobileOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent">
          <div
            className="h-full"
            style={{
              width: `${progress * 100}%`,
              background: "linear-gradient(to right, #c9a84c, #4a8c6a)",
              opacity: scrolled ? 1 : 0,
              transition: "width 0.1s linear, opacity 0.3s",
            }}
          />
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              style={{ background: "rgba(7,12,8,0.98)", borderTop: "1px solid rgba(201,168,76,0.1)" }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.div
                className="px-4 py-4 space-y-1"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
              >
                {[...LINKS, { href: "/account", label: "Account" }].map((l) => (
                  <motion.div
                    key={l.href}
                    variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Link
                      href={l.href}
                      className="flex items-center justify-between font-serif text-2xl py-2 transition-colors"
                      style={{ color: isActive(pathname, l.href) ? "#c9a84c" : "rgba(255,255,255,0.7)" }}
                    >
                      {l.label}
                      <span className="text-sm" style={{ color: "rgba(201,168,76,0.6)" }}>→</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <div className="h-16" />
    </>
  );
}
