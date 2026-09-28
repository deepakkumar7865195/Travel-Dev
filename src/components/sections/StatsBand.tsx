"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Reveal from "@/components/ui/Reveal";

const stats = [
  { value: 10, suffix: "+", label: "Years experience", blurb: "Since 2016, still obsessed with the details." },
  { value: 5000, suffix: "+", label: "Happy travellers", blurb: "Families, couples, solo and corporate." },
  { value: 100, suffix: "+", label: "Destinations", blurb: "Domestic, regional and long-haul." },
  { value: 24, suffix: "/7", label: "Travel support", blurb: "A human on the line, every timezone." },
];

export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section ref={ref} aria-label="Company statistics" className="container-x">
      <Reveal y={24}>
        <div className="grid gap-px overflow-hidden rounded-[1.75rem] bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="group relative bg-white p-7 transition-colors duration-500 hover:bg-navy md:p-8"
            >
              <span className="absolute right-6 top-6 font-display text-sm font-bold text-navy/20 transition-colors group-hover:text-white/25">
                0{i + 1}
              </span>
              <span className="block font-display text-[clamp(2.4rem,4.5vw,3.4rem)] font-extrabold leading-none tracking-[-0.04em] text-navy transition-colors group-hover:text-white">
                {inView && <AnimatedCounter value={s.value} suffix={s.suffix} />}
              </span>
              <span className="mt-4 block text-[0.78rem] font-bold uppercase tracking-[0.18em] text-azure-600 transition-colors group-hover:text-azure-300">
                {s.label}
              </span>
              <span className="mt-2 block text-[0.86rem] leading-relaxed text-navy/55 transition-colors group-hover:text-white/60">
                {s.blurb}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
