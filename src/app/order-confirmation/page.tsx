"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Footer from "@/components/Footer";

const NEXT_STEPS = [
  "Confirmation email with PDF invoice sent to your inbox",
  "Our team handpicks and quality-checks your items",
  "Order dispatched within 1–2 business days",
  "Tracking number sent via email once shipped",
];

function Confirmation() {
  const params = useSearchParams();
  const order = params.get("order") || "ZB-XXXXXX";
  const total = params.get("total") || "Rs 0";
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center page-reveal">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 glow-pulse">
        <CheckCircleIcon className="w-10 h-10 text-green-500" />
      </div>
      <h1 className="font-serif text-4xl text-brand-plum mb-3">Order Confirmed!</h1>
      <p className="text-brand-muted mb-8 leading-relaxed">Thank you for your purchase. Your luxury bodywash is being prepared with care.</p>
      <div className="card p-6 text-left mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-brand-muted">Order Number</span>
          <span className="font-mono font-medium text-brand-plum">{order}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-brand-muted">Total Paid</span>
          <span className="font-medium text-brand-plum">{total}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-brand-muted">Estimated Delivery</span>
          <span className="text-sm text-brand-charcoal">3–5 business days</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-brand-muted">Confirmation Email</span>
          <span className="text-sm text-green-600">Sent ✓</span>
        </div>
      </div>
      <div className="bg-brand-plum/5 border border-brand-sand rounded-2xl p-5 mb-8 text-left">
        <p className="text-xs uppercase tracking-[2px] text-brand-muted font-medium mb-3">What happens next?</p>
        <ul className="space-y-2 text-sm text-brand-charcoal">
          {NEXT_STEPS.map((s, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-rose/20 text-brand-rose text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">{i + 1}</span>
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/products" className="btn-primary">Continue Shopping</Link>
        <Link href="/account" className="btn-outline">View My Orders</Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <>
      <Suspense fallback={<div className="py-24 text-center text-brand-muted">Loading...</div>}>
        <Confirmation />
      </Suspense>
      <Footer />
    </>
  );
}
