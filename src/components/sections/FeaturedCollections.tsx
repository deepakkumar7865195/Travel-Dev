import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import { galleryCollections } from "@/lib/data/gallery";

export default function FeaturedCollections() {
  const [hero, ...rest] = galleryCollections;

  return (
    <section
      className="relative bg-cloud-100/70 py-20 md:py-28"
      aria-label="Featured photo collections"
    >
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Featured collections"
            title="Curated sets, not camera rolls"
            description="Grouped the way we'd actually tell the story — by mood, by route, by the week it happened."
            highlight="Curated sets"
          />
          <Reveal delay={0.1} y={18}>
            <CTAButton href="/experiences" variant="outline">
              All collections
            </CTAButton>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* hero collection */}
          <Reveal>
            <Link
              href={hero.href}
              className="group relative block h-full min-h-[26rem] overflow-hidden rounded-[2rem] bg-navy-900 shadow-soft"
            >
              <Image
                src={hero.cover}
                alt={hero.coverAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 92vw"
                quality={78}
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/15" />

              <div className="relative flex h-full flex-col justify-end p-7 md:p-9">
                <span className="eyebrow text-azure-200">
                  <span className="h-px w-6 bg-flare" aria-hidden />
                  {hero.count} frames
                </span>
                <h3 className="h3 mt-4 max-w-md text-white">{hero.title}</h3>
                <p className="lede mt-3 max-w-md !text-white/70">{hero.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Open collection
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.2}
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* stacked smaller collections */}
          <RevealStagger className="grid gap-6 sm:grid-cols-2" stagger={0.1} delay={0.08}>
            {rest.map((c) => (
              <RevealItem key={c.slug}>
                <Link
                  href={c.href}
                  className="group relative block h-full min-h-[16rem] overflow-hidden rounded-[1.75rem] bg-navy-900 shadow-soft"
                >
                  <Image
                    src={c.cover}
                    alt={c.coverAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 92vw"
                    quality={76}
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/35 to-transparent" />

                  <div className="relative flex h-full flex-col justify-end p-5">
                    <span className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-azure-200">
                      {c.count} frames
                    </span>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-white">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[0.82rem] leading-relaxed text-white/60">
                      {c.description}
                    </p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}