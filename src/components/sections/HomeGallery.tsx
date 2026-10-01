import Image from "next/image";
import { MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";
import Reveal from "@/components/ui/Reveal";
import { galleryPhotos } from "@/lib/data/gallery";

export default function HomeGallery() {
  const photos = galleryPhotos.slice(0, 8);
  const doubled = [...photos, ...photos];

  return (
    <section
      aria-labelledby="home-gallery"
      className="relative overflow-hidden border-t border-navy/10 bg-cloud-50 py-20 md:py-28"
    >
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Gallery"
            title="Moments from the road"
            description="A rolling strip of frames our travellers carried home — mountains, markets and misty mornings."
            highlight="road"
          />
          <Reveal delay={0.1} y={18} className="shrink-0">
            <CTAButton href="/gallery" variant="outline">
              Open the gallery
            </CTAButton>
          </Reveal>
        </div>
      </div>

      <h2 id="home-gallery" className="sr-only">
        Travel photo gallery
      </h2>

      <div className="marquee-wrap relative mt-12 overflow-hidden">
        <div
          className="marquee-track flex w-max items-stretch gap-5 md:gap-6"
          style={{ ["--marquee-duration" as string]: "58s" }}
        >
          {doubled.map((photo, i) => (
            <figure
              key={`${photo.id}-${i}`}
              className="group relative h-[300px] w-[220px] shrink-0 overflow-hidden rounded-[1.5rem] bg-navy-950 shadow-soft md:h-[380px] md:w-[280px]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 560px, 440px"
                quality={85}
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/15 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                <span className="flex items-center gap-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-azure-200">
                  <MapPin className="h-3 w-3" strokeWidth={2} aria-hidden />
                  {photo.country}
                </span>
                <span className="mt-1 block font-display text-[0.98rem] font-bold leading-snug text-white">
                  {photo.title}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cloud-50 to-transparent md:w-28"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cloud-50 to-transparent md:w-28"
        />
      </div>
    </section>
  );
}
