"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Hotel, Bus, UtensilsCrossed, Ticket, CalendarDays, Star, Wallet } from "lucide-react";
import CTAButton from "@/components/ui/CTAButton";
import Reveal from "@/components/ui/Reveal";
import WordReveal from "@/components/ui/WordReveal";
import { featuredPackage } from "@/lib/data/packages";
import { formatINR } from "@/lib/utils";

const inclusions = [
  { key: "hotel", icon: Hotel, label: "Hotels" },
  { key: "transport", icon: Bus, label: "Transport" },
  { key: "meals", icon: UtensilsCrossed, label: "Meals" },
  { key: "activities", icon: Ticket, label: "Activities" },
] as const;

export default function FeaturedPackage() {
  const pkg = featuredPackage;

  return (
    <section
      aria-labelledby="featured-package"
      className="container-x py-16 md:py-24"
    >
      <div className="overflow-hidden rounded-[2rem] border border-navy/10 bg-white shadow-soft">
        <div className="grid lg:grid-cols-2">
          {/* IMAGE LEFT */}
          <div className="group relative min-h-[340px] overflow-hidden lg:min-h-[620px]">
            <Image
              src={pkg.image}
              alt={pkg.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              quality={78}
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-navy-950/5 lg:to-navy-950/45" />

            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-flare px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white">
                Featured journey
              </span>
              <span className="rounded-full border border-white/30 bg-black/25 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                {pkg.type}
              </span>
            </div>

            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
              <span className="flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-[0.78rem] font-bold text-navy">
                <Star className="h-3.5 w-3.5 fill-flare text-flare" strokeWidth={0} />
                {pkg.rating} · {pkg.reviews} reviews
              </span>
              <span className="flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-[0.78rem] font-bold text-navy">
                <CalendarDays className="h-3.5 w-3.5 text-azure-600" strokeWidth={2} />
                {pkg.days} days
              </span>
            </div>
          </div>

          {/* CONTENT RIGHT */}
          <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
            <Reveal y={18}>
              <span className="eyebrow text-azure-600">
                <span className="h-px w-8 bg-flare" aria-hidden />
                {pkg.route}
              </span>
            </Reveal>

            <WordReveal
              text={pkg.title}
              className="mt-5 text-[clamp(1.75rem,3vw,2.6rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-navy"
            />

            <Reveal delay={0.12}>
              <p className="lede mt-4">
                {pkg.nights} nights across Srinagar, Gulmarg and Pahalgam — shikara mornings,
                gondola rides and valley dinners, with transfers handled end to end.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-8 space-y-4">
                {inclusions.map(({ key, icon: Icon, label }) => (
                  <div key={key} className="flex gap-4">
                    <dt className="flex w-28 shrink-0 items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-navy/45">
                      <Icon className="h-4 w-4 text-azure-600" strokeWidth={1.9} />
                      {label}
                    </dt>
                    <dd className="flex-1 text-[0.92rem] font-medium leading-relaxed text-navy/80">
                      {pkg.includes[key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.26} className="mt-9">
              <div className="flex flex-wrap items-end justify-between gap-5 border-t border-navy/10 pt-6">
                <div>
                  <span className="flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-navy/45">
                    <Wallet className="h-3.5 w-3.5" strokeWidth={1.9} />
                    Per person
                  </span>
                  <span className="mt-1 block font-display text-3xl font-extrabold text-navy">
                    {formatINR(pkg.price)}
                  </span>
                  <span className="text-sm text-navy/45 line-through">
                    {formatINR(pkg.originalPrice)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <CTAButton href="/trip-planner" variant="primary" size="lg">
                    Plan this trip
                  </CTAButton>
                  <CTAButton href="/packages" variant="outline" size="lg" arrow={false}>
                    All packages
                  </CTAButton>
                </div>
              </div>
            </Reveal>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 h-px origin-left bg-gradient-to-r from-azure-500 via-flare to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
