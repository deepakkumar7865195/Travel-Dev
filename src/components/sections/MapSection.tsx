import { MapPin, Navigation, Clock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site";

const lat = 22.5697;
const lon = 88.4306;
const bbox = `88.4150,22.5570,88.4470,22.5830`;
const embed = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lon}`;
const directions = `https://www.openstreetmap.org/directions?from=&to=${lat}%2C${lon}`;

export default function MapSection() {
  return (
    <section aria-labelledby="office-map" className="container-x py-16 md:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <Reveal y={22}>
            <span className="eyebrow text-azure-600">
              <span className="h-px w-8 bg-flare" aria-hidden />
              Find us
            </span>
          </Reveal>

          <h2 id="office-map" className="h2 mt-5">
            Our office in Kolkata
          </h2>

          <p className="lede mt-5">
            Walk in for a coffee and a whiteboard session, or book a call and we&apos;ll map your
            trip over video.
          </p>

          <ul className="mt-8 space-y-5">
            <li className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-azure-100 text-azure-600">
                <MapPin className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span>
                <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy/45">
                  Address
                </span>
                <span className="mt-1 block text-[0.95rem] font-medium text-navy">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.region}{" "}
                  {siteConfig.address.postal}, {siteConfig.address.country}
                </span>
              </span>
            </li>

            <li className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-azure-100 text-azure-600">
                <Clock className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span>
                <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy/45">
                  Studio hours
                </span>
                <span className="mt-1 block text-[0.95rem] font-medium text-navy">
                  Mon – Sat, 10:00 – 19:00 IST
                  <br />
                  <span className="text-navy/55">Support desk: 24/7 while you travel</span>
                </span>
              </span>
            </li>
          </ul>

          <a
            href={directions}
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-azure-600"
          >
            Get directions
            <Navigation
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </a>
        </div>

        <Reveal delay={0.1} y={26}>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-navy/10 bg-cloud-100 shadow-soft">
            <div className="relative h-[340px] w-full md:h-[440px]">
              <iframe
                title="TRAVEL DEV office location map"
                src={embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.25] contrast-[1.05]"
              />

              {/* animated pin */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                <span className="relative flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flare opacity-70" />
                  <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-flare shadow-lg" />
                </span>
              </div>
            </div>

            <div className="glass absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4 md:right-auto md:max-w-sm">
              <span>
                <span className="block text-sm font-bold text-navy">TRAVEL DEV HQ</span>
                <span className="block text-xs text-navy/55">
                  {siteConfig.address.city} · {siteConfig.address.postal}
                </span>
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white transition hover:bg-azure-600"
              >
                Book a visit
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
