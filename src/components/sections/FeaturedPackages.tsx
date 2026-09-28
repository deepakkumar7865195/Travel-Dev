import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";
import PackageCard from "@/components/cards/PackageCard";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { featuredPackage, packages } from "@/lib/data/packages";

const BESTSELLER = "darjeeling-gangtok-hills";

const badges: Record<string, string> = {
  [BESTSELLER]: "Bestseller for Bengal",
};

export default function FeaturedPackages() {
  const first = packages.find((p) => p.slug === BESTSELLER);
  const list = [
    ...(first ? [first] : []),
    ...packages
      .filter((p) => p.slug !== featuredPackage.slug && p.slug !== BESTSELLER)
      .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews),
  ].slice(0, 6);

  return (
    <section aria-label="Featured tour packages" className="container-x pb-20 md:pb-28">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Featured"
          title="Six packages travellers book most"
          description="Each one ships with the full day-by-day plan, inclusions, exclusions and a per-person price — open any card to read it in full."
          className="max-w-2xl"
          highlight="most"
        />

        <Reveal delay={0.1} y={20} className="shrink-0">
          <CTAButton href="/packages" variant="outline" size="md">
            View all packages
          </CTAButton>
        </Reveal>
      </div>

      <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {list.map((pkg) => (
          <RevealItem key={pkg.slug}>
            <PackageCard pkg={pkg} badge={badges[pkg.slug]} />
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}
