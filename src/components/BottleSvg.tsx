/** Fallback bottle illustration used when a product has no image. */
export default function BottleSvg({
  color = "#c9a84c",
  symbol = "✦",
  className = "w-20 h-32",
}: {
  color?: string;
  symbol?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 80 140" className={`${className} select-none`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="28" y="4" width="24" height="18" rx="4" fill={color} fillOpacity="0.7" />
      <rect x="32" y="20" width="16" height="14" rx="2" fill={color} fillOpacity="0.5" />
      <path
        d="M14 46 Q12 52 12 65 L12 118 Q12 132 26 132 L54 132 Q68 132 68 118 L68 65 Q68 52 66 46 L50 34 L30 34 Z"
        fill={color}
        fillOpacity="0.12"
        stroke={color}
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <rect x="22" y="65" width="36" height="42" rx="5" fill={color} fillOpacity="0.08" stroke={color} strokeOpacity="0.2" strokeWidth="0.8" />
      <text x="40" y="90" textAnchor="middle" fontSize="16" fill={color} fillOpacity="0.7" fontFamily="serif">
        {symbol}
      </text>
      <path d="M20 50 Q18 70 18 90" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
