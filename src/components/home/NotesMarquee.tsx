const NOTES = [
  "Damask Rose",
  "Aged Oud",
  "Iranian Saffron",
  "Jasmine Absolute",
  "Mysore Sandalwood",
  "Calabrian Bergamot",
  "Golden Amber",
  "Sweet Tangerine",
  "Creamy Vanilla",
  "Fine Musk",
];

/** Endless ribbon of scent notes; pauses when hovered. */
export default function NotesMarquee() {
  const row = (
    <div className="flex shrink-0 items-center gap-10 pr-10">
      {NOTES.map((n) => (
        <span key={n} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-serif italic text-2xl sm:text-3xl font-light" style={{ color: "rgba(255,255,255,0.78)" }}>
            {n}
          </span>
          <span style={{ color: "#c9a84c" }}>✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div
      className="marquee group relative overflow-hidden py-6"
      style={{
        background: "#070c08",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
      }}
      aria-label="Signature scent notes"
    >
      <div
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
      <div className="marquee-track flex w-max">
        {row}
        <div aria-hidden className="flex">{row}</div>
      </div>
      </div>
    </div>
  );
}
