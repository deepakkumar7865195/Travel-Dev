"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MapPin, ArrowUpRight } from "lucide-react";
import RatingStars from "@/components/ui/RatingStars";
import TiltCard from "@/components/ui/TiltCard";
import { cardIn } from "@/lib/motion";
import { formatINR, cn } from "@/lib/utils";
import type { Destination } from "@/lib/types";

export default function DestinationCard({
  destination,
  view = "grid",
}: {
  destination: Destination;
  view?: "grid" | "list";
}) {
  const isList = view === "list";

  return (
    <motion.article
      layout
      variants={cardIn}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25, ease: "easeIn" } }}
      id={destination.slug}
      className={cn(
        "group relative",
        isList ? "md:col-span-2" : ""
      )}
    >
      <TiltCard className="h-full" max={5}>
        <Link
          href={`/destinations#${destination.slug}`}
          data-cursor="hover"
          className={cn(
            "flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift",
            isList ? "md:flex-row" : ""
          )}
        >
          <div
            className={cn(
              "relative overflow-hidden",
              isList ? "aspect-[16/10] md:aspect-auto md:w-1/2 md:min-h-[300px]" : "aspect-[4/5]"
            )}
          >
            <Image
              src={destination.image}
              alt={destination.imageAlt}
              fill
              sizes={
                isList
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              }
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-navy-950/25" />

            <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/25 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
              {destination.continent}
            </span>

            <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[0.7rem] font-bold text-navy backdrop-blur-md">
              <RatingStars rating={destination.rating} starClass="h-3 w-3" />
              {destination.rating}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="flex items-center gap-1.5 text-[0.74rem] font-medium uppercase tracking-[0.16em] text-azure-200">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
                {destination.country}
              </span>
              <h3 className="mt-1.5 font-display text-2xl font-bold leading-tight text-white">
                {destination.name}
              </h3>
            </div>

            <span className="absolute bottom-5 right-5 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-flare text-white opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
            </span>
          </div>

          <div className={cn("flex flex-1 flex-col p-5", isList && "md:justify-center md:p-8")}>
            <p className="text-[0.9rem] leading-relaxed text-navy/65">{destination.blurb}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.78rem] font-medium text-navy/55">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-azure-500" strokeWidth={1.8} />
                {destination.bestTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-flare" />
                {destination.duration}
              </span>
            </div>

            <div className="mt-5 flex items-end justify-between gap-4 border-t border-navy/10 pt-4">
              <div>
                <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-navy/45">
                  From
                </span>
                <span className="font-display text-xl font-extrabold text-navy">
                  {formatINR(destination.price)}
                </span>
                <span className="text-xs text-navy/50"> / person</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cloud-100 px-4 py-2 text-[0.78rem] font-semibold text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-white">
                Explore
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
              </span>
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.article>
  );
}
