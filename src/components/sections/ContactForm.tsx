"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { indiaDestinations } from "@/lib/data/destinations";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Fields = {
  name: string;
  email: string;
  phone: string;
  destination: string;
  date: string;
  travellers: string;
  message: string;
  website: string;
};

const empty: Fields = {
  name: "",
  email: "",
  phone: "",
  destination: "",
  date: "",
  travellers: "2",
  message: "",
  website: "",
};

const fieldClass =
  "w-full rounded-2xl border border-navy/12 bg-white px-4 py-3.5 text-sm text-navy outline-none transition placeholder:text-navy/35 focus:border-azure-500 focus:ring-2 focus:ring-azure-500/25";

export default function ContactForm() {
  const params = useSearchParams();
  const interest = params.get("interest");
  const [values, setValues] = useState<Fields>({
    ...empty,
    message: interest ? `I'm interested in the ${interest.replace(/-/g, " ")} experience.` : "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState({ name: "", email: "" });
  const startedAt = useRef(Date.now());

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
    setFormError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof Fields, string>> = {};
    if (values.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email.";
    if (values.phone.replace(/\D/g, "").length < 8) next.phone = "Enter a contact number.";
    if (!values.message.trim()) next.message = "Tell us a little about the trip.";

    setErrors(next);
    setFormError(null);
    if (Object.keys(next).length > 0) return;

    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Contact-Form": "1" },
        body: JSON.stringify({ ...values, startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string; errors?: Partial<Record<keyof Fields, string>> }
        | null;

      if (!res.ok || !data?.ok) {
        if (data?.errors) setErrors((prev) => ({ ...prev, ...data.errors }));
        setFormError(data?.error ?? "Something went wrong. Please try again.");
        setState("idle");
        return;
      }

      setReceipt({ name: values.name.trim(), email: values.email.trim() });
      setValues(empty);
      setState("sent");
    } catch {
      setFormError("Network error. Please check your connection and try again.");
      setState("idle");
    }
  };

  return (
    <form onSubmit={submit} noValidate className="rounded-[1.75rem] border border-navy/10 bg-white p-6 shadow-soft md:p-8">
      {/* Honeypot — invisible to people, tempting for bots. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: 0, width: "1px", height: "1px", overflow: "hidden" }}
      >
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={set("website")}
        />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {state === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
              className="grid h-16 w-16 place-items-center rounded-full bg-azure-600 text-white"
            >
              <Check className="h-8 w-8" strokeWidth={2.6} />
            </motion.span>
            <h3 className="h3 mt-6">Message received</h3>
            <p className="lede mt-3 max-w-sm">
              Thanks {receipt.name.split(" ")[0]} — a trip designer will reply to{" "}
              <span className="font-semibold text-navy">{receipt.email}</span> within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setValues(empty);
                setFormError(null);
                setState("idle");
              }}
              className="mt-7 text-sm font-semibold text-azure-600 transition hover:text-navy"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <input
                  value={values.name}
                  onChange={set("name")}
                  placeholder="Your full name"
                  className={cn(fieldClass, errors.name && "border-flare")}
                  autoComplete="name"
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={values.email}
                  onChange={set("email")}
                  placeholder="you@email.com"
                  className={cn(fieldClass, errors.email && "border-flare")}
                  autoComplete="email"
                />
              </Field>

              <Field label="Phone" error={errors.phone}>
                <input
                  type="tel"
                  value={values.phone}
                  onChange={set("phone")}
                  placeholder="+91 98765 43210"
                  className={cn(fieldClass, errors.phone && "border-flare")}
                  autoComplete="tel"
                />
              </Field>

              <Field label="Destination">
                <select value={values.destination} onChange={set("destination")} className={cn(fieldClass, "cursor-pointer")}>
                  <option value="">Not decided yet</option>
                  {indiaDestinations.map((d) => (
                    <option key={d.slug} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Travel date">
                <input type="date" value={values.date} onChange={set("date")} className={fieldClass} />
              </Field>

              <Field label="Number of travellers">
                <select value={values.travellers} onChange={set("travellers")} className={cn(fieldClass, "cursor-pointer")}>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={String(n)}>
                      {n} {n === 1 ? "traveller" : "travellers"}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="sm:col-span-2">
                <Field label="Message" error={errors.message}>
                  <textarea
                    value={values.message}
                    onChange={set("message")}
                    rows={5}
                    placeholder="Dates, budget, must-sees, pace — anything helps."
                    className={cn(fieldClass, "resize-none", errors.message && "border-flare")}
                  />
                </Field>
              </div>
            </div>

            {formError && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-2xl border border-flare/30 bg-flare/10 px-4 py-3 text-sm font-medium text-flare-600"
              >
                {formError}
              </motion.p>
            )}

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-xs text-xs leading-relaxed text-navy/45">
                By submitting you agree to be contacted about your enquiry. We never share your
                details.
              </p>
              <button
                type="submit"
                disabled={state === "sending"}
                className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-flare px-8 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-flare-600 disabled:opacity-70"
              >
                {state === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Start Planning
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2.4}
                    />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-6 border-t border-navy/10 pt-5 text-xs text-navy/45">
        Prefer talking? Call{" "}
        {siteConfig.phones.map((p, i) => (
          <span key={p.href}>
            {i > 0 && " / "}
            <a
              href={`tel:${p.href}`}
              className="font-semibold text-navy underline-offset-4 hover:underline"
            >
              {p.label}
            </a>
          </span>
        ))}{" "}
        — it rings on a real desk.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy/50">
        {label}
      </span>
      {children}
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-xs text-flare">
          {error}
        </motion.p>
      )}
    </div>
  );
}
