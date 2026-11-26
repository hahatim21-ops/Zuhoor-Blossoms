"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart, useCartHydrated } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import Footer from "@/components/Footer";

/*
 * The original checkout hands off to Stripe when NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is set,
 * otherwise it simulates the order. This clone ships the simulated flow; plug Stripe in here later.
 */
type Fields = { firstName: string; lastName: string; email: string; address: string; city: string; pincode: string; country: string };

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const clearCart = useCart((s) => s.clearCart);
  const hydrated = useCartHydrated();
  const { formatPrice } = useCurrency();
  const [form, setForm] = useState<Fields>({ firstName: "", lastName: "", email: "", address: "", city: "", pincode: "", country: "India" });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | "submit", string>>>({});
  const [busy, setBusy] = useState(false);

  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
  const shipping = subtotal >= 800 ? 0 : 99;
  const total = subtotal + shipping;

  const validate = () => {
    const e: typeof errors = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.match(/@/)) e.email = "Valid email required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.pincode.trim()) e.pincode = "Required";
    return e;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof Fields])
      setErrors((er) => {
        const n = { ...er };
        delete n[name as keyof Fields];
        return n;
      });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 1500));
    const order = "ZB-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    clearCart();
    router.push(`/order-confirmation?order=${order}&total=${encodeURIComponent(formatPrice(total))}`);
  };

  if (!hydrated) return <div className="min-h-[60vh]" />;

  if (items.length === 0)
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p className="font-serif text-2xl text-brand-plum mb-4">Your cart is empty</p>
        <Link href="/products" className="btn-primary">Shop Now</Link>
      </div>
    );

  const field = (name: keyof Fields, label: string, placeholder = label, extra = "") => (
    <div className={extra}>
      <label className="text-xs text-brand-muted block mb-1.5">{label}</label>
      <input name={name} value={form[name]} onChange={onChange} className={`input-field ${errors[name] ? "border-red-400" : ""}`} placeholder={placeholder} />
      {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-14 page-reveal">
        <h1 className="font-serif text-4xl text-brand-plum mb-10">Checkout</h1>
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <form onSubmit={onSubmit} className="space-y-8">
              <section>
                <h2 className="font-medium text-brand-plum mb-4 text-lg">Contact</h2>
                <div className="grid grid-cols-2 gap-4">
                  {field("firstName", "First Name")}
                  {field("lastName", "Last Name")}
                  {field("email", "Email", "Email", "col-span-2")}
                </div>
              </section>
              <section>
                <h2 className="font-medium text-brand-plum mb-4 text-lg">Shipping Address</h2>
                <div className="space-y-4">
                  {field("address", "Address", "Flat / House No., Street")}
                  <div className="grid grid-cols-2 gap-4">
                    {field("city", "City", "Mumbai")}
                    {field("pincode", "PIN Code", "400001")}
                  </div>
                  <div>
                    <label className="text-xs text-brand-muted block mb-1.5">Country</label>
                    <select name="country" value={form.country} onChange={onChange} className="input-field">
                      {["India", "Pakistan", "United Arab Emirates", "Saudi Arabia", "United Kingdom", "United States", "Canada", "Australia"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>
              {errors.submit && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl p-3">{errors.submit}</p>}
              <button
                type="submit"
                disabled={busy}
                className="w-full text-white font-medium py-4 rounded-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#5c2d3e,#c97b8a)" }}
              >
                {busy ? "Please wait..." : `Continue to Payment · ${formatPrice(total)}`}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="card p-6 sticky top-24">
              <h2 className="font-serif text-xl text-brand-plum mb-5">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((i) => (
                  <div key={i.id} className="flex gap-3 items-center">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#f7e9d7,#f0d9c8)" }}>
                      <span className="text-xl">✦</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-brand-plum leading-tight truncate">{i.name}</p>
                      <p className="text-xs text-brand-muted mt-0.5">
                        {i.size} · Qty: {i.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-brand-plum whitespace-nowrap">{formatPrice(i.price * i.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-brand-sand pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-brand-muted">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600">Free</span> : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && <p className="text-xs text-brand-muted">Add {formatPrice(800 - subtotal)} more for free shipping</p>}
                <div className="flex justify-between font-medium text-brand-plum text-base pt-2 border-t border-brand-sand">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
