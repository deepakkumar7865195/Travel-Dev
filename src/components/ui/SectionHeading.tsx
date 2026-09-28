"use client";

import WordReveal from "./WordReveal";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  descClassName?: string;
  as?: "h1" | "h2";
  highlight?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  descClassName,
  as = "h2",
  highlight,
}: Props) {
  const centered = align === "center";

  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal delay={0.02} y={18}>
          <span
            className={cn(
              "eyebrow text-azure-600",
              centered && "justify-center"
            )}
          >
            <span className="h-px w-8 bg-flare" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <WordReveal
        as={as}
        text={title}
        highlight={highlight}
        className={cn("mt-5", align === "center" && "text-center")}
      />

      {description && (
        <Reveal delay={0.14}>
          <p className={cn("lede mt-6", descClassName)}>{description}</p>
        </Reveal>
      )}
    </div>
  );
}
