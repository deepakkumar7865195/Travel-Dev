import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";
import DestinationCard from "@/components/cards/DestinationCard";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { featuredDestinations } from "@/lib/data/destinations";

export default function FeaturedDestinations() {
  const list = featuredDestinations.slice(0, 6);

  return (
    <section aria-labelledby="featured-destinations" className="container-x py-20 md:py-28">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Featured"
          title="Places our travellers keep coming back to"
          description="Handpicked destinations with real itineraries, honest pricing and a local fixer on the ground."
          className="max-w-2xl"
          highlight="destinations"
        />

        <Reveal delay={0.1} y={20} className="shrink-0">
          <CTAButton href="/destinations" variant="outline" size="md">
            View all destinations
          </CTAButton>
        </Reveal>
      </div>

      <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
        {list.map((d) => (
          <RevealItem key={d.slug}>
            <DestinationCard destination={d} />
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}
