import { Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import RatingStars from "@/components/ui/RatingStars";
import { RevealStagger, RevealItem } from "@/components/ui/Reveal";

const quotes = [
  {
    quote:
      "We asked for Kashmir in five days and got back an itinerary that felt like ten. The shikara morning alone was worth it.",
    name: "Ananya Sen",
    meta: "Kolkata · Kashmir Valleys",
    rating: 5,
  },
  {
    quote:
      "Flight got rescheduled at midnight. Someone from TRAVEL DEV was on WhatsApp in four minutes and reworked our whole transfer.",
    name: "Rohit Mehra",
    meta: "Bengaluru · Bali Terraces",
    rating: 5,
  },
  {
    quote:
      "First trip abroad with my parents and everything — visa, wheelchairs, diet, pace — was already thought through.",
    name: "Priya Nair",
    meta: "Kochi · Switzerland Alps",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials" className="container-x py-20 md:py-24">
      <SectionHeading
        eyebrow="Traveller stories"
        title="5,000+ journeys, and counting"
        align="left"
        highlight="journeys"
      />

      <RevealStagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
        {quotes.map((q) => (
          <RevealItem key={q.name}>
            <figure className="flex h-full flex-col rounded-3xl border border-navy/8 bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
              <Quote className="h-7 w-7 text-azure-300" strokeWidth={1.6} aria-hidden />
              <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-navy/75">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-navy/10 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="block text-sm font-bold text-navy">{q.name}</span>
                    <span className="block text-xs text-navy/55">{q.meta}</span>
                  </div>
                  <RatingStars rating={q.rating} />
                </div>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}
