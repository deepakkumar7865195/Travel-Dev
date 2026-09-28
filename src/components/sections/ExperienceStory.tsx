"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import HorizontalScroll from "@/components/ui/HorizontalScroll";
import { experiences } from "@/lib/data/experiences";

export default function ExperienceStory() {
  return (
    <section aria-labelledby="experience-story" className="border-y border-navy/10 bg-cloud-100/60 py-16 md:py-24">
      <div className="container-x">
        <span className="eyebrow text-azure-600">
          <span className="h-px w-8 bg-flare" aria-hidden />
          Storytelling
        </span>
        <h2 id="experience-story" className="h2 mt-5 max-w-2xl">
          Eight ways to spend a year
        </h2>
        <p className="lede mt-5 max-w-xl">
          Keep scrolling — each card slides through as the page moves with you.
        </p>
      </div>

      <div className="mt-12">
        <HorizontalScroll>
          {experiences.map((e, i) => (
            <article
              key={e.slug}
              className="group relative h-[54vh] min-h-[380px] w-[80vw] max-w-[520px] shrink-0 overflow-hidden rounded-[1.75rem] bg-navy-950 md:h-[60vh] md:w-[520px]"
            >
              <Image
                src={e.image}
                alt={e.imageAlt}
                fill
                sizes="(max-width: 768px) 80vw, 520px"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-navy-950/10" />
              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7">
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/25 font-display text-xs font-bold text-white backdrop-blur-md">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-navy">
                    {e.kicker}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-extrabold leading-tight text-white md:text-3xl">
                    {e.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-white/70">
                    {e.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="text-[0.78rem] font-semibold text-azure-300">
                      {e.count} curated journeys
                    </span>
                    <Link
                      href={`/experiences#${e.slug}`}
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition group-hover:bg-flare"
                      aria-label={`Open ${e.title}`}
                    >
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </HorizontalScroll>
      </div>
    </section>
  );
}

export function ExperienceStoryFallback() {
  return (
    <div className="container-x mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="aspect-[4/5] animate-pulse rounded-[1.75rem] bg-cloud-200"
        />
      ))}
    </div>
  );
}
