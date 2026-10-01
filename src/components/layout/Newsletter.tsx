"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <form onSubmit={submit} className="w-full max-w-md" aria-label="Newsletter subscription">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex h-14 items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-medium text-white"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-flare">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            You&apos;re on the list. First dispatch lands Friday.
          </motion.p>
        ) : (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            className="relative"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="h-14 w-full rounded-full border border-white/15 bg-white/5 pl-6 pr-16 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-azure-400/60 focus:bg-white/10"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="absolute right-1.5 top-1.5 grid h-11 w-11 place-items-center rounded-full bg-white text-navy transition hover:bg-azure-400 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </button>
            {error && (
              <motion.p
                role="alert"
                aria-live="polite"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 left-4 text-xs text-flare-400"
              >
                {error}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
