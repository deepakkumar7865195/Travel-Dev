"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";
import BlogCard from "@/components/cards/BlogCard";
import { postsByCategory, blogCategories } from "@/lib/data/blog";

export default function BlogArchive() {
  const [active, setActive] = useState("All");
  const list = postsByCategory(active);

  return (
    <div className="container-x pb-4">
      <div
        className="flex flex-wrap items-center gap-2 border-b border-navy/10 pb-8"
        role="tablist"
        aria-label="Filter articles by category"
      >
        {["All", ...blogCategories].map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={active === c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full px-4 py-2 text-[0.82rem] font-semibold transition-colors duration-300",
              active === c
                ? "bg-navy text-white"
                : "border border-navy/15 text-navy/60 hover:border-azure-400 hover:text-navy"
            )}
          >
            {c}
          </button>
        ))}
        <span className="ml-auto text-[0.8rem] font-medium text-navy/45">
          {list.length} {list.length === 1 ? "article" : "articles"}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {list.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
