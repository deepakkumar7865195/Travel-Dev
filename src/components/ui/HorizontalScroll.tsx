"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Scroll-driven horizontal storytelling on desktop.
 * Falls back to a native touch-scrolling row on small screens and
 * for users who prefer reduced motion.
 */
export default function HorizontalScroll({
  children,
  className,
  trackClassName,
  viewportHeight = "100vh",
  scrollLength = 1.6,
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  viewportHeight?: string;
  scrollLength?: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setEnabled(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;
    const measure = () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;
      const overflow = track.scrollWidth - window.innerWidth;
      setTravel(Math.max(0, overflow));
      section.style.height = `${window.innerHeight + overflow * scrollLength}px`;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [enabled, scrollLength]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  if (!enabled) {
    return (
      <div
        className={cn(
          "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:-mx-8 md:gap-6 md:px-8",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          className
        )}
      >
        <div className={cn("flex gap-4 md:gap-6", trackClassName)}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className={cn("relative", className)}>
      <div
        className="sticky top-0 flex items-center overflow-hidden"
        style={{ height: viewportHeight }}
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className={cn(
            "flex w-max items-stretch gap-6 pl-[6vw] pr-[8vw] will-change-transform md:gap-8",
            trackClassName
          )}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
