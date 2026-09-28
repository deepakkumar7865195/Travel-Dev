"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, LayoutGrid, Rows3, SlidersHorizontal, X } from "lucide-react";
import DestinationCard from "@/components/cards/DestinationCard";
import CTAButton from "@/components/ui/CTAButton";
import { indiaDestinations, destinationCategories } from "@/lib/data/destinations";
import { cn } from "@/lib/utils";
import type { DestinationCategory } from "@/lib/types";

type Sort = "popular" | "price-asc" | "price-desc" | "rating";

const sorts: { value: Sort; label: string }[] = [
  { value: "popular", label: "Most popular" },
  { value: "rating", label: "Highest rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

const tabs: Array<DestinationCategory | "All"> = ["All", ...destinationCategories];

export default function DestinationExplorer() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [type, setType] = useState(params.get("type") ?? "All");
  const [sort, setSort] = useState<Sort>("popular");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    setQuery(params.get("q") ?? "");
    setType(params.get("type") ?? "All");
  }, [params]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = indiaDestinations.filter((d) => {
      const matchesTab = type === "All" || d.categories.includes(type as DestinationCategory);
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.continent.toLowerCase().includes(q) ||
        d.blurb.toLowerCase().includes(q);
      return matchesTab && matchesQuery;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating || b.reviews - a.reviews;
        default:
          return b.reviews - a.reviews;
      }
    });

    return list;
  }, [query, type, sort]);

  const clear = () => {
    setQuery("");
    setType("All");
  };

  return (
    <section className="container-x py-16 md:py-20" aria-label="Destination finder">
      {/* toolbar */}
      <div className="rounded-[1.75rem] border border-navy/10 bg-white p-4 shadow-soft md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="group relative flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-cloud-100 px-4 py-3 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-azure-500/40">
            <Search className="h-4.5 w-4.5 shrink-0 text-navy/40" strokeWidth={2} />
            <span className="sr-only">Search destinations</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by place, country or vibe…"
              className="w-full bg-transparent text-sm font-medium text-navy outline-none placeholder:text-navy/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy/10 text-navy/60 transition hover:bg-navy hover:text-white"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.4} />
              </button>
            )}
          </label>

          <div className="flex items-center gap-3">
            <label className="relative flex items-center gap-2 rounded-2xl border border-navy/12 px-3.5 py-3 text-sm">
              <SlidersHorizontal className="h-4 w-4 text-navy/50" strokeWidth={1.9} />
              <span className="sr-only">Sort destinations</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="cursor-pointer appearance-none bg-transparent pr-4 font-medium text-navy outline-none"
              >
                {sorts.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-center rounded-2xl border border-navy/12 p-1">
              {(
                [
                  { key: "grid", Icon: LayoutGrid, label: "Grid view" },
                  { key: "list", Icon: Rows3, label: "List view" },
                ] as const
              ).map(({ key, Icon, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setView(key)}
                  aria-label={label}
                  aria-pressed={view === key}
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-xl transition",
                    view === key ? "bg-navy text-white" : "text-navy/50 hover:text-navy"
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.9} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-[0.82rem] font-semibold transition",
                type === t ? "text-white" : "text-navy/60 hover:bg-cloud-100 hover:text-navy"
              )}
            >
              {type === t && (
                <motion.span
                  layoutId="dest-tab"
                  className="absolute inset-0 rounded-full bg-navy"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative z-10">{t}</span>
            </button>
          ))}
        </div>
      </div>

      {/* results */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-navy/55" aria-live="polite">
          <span className="font-bold text-navy">{results.length}</span>{" "}
          {results.length === 1 ? "destination" : "destinations"}
          {type !== "All" && <> in {type}</>}
        </p>
        {(query || type !== "All") && (
          <button
            type="button"
            onClick={clear}
            className="text-sm font-semibold text-azure-600 transition hover:text-navy"
          >
            Reset filters
          </button>
        )}
      </div>

      <motion.div
        layout
        className={cn(
          "mt-6 grid gap-6",
          view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
        )}
      >
        <AnimatePresence mode="popLayout">
          {results.map((d) => (
            <DestinationCard key={d.slug} destination={d} view={view} />
          ))}
        </AnimatePresence>
      </motion.div>

      {results.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-3xl border border-dashed border-navy/20 bg-cloud-100/60 px-6 py-16 text-center"
        >
          <h3 className="h3">No destinations match that yet</h3>
          <p className="lede mx-auto mt-3 max-w-md">
            Try another keyword — or tell us what you have in mind and we&apos;ll design it.
          </p>
          <div className="mt-7 flex justify-center">
            <CTAButton href="/contact" variant="primary">
              Request a destination
            </CTAButton>
          </div>
        </motion.div>
      )}
    </section>
  );
}
