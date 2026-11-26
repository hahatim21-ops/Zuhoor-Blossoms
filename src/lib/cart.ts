"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  scent?: string;
  emoji?: string;
  [key: string]: unknown;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item, qty = 1) => {
        const items = get().items;
        if (items.find((i) => i.id === item.id)) {
          set({
            items: items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + qty } : i)),
          });
        } else {
          set({ items: [...items, { ...item, quantity: qty } as CartItem] });
        }
        set({ isOpen: true });
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      updateQuantity: (id, qty) => {
        if (qty < 1) {
          get().removeItem(id);
          return;
        }
        set({ items: get().items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)) });
      },
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    // skipHydration avoids SSR/client mismatches; Providers rehydrates on mount.
    { name: "zuhoor-cart", partialize: (s) => ({ items: s.items }), skipHydration: true },
  ),
);

/** True once the saved cart has been loaded from localStorage. */
export function useCartHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (useCart.persist.hasHydrated()) setHydrated(true);
    return useCart.persist.onFinishHydration(() => setHydrated(true));
  }, []);
  return hydrated;
}
