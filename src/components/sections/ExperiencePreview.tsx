import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";
import Reveal from "@/components/ui/Reveal";
import HorizontalScroll from "@/components/ui/HorizontalScroll";
import ExperienceCard from "@/components/cards/ExperienceCard";
import { experiences } from "@/lib/data/experiences";

export default function ExperiencePreview() {
  return (
    <section aria-labelledby="experience-preview" className="relative overflow-hidden py-20 md:py-28">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Experiences"
          title="Travel beyond destinations"
          description="Not sure where yet? Start with how you want the trip to feel."
          highlight="beyond"
        />
        <Reveal delay={0.1} y={20} className="shrink-0">
          <CTAButton href="/experiences" variant="outline">
            All experiences
          </CTAButton>
        </Reveal>
      </div>

      <div className="mt-12">
        <HorizontalScroll>
          {experiences.map((e) => (
            <div
              key={e.slug}
              className="w-[76vw] max-w-[400px] shrink-0 md:w-[360px] lg:w-[400px]"
            >
              <ExperienceCard experience={e} size="md" />
            </div>
          ))}
        </HorizontalScroll>
      </div>

      <div className="container-x mt-10">
        <Link
          href="/experiences"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition hover:text-azure-600"
        >
          Keep exploring
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            strokeWidth={2.2}
          />
        </Link>
      </div>
    </section>
  );
}
