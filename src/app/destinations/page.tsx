import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";
import Reveal from "@/components/ui/Reveal";
import HorizontalScroll from "@/components/ui/HorizontalScroll";
import DestinationExplorer from "@/components/sections/DestinationExplorer";
import DestinationSlide from "@/components/cards/DestinationSlide";
import CTABand from "@/components/sections/CTABand";
import { indiaDestinations } from "@/lib/data/destinations";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Explore India — 8 Curated Destinations",
  description:
    "Filter, search and explore TRAVEL DEV destinations across India — from Kashmir and Kerala to Rajasthan, Goa and Sikkim — with best time to visit, real ratings and starting prices.",
  alternates: { canonical: "/destinations" },
  openGraph: {
    title: "Explore India | TRAVEL DEV",
    description:
      "Curated Indian destinations with honest pricing — mountains, backwaters, deserts and beaches.",
    url: `${siteConfig.url}/destinations`,
  },
};

function ExplorerFallback() {
  return (
    <section className="container-x py-16 md:py-20" aria-hidden>
      <div className="h-[132px] animate-pulse rounded-[1.75rem] bg-cloud-100" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[4/5.6] animate-pulse rounded-[1.75rem] bg-cloud-100" />
        ))}
      </div>
    </section>
  );
}

export default function DestinationsPage() {
  const touristDests = indiaDestinations.map((d) => ({
    "@type": "TouristDestination",
    name: d.name,
    description: d.blurb,
    image: `${siteConfig.url}${d.image}`,
    touristType: d.categories.join(", "),
    geographicIdentifier: d.country,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TRAVEL DEV Destinations",
    url: `${siteConfig.url}/destinations`,
    hasPart: touristDests,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Destinations"
        title="EXPLORE INDIA"
        description="Eight places we know street by street — filter by region or mood, compare starting prices, and open the one that feels right."
        crumbs={[{ label: "Destinations", href: "/destinations" }]}
        image="/images/dest-kashmir.jpg"
        imageAlt="Snow-covered Himalayan peaks rising above a valley in Kashmir"
      />

      <Suspense fallback={<ExplorerFallback />}>
        <DestinationExplorer />
      </Suspense>

      {/* immersive horizontal storytelling */}
      <section
        aria-labelledby="horizontal-destinations"
        className="border-t border-navy/10 bg-cloud-100/60 pt-16 md:pt-24"
      >
        <div className="container-x flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Keep scrolling"
            title="The shortlist, side by side"
            description="Our most requested routes — swipe through them without leaving the page."
            highlight="shortlist"
          />
          <Reveal delay={0.1} y={18}>
            <CTAButton href="/packages" variant="outline">
              See tour packages
            </CTAButton>
          </Reveal>
        </div>

        <div className="mt-10 pb-16 md:pb-24">
          <HorizontalScroll>
            {indiaDestinations.map((d, i) => (
              <DestinationSlide key={d.slug} destination={d} index={i} />
            ))}
          </HorizontalScroll>
        </div>
      </section>

      <CTABand
        eyebrow="Plan it"
        title="Found the one? Let's price it out"
        description="Share your dates and travellers — we'll come back with a route, hotels and a single transparent quote."
        primary={{ label: "Start Planning", href: "/trip-planner" }}
        secondary={{ label: "Talk to a human", href: "/contact" }}
      />
    </>
  );
}
