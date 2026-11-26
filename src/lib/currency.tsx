"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Currency = { code: string; symbol: string; rate: number };

const CURRENCIES: Record<string, Currency> = {
  IN: { code: "INR", symbol: "Rs", rate: 1 },
  PK: { code: "PKR", symbol: "Rs", rate: 1 },
  US: { code: "USD", symbol: "$", rate: 0.0086 },
  AE: { code: "AED", symbol: "AED", rate: 0.0316 },
  SA: { code: "SAR", symbol: "SAR", rate: 0.0323 },
  GB: { code: "GBP", symbol: "£", rate: 0.0068 },
  EU: { code: "EUR", symbol: "€", rate: 0.0079 },
  CA: { code: "CAD", symbol: "CA$", rate: 0.0117 },
  AU: { code: "AUD", symbol: "A$", rate: 0.0132 },
};

const DEFAULT = CURRENCIES.IN;

const CurrencyContext = createContext<{ currency: Currency; formatPrice: (n: number) => string }>({
  currency: DEFAULT,
  formatPrice: (n) => `Rs ${n}`,
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(DEFAULT);

  // Auto-detect the visitor's country and show local prices (same as the original site).
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d) => {
        const c = CURRENCIES[d.country_code];
        if (c) setCurrency(c);
      })
      .catch(() => {});
  }, []);

  const formatPrice = (n: number) => {
    if (currency.rate === 1) return `${currency.symbol} ${Math.round(n)}`;
    const v = n * currency.rate;
    return `${currency.symbol} ${v < 10 ? v.toFixed(2) : Math.round(v)}`;
  };

  return <CurrencyContext.Provider value={{ currency, formatPrice }}>{children}</CurrencyContext.Provider>;
}

export const useCurrency = () => useContext(CurrencyContext);
