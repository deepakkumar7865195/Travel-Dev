import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import PackageExplorer from "@/components/sections/PackageExplorer";
import FeaturedPackage from "@/components/sections/FeaturedPackage";
import CTABand from "@/components/sections/CTABand";
import { packages } from "@/lib/data/packages";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tour Packages From Kolkata — Journeys Made For You",
  description:
    "Premium tour packages from Kolkata to Darjeeling, Sikkim, Goa, Rajasthan, Kerala, Kashmir and international holidays — with hotels, transport, meals and activities included.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Tour Packages | TRAVEL DEV",
    description:
      "Compare curated packages from Kolkata to Kashmir, Kerala, Rajasthan and beyond.",
    url: `${siteConfig.url}/packages`,
  },
};

export default function PackagesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "TRAVEL DEV Tour Packages",
    url: `${siteConfig.url}/packages`,
    itemListElement: packages.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristTrip",
        name: p.title,
        description: p.itinerary.join(" → "),
        touristType: p.style.join(", "),
        offers: {
          "@type": "Offer",
          price: p.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        provider: { "@id": `${siteConfig.url}/#organization` },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Tour packages"
        title="JOURNEYS MADE FOR YOU"
        description="Seven signature routes, each pressure-tested by our own team — filter by budget, duration and style, then compare side by side."
        crumbs={[{ label: "Packages", href: "/packages" }]}
        image="/images/dest-kashmir.jpg"
        imageAlt="Shikara boat crossing a turquoise Himalayan lake"
      />

      <PackageExplorer />
      <FeaturedPackage />

      <CTABand
        eyebrow="Bespoke"
        title="None of these quite right? We build from scratch"
        description="Give us a destination, a date range and a budget. You'll get a route back within one working day."
        primary={{ label: "Request a custom trip", href: "/contact" }}
        secondary={{ label: "Use the planner", href: "/trip-planner" }}
      />
    </>
  );
}
