# Zuhoor Blossoms — Luxury Arabic Bodywash

A recreation of the Zuhoor Blossoms site built with Next.js 14 (App Router), Tailwind CSS, Framer Motion, and Zustand.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Pages

| Route | What's there |
| --- | --- |
| `/` | Hero (canvas ripples, morphing blobs, falling glyphs, mouse parallax, animated waves), In-stock + Coming-soon products, Philosophy text reveal, Botanicals, Bestseller, Scent quiz, Counters + reviews, CTA |
| `/products` | Category filter, product grid, gift sets |
| `/products/[id]` | Product detail, size/qty, wishlist, related products |
| `/about` | Scroll-pinned 4-chapter story |
| `/contact` | Contact form |
| `/account` | Sign in / sign up / dashboard (demo, localStorage) |
| `/checkout` → `/order-confirmation` | Validated checkout with simulated order |

## Where things live

- Product data: `src/lib/products.ts`
- Cart store (persisted to localStorage): `src/lib/cart.ts`
- Auto currency by visitor country: `src/lib/currency.tsx`
- Animations/keyframes: `src/app/globals.css`
- Product images: `public/images/products/`

## Not wired up (by design)

- **Auth**: `/account` uses a local demo session. The original uses Firebase Auth — replace `useDemoAuth` in `src/app/account/page.tsx`.
- **Payments**: `/checkout` simulates the order. Add Stripe in `src/app/checkout/page.tsx` when ready.
- **Contact form**: shows a success state but doesn't send anywhere yet.
