import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-[80vh] flex flex-col items-center justify-center gap-6 text-center px-6"
      style={{ background: "linear-gradient(180deg, #070c08 0%, #0d1810 100%)" }}
    >
      <p className="text-[10px] uppercase tracking-[6px]" style={{ color: "#c9a84c" }}>404</p>
      <p className="font-serif text-4xl font-light" style={{ color: "rgba(255,255,255,0.8)" }}>This page has drifted away</p>
      <Link href="/" className="px-8 py-3 rounded-full text-sm font-medium" style={{ background: "#c9a84c", color: "#1a0e04" }}>
        Back Home
      </Link>
    </div>
  );
}
