import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, PenLine, Tag } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import BlogCard from "@/components/cards/BlogCard";
import CTABand from "@/components/sections/CTABand";
import CTAButton from "@/components/ui/CTAButton";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { posts, getPost, relatedPosts, formatDate } from "@/lib/data/blog";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found — TRAVEL DEV" };

  return {
    title: `${post.title} | TRAVEL DEV Journal`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author],
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(post.slug);
  const wordCount = post.sections.reduce(
    (n, s) =>
      n +
      s.paragraphs.join(" ").split(/\s+/).length +
      (s.bullets?.join(" ").split(/\s+/).length ?? 0),
    0
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.url}${post.cover}`,
    datePublished: post.publishedAt,
    ...(post.updated ? { dateModified: post.updated } : {}),
    author: { "@type": "Organization", name: post.author, url: siteConfig.url },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    wordCount,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow={post.category}
        title={post.title.toUpperCase()}
        description={post.excerpt}
        crumbs={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
        image={post.cover}
        imageAlt={post.coverAlt}
      />

      <article className="container-x py-14 md:py-18">
        <div className="mx-auto max-w-3xl">
          <Reveal y={16}>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-navy/10 pb-6 text-[0.8rem] font-medium text-navy/55">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-azure-500" strokeWidth={1.8} />
                {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <PenLine className="h-4 w-4 text-azure-500" strokeWidth={1.8} />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-azure-500" strokeWidth={1.8} />
                {post.readMins} min read
              </span>
            </div>
          </Reveal>

          <div className="mt-9 space-y-11">
            {post.sections.map((section) => (
              <Reveal key={section.heading} y={18}>
                <section>
                  <h2 className="font-display text-[1.4rem] font-extrabold leading-tight tracking-[-0.03em] text-navy md:text-[1.7rem]">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)} className="mt-4 text-[1rem] leading-[1.75] text-navy/75">
                      {p}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="mt-5 space-y-3 border-l-2 border-azure-500/40 pl-5">
                      {section.bullets.map((b) => (
                        <li key={b} className="text-[0.97rem] leading-relaxed text-navy/75">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal y={16}>
            <div className="mt-11 flex flex-wrap items-center gap-2 border-t border-navy/10 pt-7">
              <span className="mr-1 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-navy/45">
                <Tag className="h-3.5 w-3.5" strokeWidth={2} />
                Tagged
              </span>
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-azure-300/70 bg-azure-100 px-3 py-1.5 text-[0.78rem] font-semibold text-azure-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal y={16}>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] bg-cloud-50 p-6">
              <div>
                <p className="font-display text-lg font-extrabold text-navy">Want this route, planned around your dates?</p>
                <p className="mt-1 text-sm text-navy/60">
                  Every article maps to a real package — same itinerary, published inclusions, one clear price.
                </p>
              </div>
              <CTAButton href="/packages" variant="primary" size="md">
                See the packages
              </CTAButton>
            </div>
          </Reveal>

          <Reveal y={16}>
            <Link
              href="/blog"
              className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-navy transition hover:text-azure-600"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
              All articles
            </Link>
          </Reveal>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-navy/10 pt-12" aria-label="Related articles">
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-navy">
              Keep reading
            </h2>
            <RevealStagger className="mt-7 grid gap-6 sm:grid-cols-2" stagger={0.1}>
              {related.map((p) => (
                <RevealItem key={p.slug}>
                  <BlogCard post={p} />
                </RevealItem>
              ))}
            </RevealStagger>
          </section>
        )}
      </article>

      <CTABand
        eyebrow="Next step"
        title="Ready when you are"
        description="Send us your dates and we'll come back with a route, hotels and a single transparent quote."
        primary={{ label: "Request a custom trip", href: "/contact" }}
        secondary={{ label: "Browse all packages", href: "/packages" }}
      />
    </>
  );
}
