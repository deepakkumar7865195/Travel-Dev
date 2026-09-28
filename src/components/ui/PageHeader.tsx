"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.traveldev.in"}${c.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[0.78rem] font-medium">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <span key={c.label} className="inline-flex items-center gap-2">
              {c.href && !last ? (
                <Link
                  href={c.href}
                  className={cn(
                    "transition-opacity hover:opacity-70",
                    light ? "text-white/70" : "text-navy/60"
                  )}
                >
                  {c.label}
                </Link>
              ) : (
                <span className={cn(light ? "text-white" : "text-navy")}>{c.label}</span>
              )}
              {!last && (
                <ChevronRight
                  className={cn("h-3.5 w-3.5", light ? "text-white/40" : "text-navy/35")}
                  aria-hidden
                />
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
  image: string;
  imageAlt: string;
}) {
  return (
    <header className="relative isolate overflow-hidden bg-navy-950 pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          quality={78}
          className="scale-110 object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/70 to-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_0%,rgb(23_105_170_/_0.35),transparent_60%)]" />
      </div>

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <Breadcrumbs items={crumbs} light />
        </motion.div>

        <motion.p
          className="eyebrow mt-7 text-azure-300"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: EASE_OUT }}
        >
          <span className="h-px w-8 bg-flare" aria-hidden />
          {eyebrow}
        </motion.p>

        <motion.h1
          className="h1 mt-6 max-w-4xl text-white"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: EASE_OUT }}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            className="lede mt-6 max-w-2xl !text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE_OUT }}
          >
            {description}
          </motion.p>
        )}

        <motion.div
          className="mt-10 flex justify-start lg:justify-end"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: EASE_OUT }}
        >
          <Logo markClassName="h-9" showTagline className="text-white" />
        </motion.div>
      </div>
    </header>
  );
}
