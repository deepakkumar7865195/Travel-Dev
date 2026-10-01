import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import CTAButton from "@/components/ui/CTAButton";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const steps = [
  { n: "01", t: "Pick the feeling", d: "Tell us how the trip should feel, not just where." },
  { n: "02", t: "We design the route", d: "Hotels, trains, guides and buffers — handled." },
  { n: "03", t: "You bring the camera", d: "And we make sure the frames are worth keeping." },
];

export default function GalleryCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-cloud-50" aria-label="Create your own travel story">
      <div className="container-x py-20 md:py-28">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-navy-950 shadow-lift">
          <Image
            src="/images/Darjeeling 7.jpeg"
            alt="Travelers standing on a misty viewpoint above forested ridges"
            fill
            sizes="(min-width: 1280px) 1280px, 92vw"
            quality={78}
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/78 to-navy-950/55" />
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_10%,rgb(233_30_37_/_0.24),transparent_60%)]" />
          <div className="grain absolute inset-0" />

          <div className="relative grid gap-14 p-8 md:p-14 lg:grid-cols-[1.15fr_1fr] lg:p-20">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Your turn"
                  title="Create your own travel story"
                  description="Every frame in this gallery started the same way — one traveller saying 'somewhere like this'. Tell us the somewhere. We'll handle the rest, and you can bring the camera."
                  highlight="your own"
                  light
                />
              </Reveal>

              <Reveal delay={0.16} y={20}>
                <div className="mt-10 flex flex-wrap items-center gap-3.5">
                  <CTAButton href="/contact" variant="flare" size="lg">
                    Start planning
                  </CTAButton>
                  <CTAButton href="/packages" variant="glass" size="lg" arrow={false}>
                    Browse packages
                  </CTAButton>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} y={24}>
              <ol className="space-y-4">
                {steps.map((s) => (
                  <li
                    key={s.n}
                    className={cn(
                      "group flex gap-5 rounded-[1.5rem] border border-white/12 bg-white/[0.04] p-5 backdrop-blur-md transition-colors duration-500 hover:border-white/28 hover:bg-white/[0.07]"
                    )}
                  >
                    <span className="font-display text-xl font-bold text-azure-300 md:text-2xl">
                      {s.n}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-white md:text-lg">
                        {s.t}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/60">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}