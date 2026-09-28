"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Plane } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import WordReveal from "@/components/ui/WordReveal";
import Reveal from "@/components/ui/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import FlightPath from "@/components/ui/FlightPath";
import { destinations } from "@/lib/data/destinations";
import { formatINR } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";

const floating = [
  { slug: "greece", className: "right-6 top-[19%] w-[210px]", delay: 1.15 },
  { slug: "kashmir", className: "right-14 top-[46%] w-[186px]", delay: 1.35 },
  { slug: "maldives", className: "right-8 bottom-[14%] w-[198px]", delay: 1.55 },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-navy-950"
    >
      {/* cinematic background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduce ? undefined : { y: bgY }}
        aria-hidden
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.04 }}
          animate={reduce ? {} : { scale: [1.04, 1.14] }}
          transition={{ duration: 32, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        >
          <Image
            src="/images/hero.jpg"
            alt="Snow-covered mountain peaks rising above a sea of clouds at sunrise"
            fill
            priority
            sizes="100vw"
            quality={80}
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/45 to-navy-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_18%_28%,rgb(11_41_66_/_0.55),transparent_65%)]" />
        <div className="grain absolute inset-0 opacity-60" />
      </motion.div>

      {/* decorative flight route */}
      <FlightPath
        className="pointer-events-none absolute right-[6%] top-[8%] hidden h-36 w-[min(46vw,600px)] opacity-70 xl:block"
        stroke="#FF6B6F"
        duration={7}
        delay={1.2}
      />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-x relative z-10 flex min-h-[100svh] flex-col justify-center pb-32 pt-32 md:pt-36"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.45, ease: EASE_OUT }}
        >
          <Logo markClassName="h-12 md:h-14" showTagline className="text-white" textClassName="ml-1" />
        </motion.div>

        <h1 className="mt-8 max-w-4xl text-[clamp(2.5rem,7.4vw,5.6rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.045em] text-white">
          <WordReveal
            as="span"
            text="YOUR JOURNEY"
            immediate
            delay={1.6}
            stagger={0.07}
            className="block"
          />
          <WordReveal
            as="span"
            text="STARTS HERE."
            immediate
            delay={1.78}
            stagger={0.07}
            className="block text-gradient-light"
          />
        </h1>

        <Reveal immediate delay={2.05} y={22} className="mt-7 max-w-xl">
          <p className="text-[1.02rem] leading-relaxed text-white/75 md:text-[1.12rem]">
            Discover unforgettable destinations, seamless travel experiences, and journeys
            designed around you.
          </p>
        </Reveal>

        <Reveal immediate delay={2.2} y={20} className="mt-9 flex flex-wrap items-center gap-3.5">
          <CTAButton href="/destinations" variant="flare" size="lg">
            Explore Destinations
          </CTAButton>
          <CTAButton href="/contact" variant="glass" size="lg" arrow={false}>
            Plan My Trip
          </CTAButton>
        </Reveal>

        {/* floating destination cards */}
        {floating.map((f) => {
          const d = destinations.find((x) => x.slug === f.slug)!;
          return (
            <motion.div
              key={f.slug}
              initial={{ opacity: 0, y: 26, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: f.delay, ease: EASE_OUT }}
              className={`absolute z-20 hidden xl:block ${f.className}`}
            >
              <motion.div
                animate={reduce ? {} : { y: [0, -14, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
                className="glass-dark group flex items-center gap-3 rounded-2xl p-2.5 pr-4 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.9)]"
              >
                <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={d.image}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.9rem] font-semibold text-white">
                    {d.name}
                  </span>
                  <span className="block truncate text-[0.7rem] text-white/55">{d.country}</span>
                  <span className="mt-1 block text-[0.78rem] font-bold text-flare-400">
                    from {formatINR(d.price)}
                  </span>
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7, duration: 0.8 }}
        className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2.5"
      >
        <span className="grid h-12 w-7 place-items-start justify-center rounded-full border border-white/25 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-flare"
            animate={reduce ? {} : { y: [0, 16, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-white/55">
          Scroll
          <Plane className="h-3 w-3 rotate-90" strokeWidth={2} />
        </span>
      </motion.div>
    </section>
  );
}
