"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, CalendarCheck } from "lucide-react";
import { formatINR } from "@/lib/utils";
import type { Destination } from "@/lib/types";

/** Wide cinematic card used in scroll-driven horizontal storytelling. */
export default function DestinationSlide({
  destination,
  index,
}: {
  destination: Destination;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      id={`slide-${destination.slug}`}
      className="group relative h-[62vh] min-h-[420px] w-[82vw] max-w-[560px] shrink-0 overflow-hidden rounded-[1.75rem] bg-navy-950 md:h-[68vh] md:w-[560px]"
    >
      <Image
        src={destination.image}
        alt={destination.imageAlt}
        fill
        sizes="(max-width: 768px) 82vw, 560px"
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/35 to-navy-950/10" />

      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
        <div className="flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 font-display text-sm font-bold text-white backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[0.72rem] font-bold text-navy">
            ★ {destination.rating}
          </span>
        </div>

        <div>
          <span className="flex items-center gap-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-azure-200">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.9} />
            {destination.country}
          </span>
          <h3 className="mt-2 font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
            {destination.name}
          </h3>
          <p className="mt-3 max-w-sm text-[0.92rem] leading-relaxed text-white/70">
            {destination.blurb}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
            <span className="flex items-center gap-2 text-[0.8rem] text-white/60">
              <CalendarCheck className="h-4 w-4 text-azure-300" strokeWidth={1.8} />
              Best {destination.bestTime}
            </span>
            <div className="flex items-center gap-4">
              <span className="font-display text-xl font-extrabold text-white">
                {formatINR(destination.price)}
                <span className="ml-1 text-xs font-medium text-white/55">pp</span>
              </span>
              <Link
                href={`/destinations#${destination.slug}`}
                className="grid h-11 w-11 place-items-center rounded-full bg-flare text-white transition-transform duration-300 group-hover:rotate-45"
                aria-label={`Explore ${destination.name}`}
              >
                <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
