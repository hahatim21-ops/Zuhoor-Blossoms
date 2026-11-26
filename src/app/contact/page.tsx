"use client";

import { useState } from "react";
import Footer from "@/components/Footer";

const INFO = [
  { icon: "✉️", label: "Email", value: "zuhoorblossoms@gmail.com" },
  { icon: "📍", label: "Location", value: "Mumbai, India" },
  { icon: "⏰", label: "Response Time", value: "Within 24 hours" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-20 min-h-[70vh]">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="page-reveal">
            <p className="section-eyebrow">Get In Touch</p>
            <h1 className="section-title text-4xl sm:text-5xl mb-6">
              We&apos;d Love to
              <br />
              <em className="font-light">Hear From You</em>
            </h1>
            <p className="text-brand-muted leading-relaxed mb-10">
              Whether you have a question about our products, an order enquiry, or just want to say hello — our team is here for you.
            </p>
            <div className="space-y-6">
              {INFO.map((i) => (
                <div key={i.label} className="flex items-start gap-4">
                  <span className="text-2xl">{i.icon}</span>
                  <div>
                    <p className="text-xs uppercase tracking-[2px] text-brand-muted mb-0.5">{i.label}</p>
                    <p className="text-brand-plum font-medium">{i.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="page-reveal" style={{ animationDelay: "0.12s", opacity: 0 }}>
            {sent ? (
              <div className="card p-8 text-center page-reveal">
                <div className="text-5xl mb-4">✉️</div>
                <h3 className="font-serif text-2xl text-brand-plum mb-2">Message Sent!</h3>
                <p className="text-brand-muted">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="card p-8 space-y-5"
              >
                <div>
                  <label className="text-xs text-brand-muted block mb-1.5">Full Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-xs text-brand-muted block mb-1.5">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field"
                    placeholder="hello@example.com"
                  />
                </div>
                <div>
                  <label className="text-xs text-brand-muted block mb-1.5">Subject</label>
                  <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field">
                    <option value="">Select a subject</option>
                    <option>Order Enquiry</option>
                    <option>Product Question</option>
                    <option>Returns &amp; Refunds</option>
                    <option>General Enquiry</option>
                    <option>Press &amp; Collaborations</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-brand-muted block mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-field resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button type="submit" className="w-full btn-primary py-4 text-sm">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
