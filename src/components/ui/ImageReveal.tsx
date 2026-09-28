"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  duration?: number;
  scale?: number;
  quality?: number;
};

/** Image that wipes into view with a clip-path reveal. */
export default function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  duration = 1.05,
  scale = 1.1,
  quality = 76,
}: Props) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        whileInView={{ clipPath: "inset(0 0 0% 0)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration, ease: EASE_OUT }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: duration * 1.1, ease: EASE_OUT }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={quality}
            className={cn("object-cover", imgClassName)}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
