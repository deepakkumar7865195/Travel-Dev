"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "span";
};

/** Button/element that leans toward the cursor and springs back. */
export default function MagneticButton({
  children,
  className,
  strength = 0.32,
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.5 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = as === "span" ? motion.span : motion.div;

  return (
    <Tag
      ref={ref as never}
      className={cn("inline-block will-change-transform", className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
    >
      {children}
    </Tag>
  );
}
