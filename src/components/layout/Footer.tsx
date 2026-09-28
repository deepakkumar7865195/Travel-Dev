import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import Newsletter from "./Newsletter";
import { navLinks, siteConfig } from "@/lib/site";
import { featuredDestinations } from "@/lib/data/destinations";
import { experiences } from "@/lib/data/experiences";

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
} as const;

export default function Footer() {
  const year = new Date().getFullYear();
  const topDestinations = featuredDestinations.slice(0, 5);

  return (
    <footer className="grain relative isolate overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="absolute -left-32 top-24 -z-10 h-72 w-72 rounded-full bg-azure-600/20 blur-[110px]" />
      <div className="absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-flare/15 blur-[110px]" />

      <div className="container-x">
        {/* newsletter band */}
        <div className="grid gap-10 border-b border-white/10 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-16">
          <div>
            <p className="eyebrow text-azure-300">
              <span className="h-px w-8 bg-flare" aria-hidden />
              Dispatch
            </p>
            <h2 className="h3 mt-4 max-w-lg !text-white">
              Routes, fares and quiet-season openings — once a month.
            </h2>
          </div>
          <div className="lg:justify-self-end lg:pl-10">
            <Newsletter />
            <p className="mt-4 text-xs text-white/40">
              No spam. Unsubscribe with one click.
            </p>
          </div>
        </div>

        {/* main footer grid */}
        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Link href="/" aria-label="TRAVEL DEV home">
              <Logo markClassName="h-10" showTagline className="text-white" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              A travel technology company building seamless journeys — from Kolkata to
              everywhere — with real humans on the other end of every message.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-azure-400" strokeWidth={1.7} />
                <span className="flex flex-col gap-1">
                  {siteConfig.phones.map((p) => (
                    <a
                      key={p.href}
                      href={`tel:${p.href}`}
                      className="transition hover:text-white"
                    >
                      {p.label}
                    </a>
                  ))}
                </span>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2.5 transition hover:text-white">
                  <Mail className="h-4 w-4 text-azure-400" strokeWidth={1.7} />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-azure-400" strokeWidth={1.7} />
                <span>
                  {siteConfig.address.line1}, {siteConfig.address.city}{" "}
                  {siteConfig.address.postal}
                </span>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              {siteConfig.socials.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:-translate-y-0.5 hover:border-azure-400 hover:text-white"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.7} />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterColumn
            title="Quick Links"
            links={navLinks.map((l) => ({ label: l.label, href: l.href }))}
          />
          <FooterColumn
            title="Destinations"
            links={topDestinations.map((d) => ({ label: d.name, href: `/destinations#${d.slug}` }))}
          />
          <FooterColumn
            title="Experiences"
            links={[
              ...experiences.slice(0, 4).map((e) => ({
                label: e.title,
                href: `/experiences#${e.slug}`,
              })),
              { label: "Tour Packages", href: "/packages" },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="tracking-[0.3em] uppercase text-white/60">
              Let&apos;s <span className="text-flare-400">Go</span>
            </span>
            <Link href="/contact" className="transition hover:text-white">
              Plan a journey
            </Link>
            <Link href="/about" className="transition hover:text-white">
              About us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-azure-300">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label + l.href}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <span className="h-px w-0 bg-flare transition-all duration-300 group-hover:w-4" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
