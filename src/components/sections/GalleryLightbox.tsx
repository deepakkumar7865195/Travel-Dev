"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import type { GalleryPhoto } from "@/lib/data/gallery";

export default function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
  onJump,
}: {
  photos: GalleryPhoto[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onJump: (index: number) => void;
}) {
  const open = index !== null;
  const photo = open ? photos[index] : null;
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onClose();
          break;
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          onNext();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          onPrev();
          break;
        case "Home":
          e.preventDefault();
          onJump(0);
          break;
        case "End":
          e.preventDefault();
          onJump(photos.length - 1);
          break;
        default:
          break;
      }
    },
    [open, onClose, onNext, onPrev, onJump, photos.length]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, handleKey]);

  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    window.__lenis?.stop();
    const t = window.setTimeout(() => closeRef.current?.focus(), 40);
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
      window.__lenis?.start();
      window.clearTimeout(t);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col bg-navy-950/96 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: EASE_OUT }}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo: ${photo.title}`}
        >
          {/* top bar */}
          <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-5 md:px-10">
            <p className="font-display text-sm font-semibold tracking-[0.02em] text-white tabular-nums">
              <span className="text-azure-300">{String((index ?? 0) + 1).padStart(2, "0")}</span>
              <span className="mx-2 text-white/30">/</span>
              <span className="text-white/60">{String(photos.length).padStart(2, "0")}</span>
            </p>

            <p className="hidden min-w-0 flex-1 truncate px-6 text-center text-sm font-medium text-white/75 md:block">
              {photo.title}
              <span className="mx-2 text-white/25">—</span>
              <span className="text-white/45">{photo.location}</span>
            </p>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white/10 focus-visible:bg-white/10"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>

          {/* stage */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous photo"
              className="absolute left-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-navy-950/50 text-white transition hover:bg-white/12 md:left-6 md:h-14 md:w-14"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1.8} />
            </button>

            <div className="relative flex h-full max-h-[68vh] w-full max-w-5xl items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={photo.id}
                  className="relative flex h-full w-full flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.96, x: 40 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.97, x: -30 }}
                  transition={{ duration: 0.42, ease: EASE_OUT }}
                >
                  <div
                    className="relative min-h-0 w-full flex-1 overflow-hidden rounded-2xl bg-navy-900 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
                    style={{ aspectRatio: `${photo.ratio}` }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 60vw, 92vw"
                      quality={85}
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.figure>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={onNext}
              aria-label="Next photo"
              className="absolute right-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-navy-950/50 text-white transition hover:bg-white/12 md:right-6 md:h-14 md:w-14"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={1.8} />
            </button>
          </div>

          {/* caption bar */}
          <div className="shrink-0 px-5 pb-7 pt-2 text-center md:px-10 md:pb-9">
            <h2 className="font-display text-lg font-bold text-white md:text-xl">{photo.title}</h2>
            <p className="mx-auto mt-2 inline-flex max-w-xl items-center gap-1.5 text-sm text-white/55">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-flare" strokeWidth={2} aria-hidden />
              <span className="truncate">
                {photo.location}, {photo.country}
              </span>
            </p>
            <p className="mx-auto mt-3 hidden max-w-2xl text-sm leading-relaxed text-white/40 md:block">
              {photo.alt}
            </p>
            <p className="mt-4 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-white/30">
              {photo.credit}
            </p>
            <p className="mt-2 hidden text-[0.7rem] text-white/25 sm:block">
              Use ← → to browse, Esc to close
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}