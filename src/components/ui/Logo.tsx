import { cn } from "@/lib/utils";

/**
 * The TRAVEL DEV logo, reproduced exactly from the brand SVG.
 * Scaled only — never redrawn or distorted.
 */
export function LogoMark({
  className = "h-10 w-10",
  title = "TRAVEL DEV",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={cn("block shrink-0", className)}
    >
      <defs>
        <linearGradient id="tdSky" x1="4" y1="0" x2="60" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1769AA" />
          <stop offset="1" stopColor="#0B2942" />
        </linearGradient>
        <linearGradient id="tdWave" x1="0" y1="46" x2="64" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E91E25" />
          <stop offset="1" stopColor="#FF6B6F" />
        </linearGradient>
        <linearGradient id="tdShine" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".20" />
          <stop offset=".6" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="url(#tdSky)" />
      <rect width="64" height="64" rx="18" fill="url(#tdShine)" />
      <path d="M0 46c9-7 15 3 24-1s13-8 21-5 12 6 19 3v21H0Z" fill="url(#tdWave)" />
      <path
        d="M0 46c9-7 15 3 24-1s13-8 21-5 12 6 19 3"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity=".5"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 38c7-13 17-19 27-19"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity=".85"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="1 6"
      />
      <circle cx="12" cy="38" r="3.4" fill="#FFFFFF" />
      <g transform="translate(40 9) scale(.88)">
        <path d="M2 21 22 12 2 3v7l14 2-14 2Z" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  markClassName = "h-10 w-10",
  showTagline = false,
  textClassName = "",
}: {
  className?: string;
  markClassName?: string;
  showTagline?: boolean;
  textClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className={markClassName} />
      <span className={cn("flex flex-col leading-none", textClassName)}>
        <span className="font-display text-[0.95rem] font-extrabold tracking-[0.16em] uppercase">
          Travel <span className="text-flare">Dev</span>
        </span>
        {showTagline && (
          <span className="mt-1 text-[0.6rem] font-medium tracking-[0.34em] uppercase opacity-60">
            Let&apos;s Go
          </span>
        )}
      </span>
    </span>
  );
}
