"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Scroll-linked vertical parallax over an image or layer. */
export default function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  amount = 180,
  priority = false,
  children,
}: {
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  amount?: number;
  priority?: boolean;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            priority={priority}
            sizes={sizes}
            quality={78}
            className={cn("object-cover scale-[1.18]", imgClassName)}
          />
        ) : null}
        {children}
      </motion.div>
    </div>
  );
}
