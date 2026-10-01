"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight, Facebook, Instagram } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navLinks, siteConfig } from "@/lib/site";
import { EASE_OUT } from "@/lib/motion";

const socialIcons = { facebook: Facebook, instagram: Instagram };

const socials = siteConfig.socials.map((s) => ({
  label: s.label,
  href: s.href,
  Icon: socialIcons[s.icon],
}));

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => closeRef.current?.focus(), 40);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // aria-modal is only honest if Tab stays inside the panel.
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) return;
    restoreRef.current?.focus?.();
    restoreRef.current = null;
  }, [open]);

  useEffect(() => onClose(), [pathname, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="grain absolute inset-0 bg-navy-950" />

          <div className="relative flex h-full flex-col" ref={panelRef}>
            <div className="flex h-[72px] shrink-0 items-center justify-between px-5 md:h-[84px]">
              <Logo markClassName="h-8" showTagline className="text-white" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
              >
                <X className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex-1 overflow-y-auto px-5 pb-8 pt-4"
            >
              <ul className="flex flex-col">
                {navLinks.map((link, i) => {
                  const active =
                    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  return (
                    <li key={link.href} className="border-b border-white/10">
                      <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 + i * 0.05, duration: 0.5, ease: EASE_OUT }}
                      >
                        <Link
                          href={link.href}
                          className="group flex items-center justify-between py-4"
                          onClick={onClose}
                        >
                          <span className="flex items-baseline gap-4">
                            <span className="text-[0.7rem] font-medium tabular-nums text-flare-400">
                              0{i + 1}
                            </span>
                            <span
                              className={`font-display text-[1.75rem] font-bold leading-none tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-1 ${
                                active ? "text-azure-300" : "text-white"
                              }`}
                            >
                              {link.label}
                            </span>
                          </span>
                          <ArrowUpRight
                            className="h-5 w-5 shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-flare-400"
                            strokeWidth={1.6}
                          />
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5, ease: EASE_OUT }}
                className="mt-8 flex flex-col gap-5"
              >
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-flare px-8 text-[0.95rem] font-semibold text-white transition hover:bg-flare-600"
                >
                  Plan Your Trip
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                </Link>

                <div className="flex items-center justify-between gap-4 text-white/60">
                  <span className="flex flex-col gap-1">
                    {siteConfig.phones.map((p) => (
                      <a
                        key={p.href}
                        href={`tel:${p.href}`}
                        className="text-sm font-medium hover:text-white"
                      >
                        {p.label}
                      </a>
                    ))}
                  </span>
                  <div className="flex items-center gap-4">
                    {socials.map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={label}
                        className="transition hover:text-white"
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
