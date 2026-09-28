"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const milestones = [
  {
    year: "2016",
    title: "Two desks in Sector V",
    body: "TRAVEL DEV starts as a three-person team building itineraries for friends who kept asking who planned their trip.",
  },
  {
    year: "2018",
    title: "First international departures",
    body: "Thailand and Bali groups go out with our own trip leads. Ninety-one travellers, zero missed transfers.",
  },
  {
    year: "2020",
    title: "We went fully digital",
    body: "Live itinerary tracking, WhatsApp-first support and instant quotes — built because the world stopped moving.",
  },
  {
    year: "2023",
    title: "100 destinations crossed",
    body: "On-ground partners across Europe, the Middle East and Southeast Asia, plus a 24/7 control desk at home.",
  },
  {
    year: "2026",
    title: "5,000 travellers and counting",
    body: "Same founding team, same rule: never sell a hotel we haven't slept in.",
  },
];

export default function Timeline() {
  return (
    <ol className="relative">
      <span
        aria-hidden
        className="absolute left-[13px] top-2 h-full w-px bg-gradient-to-b from-azure-500 via-navy/15 to-transparent md:left-1/2 md:-translate-x-1/2"
      />

      {milestones.map((m, i) => {
        const right = i % 2 === 1;
        return (
          <li key={m.year} className="relative pb-12 last:pb-0">
            <span
              aria-hidden
              className="absolute left-0 top-1.5 grid h-7 w-7 place-items-center rounded-full border-2 border-azure-500 bg-white md:left-1/2 md:-translate-x-1/2"
            >
              <motion.span
                className="h-2 w-2 rounded-full bg-flare"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              />
            </span>

            <motion.div
              initial={{ opacity: 0, y: 34, x: right ? 24 : -24 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
              className={cn(
                "ml-12 md:w-[calc(50%-2.75rem)]",
                right ? "md:ml-auto" : "md:ml-0"
              )}
            >
              <div className="rounded-3xl border border-navy/10 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <span className="font-display text-sm font-extrabold tracking-[0.2em] text-flare">
                  {m.year}
                </span>
                <h3 className="mt-2 text-xl font-bold text-navy">{m.title}</h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-navy/60">{m.body}</p>
              </div>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
