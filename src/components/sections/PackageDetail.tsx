import Image from "next/image";
import {
  Check,
  X,
  CalendarDays,
  Star,
  Wallet,
  Sparkles,
  MapPin,
  Route,
} from "lucide-react";
import CTAButton from "@/components/ui/CTAButton";
import Reveal from "@/components/ui/Reveal";
import RatingStars from "@/components/ui/RatingStars";
import { formatINR } from "@/lib/utils";
import type { PackageDay, TourPackage } from "@/lib/types";

const defaultExclusions = [
  "Lunch unless mentioned in the itinerary",
  "Entry fees, permits and camera charges",
  "Tips, laundry and personal expenses",
  "Anything not listed under inclusions",
];

export function planDays(pkg: TourPackage): PackageDay[] {
  if (pkg.plan?.length) return pkg.plan;
  return pkg.itinerary.map((step, i) => ({
    day: i + 1,
    title: step,
    detail: "",
  }));
}

export function inclusionList(pkg: TourPackage): string[] {
  if (pkg.inclusions?.length) return pkg.inclusions;
  return [
    pkg.includes.hotel,
    pkg.includes.transport,
    pkg.includes.meals,
    pkg.includes.activities,
  ];
}

export function exclusionList(pkg: TourPackage): string[] {
  return pkg.exclusions?.length ? pkg.exclusions : defaultExclusions;
}

type Props = {
  pkg: TourPackage;
  className?: string;
  onClose?: () => void;
  priority?: boolean;
};

export default function PackageDetail({ pkg, className, onClose, priority }: Props) {
  const days = planDays(pkg);
  const inclusions = inclusionList(pkg);
  const exclusions = exclusionList(pkg);

  return (
    <article
      id={pkg.slug}
      className={`scroll-mt-24 overflow-hidden rounded-[2rem] border border-navy/10 bg-white shadow-soft ${
        className ?? ""
      }`}
    >
      {/* HERO */}
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        <div className="relative min-h-[300px] overflow-hidden lg:min-h-[440px]">
          <Image
            src={pkg.image}
            alt={pkg.imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 52vw"
            quality={78}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-navy-950/25" />

          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-flare px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white">
              {pkg.type}
            </span>
            <span className="rounded-full border border-white/30 bg-black/25 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
              {pkg.nights}N / {pkg.days}D
            </span>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close package details"
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur-md transition hover:bg-white hover:text-navy"
            >
              <X className="h-4.5 w-4.5" strokeWidth={2.2} />
            </button>
          )}

          <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-[0.78rem] font-bold text-navy">
              <Star className="h-3.5 w-3.5 fill-flare text-flare" strokeWidth={0} />
              {pkg.rating} · {pkg.reviews} reviews
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-[0.78rem] font-bold text-navy">
              <CalendarDays className="h-3.5 w-3.5 text-azure-600" strokeWidth={2} />
              {pkg.days} days · {pkg.nights} nights
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center p-7 md:p-10">
          <Reveal y={16}>
            <span className="inline-flex items-center gap-2 rounded-full bg-navy px-3.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white">
              <span className="h-px w-6 bg-flare" aria-hidden />
              {pkg.route}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="mt-4 font-display text-[clamp(1.6rem,2.6vw,2.35rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-navy">
              {pkg.title}
            </h3>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-3 flex items-start gap-2 text-[0.92rem] font-medium text-navy/65">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-azure-500" strokeWidth={1.9} />
              {pkg.destination}
            </p>
          </Reveal>

          {(pkg.bestFor || pkg.famousFor) && (
            <Reveal delay={0.16}>
              <dl className="mt-5 space-y-2.5">
                {pkg.bestFor && (
                  <div className="flex gap-3 text-[0.88rem] leading-relaxed">
                    <dt className="flex w-24 shrink-0 items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-navy/45">
                      <Sparkles className="h-3.5 w-3.5 text-azure-500" strokeWidth={2} />
                      Best for
                    </dt>
                    <dd className="font-medium text-navy/75">{pkg.bestFor}</dd>
                  </div>
                )}
                {pkg.famousFor && (
                  <div className="flex gap-3 text-[0.88rem] leading-relaxed">
                    <dt className="flex w-24 shrink-0 items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-navy/45">
                      <Route className="h-3.5 w-3.5 text-azure-500" strokeWidth={2} />
                      Famous for
                    </dt>
                    <dd className="font-medium text-navy/75">{pkg.famousFor}</dd>
                  </div>
                )}
              </dl>
            </Reveal>
          )}

          {pkg.highlights?.length ? (
            <Reveal delay={0.2}>
              <ul className="mt-5 flex flex-wrap gap-2">
                {pkg.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-azure-300/70 bg-azure-100 px-3 py-1.5 text-[0.78rem] font-semibold text-azure-700"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          <Reveal delay={0.26} className="mt-7">
            <div className="flex flex-wrap items-end justify-between gap-4 border-t border-navy/10 pt-6">
              <div>
                <span className="flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-navy/45">
                  <Wallet className="h-3.5 w-3.5" strokeWidth={1.9} />
                  Starts at
                </span>
                <span className="mt-1 block font-display text-3xl font-extrabold text-navy">
                  {formatINR(pkg.price)}/-
                </span>
                <span className="text-sm font-medium text-navy/55">Per Person</span>
                <span className="ml-2 text-sm text-navy/40 line-through">
                  {formatINR(pkg.originalPrice)}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <CTAButton href="/contact" variant="primary" size="md">
                  Plan this trip
                </CTAButton>
                <CTAButton href="/contact" variant="outline" size="md" arrow={false}>
                  Get a quote
                </CTAButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* DAY BY DAY */}
      <section className="border-t border-navy/10 bg-cloud-50/60 p-7 md:p-10" aria-label="Day by day itinerary">
        <div className="flex items-center justify-between gap-4">
          <h4 className="font-display text-xl font-extrabold tracking-[-0.02em] text-navy md:text-2xl">
            Day-by-day itinerary
          </h4>
          <span className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-navy/55">
            <CalendarDays className="h-3.5 w-3.5 text-azure-600" strokeWidth={2} />
            {days.length} days
          </span>
        </div>

        <ol className="relative mt-7 space-y-5 border-l border-dashed border-navy/20 pl-6 md:pl-8">
          {days.map((d, i) => (
            <li key={`${d.day}-${i}`} className="relative">
              <span className="absolute -left-6 top-1 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-navy text-[0.72rem] font-bold text-white ring-4 ring-cloud-50 md:-left-8">
                {d.day}
              </span>
              <div className="rounded-2xl border border-navy/10 bg-white p-4 md:p-5">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-azure-600">
                  Day {d.day}
                </p>
                <h5 className="mt-1 font-display text-base font-bold text-navy md:text-lg">
                  {d.title}
                </h5>
                {d.detail && (
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-navy/70">{d.detail}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* INCLUSIONS / EXCLUSIONS */}
      <div className="grid border-t border-navy/10 md:grid-cols-2">
        <section className="border-b border-navy/10 p-7 md:border-b-0 md:border-r md:p-10" aria-label="Package inclusions">
          <h4 className="flex items-center gap-2 font-display text-lg font-extrabold tracking-[-0.02em] text-navy md:text-xl">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-azure-600 text-white">
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            Inclusions
          </h4>
          <ul className="mt-5 space-y-3">
            {inclusions.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.9rem] leading-relaxed text-navy/75">
                <Check className="mt-1 h-4 w-4 shrink-0 text-azure-600" strokeWidth={2.6} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="p-7 md:p-10" aria-label="Package exclusions">
          <h4 className="flex items-center gap-2 font-display text-lg font-extrabold tracking-[-0.02em] text-navy md:text-xl">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-flare text-white">
              <X className="h-4 w-4" strokeWidth={3} />
            </span>
            Exclusions
          </h4>
          <ul className="mt-5 space-y-3">
            {exclusions.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[0.9rem] leading-relaxed text-navy/70">
                <X className="mt-1 h-4 w-4 shrink-0 text-flare" strokeWidth={2.6} />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* CLOSING PRICE */}
      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-navy/10 bg-navy px-7 py-6 md:px-10">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/55">
            Starts at
          </p>
          <p className="font-display text-2xl font-extrabold text-white md:text-3xl">
            {formatINR(pkg.price)}/-{" "}
            <span className="text-base font-bold text-white/70 md:text-lg">Per Person</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <RatingStars rating={pkg.rating} starClass="h-4 w-4" />
          <CTAButton href="/contact" variant="flare" size="md">
            Request this package
          </CTAButton>
        </div>
      </div>
    </article>
  );
}
