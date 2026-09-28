export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export function formatINR(value: number) {
  return `₹${inr.format(value)}`;
}

export function formatCompactINR(value: number) {
  if (value >= 100000) {
    const l = value / 100000;
    return `₹${Number.isInteger(l) ? l : l.toFixed(1)}L`;
  }
  if (value >= 1000) return `₹${Number((value / 1000).toFixed(0))}K`;
  return `₹${value}`;
}

export function pluralize(count: number, word: string) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}
