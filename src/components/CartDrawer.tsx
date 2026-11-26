"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MinusIcon, PlusIcon, XMarkIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCart, type CartItem } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";

const FREE_SHIPPING = 800;

function CartRow({
  item,
  onRemove,
  onUpdate,
  formatPrice,
}: {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdate: (id: string, q: number) => void;
  formatPrice: (n: number) => string;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.94, transition: { duration: 0.22 } }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 p-3 rounded-xl hover:bg-brand-cream/60 transition-colors"
    >
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-blush to-brand-cream flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden">
        {Array.isArray(item.images) && item.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.images[0] as string} alt="" className="w-full h-full object-cover" />
        ) : (
          (item.emoji as string) || (item.symbol as string) || "✦"
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-brand-plum leading-tight">{item.name}</p>
        <p className="text-xs text-brand-muted mt-0.5 truncate">
          {item.size ? `${item.size} · ` : ""}
          {(item.scent as string) || (item.includes as string) || ""}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdate(item.id, item.quantity - 1)}
              className="w-7 h-7 rounded-full bg-brand-sand flex items-center justify-center hover:bg-brand-blush transition-colors active:scale-90"
              aria-label="Decrease quantity"
            >
              <MinusIcon className="w-3 h-3 text-brand-plum" />
            </button>
            <motion.span
              key={item.quantity}
              initial={{ scale: 1.4, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-sm font-medium w-5 text-center"
            >
              {item.quantity}
            </motion.span>
            <button
              onClick={() => onUpdate(item.id, item.quantity + 1)}
              className="w-7 h-7 rounded-full bg-brand-sand flex items-center justify-center hover:bg-brand-blush transition-colors active:scale-90"
              aria-label="Increase quantity"
            >
              <PlusIcon className="w-3 h-3 text-brand-plum" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-brand-plum">{formatPrice(item.price * item.quantity)}</span>
            <button
              onClick={() => onRemove(item.id)}
              className="text-brand-muted hover:text-red-500 transition-colors p-1 hover:scale-110 active:scale-90"
              aria-label="Remove item"
            >
              <XMarkIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const closeCart = useCart((s) => s.closeCart);
  const items = useCart((s) => s.items);
  const removeItem = useCart((s) => s.removeItem);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const { formatPrice } = useCurrency();

  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
  const free = subtotal >= FREE_SHIPPING;
  const pct = Math.min((subtotal / FREE_SHIPPING) * 100, 100);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-brand-charcoal/50 z-50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
          />
          <motion.div
            key="drawer"
            className="fixed top-0 right-0 bottom-0 w-full max-w-[420px] bg-white z-50 flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-brand-sand">
              <div>
                <h2 className="font-serif text-2xl text-brand-plum">Your Cart</h2>
                {items.length > 0 && (
                  <p className="text-xs text-brand-muted mt-0.5">
                    {items.reduce((n, i) => n + i.quantity, 0)} item{items.length !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
              <motion.button
                onClick={closeCart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="p-2 text-brand-muted hover:text-brand-plum transition-colors rounded-lg hover:bg-brand-cream"
                aria-label="Close cart"
              >
                <XMarkIcon className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full p-8 text-center"
                    style={{ minHeight: 320 }}
                  >
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                      <ShoppingBagIcon className="w-16 h-16 text-brand-sand mb-4" />
                    </motion.div>
                    <p className="font-serif text-xl text-brand-plum mb-2">Your cart is empty</p>
                    <p className="text-brand-muted text-sm mb-6">Discover our luxury collection</p>
                    <motion.button onClick={closeCart} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="btn-primary text-sm">
                      Shop Now
                    </motion.button>
                  </motion.div>
                ) : (
                  <div key="list" className="p-4 space-y-1">
                    <motion.div layout className={`rounded-xl p-3 mb-4 ${free ? "bg-green-50 border border-green-200" : "bg-brand-cream"}`}>
                      {free ? (
                        <p className="text-xs text-green-700 font-medium text-center">🎉 You qualify for free shipping!</p>
                      ) : (
                        <>
                          <p className="text-xs text-brand-muted text-center mb-2">
                            Add <span className="text-brand-plum font-medium">Rs {FREE_SHIPPING - subtotal}</span> more for free shipping
                          </p>
                          <div className="h-1.5 bg-brand-sand rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: "linear-gradient(to right, #c97b8a, #5c2d3e)" }}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                          </div>
                        </>
                      )}
                    </motion.div>
                    <AnimatePresence>
                      {items.map((item) => (
                        <CartRow key={item.id} item={item} onRemove={removeItem} onUpdate={updateQuantity} formatPrice={formatPrice} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="border-t border-brand-sand p-6 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-serif text-lg text-brand-plum">Subtotal</span>
                    <motion.span
                      key={subtotal}
                      initial={{ scale: 1.15, color: "#c97b8a" }}
                      animate={{ scale: 1, color: "#5c2d3e" }}
                      className="text-xl font-medium"
                    >
                      {formatPrice(subtotal)}
                    </motion.span>
                  </div>
                  {free ? (
                    <p className="text-xs text-green-600 text-center">Free shipping applied</p>
                  ) : (
                    <p className="text-xs text-brand-muted text-center">Shipping calculated at checkout</p>
                  )}
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full text-white text-center font-medium py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, #5c2d3e, #c97b8a)", boxShadow: "0 8px 28px rgba(92,45,62,0.3)" }}
                  >
                    Checkout Securely →
                  </Link>
                  <button onClick={closeCart} className="block w-full text-center text-sm text-brand-muted hover:text-brand-plum transition-colors py-1">
                    Continue Shopping
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
