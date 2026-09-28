import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import ExperienceCard from "@/components/cards/ExperienceCard";
import { experiences } from "@/lib/data/experiences";

export default function ExperiencePreview() {
  const list = experiences.slice(0, 6);

  return (
    <section aria-label="Travel experiences" className="container-x py-16 md:py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Experiences"
          title="Travel beyond destinations"
          description="Not sure where yet? Start with how you want the trip to feel."
          highlight="beyond"
          className="max-w-2xl"
        />
        <Reveal delay={0.1} y={20} className="shrink-0">
          <CTAButton href="/experiences" variant="outline">
            All experiences
          </CTAButton>
        </Reveal>
      </div>

      <RevealStagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {list.map((e) => (
          <RevealItem key={e.slug}>
            <ExperienceCard experience={e} size="md" />
          </RevealItem>
        ))}
      </RevealStagger>

      <div className="mt-7">
        <Link
          href="/experiences"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition hover:text-azure-600"
        >
          Keep exploring
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            strokeWidth={2.2}
          />
        </Link>
      </div>
    </section>
  );
}
