"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { galleryPhotos } from "@/lib/data/gallery";

type Card = {
  photoId: string;
  caption: string;
  rotate: number;
  /** desktop placement */
  className: string;
  float: number;
  z: number;
};

const cards: Card[] = [
  {
    photoId: "darjeeling-8",
    caption: "Below the clouds",
    rotate: -11,
    className: "left-[-16%] top-[6%] w-[46%]",
    float: 7.5,
    z: 20,
  },
  {
    photoId: "darjeeling-5",
    caption: "Lunch, Himalayan style",
    rotate: 8,
    className: "right-[-13%] top-[0%] w-[42%]",
    float: 9.5,
    z: 30,
  },
  {
    photoId: "darjeeling-12",
    caption: "Prayer flags in fog",
    rotate: -6,
    className: "left-[4%] bottom-[0%] w-[44%]",
    float: 8.5,
    z: 40,
  },
  {
    photoId: "darjeeling-11",
    caption: "When the hills disappear",
    rotate: 13,
    className: "right-[1%] bottom-[1%] w-[40%]",
    float: 6.5,
    z: 50,
  },
  {
    photoId: "darjeeling-7",
    caption: "Standing in the weather",
    rotate: 4,
    className: "left-[38%] top-[36%] w-[30%]",
    float: 11,
    z: 60,
  },
];

function Polaroid({
  photoId,
  caption,
  className,
  index,
}: {
  photoId: string;
  caption: string;
  className: string;
  index: number;
}) {
  const photo = galleryPhotos.find((p) => p.id === photoId)!;
  const config = cards[index];

  return (
    <motion.figure
      className={className}
      initial={{ opacity: 0, y: 40, scale: 0.86, rotate: config.rotate * 1.5 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: config.rotate }}
      transition={{ duration: 1.1, delay: 0.34 + index * 0.12, ease: EASE_OUT }}
      style={{ zIndex: config.z }}
    >
      <PolaroidInner photo={photo} caption={caption} floatDelay={config.float} />
    </motion.figure>
  );
}

function PolaroidInner({
  photo,
  caption,
  floatDelay,
}: {
  photo: (typeof galleryPhotos)[number];
  caption: string;
  floatDelay: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="group relative"
      animate={reduce ? undefined : { y: [0, -12, 0], rotate: [0, 0.7, 0] }}
      transition={{
        duration: floatDelay,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatDelay * 0.3,
      }}
      whileHover={reduce ? undefined : { scale: 1.06, zIndex: 100 }}
    >
      <motion.div
        className="overflow-hidden rounded-[6px] bg-white p-2 pb-9 shadow-[0_30px_60px_-24px_rgba(4,15,26,0.75)] transition-shadow duration-500 group-hover:shadow-[0_44px_90px_-28px_rgba(4,15,26,0.9)]"
        whileHover={reduce ? undefined : { rotateX: 6, rotateY: -6 }}
        style={{ transformPerspective: 1000, transformStyle: "preserve-3d" }}
      >
        <div className="relative aspect-4/3 overflow-hidden bg-cloud-200">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 30vw, 0px"
            quality={80}
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <figcaption className="absolute inset-x-2 bottom-2 flex items-baseline justify-between gap-2 pt-2 font-sans">
          <span className="truncate text-[0.62rem] font-semibold tracking-[0.02em] text-navy/80">
            {caption}
          </span>
          <span className="shrink-0 text-[0.55rem] font-medium uppercase tracking-[0.14em] text-navy/35">
            {photo.country}
          </span>
        </figcaption>
      </motion.div>

      {/* glossy film highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[6px] bg-gradient-to-br from-white/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </motion.div>
  );
}

export default function GalleryHero() {
  const reduce = useReducedMotion();
  const mobilePhotos = galleryPhotos.slice(0, 6);

  return (
    <header className="relative isolate overflow-hidden bg-navy-950 pb-24 pt-32 md:pb-36 md:pt-44">
      {/* cinematic backdrop */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/Darjeeling 11.jpeg"
          alt="Low cloud pouring over forested ridgelines above tin-roofed hillside homes"
          fill
          priority
          sizes="100vw"
          quality={78}
          className="scale-110 object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/72 to-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(75%_60%_at_20%_10%,rgb(23_105_170_/_0.42),transparent_65%)]" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          {/* copy */}
          <div className="relative z-10">
            <motion.p
              className="eyebrow text-azure-300"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <span className="h-px w-8 bg-flare" aria-hidden />
              Photo gallery
            </motion.p>

            <motion.h1
              className="h1 mt-6 max-w-[13ch] text-white"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: EASE_OUT }}
            >
              Every Journey Tells a Story.
            </motion.h1>

            <motion.p
              className="lede mt-7 max-w-xl !text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
            >
              Some places are remembered for what you did there. Others for how the light
              landed. This is the other record — the frames our travellers carried home from
              extraordinary places, shot between one cup of chai and the next train out.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
            >
              <a
                href="#gallery-grid"
                className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-white px-7 text-[0.92rem] font-semibold text-navy transition-colors hover:bg-azure-100"
              >
                Browse the frames
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  strokeWidth={2.2}
                  aria-hidden
                />
              </a>

              <Link
                href="/contact"
                className="glass-dark inline-flex h-13 items-center rounded-full px-7 text-[0.92rem] font-semibold text-white transition-colors hover:bg-white/15"
              >
                Send your story
              </Link>
            </motion.div>

            <motion.dl
              className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.42 }}
            >
              {[
                { k: "Frames", v: "1,200+" },
                { k: "Routes", v: "38" },
                { k: "Contributors", v: "96" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/40">
                    {s.k}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-white md:text-[1.75rem]">
                    {s.v}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* floating polaroids — desktop */}
          <div
            className="relative hidden min-h-[540px] lg:block"
            aria-hidden
          >
            {cards.map((c, i) => (
              <Polaroid
                key={c.photoId}
                photoId={c.photoId}
                caption={c.caption}
                className={`absolute ${c.className}`}
                index={i}
              />
            ))}
            {/* decorative glow */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgb(79_163_224_/_0.28),transparent_70%)] blur-2xl" />
          </div>
        </div>

        {/* responsive grid alternative — mobile / tablet */}
        <div className="mt-14 lg:hidden" aria-hidden>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {mobilePhotos.map((photo, i) => (
              <motion.figure
                key={photo.id}
                initial={{ opacity: 0, y: 26, rotate: i % 2 ? 2.5 : -2.5 }}
                animate={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.06, ease: EASE_OUT }}
                className="rounded-[5px] bg-white p-1.5 pb-6 shadow-[0_18px_38px_-20px_rgba(4,15,26,0.8)]"
              >
                <div className="relative aspect-3/4 overflow-hidden bg-cloud-200">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 640px) 30vw, 33vw"
                    quality={75}
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-1.5 truncate px-0.5 text-[0.55rem] font-semibold text-navy/70">
                  {photo.title}
                </figcaption>
              </motion.figure>
            ))}
          </div>

          {reduce && (
            <p className="mt-5 text-center text-xs text-white/40">
              Floating animation paused — reduced motion is on.
            </p>
          )}
        </div>
      </div>

      {/* bottom fade into the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-cloud-50"
      />
    </header>
  );
}