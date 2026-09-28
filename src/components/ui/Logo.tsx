import Image from "next/image";
import { cn } from "@/lib/utils";

/** Brand artwork extracted from the logo board — see scripts/build-logo.mjs */
export const LOGO_MARK = { src: "/images/logo-mark.png", width: 827, height: 424 } as const;

/** Palette sampled from the logo board. */
const RED = "text-[#F3040D]";
const BLUE = "text-[#0B60D4]";

export function LogoMark({
  className = "h-10",
  title = "TRAVEL DEV",
  decorative = false,
}: {
  className?: string;
  title?: string;
  decorative?: boolean;
}) {
  return (
    <Image
      src={LOGO_MARK.src}
      width={LOGO_MARK.width}
      height={LOGO_MARK.height}
      alt={decorative ? "" : title}
      aria-hidden={decorative || undefined}
      className={cn("block w-auto shrink-0", className)}
    />
  );
}

export function Logo({
  className,
  markClassName = "h-10",
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
      <LogoMark decorative className={markClassName} />
      <span className={cn("flex flex-col leading-none", textClassName)}>
        <span className="font-display text-[0.95rem] font-extrabold tracking-[0.16em] uppercase">
          <span className={RED}>Travel</span>
          <span className={cn("-ml-[0.16em]", BLUE)}>Dev</span>
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
