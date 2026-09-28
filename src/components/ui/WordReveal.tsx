"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  once?: boolean;
  highlight?: string;
  /** Play immediately instead of waiting for scroll into view. */
  immediate?: boolean;
};

/** Splits a line into words and reveals each from behind a mask. */
export default function WordReveal({
  text,
  className,
  as = "h2",
  delay = 0,
  stagger = 0.055,
  once = true,
  highlight,
  immediate = false,
}: Props) {
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once, amount: 0.4 } })}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => {
        const isHighlight = highlight ? word.replace(/[^\p{L}\p{N}]/gu, "") === highlight : false;
        return (
          <span
            key={`${word}-${i}`}
            aria-hidden
            className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
          >
            <motion.span
              className={cn("inline-block", isHighlight && "text-gradient")}
              variants={{
                hidden: { y: "108%" },
                show: { y: "0%", transition: { duration: 0.85, ease: EASE_OUT } },
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
