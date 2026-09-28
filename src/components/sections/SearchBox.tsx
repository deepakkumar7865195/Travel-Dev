"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, CalendarDays, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { destinations } from "@/lib/data/destinations";
import { EASE_OUT } from "@/lib/motion";

const travelTypes = ["Any style", "Beach", "Mountains", "Adventure", "Luxury", "Family", "Honeymoon"];

export default function SearchBox({ delay = 0.6 }: { delay?: number }) {
  const router = useRouter();
  const [where, setWhere] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState(travelTypes[0]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (where.trim()) params.set("q", where.trim());
    if (type !== travelTypes[0]) params.set("type", type);
    if (date) params.set("date", date);
    router.push(`/destinations${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <motion.form
      onSubmit={submit}
      aria-label="Destination search"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
      className="glass-dark relative w-full rounded-[1.5rem] p-2 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]"
    >
      <div className="grid gap-1 md:grid-cols-[1.5fr_1fr_1fr_auto]">
        <label className="group flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-white/5 md:rounded-l-2xl">
          <MapPin className="h-4.5 w-4.5 shrink-0 text-azure-300 transition group-hover:text-flare-400" strokeWidth={1.8} />
          <span className="min-w-0 flex-1">
            <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/45">
              Where do you want to go?
            </span>
            <input
              list="td-destinations"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
              placeholder="Kashmir, Bali, Santorini…"
              className="mt-1 w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/35"
            />
            <datalist id="td-destinations">
              {destinations.map((d) => (
                <option key={d.slug} value={d.name}>
                  {d.country}
                </option>
              ))}
            </datalist>
          </span>
        </label>

        <span aria-hidden className="hidden h-auto w-px self-stretch bg-white/12 md:block" />

        <label className="group flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-white/5">
          <CalendarDays className="h-4.5 w-4.5 shrink-0 text-azure-300 transition group-hover:text-flare-400" strokeWidth={1.8} />
          <span className="min-w-0 flex-1">
            <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/45">
              Travel date
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full bg-transparent text-sm font-medium text-white outline-none [color-scheme:dark]"
            />
          </span>
        </label>

        <span aria-hidden className="hidden h-auto w-px self-stretch bg-white/12 md:block" />

        <label className="group flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-white/5">
          <Compass className="h-4.5 w-4.5 shrink-0 text-azure-300 transition group-hover:text-flare-400" strokeWidth={1.8} />
          <span className="min-w-0 flex-1">
            <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/45">
              Travel type
            </span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 w-full cursor-pointer appearance-none bg-transparent text-sm font-medium text-white outline-none [&>option]:text-navy"
            >
              {travelTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </span>
        </label>

        <button
          type="submit"
          className="group mt-1 inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-7 text-sm font-bold uppercase tracking-[0.12em] text-navy transition-all duration-300 hover:bg-flare hover:text-white md:mt-0 md:h-auto md:min-h-[68px] md:rounded-2xl"
        >
          <Search className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110" strokeWidth={2.4} />
          Search
        </button>
      </div>
    </motion.form>
  );
}
