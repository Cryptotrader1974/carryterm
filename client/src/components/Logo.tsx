export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-label="CarryTerm"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Diagonal carry arrow — up-right sweep */}
      <rect x="2" y="2" width="28" height="28" rx="5" fill="hsl(171,60%,42%)" opacity="0.12" />
      {/* Bar chart base */}
      <rect x="6" y="20" width="4" height="8" rx="1" fill="hsl(171,60%,42%)" opacity="0.5" />
      <rect x="12" y="15" width="4" height="13" rx="1" fill="hsl(171,60%,42%)" opacity="0.7" />
      <rect x="18" y="10" width="4" height="18" rx="1" fill="hsl(171,60%,42%)" />
      {/* Arrow pointing up-right */}
      <path d="M23 4 L28 4 L28 9" stroke="hsl(171,60%,52%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 10 L28 4" stroke="hsl(171,60%,52%)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
