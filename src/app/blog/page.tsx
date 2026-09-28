import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import BlogCard from "@/components/cards/BlogCard";
import CTABand from "@/components/sections/CTABand";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { posts } from "@/lib/data/blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Travel Blog — Itineraries, Guides & Trip Notes | TRAVEL DEV",
  description:
    "TRAVEL DEV journal: 6-day Kashmir itineraries, the Darjeeling + Gangtok bestseller route and how to choose between Thailand, Bali and Dubai from Kolkata.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Travel Blog | TRAVEL DEV",
    description: "Itineraries, first-hand guides and honest budget notes from the TRAVEL DEV desk.",
    url: `${siteConfig.url}/blog`,
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "TRAVEL DEV Journal",
  url: `${siteConfig.url}/blog`,
  description: "Itineraries, guides and trip notes from the TRAVEL DEV team.",
  blogPost: posts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    url: `${siteConfig.url}/blog/${p.slug}`,
    datePublished: p.publishedAt,
    author: { "@type": "Organization", name: p.author },
    wordCount: p.sections.reduce(
      (n, s) => n + s.paragraphs.join(" ").split(/\s+/).length + (s.bullets?.join(" ").split(/\s+/).length ?? 0),
      0
    ),
  })),
};

export default function BlogPage() {
  const [first, ...rest] = posts;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Journal"
        title="TRAVEL DEV JOURNAL"
        description="Itineraries we actually run, budgets we actually quote, and the small things our desk tells every traveller before they fly."
        crumbs={[{ label: "Blog", href: "/blog" }]}
        image="/images/misc-wing.jpg"
        imageAlt="Aircraft wing above a soft layer of clouds"
      />

      <section className="container-x py-16 md:py-20" aria-label="Latest articles">
        <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          <RevealItem>
            <BlogCard post={first} priority />
          </RevealItem>
          {rest.map((p) => (
            <RevealItem key={p.slug}>
              <BlogCard post={p} />
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      <CTABand
        eyebrow="Your turn"
        title="Read enough? Let's build the trip"
        description="Pick any route from the journal and our designers will send back a date-wise plan with real hotel options within one working day."
        primary={{ label: "See tour packages", href: "/packages" }}
        secondary={{ label: "Talk to a human", href: "/contact" }}
      />
    </>
  );
}
