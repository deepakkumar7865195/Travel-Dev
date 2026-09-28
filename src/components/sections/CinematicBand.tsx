"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Experience } from "@/lib/types";

/** Full-bleed cinematic band with parallax media and an animated overlay title. */
export default function CinematicBand({ experience }: { experience: Experience }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      aria-labelledby={`band-${experience.slug}`}
      className="relative isolate my-16 h-[78svh] min-h-[460px] overflow-hidden bg-navy-950 md:my-24 md:h-[85svh]"
    >
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
        <Image
          src={experience.image}
          alt={experience.imageAlt}
          fill
          sizes="100vw"
          quality={80}
          className="scale-125 object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/55 to-navy-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/40" />
      <div className="grain absolute inset-0 opacity-50" />

      <div className="container-x relative flex h-full flex-col justify-end pb-14 md:pb-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow text-azure-300"
        >
          <span className="h-px w-8 bg-flare" aria-hidden />
          {experience.kicker} · {experience.count} journeys
        </motion.span>

        <motion.h2
          id={`band-${experience.slug}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-3xl text-[clamp(2.1rem,5.5vw,4.5rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.04em] text-white"
        >
          {experience.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-xl text-[1rem] leading-relaxed text-white/70 md:text-[1.08rem]"
        >
          {experience.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <Link
            href={`/contact?interest=${experience.slug}`}
            className="group inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:border-flare hover:bg-flare"
          >
            Design this for me
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={2.2}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
