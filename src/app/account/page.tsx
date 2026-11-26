"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

/*
 * The original site uses Firebase Auth. This clone keeps the same UI and flow but
 * stores a demo session in localStorage so it works without any backend.
 * Swap these helpers for Firebase (or any auth provider) when you go live.
 */
type User = { email: string; name?: string };
const KEY = "zuhoor-demo-user";

function useDemoAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);
  const save = (u: User | null) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(KEY, JSON.stringify(u));
      else localStorage.removeItem(KEY);
    } catch {}
  };
  return {
    user,
    loading,
    login: async (email: string) => save({ email }),
    signup: async (email: string, name: string) => save({ email, name }),
    google: async () => save({ email: "demo@zuhoorblossoms.com", name: "Guest" }),
    logout: () => save(null),
  };
}

function AuthForm({ auth }: { auth: ReturnType<typeof useDemoAuth> }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      if (mode === "login") await auth.login(form.email);
      else await auth.signup(form.email, form.name);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-6 page-reveal">
      <div className="text-center mb-8">
        <h1 className="font-serif text-4xl text-brand-plum mb-2">{mode === "login" ? "Welcome Back" : "Create Account"}</h1>
        <p className="text-brand-muted text-sm">{mode === "login" ? "Sign in to your Zuhoor Blossoms account" : "Join the Zuhoor Blossoms family"}</p>
      </div>
      <div className="card p-8">
        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3 mb-5">{error}</div>}
        <button
          onClick={auth.google}
          className="w-full border border-brand-sand py-3 rounded-xl text-sm font-medium text-brand-charcoal flex items-center justify-center gap-2 hover:bg-brand-cream transition-colors mb-5"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-brand-sand" />
          <span className="text-xs text-brand-muted">or</span>
          <div className="flex-1 h-px bg-brand-sand" />
        </div>
        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="text-xs text-brand-muted block mb-1.5">Full Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Your name" />
            </div>
          )}
          <div>
            <label className="text-xs text-brand-muted block mb-1.5">Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="hello@example.com" />
          </div>
          <div>
            <label className="text-xs text-brand-muted block mb-1.5">Password</label>
            <input
              required
              type="password"
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input-field"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={busy} className="w-full btn-primary py-3.5 disabled:opacity-70">
            {busy ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>
        <p className="text-center text-sm text-brand-muted mt-5">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-brand-rose hover:underline font-medium">
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

function Dashboard({ user, logout }: { user: User; logout: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-14 page-reveal">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-4xl text-brand-plum">My Account</h1>
          <p className="text-brand-muted mt-1">{user.email}</p>
        </div>
        <button onClick={logout} className="btn-outline text-sm">Sign Out</button>
      </div>
      <div className="card overflow-hidden">
        <div className="p-5 border-b border-brand-sand">
          <h2 className="font-medium text-brand-plum">Recent Orders</h2>
        </div>
        <div className="py-16 flex flex-col items-center justify-center text-center px-6">
          <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-brand-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="font-serif text-xl text-brand-plum mb-2">No orders yet</p>
          <p className="text-brand-muted text-sm mb-6 max-w-xs">Your order history will appear here once you make your first purchase.</p>
          <Link href="/products" className="btn-primary text-sm">Shop Now</Link>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const auth = useDemoAuth();

  if (auth.loading)
    return (
      <div className="max-w-md mx-auto py-24 px-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-brand-sand rounded w-1/2 mx-auto" />
          <div className="card p-8 space-y-4">
            <div className="h-12 bg-brand-sand rounded-xl" />
            <div className="h-12 bg-brand-sand rounded-xl" />
          </div>
        </div>
      </div>
    );

  return (
    <>
      {auth.user ? <Dashboard user={auth.user} logout={auth.logout} /> : <AuthForm auth={auth} />}
      <Footer />
    </>
  );
}
