import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import BlogCard from "@/components/cards/BlogCard";
import CTABand from "@/components/sections/CTABand";
import CTAButton from "@/components/ui/CTAButton";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { posts, sortedPosts } from "@/lib/data/blog";
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
      (n, s) =>
        n +
        (s.paragraphs ?? []).join(" ").split(/\s+/).length +
        (s.bullets?.join(" ").split(/\s+/).length ?? 0),
      0
    ),
  })),
};

export default function BlogPage() {
  const latest = sortedPosts.slice(0, 3);
  const [first, ...rest] = latest;

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
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-navy/10 pb-7">
          <div>
            <p className="eyebrow text-azure-600">
              <span className="h-px w-8 bg-flare" aria-hidden />
              Latest
            </p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy">
              Fresh from the desk
            </h2>
          </div>
          <Link
            href="/blog/all"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-navy transition hover:text-azure-600"
          >
            View all {posts.length} articles
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
          </Link>
        </div>

        <RevealStagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          <RevealItem>
            <BlogCard post={first} priority />
          </RevealItem>
          {rest.map((p) => (
            <RevealItem key={p.slug}>
              <BlogCard post={p} />
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-9">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] bg-cloud-50 p-6">
            <div>
              <p className="font-display text-lg font-extrabold text-navy">
                Everything else we have published
              </p>
              <p className="mt-1 text-sm text-navy/60">
                The full archive — itineraries, budget guides and trip notes — filterable by category.
              </p>
            </div>
            <CTAButton href="/blog/all" variant="primary" size="md">
              Open the archive
            </CTAButton>
          </div>
        </Reveal>
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
