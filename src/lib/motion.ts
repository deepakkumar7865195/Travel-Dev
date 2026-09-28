import type { Variants, Transition } from "framer-motion";

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const springSoft: Transition = { duration: 0.7, ease: EASE_OUT };
export const springSnappy: Transition = { type: "spring", stiffness: 260, damping: 26, mass: 0.7 };

/** generic fade-up reveal */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

/** parent stagger container */
export const staggerContainer = (stagger = 0.09, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** word-by-word headline reveal */
export const wordReveal: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE_OUT } },
};

/** image clip-path reveal */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", scale: 1.12 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    scale: 1,
    transition: { duration: 1.05, ease: EASE_OUT },
  },
};

/** card entrance used inside grids */
export const cardIn: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;
