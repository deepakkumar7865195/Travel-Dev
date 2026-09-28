"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

/**
 * Decorative animated flight path — a dashed route that draws itself
 * with a plane marker gliding along the curve.
 */
export default function FlightPath({
  className,
  stroke = "#FF6B6F",
  duration = 6,
  delay = 0,
  showPlane = true,
}: {
  className?: string;
  stroke?: string;
  duration?: number;
  delay?: number;
  showPlane?: boolean;
}) {
  const d = "M12 132 C 110 34, 230 18, 320 66 S 480 158, 588 54";
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const progress = useMotionValue(0);

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    if (!len) return;
    const controls = animate(progress, 1, {
      duration,
      delay,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 1.2,
    });
    return () => controls.stop();
  }, [len, duration, delay, progress]);

  const plane = useTransform(progress, (p) => {
    const el = pathRef.current;
    if (!el || !len) return { x: 12, y: 132, r: 0 };
    const at = Math.max(0, Math.min(len, p * len));
    const a = el.getPointAtLength(at);
    const b = el.getPointAtLength(Math.min(len, at + 2));
    return { x: a.x, y: a.y, r: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI };
  });
  const px = useTransform(plane, (v) => v.x);
  const py = useTransform(plane, (v) => v.y);
  const pr = useTransform(plane, (v) => v.r);

  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 600 160" className="h-full w-full overflow-visible" fill="none">
        <motion.path
          ref={pathRef}
          d={d}
          stroke={stroke}
          strokeOpacity="0.6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="5 10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx="12"
          cy="132"
          r="5"
          fill="#fff"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        {showPlane && len > 0 && (
          <motion.g style={{ x: px, y: py, rotate: pr, transformBox: "fill-box", transformOrigin: "center" }}>
            <path d="M-9 0 L9 -6 L4 0 L9 6 Z" fill={stroke} />
          </motion.g>
        )}
      </svg>
    </div>
  );
}
