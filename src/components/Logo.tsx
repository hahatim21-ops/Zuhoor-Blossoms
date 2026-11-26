export default function Logo({
  size = 40,
  color = "#c9a84c",
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Zuhoor Blossoms logo"
    >
      <defs>
        <clipPath id="zb-clip">
          <circle cx="50" cy="50" r="44" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="2.8" fill="none" />
      <circle cx="37" cy="34" r="10" stroke={color} strokeWidth="2.2" fill="none" clipPath="url(#zb-clip)" />
      <path d="M4 52 C12 37, 26 32, 42 43 C54 52, 68 48, 96 46" stroke={color} strokeWidth="2.4" strokeLinecap="round" fill="none" clipPath="url(#zb-clip)" />
      <path d="M4 60 C16 55, 36 62, 56 58 C72 55, 84 60, 96 57" stroke={color} strokeWidth="2.0" strokeLinecap="round" fill="none" clipPath="url(#zb-clip)" />
      <path d="M4 67 C18 63, 38 69, 58 65 C74 62, 86 67, 96 64" stroke={color} strokeWidth="1.7" strokeLinecap="round" fill="none" clipPath="url(#zb-clip)" />
      <path d="M5 73 C20 69, 40 75, 60 71 C76 68, 87 73, 96 70" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" clipPath="url(#zb-clip)" />
      <path d="M7 79 C22 75, 44 81, 64 77 C78 74, 88 78, 95 76" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" clipPath="url(#zb-clip)" />
      <path d="M10 84 C26 81, 46 86, 66 82 C80 80, 89 83, 94 82" stroke={color} strokeWidth="1.1" strokeLinecap="round" fill="none" clipPath="url(#zb-clip)" />
      <path d="M14 89 C30 86, 50 91, 70 88 C82 85, 90 88, 93 87" stroke={color} strokeWidth="1.0" strokeLinecap="round" fill="none" clipPath="url(#zb-clip)" />
    </svg>
  );
}
