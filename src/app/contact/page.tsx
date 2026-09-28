import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone, Mail, MapPin, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/sections/ContactForm";
import MapSection from "@/components/sections/MapSection";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ready To Go? — Contact TRAVEL DEV",
  description:
    "Your next unforgettable journey is just one conversation away. Call, email or send us your dates — TRAVEL DEV replies within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact TRAVEL DEV — Ready To Go?",
    description: "Talk to a trip designer about your next journey.",
    url: `${siteConfig.url}/contact`,
  },
};

const icons = { instagram: Instagram, linkedin: Linkedin, youtube: Youtube, twitter: Twitter };

export default function ContactPage() {
  const cards = [
    {
      icon: Phone,
      label: "Phone",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phoneHref}`,
      note: "Mon–Sat, 10:00–19:00 IST",
    },
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      note: "Replies within 24 hours",
    },
    {
      icon: MapPin,
      label: "Office",
      value: `${siteConfig.address.line1}, ${siteConfig.address.city}`,
      href: "#office-map",
      note: `${siteConfig.address.city} ${siteConfig.address.postal}, India`,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="READY TO GO?"
        description="Your next unforgettable journey is just one conversation away."
        crumbs={[{ label: "Contact", href: "/contact" }]}
        image="/images/misc-lagoon.jpg"
        imageAlt="Aerial view of a turquoise island lagoon"
      />

      <section className="container-x grid gap-8 py-16 lg:grid-cols-[1.35fr_1fr] lg:gap-10 md:py-20" aria-label="Contact form and details">
        <Suspense
          fallback={
            <div className="h-[560px] animate-pulse rounded-[1.75rem] bg-cloud-100" aria-hidden />
          }
        >
          <ContactForm />
        </Suspense>

        <div className="flex flex-col gap-5">
          <RevealStagger className="flex flex-col gap-5" stagger={0.1}>
            {cards.map(({ icon: Icon, ...c }) => (
              <RevealItem key={c.label}>
                <a
                  href={c.href}
                  className="group flex items-start gap-4 rounded-3xl border border-navy/10 bg-white p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-azure-600/25 hover:shadow-lift"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy text-white transition-colors duration-500 group-hover:bg-flare">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy/45">
                      {c.label}
                    </span>
                    <span className="mt-1 block break-words text-[0.98rem] font-semibold text-navy">
                      {c.value}
                    </span>
                    <span className="mt-1 block text-xs text-navy/50">{c.note}</span>
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealStagger>

          <Reveal delay={0.25} y={20}>
            <div className="rounded-3xl bg-navy-950 p-6 text-white">
              <h2 className="font-display text-lg font-extrabold">Follow the route</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                New departures, fare drops and destination films — first on social.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {siteConfig.socials.map((s) => {
                  const Icon = icons[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium text-white/75 transition hover:-translate-y-0.5 hover:border-azure-400 hover:text-white"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                      {s.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <MapSection />
    </>
  );
}
