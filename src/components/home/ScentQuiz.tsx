"use client";

import Link from "next/link";
import { useState } from "react";

const QUESTIONS = [
  {
    id: "mood",
    question: "What feeling are you chasing today?",
    subtitle: "Close your eyes. Which word calls to you?",
    options: [
      { label: "Romantic & Warm", icon: "🌹", value: "romantic", color: "#c97b8a", bg: "rgba(201,123,138,0.1)" },
      { label: "Calm & Grounded", icon: "🌿", value: "calm", color: "#7aad7a", bg: "rgba(122,173,122,0.1)" },
      { label: "Bold & Mysterious", icon: "🌙", value: "bold", color: "#9a7ac0", bg: "rgba(154,122,192,0.1)" },
      { label: "Fresh & Energizing", icon: "🍊", value: "fresh", color: "#d4956b", bg: "rgba(212,149,107,0.1)" },
    ],
  },
  {
    id: "moment",
    question: "Your shower ritual is...",
    subtitle: "Tell us when you're most in need of a reset.",
    options: [
      { label: "Morning awakening", icon: "☀️", value: "morning", color: "#f5c842", bg: "rgba(245,200,66,0.1)" },
      { label: "Evening escape", icon: "🌙", value: "evening", color: "#9a7ac0", bg: "rgba(154,122,192,0.1)" },
      { label: "Post-workout reset", icon: "💪", value: "workout", color: "#d4956b", bg: "rgba(212,149,107,0.1)" },
      { label: "Whenever I need it", icon: "✨", value: "anytime", color: "#c97b8a", bg: "rgba(201,123,138,0.1)" },
    ],
  },
  {
    id: "priority",
    question: "Above all else, you want...",
    subtitle: "What does your ideal bodywash feel like?",
    options: [
      { label: "A scent that lingers", icon: "💫", value: "scent", color: "#c97b8a", bg: "rgba(201,123,138,0.1)" },
      { label: "Skin that actually glows", icon: "🌸", value: "skin", color: "#f0c0d0", bg: "rgba(240,192,208,0.1)" },
      { label: "Pure natural ingredients", icon: "🌿", value: "natural", color: "#7aad7a", bg: "rgba(122,173,122,0.1)" },
      { label: "A full luxury experience", icon: "✦", value: "luxury", color: "#d4a842", bg: "rgba(212,168,66,0.1)" },
    ],
  },
];

const RESULTS: Record<string, { id: string; name: string; emoji: string; tagline: string; desc: string; match: number; gradientFrom: string; gradientTo: string; badgeColor: string }> = {
  romantic: {
    id: "3",
    name: "Evening in Paris",
    emoji: "✿",
    tagline: "For the romantic soul",
    desc: "Damask rose and white florals that linger like a Parisian evening — a city that doesn't ask for attention, it holds it.",
    match: 97,
    gradientFrom: "#c9a84c",
    gradientTo: "#120608",
    badgeColor: "#c9a84c",
  },
  calm: {
    id: "4",
    name: "Bon Bons in Bahrain",
    emoji: "∗",
    tagline: "For the serenity seeker",
    desc: "Dark coffee and oud resin rise like steam from porcelain cups — a soft invitation to linger, to sip, to smile.",
    match: 94,
    gradientFrom: "#c9a84c",
    gradientTo: "#0c0604",
    badgeColor: "#c9a84c",
  },
  bold: {
    id: "2",
    name: "Velvet Embers in Cairo",
    emoji: "✦",
    tagline: "For those who make rooms remember them",
    desc: "Aged oud smolders through golden amber. A memory wrapped in mystery — soft as silk, strong as shadow.",
    match: 96,
    gradientFrom: "#c9a84c",
    gradientTo: "#0e0804",
    badgeColor: "#c9a84c",
  },
  fresh: {
    id: "9",
    name: "Snowchild",
    emoji: "✧",
    tagline: "For those who crave the silence between notes",
    desc: "Sweet tangerine and honey wrapped in cool cedarwood frost. Blue velvet for warm souls.",
    match: 95,
    gradientFrom: "#c9a84c",
    gradientTo: "#0d0810",
    badgeColor: "#c9a84c",
  },
};

export default function ScentQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const choose = (value: string) => {
    if (busy) return;
    setPicked(value);
    setBusy(true);
    setTimeout(() => {
      const qid = QUESTIONS[step - 1].id;
      setAnswers((a) => ({ ...a, [qid]: value }));
      setPicked(null);
      setBusy(false);
      setStep((s) => s + 1);
    }, 380);
  };

  const result = RESULTS[answers.mood] || RESULTS.romantic;

  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #070c08 0%, #0d1810 50%, #070c08 100%)" }}>
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,123,138,0.12) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,149,107,0.10) 0%, transparent 70%)" }}
      />
      <div className="max-w-xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[6px] font-medium mb-3" style={{ color: "#c9a84c" }}>Your Scent Profile</p>
          <h2 className="font-serif font-light leading-tight mb-3" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "rgba(255,255,255,0.92)" }}>
            Find Your <em className="font-light" style={{ color: "#c0dccb" }}>Perfect Match</em>
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>3 questions · 30 seconds · your ideal scent revealed</p>
        </div>

        <div className="bg-white rounded-3xl border border-brand-sand overflow-hidden" style={{ boxShadow: "0 4px 40px rgba(92,45,62,0.08)", minHeight: 360 }}>
          {step === 0 && (
            <div className="flex flex-col items-center justify-center p-10 text-center h-full page-reveal" style={{ minHeight: 360 }}>
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6"
                style={{ background: "linear-gradient(135deg, #f0d4da, #c97b8a)" }}
              >
                🌹
              </div>
              <h3 className="font-serif text-brand-plum text-2xl mb-2">Which Zuhoor is Yours?</h3>
              <p className="text-brand-muted text-sm mb-8 max-w-xs leading-relaxed">
                Answer 3 questions and we&apos;ll unveil the scent that was crafted for your soul.
              </p>
              <button
                onClick={() => setStep(1)}
                className="bg-brand-plum text-white px-8 py-3.5 rounded-full font-medium text-sm transition-all duration-200 hover:bg-brand-rose hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(92,45,62,0.25)]"
              >
                Begin the Journey ✦
              </button>
            </div>
          )}

          {step >= 1 && step <= 3 && (
            <div key={step} className="p-8 page-reveal" style={{ opacity: busy ? 0.4 : 1, transition: "opacity 0.2s" }}>
              <div className="flex items-center gap-3 mb-7">
                <div className="flex-1 h-1 bg-brand-sand rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${((step - 1) / 3) * 100}%`, background: "linear-gradient(to right, #c97b8a, #5c2d3e)" }}
                  />
                </div>
                <span className="text-xs text-brand-muted font-medium tabular-nums">{step} / 3</span>
              </div>
              <p className="text-[11px] uppercase tracking-[4px] text-brand-rose mb-2">{QUESTIONS[step - 1].subtitle}</p>
              <h3 className="font-serif text-brand-plum text-xl sm:text-2xl mb-6">{QUESTIONS[step - 1].question}</h3>
              <div className="grid grid-cols-2 gap-3">
                {QUESTIONS[step - 1].options.map((o) => {
                  const active = picked === o.value;
                  return (
                    <button
                      key={o.value}
                      onClick={() => choose(o.value)}
                      className="relative text-left p-4 rounded-2xl border-2 transition-all duration-200 overflow-hidden group"
                      style={{
                        borderColor: active ? o.color : "#e8ddd5",
                        background: active ? o.bg : "white",
                        transform: active ? "scale(0.96)" : "scale(1)",
                      }}
                    >
                      <div className="absolute inset-0 rounded-2xl transition-opacity duration-200 opacity-0 group-hover:opacity-100" style={{ background: o.bg }} />
                      <span className="relative z-10 text-2xl block mb-2">{o.icon}</span>
                      <span className="relative z-10 text-sm font-medium text-brand-charcoal leading-snug">{o.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="p-8 page-reveal">
              <div className="text-center mb-7">
                <p className="text-[10px] uppercase tracking-[5px] text-brand-rose mb-4">Your Perfect Match</p>
                <div
                  className="inline-flex items-center justify-center w-24 h-24 rounded-full text-5xl mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${result.gradientFrom}30, ${result.gradientTo}40)`,
                    border: `2px solid ${result.badgeColor}40`,
                    boxShadow: `0 0 40px ${result.badgeColor}25`,
                  }}
                >
                  {result.emoji}
                </div>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium mb-3"
                  style={{ background: `${result.badgeColor}15`, color: result.badgeColor, border: `1px solid ${result.badgeColor}30` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: result.badgeColor }} />
                  {result.match}% Match for You
                </div>
                <p className="text-[11px] uppercase tracking-[3px] text-brand-muted mb-1">{result.tagline}</p>
                <h3 className="font-serif text-brand-plum text-3xl mb-3">{result.name}</h3>
                <p className="text-brand-muted text-sm leading-relaxed max-w-xs mx-auto">{result.desc}</p>
              </div>
              <div className="flex gap-3 justify-center">
                <Link
                  href={`/products/${result.id}`}
                  className="bg-brand-plum text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:bg-brand-rose hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(92,45,62,0.25)]"
                >
                  View {result.name}
                </Link>
                <button
                  onClick={() => {
                    setStep(0);
                    setAnswers({});
                    setPicked(null);
                  }}
                  className="border border-brand-sand text-brand-muted px-6 py-3 rounded-full text-sm transition-all duration-200 hover:border-brand-rose hover:text-brand-rose"
                >
                  Retake ↺
                </button>
              </div>
            </div>
          )}
        </div>
        <p className="text-center text-[11px] text-brand-muted/60 mt-5 tracking-wide">Powered by Zuhoor AI · Personalised just for you</p>
      </div>
    </section>
  );
}
