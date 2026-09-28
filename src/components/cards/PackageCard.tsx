"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Check, ArrowUpRight } from "lucide-react";
import RatingStars from "@/components/ui/RatingStars";
import { cardIn } from "@/lib/motion";
import { formatINR, cn } from "@/lib/utils";
import type { TourPackage } from "@/lib/types";

export default function PackageCard({
  pkg,
  onCompare,
  compared = false,
}: {
  pkg: TourPackage;
  onCompare?: (slug: string) => void;
  compared?: boolean;
}) {
  return (
    <motion.article
      layout
      variants={cardIn}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.imageAlt}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 31vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/25" />

        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-navy">
          {pkg.days} Days · {pkg.nights} Nights
        </span>

        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-navy/70 px-2.5 py-1 text-[0.7rem] font-semibold text-white backdrop-blur-md">
          <RatingStars rating={pkg.rating} starClass="h-3 w-3" />
          {pkg.rating}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-flare-400">
            {pkg.route}
          </span>
          <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-white">
            {pkg.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <ul className="space-y-1.5">
          {pkg.itinerary.slice(0, 3).map((step) => (
            <li key={step} className="flex items-start gap-2 text-[0.84rem] text-navy/65">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-azure-500" strokeWidth={2.4} />
              {step}
            </li>
          ))}
          {pkg.itinerary.length > 3 && (
            <li className="pl-5.5 text-[0.8rem] font-medium text-azure-600">
              + {pkg.itinerary.length - 3} more days
            </li>
          )}
        </ul>

        <div className="mt-5 flex items-center gap-4 text-[0.76rem] font-medium text-navy/50">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-azure-500" strokeWidth={1.8} />
            {pkg.type}
          </span>
          <span>{pkg.reviews} reviews</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-navy/10 pt-4">
          <div>
            <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-navy/45">
              Per person
            </span>
            <span className="font-display text-xl font-extrabold text-navy">
              {formatINR(pkg.price)}
            </span>
            <span className="ml-2 text-xs text-navy/40 line-through">
              {formatINR(pkg.originalPrice)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {onCompare && (
              <button
                type="button"
                onClick={() => onCompare(pkg.slug)}
                aria-pressed={compared}
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full border transition",
                  compared
                    ? "border-azure-500 bg-azure-600 text-white"
                    : "border-navy/15 text-navy/60 hover:border-navy/40 hover:text-navy"
                )}
                title="Add to comparison"
              >
                <span className="text-lg leading-none">{compared ? "✓" : "+"}</span>
              </button>
            )}
            <Link
              href={`/packages#${pkg.slug}`}
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-navy px-4 text-[0.8rem] font-semibold text-white transition group-hover:bg-azure-600"
            >
              View Package
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
