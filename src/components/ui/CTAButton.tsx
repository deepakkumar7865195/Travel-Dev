"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { cn } from "@/lib/utils";

type Variant = "primary" | "flare" | "outline" | "glass" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-700 shadow-[0_14px_34px_-16px_rgb(11_41_66_/_0.9)]",
  flare: "bg-flare text-white hover:bg-flare-600 shadow-[0_14px_34px_-16px_rgb(233_30_37_/_0.9)]",
  outline:
    "border border-navy/20 text-navy hover:border-navy/50 hover:bg-navy/5",
  glass:
    "glass-dark text-white hover:bg-white/15 backdrop-blur-xl",
  ghost: "text-navy hover:bg-navy/5",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.82rem]",
  md: "h-12 px-7 text-[0.9rem]",
  lg: "h-14 px-9 text-[0.95rem]",
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
  magnetic?: boolean;
};

type Props = BaseProps & ({ href: string; onClick?: never } | { href?: undefined; onClick?: () => void });

export default function CTAButton({
  children,
  variant = "primary",
  size = "md",
  className,
  arrow = true,
  magnetic = true,
  href,
  onClick,
}: Props) {
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-colors duration-300 overflow-hidden",
    variants[variant],
    sizes[size],
    className
  );

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {arrow && (
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2.2}
          />
        )}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </>
  );

  const node = href ? (
    <Link href={href} className={classes} onClick={onClick}>
      {inner}
    </Link>
  ) : (
    <button type="button" className={classes} onClick={onClick}>
      {inner}
    </button>
  );

  return magnetic ? <MagneticButton>{node}</MagneticButton> : node;
}
