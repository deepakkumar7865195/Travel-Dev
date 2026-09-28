"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
};

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
  decimals = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 22, mass: 0.7 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, value, duration, mv]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      if (ref.current) {
        const n = decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString();
        ref.current.textContent = `${prefix}${n}${suffix}`;
      }
    });
    return unsub;
  }, [spring, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      0{suffix}
    </span>
  );
}
