import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import WordReveal from "@/components/ui/WordReveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import StatsBand from "@/components/sections/StatsBand";
import Timeline from "@/components/sections/Timeline";
import CTABand from "@/components/sections/CTABand";
import { Compass, HeartHandshake, MessagesSquare, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — We Don't Just Plan Trips, We Create Memories",
  description:
    "Meet TRAVEL DEV: a Kolkata-based travel technology company with 10+ years of experience, 5,000+ happy travellers and 100+ destinations designed around real people.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About TRAVEL DEV — We Create Memories",
    description: "Our story, our people and why travellers keep coming back.",
    url: `${siteConfig.url}/about`,
  },
};

const reasons = [
  {
    icon: Compass,
    title: "Why choose us",
    body: "We don't resell templates. Every route is built around your dates, pace and budget, then checked by someone who has actually been there.",
  },
  {
    icon: Sparkles,
    title: "Personalised planning",
    body: "A dedicated trip designer stays with you from first message to final invoice — one person, one thread, no call-centre roulette.",
  },
  {
    icon: MessagesSquare,
    title: "Customer support",
    body: "24/7 WhatsApp and phone support while you travel. Missed flights, weather shifts, changed minds — we rework in minutes.",
  },
  {
    icon: HeartHandshake,
    title: "Honest pricing",
    body: "Line-item quotes with every inclusion listed. If we can't beat a price, we'll tell you rather than quietly cut quality.",
  },
];

const team = [
  {
    name: "Anirban Das",
    role: "Founder & Trip Designer",
    bio: "42 countries, 11 of them twice. Builds every international route himself.",
    image: "/images/about-team-1.jpg",
    alt: "Traveller photographing hot air balloons at sunrise",
  },
  {
    name: "Sana Roy",
    role: "Head of Experiences",
    bio: "Ex-hotelier. Knows which room to ask for and which view is worth the upgrade.",
    image: "/images/about-team-2.jpg",
    alt: "Traveller standing on a cliff above the sea",
  },
  {
    name: "Vikram Iyer",
    role: "On-Trip Support Lead",
    bio: "Runs the control desk. Answers at 3am without needing a script.",
    image: "/images/about-team-3.jpg",
    alt: "Hiker looking out over a mountain lake",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Travel Dev"
        title="WE DON'T JUST PLAN TRIPS. WE CREATE MEMORIES."
        description="A travel technology company run by people who never stopped travelling — building journeys that feel effortless from the first message to the flight home."
        crumbs={[{ label: "About", href: "/about" }]}
        image="/images/about-cinematic.jpg"
        imageAlt="Aerial view of a turquoise tropical lagoon"
      />

      <div className="pt-16 md:pt-20">
        <StatsBand />
      </div>

      {/* OUR STORY */}
      <section aria-labelledby="our-story" className="container-x py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Built by travellers, for travellers"
              highlight="story"
            />
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-5 text-[0.98rem] leading-relaxed text-navy/70">
                <p>
                  TRAVEL DEV began in 2016 with two desks in Sector V and one stubborn belief:
                  a good trip is a design problem, not a booking problem. Our founders had spent
                  a decade running group departures for friends — and got tired of watching good
                  travellers pay for bad itineraries.
                </p>
                <p>
                  Today we combine in-house trip designers with real-time pricing tools, so you
                  get the craft of a boutique agency and the speed of a modern travel product.
                  We still sleep in every hotel we sell. We still pick up the phone at 3am.
                </p>
                <p className="font-semibold text-navy">
                  Ten years in, the rule hasn&apos;t changed: never sell a journey we wouldn&apos;t
                  take ourselves.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18} className="mt-8">
              <CTAButton href="/contact" variant="primary">
                Meet the team
              </CTAButton>
            </Reveal>
          </div>

          <div className="relative">
            <ParallaxImage
              src="/images/about-parallax.jpg"
              alt="Traveller standing beside a mirror-still mountain lake at dawn"
              className="h-[420px] rounded-[2rem] shadow-lift md:h-[540px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              amount={70}
            />
            <div className="absolute -bottom-6 -left-4 hidden rounded-3xl border border-navy/10 bg-white p-5 shadow-lift sm:block">
              <span className="block font-display text-3xl font-extrabold text-navy">
                100+
              </span>
              <span className="mt-1 block text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-navy/50">
                Destinations mapped
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* WHY / SUPPORT */}
      <section aria-labelledby="why-us" className="bg-cloud-100/70 py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Travel Dev"
            title="Four reasons travellers stay with us"
            description="Craft, transparency and a human on the other end — in that order."
            highlight="reasons"
          />

          <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {reasons.map(({ icon: Icon, title, body }) => (
              <RevealItem key={title}>
                <div className="group h-full rounded-3xl border border-navy/8 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-azure-600/25 hover:shadow-lift">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white transition-colors duration-500 group-hover:bg-flare">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-navy/60">{body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* TRAVEL EXPERTS */}
      <section aria-labelledby="travel-experts" className="container-x py-16 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Travel experts"
            title="The people behind the plan"
            highlight="people"
          />
          <Reveal delay={0.1} y={16}>
            <p className="max-w-sm text-sm leading-relaxed text-navy/55">
              Every traveller gets a named designer and a named support lead — you&apos;ll never
              explain your trip twice.
            </p>
          </Reveal>
        </div>

        <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {team.map((p) => (
            <RevealItem key={p.name}>
              <article className="group overflow-hidden rounded-[1.75rem] border border-navy/8 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 31vw"
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="p-6">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-azure-600">
                    {p.role}
                  </span>
                  <h3 className="mt-1.5 text-xl font-bold text-navy">{p.name}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-navy/60">{p.bio}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* CINEMATIC PARALLAX BAND */}
      <section aria-label="Travel imagery" className="relative">
        <ParallaxImage
          src="/images/about-story.jpg"
          alt="Traveller with a backpack looking down a Norwegian fjord"
          className="h-[52svh] min-h-[340px] w-full md:h-[70svh]"
          amount={120}
        >
          <div className="absolute inset-0 bg-navy-950/45" />
        </ParallaxImage>

        <div className="absolute inset-0 flex items-center">
          <div className="container-x">
            <WordReveal
              as="p"
              text="Every journey begins with a single conversation"
              className="max-w-3xl font-display text-[clamp(1.6rem,4vw,3.2rem)] font-extrabold uppercase leading-[1.05] tracking-[-0.035em] !text-white"
              highlight="conversation"
            />
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section aria-labelledby="journey" className="container-x py-16 md:py-24">
        <SectionHeading
          eyebrow="Our journey"
          title="Ten years, five milestones"
          as="h2"
          highlight="milestones"
        />
        <div className="mt-14">
          <Timeline />
        </div>
      </section>

      <CTABand
        eyebrow={`${siteConfig.name} · ${siteConfig.tagline}`}
        title="Ready to see what we'd build for you?"
        description="One conversation is enough for us to sketch a route, a budget and a rough date range."
        primary={{ label: "Plan Your Trip", href: "/trip-planner" }}
        secondary={{ label: "Get in touch", href: "/contact" }}
      />
    </>
  );
}
