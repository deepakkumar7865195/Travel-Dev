"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { travelerMemories } from "@/lib/data/gallery";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function TravelerMemories() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-20 md:py-28" aria-label="Traveler submitted memories">
      <div className="grain absolute inset-0 -z-10" />
      <div className="absolute -left-20 top-10 -z-10 h-80 w-80 rounded-full bg-azure-600/22 blur-[130px]" />
      <div className="absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-flare/18 blur-[130px]" />

      <div className="container-x">
        <SectionHeading
          eyebrow="From our travellers"
          title="The photographs we were sent"
          description="Some guests send a photo from a trip we planned together. These are a few, with their words left exactly as written."
          highlight="we were sent"
          light
        />

        <RevealStagger className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4" stagger={0.1}>
          {travelerMemories.map((m) => (
            <RevealItem key={m.id}>
              <motion.article
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-white/12 bg-white/[0.04] backdrop-blur-md transition-colors duration-500 hover:border-white/25"
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 92vw"
                    quality={76}
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                  <Quote
                    className="absolute left-4 top-4 h-7 w-7 text-white/35"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                  <span className="absolute bottom-3.5 left-4 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/70">
                    {m.date}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <p className="text-[0.9rem] leading-relaxed text-white/80">&ldquo;{m.note}&rdquo;</p>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm font-bold text-white">{m.name}</p>
                      <p className="truncate text-[0.74rem] text-white/45">{m.route}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/15 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/55">
                      {m.trip}
                    </span>
                  </div>
                </div>
              </motion.article>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal delay={0.12} y={20}>
          <div className="mt-12 flex flex-col items-center gap-5 rounded-[1.75rem] border border-white/12 bg-white/[0.03] px-6 py-9 text-center">
            <p className="lede max-w-xl !text-white/70">
              Travelled with us and want your frame on this wall? Send the photo and the story behind
              it — we publish the best ones with credit.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <CTAButton href="/contact" variant="flare">
                Send your memory
              </CTAButton>
              <CTAButton href="/blog" variant="glass" arrow={false}>
                Read travel journals
              </CTAButton>
            </div>
            <p
              className={cn(
                "inline-flex items-center gap-2 text-[0.72rem] font-medium",
                "text-white/40"
              )}
            >
              <Send className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              34 memories shared this season
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}