import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";
import FlightPath from "@/components/ui/FlightPath";
import Reveal from "@/components/ui/Reveal";

export default function CTABand({
  eyebrow = "Let's go",
  title = "Your next unforgettable journey starts here",
  description = "Tell us the dates and the dream — we'll send back a route, a quote and a real human within 24 hours.",
  primary = { label: "Start Planning", href: "/contact" },
  secondary = { label: "Try the trip planner", href: "/trip-planner" },
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      <div className="grain absolute inset-0 -z-10" />
      <div className="absolute -left-24 top-0 -z-10 h-72 w-72 rounded-full bg-azure-600/25 blur-[120px]" />
      <div className="absolute -right-16 bottom-0 -z-10 h-72 w-72 rounded-full bg-flare/20 blur-[120px]" />
      <FlightPath
        className="pointer-events-none absolute inset-x-0 top-4 -z-10 mx-auto h-40 w-[min(92vw,900px)] opacity-45"
        stroke="#4FA3E0"
        duration={9}
      />

      <div className="container-x flex flex-col items-center gap-8 py-24 text-center md:py-32">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            as="h2"
            light
            className="max-w-3xl"
          />
        </Reveal>

        <Reveal delay={0.15} y={20}>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <CTAButton href={primary.href} variant="flare" size="lg">
              {primary.label}
            </CTAButton>
            <CTAButton href={secondary.href} variant="glass" size="lg" arrow={false}>
              {secondary.label}
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
