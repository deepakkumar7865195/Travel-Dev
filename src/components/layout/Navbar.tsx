"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll } from "framer-motion";
import { Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import CTAButton from "@/components/ui/CTAButton";
import MobileMenu from "./MobileMenu";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    setScrolled(scrollY.get() > 24);
    return scrollY.on("change", (v) => {
      const prev = lastY.current;
      setScrolled(v > 24);
      setHidden(v > prev + 4 && v > 160 && !open);
      lastY.current = v;
    });
  }, [scrollY, open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      html.style.overflow = "hidden";
      window.__lenis?.stop();
    } else {
      html.style.overflow = "";
      window.__lenis?.start();
    }
    return () => {
      html.style.overflow = "";
      window.__lenis?.start();
    };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-115%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-[background-color,box-shadow,border-color] duration-500",
          scrolled
            ? "border-b border-navy/10 bg-white/80 shadow-[0_10px_30px_-24px_rgb(11_41_66_/_0.6)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6 md:h-[84px]">
          <Link href="/" aria-label="TRAVEL DEV home" className="shrink-0">
            <Logo
              markClassName="h-9 w-9 md:h-10 md:w-10"
              showTagline
              className={cn(
                "transition-colors duration-300",
                scrolled ? "text-navy" : "text-white"
              )}
              textClassName="transition-colors duration-300"
            />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.86rem] font-medium transition-colors duration-300",
                    scrolled
                      ? active
                        ? "text-navy"
                        : "text-navy/65 hover:text-navy"
                      : active
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-flare"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <CTAButton
              href="/trip-planner"
              size="sm"
              variant={scrolled ? "primary" : "glass"}
              className="hidden md:inline-flex"
            >
              Plan Your Trip
            </CTAButton>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 lg:hidden",
                scrolled
                  ? "border-navy/15 text-navy hover:bg-navy/5"
                  : "border-white/25 text-white hover:bg-white/10"
              )}
            >
              <Menu className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
