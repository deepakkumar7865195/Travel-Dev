"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cardIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Experience } from "@/lib/types";

const ratios = {
  sm: "aspect-[4/5]",
  md: "aspect-[5/4]",
  lg: "aspect-[16/10]",
};

export default function ExperienceCard({
  experience,
  size = "md",
  heightClass,
  className,
}: {
  experience: Experience;
  size?: "sm" | "md" | "lg";
  heightClass?: string;
  className?: string;
}) {
  return (
    <motion.article
      layout
      variants={cardIn}
      id={experience.slug}
      className={cn("group h-full", className)}
    >
      <Link
        href={`/experiences#${experience.slug}`}
        data-cursor="hover"
        className={cn(
          "relative block h-full overflow-hidden rounded-[1.75rem] bg-navy-950",
          heightClass ?? ratios[size],
          "transition-transform duration-500 ease-out will-change-transform",
          "hover:-translate-y-1.5 hover:shadow-lift"
        )}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={experience.image}
            alt={experience.imageAlt}
            fill
            sizes={
              heightClass
                ? "(max-width: 768px) 92vw, 60vw"
                : "(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 24vw"
            }
            className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/92 via-navy-950/40 to-navy-950/10 transition-opacity duration-500 group-hover:from-navy-950/95 group-hover:via-navy-950/55" />
          <div className="absolute inset-0 bg-azure-600/0 mix-blend-soft-light transition-colors duration-500 group-hover:bg-azure-600/35" />
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
          <div className="flex items-start justify-between">
            <span className="rounded-full border border-white/25 bg-black/25 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              {experience.kicker}
            </span>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-flare group-hover:bg-flare">
              <ArrowUpRight className="h-4.5 w-4.5" strokeWidth={2} />
            </span>
          </div>

          <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-azure-300">
              {experience.count} journeys
            </span>
            <h3 className="mt-1.5 font-display text-2xl font-bold leading-tight text-white md:text-3xl">
              {experience.title}
            </h3>
            <p className="mt-2 max-h-0 overflow-hidden text-[0.88rem] leading-relaxed text-white/0 transition-all duration-500 group-hover:max-h-32 group-hover:text-white/75">
              {experience.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
