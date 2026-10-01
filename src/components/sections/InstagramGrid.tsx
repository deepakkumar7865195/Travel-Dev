"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Instagram } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";
import Reveal from "@/components/ui/Reveal";
import { instagramTiles } from "@/lib/data/gallery";
import { EASE_OUT } from "@/lib/motion";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function formatCount(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export default function InstagramGrid() {
  const reduce = useReducedMotion();
  const instagram = siteConfig.socials.find((s) => s.icon === "instagram");

  return (
    <section className="bg-cloud-50 py-20 md:py-28" aria-label="Instagram photo grid">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Daily dispatch"
            title="On the grid"
            description="What we posted this week — loose frames from trips in progress, not campaigns."
            highlight="the grid"
          />
          {instagram && (
            <Reveal delay={0.1} y={18}>
              <CTAButton href={instagram.href} variant="primary" arrow={false}>
                <Instagram className="h-4 w-4" strokeWidth={2.1} aria-hidden />
                {instagram.label}
              </CTAButton>
            </Reveal>
          )}
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {instagramTiles.map((tile, i) => (
            <motion.li
              key={tile.id}
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.06, 0.4), ease: EASE_OUT }}
            >
              <a
                href={instagram?.href ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative block overflow-hidden rounded-2xl bg-cloud-200",
                  i === 0 ? "col-span-2 row-span-2" : "aspect-square"
                )}
                aria-label={`${tile.caption} — posted by ${tile.handle}`}
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes={
                    i === 0
                      ? "(min-width: 1024px) 40vw, (min-width: 640px) 66vw, 92vw"
                      : "(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 46vw"
                  }
                  quality={75}
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />

                <span
                  aria-hidden
                  className="absolute inset-0 bg-navy-950/0 transition-colors duration-500 group-hover:bg-navy-950/55"
                />

                <span className="absolute inset-0 flex flex-col justify-end gap-1.5 p-3 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <span className="line-clamp-2 text-[0.78rem] font-semibold leading-snug text-white">
                    {tile.caption}
                  </span>
                  <span className="flex items-center gap-2 text-[0.66rem] font-medium text-white/70">
                    <span className="inline-flex items-center gap-1">
                      <Heart className="h-3 w-3 fill-flare text-flare" strokeWidth={0} aria-hidden />
                      {formatCount(tile.likes)}
                    </span>
                    <span>{tile.handle}</span>
                  </span>
                </span>

                <Instagram
                  className="absolute right-3 top-3 h-4 w-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  strokeWidth={2}
                  aria-hidden
                />
              </a>
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-navy/50">
          Follow along on{" "}
          <Link href={instagram?.href ?? "#"} className="font-semibold text-azure-600 hover:text-navy">
            Instagram
          </Link>{" "}
          — and tag{" "}
          <span className="font-semibold text-navy">#TravelDevMoments</span>.
        </p>
      </div>
    </section>
  );
}