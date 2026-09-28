import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { formatDate } from "@/lib/data/blog";
import type { BlogPost } from "@/lib/types";

export default function BlogCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 31vw"
          quality={78}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-flare px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white">
          {post.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.74rem] font-medium text-navy/50">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-azure-500" strokeWidth={1.8} />
            {formatDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-azure-500" strokeWidth={1.8} />
            {post.readMins} min read
          </span>
        </div>

        <h3 className="mt-3 font-display text-xl font-bold leading-snug tracking-[-0.02em] text-navy">
          <Link href={`/blog/${post.slug}`} className="transition group-hover:text-azure-600">
            {post.title}
          </Link>
        </h3>

        <p className="mt-2.5 text-[0.9rem] leading-relaxed text-navy/65">{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.82rem] font-bold text-azure-600 transition group-hover:gap-2.5"
        >
          Read article
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
        </Link>
      </div>
    </article>
  );
}
