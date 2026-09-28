"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, GitCompareArrows, Check } from "lucide-react";
import PackageCard from "@/components/cards/PackageCard";
import PackageDetail from "@/components/sections/PackageDetail";
import CTAButton from "@/components/ui/CTAButton";
import { packages } from "@/lib/data/packages";
import { formatINR, cn } from "@/lib/utils";

type Type = "All" | "Domestic" | "International";
type Duration = "Any" | "short" | "medium" | "long";
type Sort = "popular" | "price-asc" | "price-desc" | "rating";

const durations: { value: Duration; label: string }[] = [
  { value: "Any", label: "Any duration" },
  { value: "short", label: "1–4 days" },
  { value: "medium", label: "5–6 days" },
  { value: "long", label: "7+ days" },
];

const sorts: { value: Sort; label: string }[] = [
  { value: "popular", label: "Most booked" },
  { value: "rating", label: "Highest rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

const maxPrice = Math.max(...packages.map((p) => p.price));

function inDuration(days: number, d: Duration) {
  if (d === "Any") return true;
  if (d === "short") return days <= 4;
  if (d === "medium") return days >= 5 && days <= 6;
  return days >= 7;
}

export default function PackageExplorer() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<Type>("All");
  const [duration, setDuration] = useState<Duration>("Any");
  const [price, setPrice] = useState(maxPrice);
  const [sort, setSort] = useState<Sort>("popular");
  const [compare, setCompare] = useState<string[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const scrollToDetail = () => {
    window.requestAnimationFrame(() => {
      document.getElementById("package-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  useEffect(() => {
    const syncHash = (scroll: boolean) => {
      const slug = decodeURIComponent(window.location.hash.replace("#", ""));
      const match = packages.find((p) => p.slug === slug);
      setActiveSlug(match ? match.slug : null);
      if (match && scroll) scrollToDetail();
    };

    const onHash = () => syncHash(true);

    syncHash(true);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const active = activeSlug ? packages.find((p) => p.slug === activeSlug) ?? null : null;

  const clearActive = () => {
    setActiveSlug(null);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = packages.filter(
      (p) =>
        (type === "All" || p.type === type) &&
        inDuration(p.days, duration) &&
        p.price <= price &&
        (!q ||
          p.title.toLowerCase().includes(q) ||
          p.route.toLowerCase().includes(q) ||
          p.destination.toLowerCase().includes(q))
    );
    return [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.reviews - a.reviews;
      }
    });
  }, [query, type, duration, price, sort]);

  const toggleCompare = (slug: string) => {
    setCompare((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : prev.length >= 3 ? prev : [...prev, slug]
    );
  };

  const compared = packages.filter((p) => compare.includes(p.slug));
  const dirty = type !== "All" || duration !== "Any" || price < maxPrice || query.trim() !== "";

  return (
    <section className="container-x py-16 md:py-20" aria-label="Tour package finder">
      <div className="rounded-[1.75rem] border border-navy/10 bg-white p-5 shadow-soft">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_auto] lg:items-end">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="group flex items-center gap-3 rounded-2xl bg-cloud-100 px-4 py-3 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-azure-500/40">
              <Search className="h-4.5 w-4.5 shrink-0 text-navy/40" strokeWidth={2} />
              <span className="sr-only">Search packages</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search route or destination…"
                className="w-full bg-transparent text-sm font-medium text-navy outline-none placeholder:text-navy/40"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="relative flex items-center rounded-2xl border border-navy/12 px-3.5">
                <span className="sr-only">Duration</span>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value as Duration)}
                  className="w-full cursor-pointer appearance-none bg-transparent py-3 text-sm font-medium text-navy outline-none"
                >
                  {durations.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="relative flex items-center rounded-2xl border border-navy/12 px-3.5">
                <span className="sr-only">Sort packages</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="w-full cursor-pointer appearance-none bg-transparent py-3 text-sm font-medium text-navy outline-none"
                >
                  {sorts.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-cloud-100 p-1">
            {(["All", "Domestic", "International"] as Type[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                aria-pressed={type === t}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[0.82rem] font-semibold transition",
                  type === t ? "text-white" : "text-navy/60 hover:text-navy"
                )}
              >
                {type === t && (
                  <motion.span
                    layoutId="pkg-tab"
                    className="absolute inset-0 rounded-full bg-navy"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{t}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-4 border-t border-navy/10 pt-5 md:flex-row md:items-center md:justify-between">
          <label className="flex min-w-0 flex-1 items-center gap-4">
            <span className="shrink-0 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-navy/50">
              Max budget
            </span>
            <input
              type="range"
              min={10000}
              max={maxPrice}
              step={1000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="h-1.5 w-full max-w-md cursor-pointer appearance-none rounded-full bg-cloud-200 accent-azure-600"
              aria-label="Maximum price per person"
            />
            <span className="shrink-0 font-display text-sm font-extrabold text-navy">
              {formatINR(price)}
            </span>
          </label>

          <div className="flex items-center gap-3">
            {dirty && (
              <button
                type="button"
                onClick={() => {
                  setType("All");
                  setDuration("Any");
                  setPrice(maxPrice);
                  setQuery("");
                }}
                className="text-sm font-semibold text-azure-600 transition hover:text-navy"
              >
                Reset
              </button>
            )}
            <span className="text-sm text-navy/55" aria-live="polite">
              <span className="font-bold text-navy">{results.length}</span> packages
            </span>
          </div>
        </div>
      </div>

      <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((p) => (
            <PackageCard
              key={p.slug}
              pkg={p}
              onCompare={toggleCompare}
              compared={compare.includes(p.slug)}
              onOpen={(slug) => {
                setActiveSlug(slug);
                scrollToDetail();
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {results.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-3xl border border-dashed border-navy/20 bg-cloud-100/60 px-6 py-16 text-center"
        >
          <h3 className="h3">No packages in that range</h3>
          <p className="lede mx-auto mt-3 max-w-md">
            Widen the budget or dates — we also build bespoke departures on request.
          </p>
        </motion.div>
      )}

      {/* selected package detail */}
      <div id="package-detail" className="scroll-mt-24">
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <PackageDetail pkg={active} onClose={clearActive} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* comparison bar */}
      <AnimatePresence>
        {compare.length > 0 && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-[65] border-t border-white/10 bg-navy-950/95 px-4 py-3 backdrop-blur-xl md:px-8"
          >
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-flare text-sm font-bold text-white">
                  {compare.length}
                </span>
                <p className="text-sm text-white/75">
                  {compare.length === 1
                    ? "Pick one more package to compare"
                    : "Ready to compare side by side"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCompare([])}
                  className="rounded-full px-4 py-2.5 text-sm font-semibold text-white/60 transition hover:text-white"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setPanelOpen(true)}
                  disabled={compare.length < 2}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-navy transition disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <GitCompareArrows className="h-4 w-4" strokeWidth={2} />
                  Compare
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* comparison panel */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-end justify-center bg-navy-950/70 p-0 backdrop-blur-sm md:items-center md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPanelOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Package comparison"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] w-full max-w-5xl overflow-auto rounded-t-3xl bg-white p-6 md:rounded-3xl md:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="h3">Compare packages</h3>
                <button
                  type="button"
                  onClick={() => setPanelOpen(false)}
                  aria-label="Close comparison"
                  className="grid h-10 w-10 place-items-center rounded-full border border-navy/15 transition hover:bg-navy hover:text-white"
                >
                  <X className="h-4.5 w-4.5" strokeWidth={2.2} />
                </button>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <thead>
                    <tr>
                      <th className="w-40 border-b border-navy/10 pb-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-navy/45">
                        Package
                      </th>
                      {compared.map((p) => (
                        <th key={p.slug} className="border-b border-navy/10 px-3 pb-4 align-bottom">
                          <span className="block text-sm font-bold text-navy">{p.title}</span>
                          <span className="mt-2 inline-block rounded-full bg-navy px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white">
                            {p.route}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {(
                      [
                        ["Price", (p: (typeof packages)[number]) => `${formatINR(p.price)} / person`],
                        ["Duration", (p: (typeof packages)[number]) => `${p.days} days · ${p.nights} nights`],
                        ["Rating", (p: (typeof packages)[number]) => `${p.rating} ★ (${p.reviews} reviews)`],
                        ["Type", (p: (typeof packages)[number]) => p.type],
                        ["Hotel", (p: (typeof packages)[number]) => p.includes.hotel],
                        ["Transport", (p: (typeof packages)[number]) => p.includes.transport],
                        ["Meals", (p: (typeof packages)[number]) => p.includes.meals],
                        ["Activities", (p: (typeof packages)[number]) => p.includes.activities],
                      ] as const
                    ).map(([label, get]) => (
                      <tr key={label} className="odd:bg-cloud-50">
                        <th className="py-3.5 pr-4 text-left align-top font-semibold text-navy/70">
                          {label}
                        </th>
                        {compared.map((p) => (
                          <td key={p.slug} className="px-3 py-3.5 align-top text-navy/75">
                            {get(p)}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <th className="py-4" />
                      {compared.map((p) => (
                        <td key={p.slug} className="px-3 py-4">
                          <CTAButton href="/contact" size="sm" variant="primary">
                            Request
                          </CTAButton>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-5 flex items-center gap-2 text-xs text-navy/50">
                <Check className="h-3.5 w-3.5 text-azure-600" strokeWidth={2.6} />
                Compare up to three packages at once.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
