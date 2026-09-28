"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "@/components/ui/Logo";
import FlightPath from "@/components/ui/FlightPath";

const INTRO_MS = 1500;
const OUT_MS = 750;

export default function Preloader() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem("td-seen"));
    } catch {
      seen = false;
    }
    if (seen) {
      setPhase(2);
      return;
    }

    const t1 = window.setTimeout(() => {
      setPhase(1);
      try {
        sessionStorage.setItem("td-seen", "1");
      } catch {
        /* ignore */
      }
    }, INTRO_MS);
    const t2 = window.setTimeout(() => setPhase(2), INTRO_MS + OUT_MS);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (phase !== 2) return;
    document.documentElement.setAttribute("data-seen", "1");
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== 2 && (
        <motion.div
          className="preloader"
          role="status"
          aria-label="Loading TRAVEL DEV"
          exit={{ y: "-100%" }}
          transition={{ duration: OUT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="grain relative flex flex-col items-center justify-center gap-7 px-6">
            <div className="absolute left-1/2 top-1/2 h-56 w-[min(88vw,430px)] -translate-x-1/2 -translate-y-1/2">
              <FlightPath
                className="h-full w-full"
                stroke="#FF6B6F"
                duration={5}
                showPlane
              />
            </div>

            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <LogoMark className="h-20 w-20 drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)]" />
            </motion.div>

            <div className="relative text-center">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="font-display text-lg font-extrabold uppercase tracking-[0.4em] text-white"
              >
                Travel <span className="text-flare-400">Dev</span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="mt-2 text-[0.62rem] font-medium uppercase tracking-[0.5em] text-azure-300"
              >
                Let&apos;s Go
              </motion.p>
            </div>

            <div className="relative h-px w-40 overflow-hidden bg-white/15">
              <motion.div
                className="h-full bg-gradient-to-r from-azure-400 to-flare-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTRO_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
                style={{ originX: 0 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
