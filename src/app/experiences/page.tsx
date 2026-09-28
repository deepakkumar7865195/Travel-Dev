import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import ExperienceCard from "@/components/cards/ExperienceCard";
import CinematicBand from "@/components/sections/CinematicBand";
import ExperienceStory from "@/components/sections/ExperienceStory";
import CTABand from "@/components/sections/CTABand";
import { experiences } from "@/lib/data/experiences";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Travel Experiences — Mountain, Beach, Culture, Wildlife & Luxury",
  description:
    "Mountain adventures, beach escapes, cultural journeys, wildlife safaris, luxury holidays, honeymoons, family trips and weekend getaways — curated by TRAVEL DEV.",
  alternates: { canonical: "/experiences" },
  openGraph: {
    title: "Travel Beyond Destinations | TRAVEL DEV",
    description: "Eight immersive ways to travel — designed around how you want the trip to feel.",
    url: `${siteConfig.url}/experiences`,
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "TRAVEL DEV Experiences",
  url: `${siteConfig.url}/experiences`,
  hasPart: experiences.map((e) => ({
    "@type": "TouristExperience",
    name: e.title,
    description: e.description,
    about: e.kicker,
  })),
};

export default function ExperiencesPage() {
  const [first, second, third, fourth, fifth, ...rest] = experiences;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader
        eyebrow="Experiences"
        title="TRAVEL BEYOND DESTINATIONS"
        description="Choose a feeling first and we'll find the place. Eight experience families, each with its own designers and local partners."
        crumbs={[{ label: "Experiences", href: "/experiences" }]}
        image="/images/exp-culture.jpg"
        imageAlt="Pagoda-lined street in Kyoto during autumn"
      />

      <section className="container-x pt-16 md:pt-20" aria-label="Featured experiences">
        <RevealStagger className="grid gap-6 md:grid-cols-2" stagger={0.1}>
          {[first, second, third, fourth].map((e) => (
            <RevealItem key={e.slug}>
              <ExperienceCard experience={e} size="lg" />
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      <CinematicBand experience={fifth} />

      <section className="container-x pb-4" aria-label="More experiences">
        <Reveal y={20}>
          <div className="hairline" />
        </Reveal>
        <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {rest.map((e) => (
            <RevealItem key={e.slug}>
              <ExperienceCard experience={e} size="sm" />
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      <ExperienceStory />

      <CTABand
        eyebrow="Your turn"
        title="Tell us the feeling — we'll find the place"
        description="Pick an experience and our designers will come back with a route, dates and a real quote."
        primary={{ label: "Start Planning", href: "/packages" }}
        secondary={{ label: "Talk to us", href: "/contact" }}
      />
    </>
  );
}
