"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import RatingStars from "@/components/ui/RatingStars";
import { cn } from "@/lib/utils";

const quotes = [
  {
    quote:
      "Our family trip with Travel Dev was amazing! Everything was well organized, from hotel bookings to sightseeing. We enjoyed a comfortable and memorable holiday.",
    name: "Ananya Sen",
    meta: "Kolkata · Family holiday",
    rating: 5,
  },
  {
    quote:
      "Travel Dev made our Varanasi trip special. The itinerary was well planned, and we enjoyed exploring the temples, ghats, and local culture.",
    name: "Rohit Mehra",
    meta: "Bengaluru · Varanasi",
    rating: 5,
  },
  {
    quote:
      "We had a wonderful travel experience with Travel Dev. The arrangements were smooth, and our trip was filled with beautiful memories.",
    name: "Priya Nair",
    meta: "Kochi · Kerala Backwaters",
    rating: 5,
  },
  {
    quote:
      "Planning a group trip became much easier with Travel Dev. Everything was organized properly, allowing us to enjoy our journey without stress.",
    name: "Sandeep Ghosh",
    meta: "Kolkata · Group tour",
    rating: 5,
  },
  {
    quote:
      "Travel Dev helped us plan a perfect weekend getaway. The destination was beautiful, and the entire experience was relaxing and enjoyable.",
    name: "Rituparna Das",
    meta: "Howrah · Weekend getaway",
    rating: 5,
  },
  {
    quote:
      "Our adventure trip was full of exciting experiences and breathtaking views. Travel Dev helped us organize our journey and make the most of our holiday.",
    name: "Arjun Malhotra",
    meta: "Delhi · Adventure trail",
    rating: 5,
  },
  {
    quote:
      "I had a memorable solo travel experience. The itinerary was convenient, and I enjoyed exploring new places and discovering local attractions.",
    name: "Farhana Qureshi",
    meta: "Kolkata · Solo travel",
    rating: 5,
  },
  {
    quote:
      "Travel Dev helped us plan a wonderful holiday with our loved ones. From exploring new destinations to enjoying local food, every moment was special.",
    name: "Debashish Roy",
    meta: "Howrah · Holiday with family",
    rating: 5,
  },
];

export default function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [active, setActive] = useState(0);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft < max - 8);

    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : track.clientWidth;
    setActive(Math.round(track.scrollLeft / step));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(track);
    return () => {
      track.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  const scrollByCards = (dir: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : track.clientWidth;
    track.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };

  const jumpTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : track.clientWidth;
    track.scrollTo({ left: index * step, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="testimonials" className="container-x py-20 md:py-24">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Traveller stories"
          title="5,000+ journeys, and counting"
          align="left"
          highlight="journeys"
        />

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={!canPrev}
            aria-label="Previous reviews"
            className="grid h-12 w-12 place-items-center rounded-full border border-navy/12 bg-white text-navy transition hover:border-azure-500 hover:text-azure-600 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={!canNext}
            aria-label="Next reviews"
            className="grid h-12 w-12 place-items-center rounded-full border border-navy/12 bg-white text-navy transition hover:border-azure-500 hover:text-azure-600 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="-mx-5 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 md:-mx-8 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {quotes.map((q) => (
          <li
            key={q.name}
            className="w-[82vw] shrink-0 snap-start sm:w-[60vw] lg:w-[calc((100%-3rem)/3)]"
          >
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
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-2">
        {quotes.map((q, i) => (
          <button
            key={q.name}
            type="button"
            onClick={() => jumpTo(i)}
            aria-label={`Go to review ${i + 1}`}
            aria-current={i === active}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === active ? "w-8 bg-flare" : "w-1.5 bg-navy/15 hover:bg-navy/30"
            )}
          />
        ))}
      </div>
    </section>
  );
}
