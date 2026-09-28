"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  CalendarDays,
  Users,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Check,
  Hotel,
  Bus,
  Mountain,
} from "lucide-react";
import CTAButton from "@/components/ui/CTAButton";
import { destinations } from "@/lib/data/destinations";
import { formatINR, cn } from "@/lib/utils";
import type { TravelStyle } from "@/lib/types";

type Plan = {
  slug: string;
  date: string;
  days: number;
  travellers: number;
  style: TravelStyle;
};

const steps = [
  { label: "Destination", icon: MapPin },
  { label: "Travel dates", icon: CalendarDays },
  { label: "Travellers", icon: Users },
  { label: "Travel style", icon: Sparkles },
  { label: "Estimate", icon: Check },
];

const styles: { key: TravelStyle; label: string; blurb: string; mult: number }[] = [
  { key: "Budget", label: "Budget", blurb: "Smart stays, maximum experience", mult: 0.85 },
  { key: "Couple", label: "Couple", blurb: "Slow mornings and good dinners", mult: 1.05 },
  { key: "Family", label: "Family", blurb: "Right pace for every age", mult: 1.0 },
  { key: "Luxury", label: "Luxury", blurb: "Design hotels, private transfers", mult: 1.65 },
  { key: "Adventure", label: "Adventure", blurb: "Trails, water, altitude", mult: 1.2 },
];

const included: Record<TravelStyle, { hotel: string; transport: string; activities: string }> = {
  Budget: {
    hotel: "3★ value stays with breakfast",
    transport: "AC cabs + shared transfers",
    activities: "City walks, viewpoints, local markets",
  },
  Couple: {
    hotel: "4★ boutique stays",
    transport: "Private AC transfers",
    activities: "Sunset cruise, candlelight dinner, spa",
  },
  Family: {
    hotel: "4★ family-friendly resorts",
    transport: "Private SUV with extra luggage",
    activities: "Kid-friendly attractions, easy trails",
  },
  Luxury: {
    hotel: "5★ design hotels & suites",
    transport: "Private chauffeur + flights",
    activities: "Exclusive access, private guide",
  },
  Adventure: {
    hotel: "3–4★ trail-side lodges",
    transport: "4x4 transfers & permits",
    activities: "Trekking, water sports, camping",
  },
};

const plannerDestinations = destinations.slice(0, 10);
const defaultDays: Record<string, number> = Object.fromEntries(
  destinations.map((d) => [d.slug, Number(d.duration.split(" ")[0])])
);

const easing = [0.22, 1, 0.36, 1] as const;

export default function TripPlanner() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [plan, setPlan] = useState<Plan>({
    slug: "",
    date: "",
    days: 5,
    travellers: 2,
    style: "Couple",
  });

  const dest = destinations.find((d) => d.slug === plan.slug);
  const styleConf = styles.find((s) => s.key === plan.style)!;

  const estimate = useMemo(() => {
    if (!dest) return 0;
    const baseDaily = dest.price / (defaultDays[dest.slug] ?? 5);
    return Math.round((baseDaily * plan.days * styleConf.mult) / 100) * 100;
  }, [dest, plan.days, styleConf]);

  const total = estimate * plan.travellers;

  const canNext =
    (step === 0 && Boolean(plan.slug)) ||
    (step === 1 && Boolean(plan.date)) ||
    step === 2 ||
    step === 3 ||
    step === 4;

  const go = (next: number) => {
    if (next < 0 && step === 0) return;
    setDir(next > step ? 1 : -1);
    setStep(Math.max(0, Math.min(4, next)));
  };

  const patch = (p: Partial<Plan>) => setPlan((prev) => ({ ...prev, ...p }));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
      {/* ---------- steps ---------- */}
      <div className="rounded-[1.75rem] border border-navy/10 bg-white p-6 shadow-soft md:p-8">
        {/* progress */}
        <ol className="flex items-center gap-2">
          {steps.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li key={s.label} className="flex flex-1 items-center gap-2">
                <button
                  type="button"
                  onClick={() => i <= step && go(i)}
                  disabled={i > step}
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full text-[0.78rem] font-bold transition",
                    done
                      ? "bg-azure-600 text-white"
                      : active
                        ? "bg-navy text-white"
                        : "bg-cloud-100 text-navy/40"
                  )}
                >
                  {done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                </button>
                <span
                  className={cn(
                    "hidden text-[0.76rem] font-semibold uppercase tracking-[0.12em] transition sm:block",
                    active ? "text-navy" : "text-navy/40"
                  )}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <span className="h-px flex-1 bg-navy/12">
                    <motion.span
                      className="block h-full origin-left bg-azure-500"
                      initial={false}
                      animate={{ scaleX: i < step ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: easing }}
                    />
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        {/* panel */}
        <div className="relative mt-8 min-h-[420px] overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: dir * 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -48 }}
              transition={{ duration: 0.45, ease: easing }}
            >
              {step === 0 && (
                <div>
                  <h2 className="h3">Where should we take you?</h2>
                  <p className="mt-2 text-sm text-navy/60">
                    Pick a starting point — you can change everything later.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {plannerDestinations.map((d) => {
                      const selected = plan.slug === d.slug;
                      return (
                        <button
                          key={d.slug}
                          type="button"
                          onClick={() => patch({ slug: d.slug, days: defaultDays[d.slug] })}
                          className={cn(
                            "group relative aspect-[4/3] overflow-hidden rounded-2xl text-left transition-all duration-300",
                            selected
                              ? "ring-2 ring-flare ring-offset-2 ring-offset-white"
                              : "hover:ring-2 hover:ring-azure-500/50 hover:ring-offset-2 hover:ring-offset-white"
                          )}
                        >
                          <Image
                            src={d.image}
                            alt={d.imageAlt}
                            fill
                            sizes="(max-width: 640px) 45vw, 220px"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <span className="absolute inset-0 bg-gradient-to-t from-navy-950/85 to-transparent" />
                          {selected && (
                            <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-flare text-white">
                              <Check className="h-3.5 w-3.5" strokeWidth={3} />
                            </span>
                          )}
                          <span className="absolute inset-x-3 bottom-3">
                            <span className="block truncate text-[0.86rem] font-bold text-white">
                              {d.name}
                            </span>
                            <span className="block truncate text-[0.68rem] text-white/60">
                              {d.country}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="h3">When are you travelling?</h2>
                  <p className="mt-2 text-sm text-navy/60">
                    We&apos;ll check season pricing and availability for these dates.
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <label className="block rounded-2xl border border-navy/12 p-4 transition focus-within:border-azure-500">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-navy/45">
                        Start date
                      </span>
                      <input
                        type="date"
                        value={plan.date}
                        onChange={(e) => patch({ date: e.target.value })}
                        className="mt-2 w-full bg-transparent text-sm font-semibold text-navy outline-none [color-scheme:light]"
                      />
                    </label>

                    <label className="block rounded-2xl border border-navy/12 p-4 transition focus-within:border-azure-500">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-navy/45">
                        Trip length
                      </span>
                      <select
                        value={plan.days}
                        onChange={(e) => patch({ days: Number(e.target.value) })}
                        className="mt-2 w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-navy outline-none"
                      >
                        {[3, 4, 5, 6, 7, 8, 9, 10, 12, 14].map((n) => (
                          <option key={n} value={n}>
                            {n} days
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {["Oct – Mar", "Apr – Jun", "Jul – Sep"].map((season, i) => (
                      <button
                        key={season}
                        type="button"
                        onClick={() => {
                          const start = new Date();
                          start.setMonth(start.getMonth() + i * 3);
                          patch({ date: start.toISOString().slice(0, 10) });
                        }}
                        className="rounded-2xl border border-navy/10 bg-cloud-50 px-3 py-3 text-[0.8rem] font-semibold text-navy/70 transition hover:border-azure-500 hover:text-navy"
                      >
                        {season}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="h3">How many travellers?</h2>
                  <p className="mt-2 text-sm text-navy/60">
                    Group size changes rooms, vehicles and per-person pricing.
                  </p>

                  <div className="mt-8 flex items-center justify-center gap-6">
                    <button
                      type="button"
                      aria-label="Remove traveller"
                      onClick={() => patch({ travellers: Math.max(1, plan.travellers - 1) })}
                      className="grid h-14 w-14 place-items-center rounded-full border border-navy/15 text-2xl text-navy transition hover:border-navy hover:bg-navy hover:text-white"
                    >
                      −
                    </button>
                    <div className="w-40 text-center">
                      <motion.span
                        key={plan.travellers}
                        initial={{ y: 14, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: easing }}
                        className="block font-display text-5xl font-extrabold tabular-nums text-navy"
                      >
                        {plan.travellers}
                      </motion.span>
                      <span className="mt-1 block text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-navy/45">
                        travellers
                      </span>
                    </div>
                    <button
                      type="button"
                      aria-label="Add traveller"
                      onClick={() => patch({ travellers: Math.min(20, plan.travellers + 1) })}
                      className="grid h-14 w-14 place-items-center rounded-full border border-navy/15 text-2xl text-navy transition hover:border-navy hover:bg-navy hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-8 flex flex-wrap justify-center gap-2.5">
                    {[1, 2, 4, 6, 10, 15].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => patch({ travellers: n })}
                        className={cn(
                          "rounded-full px-4 py-2 text-[0.8rem] font-semibold transition",
                          plan.travellers === n
                            ? "bg-navy text-white"
                            : "bg-cloud-100 text-navy/60 hover:text-navy"
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="h3">What kind of trip is this?</h2>
                  <p className="mt-2 text-sm text-navy/60">
                    This shapes hotels, transport and the pace of each day.
                  </p>

                  <div className="mt-6 grid gap-3">
                    {styles.map((s) => {
                      const selected = plan.style === s.key;
                      return (
                        <button
                          key={s.key}
                          type="button"
                          onClick={() => patch({ style: s.key })}
                          className={cn(
                            "flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition",
                            selected
                              ? "border-azure-600 bg-azure-100/60"
                              : "border-navy/10 bg-white hover:border-navy/25"
                          )}
                        >
                          <span>
                            <span className="block text-[0.95rem] font-bold text-navy">
                              {s.label}
                            </span>
                            <span className="block text-[0.82rem] text-navy/55">{s.blurb}</span>
                          </span>
                          <span
                            className={cn(
                              "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition",
                              selected
                                ? "border-azure-600 bg-azure-600 text-white"
                                : "border-navy/25"
                            )}
                          >
                            {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="h3">Here&apos;s your estimated journey</h2>
                  <p className="mt-2 text-sm text-navy/60">
                    Indicative pricing — we&apos;ll confirm hotels and availability within 24 hours.
                  </p>

                  <div className="mt-6 overflow-hidden rounded-3xl bg-navy-950 p-6 text-white">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-azure-300">
                          {dest?.continent}
                        </span>
                        <h3 className="font-display text-2xl font-extrabold">{dest?.name}</h3>
                        <p className="mt-1 text-sm text-white/60">{dest?.country}</p>
                      </div>
                      <span className="rounded-full bg-flare px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em]">
                        {plan.style}
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/12 pt-5 text-center">
                      <div>
                        <span className="block font-display text-xl font-extrabold">{plan.days}</span>
                        <span className="block text-[0.68rem] uppercase tracking-[0.16em] text-white/50">
                          Days
                        </span>
                      </div>
                      <div>
                        <span className="block font-display text-xl font-extrabold">
                          {plan.travellers}
                        </span>
                        <span className="block text-[0.68rem] uppercase tracking-[0.16em] text-white/50">
                          Travellers
                        </span>
                      </div>
                      <div>
                        <span className="block font-display text-xl font-extrabold">
                          {plan.date ? new Date(plan.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "—"}
                        </span>
                        <span className="block text-[0.68rem] uppercase tracking-[0.16em] text-white/50">
                          Departure
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3 border-t border-white/12 pt-5 text-sm">
                      <p className="flex items-start gap-3">
                        <Hotel className="mt-0.5 h-4 w-4 shrink-0 text-azure-300" strokeWidth={1.8} />
                        <span className="text-white/75">{included[plan.style].hotel}</span>
                      </p>
                      <p className="flex items-start gap-3">
                        <Bus className="mt-0.5 h-4 w-4 shrink-0 text-azure-300" strokeWidth={1.8} />
                        <span className="text-white/75">{included[plan.style].transport}</span>
                      </p>
                      <p className="flex items-start gap-3">
                        <Mountain className="mt-0.5 h-4 w-4 shrink-0 text-azure-300" strokeWidth={1.8} />
                        <span className="text-white/75">{included[plan.style].activities}</span>
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-white/12 pt-5">
                      <div>
                        <span className="block text-[0.68rem] uppercase tracking-[0.18em] text-white/50">
                          Estimated total
                        </span>
                        <span className="font-display text-3xl font-extrabold text-white">
                          {formatINR(total)}
                        </span>
                        <span className="ml-2 text-sm text-white/55">
                          {formatINR(estimate)} pp × {plan.travellers}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <CTAButton href="/contact" variant="flare" size="lg">
                      Request My Trip
                    </CTAButton>
                    <CTAButton
                      href="/packages"
                      variant="outline"
                      size="lg"
                      arrow={false}
                    >
                      Browse ready packages
                    </CTAButton>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* nav */}
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-navy/10 pt-6">
          <button
            type="button"
            onClick={() => go(step - 1)}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-navy/60 transition hover:text-navy disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
            Back
          </button>

          {step < 4 && (
            <button
              type="button"
              onClick={() => go(step + 1)}
              disabled={!canNext}
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-azure-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === 3 ? "Get estimate" : "Continue"}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2.2}
              />
            </button>
          )}
        </div>
      </div>

      {/* ---------- live summary ---------- */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[1.75rem] border border-navy/10 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-extrabold text-navy">Trip summary</h3>
            <span className="rounded-full bg-cloud-100 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-navy/55">
              Live
            </span>
          </div>

          <dl className="mt-5 space-y-3.5 text-sm">
            <SummaryRow label="Destination" value={dest ? `${dest.name}` : "Not selected"} muted={!dest} />
            <SummaryRow
              label="Duration"
              value={`${plan.days} days / ${plan.days - 1} nights`}
              muted={step < 1}
            />
            <SummaryRow
              label="Travellers"
              value={`${plan.travellers} ${plan.travellers === 1 ? "person" : "people"}`}
              muted={step < 2}
            />
            <SummaryRow label="Travel style" value={plan.style} muted={step < 3} />
            <SummaryRow label="Departure" value={plan.date || "Not set"} muted={!plan.date} />
            <SummaryRow label="Hotel" value={included[plan.style].hotel} muted={step < 3} />
            <SummaryRow label="Transport" value={included[plan.style].transport} muted={step < 3} />
            <SummaryRow label="Activities" value={included[plan.style].activities} muted={step < 3} />
          </dl>

          <div className="mt-6 rounded-2xl bg-cloud-100 p-4">
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-navy/45">
              Estimated price
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <motion.span
                key={estimate}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: easing }}
                className="font-display text-3xl font-extrabold tabular-nums text-navy"
              >
                {dest ? formatINR(total) : "—"}
              </motion.span>
              {dest && <span className="text-sm text-navy/50">total</span>}
            </div>
            {dest && (
              <p className="mt-1 text-xs text-navy/50">
                {formatINR(estimate)} per person · incl. taxes
              </p>
            )}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-navy/45">
            Estimates update as you build. Final quotes include exact hotels, flights and
            inclusions.
          </p>
        </div>
      </aside>
    </div>
  );
}

function SummaryRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-navy/8 pb-3.5 last:border-0 last:pb-0">
      <dt className="shrink-0 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-navy/45">
        {label}
      </dt>
      <dd
        className={cn(
          "text-right text-[0.88rem] font-medium transition-colors",
          muted ? "text-navy/35" : "text-navy/85"
        )}
      >
        {value}
      </dd>
    </div>
  );
}
