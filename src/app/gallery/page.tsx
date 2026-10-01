import type { Metadata } from "next";
import GalleryHero from "@/components/sections/GalleryHero";
import GalleryGrid from "@/components/sections/GalleryGrid";
import FeaturedCollections from "@/components/sections/FeaturedCollections";
import TravelerMemories from "@/components/sections/TravelerMemories";
import InstagramGrid from "@/components/sections/InstagramGrid";
import GalleryCTA from "@/components/sections/GalleryCTA";
import { galleryPhotos, photosByCategory } from "@/lib/data/gallery";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Travel Gallery — Every Journey Tells a Story",
  description:
    "Browse traveller-shot photographs from Darjeeling, Goa, Rajasthan, Kerala and beyond. Filter by mountains, beaches, wildlife, culture, adventure or city escapes, then open any frame full-screen.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Travel Gallery | TRAVEL DEV",
    description:
      "Every journey tells a story — photographs shot by the travellers we designed trips for.",
    url: `${siteConfig.url}/gallery`,
    images: [
      {
        url: "/images/Darjeeling 8.jpeg",
        width: 960,
        height: 1280,
        alt: "Aerial view of a river valley below a forested ridge in Darjeeling",
      },
    ],
  },
};

export default function GalleryPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TRAVEL DEV Photo Gallery",
    url: `${siteConfig.url}/gallery`,
    description:
      "Photographs from trips designed by TRAVEL DEV — mountains, beaches, wildlife, culture, adventure and city escapes.",
    about: {
      "@type": "ItemList",
      name: "Travel gallery categories",
      itemListElement: (
        ["Mountains", "Beaches", "Wildlife", "Culture", "Adventure", "City Escapes"] as const
      ).map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c,
        url: `${siteConfig.url}/gallery#gallery-grid`,
      })),
    },
    hasPart: galleryPhotos.slice(0, 12).map((p) => ({
      "@type": "ImageObject",
      name: p.title,
      caption: p.alt,
      contentUrl: `${siteConfig.url}${p.src}`,
      representativeOfPage: true,
      creditText: p.credit,
      contentLocation: {
        "@type": "Place",
        name: p.location,
        address: p.country,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <GalleryHero />
      <GalleryGrid />
      <FeaturedCollections />
      <TravelerMemories />
      <InstagramGrid />
      <GalleryCTA />

      <p className="sr-only">
        The gallery currently holds {galleryPhotos.length} photographs across{" "}
        {(["Mountains", "Beaches", "Wildlife", "Culture", "Adventure", "City Escapes"] as const)
          .map((c) => `${c} (${photosByCategory(c).length})`)
          .join(", ")}{" "}
        categories.
      </p>
    </>
  );
}