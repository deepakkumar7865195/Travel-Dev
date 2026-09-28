import { Compass, ShieldCheck, Headphones, Gem } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";

const points = [
  {
    icon: Compass,
    title: "Personalised planning",
    body: "Every route is rebuilt around your dates, pace and budget — never a copy-paste itinerary.",
  },
  {
    icon: Gem,
    title: "Handpicked stays",
    body: "We sleep in the hotels we sell. Design stays, honest reviews, no surprise rooms.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent pricing",
    body: "One clear quote with inclusions listed line by line. No hidden fees, ever.",
  },
  {
    icon: Headphones,
    title: "24/7 on-trip support",
    body: "A real person on WhatsApp from wheels-up to wheels-down, in your time zone.",
  },
];

export default function WhyBand() {
  return (
    <section aria-labelledby="why-band" className="relative overflow-hidden bg-cloud-100/70">
      <div className="container-x py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            eyebrow="Why Travel Dev"
            title="Travel, engineered around you"
            description="We combine trip-design craft with modern travel tooling — so planning feels as smooth as the journey itself."
            highlight="engineered"
          />

          <RevealStagger className="grid gap-5 sm:grid-cols-2" stagger={0.09}>
            {points.map(({ icon: Icon, title, body }) => (
              <RevealItem key={title}>
                <div className="group h-full rounded-3xl border border-navy/8 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-azure-600/25 hover:shadow-lift">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-azure-100 text-azure-600 transition-colors duration-500 group-hover:bg-navy group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-navy/60">{body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </div>

      <Reveal delay={0.2} y={16} className="container-x pb-16">
        <div className="hairline" />
      </Reveal>
    </section>
  );
}
