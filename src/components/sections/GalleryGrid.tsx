"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Expand, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryLightbox from "@/components/sections/GalleryLightbox";
import {
  galleryCategories,
  photosByCategory,
  type GalleryCategory,
} from "@/lib/data/gallery";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Filter = GalleryCategory | "All";

export default function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const photos = useMemo(() => photosByCategory(filter), [filter]);

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["All", photosByCategory("All").length]]);
    for (const c of galleryCategories) {
      if (c !== "All") map.set(c, photosByCategory(c).length);
    }
    return map;
  }, []);

  const step = useCallback(
    (delta: number) => {
      setActive((current) => {
        if (current === null || photos.length === 0) return current;
        return (current + delta + photos.length) % photos.length;
      });
    },
    [photos.length]
  );

  const jump = useCallback(
    (next: number) => setActive(next),
    []
  );

  const onFilter = (next: Filter) => {
    setFilter(next);
    setActive(null);
  };

  return (
    <section
      id="gallery-grid"
      className="relative scroll-mt-24 bg-cloud-50 py-20 md:py-28"
      aria-labelledby="gallery-grid-heading"
    >
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="The archive"
            title="Frame by frame, place by place"
            description="Filter by mood, then open any frame full-screen. Every shot below came from a trip our team designed — no stock library."
            highlight="place by place"
          />

          <div className="lg:pb-2">
            <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-navy/40">
              {photos.length} {photos.length === 1 ? "frame" : "frames"}
            </p>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter gallery by category"
            >
              {galleryCategories.map((c) => {
                const selected = filter === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => onFilter(c)}
                    aria-pressed={selected}
                    className={cn(
                      "relative rounded-full px-4 py-2.5 text-[0.82rem] font-semibold transition-colors duration-300",
                      selected
                        ? "text-white"
                        : "text-navy/55 hover:bg-cloud-100 hover:text-navy"
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="gallery-filter-pill"
                        className="absolute inset-0 rounded-full bg-navy shadow-[0_12px_28px_-14px_rgb(11_41_66_/_0.9)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">
                      {c}
                      <span className={cn("ml-1.5 text-[0.7rem]", selected ? "text-white/55" : "text-navy/35")}>
                        {counts.get(c)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <h2 id="gallery-grid-heading" className="sr-only">
          Travel photo gallery
        </h2>

        {/* masonry */}
        <div
          key={filter}
          className="mt-12 [column-fill:balance] columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5"
        >
          {photos.map((photo, i) => (
            <motion.button
              key={photo.id}
              type="button"
              initial={reduce ? false : { opacity: 0, y: 26, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.55,
                delay: reduce ? 0 : Math.min(i * 0.045, 0.4),
                ease: EASE_OUT,
              }}
              onClick={() => setActive(i)}
              aria-label={`Open photo: ${photo.title}, ${photo.location}`}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-[1.35rem] bg-cloud-200 text-left shadow-soft transition-shadow duration-500 hover:shadow-lift"
              style={{ aspectRatio: `${photo.ratio}` }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
                quality={78}
                className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
              />

              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-950/88 via-navy-950/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95"
              />

              {/* location label */}
              <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-navy-950/55 px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.13em] text-white/90 backdrop-blur-md">
                <MapPin className="h-3 w-3 text-flare" strokeWidth={2.2} aria-hidden />
                {photo.country}
              </span>

              {/* expand affordance */}
              <span
                aria-hidden
                className="absolute right-3.5 top-3.5 grid h-9 w-9 -translate-y-1 place-items-center rounded-full bg-white/12 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:bg-white group-hover:text-navy group-hover:opacity-100"
              >
                <Expand className="h-4 w-4" strokeWidth={2.1} />
              </span>

              {/* caption */}
              <span className="absolute inset-x-0 bottom-0 block px-4 pb-4 pt-10">
                <span className="block font-display text-[0.98rem] font-bold leading-snug text-white md:text-lg">
                  {photo.title}
                </span>
                <span className="mt-1 block text-[0.74rem] text-white/65">
                  {photo.location}
                </span>
              </span>
            </motion.button>
          ))}
        </div>

        {photos.length === 0 && (
          <p className="mt-12 rounded-3xl border border-dashed border-navy/20 bg-white px-6 py-14 text-center text-sm text-navy/55">
            Nothing filed under that mood yet — try another category.
          </p>
        )}

        <p className="sr-only" aria-live="polite">
          Showing {photos.length} photos in the {filter} category.
        </p>
      </div>

      <GalleryLightbox
        photos={photos}
        index={active}
        onClose={() => setActive(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        onJump={jump}
      />
    </section>
  );
}