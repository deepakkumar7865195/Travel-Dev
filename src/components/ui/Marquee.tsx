import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Marquee({
  items,
  className,
  duration = 46,
}: {
  items: string[];
  className?: string;
  duration?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className={cn("marquee-wrap relative overflow-hidden py-5", className)}>
      <div
        className="marquee-track flex w-max items-center gap-8 md:gap-12"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 text-[0.95rem] font-semibold uppercase tracking-[0.18em] text-navy/45 md:gap-12 md:text-base"
          >
            {item}
            <Plane className="h-4 w-4 rotate-45 text-flare" strokeWidth={1.8} aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
