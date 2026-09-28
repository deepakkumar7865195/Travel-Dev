import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import BlogArchive from "@/components/sections/BlogArchive";
import CTABand from "@/components/sections/CTABand";
import { sortedPosts } from "@/lib/data/blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Articles — Every Route, Guide & Trip Note | TRAVEL DEV",
  description:
    "The complete TRAVEL DEV journal: every itinerary, budget guide and trip note — filter by Kashmir, Kerala, Rajasthan, planning guides and more.",
  alternates: { canonical: "/blog/all" },
  openGraph: {
    title: "All Articles | TRAVEL DEV Journal",
    description: "Every itinerary, guide and trip note from the TRAVEL DEV desk, in one archive.",
    url: `${siteConfig.url}/blog/all`,
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "TRAVEL DEV Journal — All Articles",
  url: `${siteConfig.url}/blog/all`,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: sortedPosts.length,
    itemListElement: sortedPosts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${siteConfig.url}/blog/${p.slug}`,
    })),
  },
};

export default function AllBlogsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Archive"
        title="ALL ARTICLES"
        description={`Every ${sortedPosts.length} pieces we have published — itineraries, budget guides and the notes our desk sends travellers before they fly.`}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: "All articles", href: "/blog/all" }]}
        image="/images/misc-market.jpg"
        imageAlt="Colourful spice and textile market stall"
      />

      <section className="pt-14 md:pt-16" aria-label="All blog articles">
        <BlogArchive />
      </section>

      <CTABand
        eyebrow="Journal"
        title="Found a route you like?"
        description="Every article maps to a real package. Send us the dates and we will price it out within one working day."
        primary={{ label: "See tour packages", href: "/packages" }}
        secondary={{ label: "Request a custom trip", href: "/contact" }}
      />
    </>
  );
}
