import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RatingStars({
  rating,
  className,
  starClass = "h-3.5 w-3.5",
}: {
  rating: number;
  className?: string;
  starClass?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`Rated ${rating} out of 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={cn(starClass, i < Math.round(rating) ? "fill-flare text-flare" : "text-current opacity-30")}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </span>
  );
}
