import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";
import { LogoMark } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] flex-col items-center justify-center overflow-hidden bg-navy-950 px-6 py-32 text-center">
      <div className="grain absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_30%,rgb(23_105_170_/_0.35),transparent_70%)]" />

      <LogoMark className="h-14" />
      <p className="eyebrow mt-8 text-azure-300">
        <span className="h-px w-8 bg-flare" aria-hidden />
        Error 404
      </p>
      <h1 className="h1 mt-5 max-w-2xl text-white">This route doesn&apos;t exist yet</h1>
      <p className="lede mt-5 max-w-md !text-white/65">
        Every journey needs a starting point — let&apos;s get you back to one.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
        <CTAButton href="/" variant="flare" size="lg">
          Back to home
        </CTAButton>
        <CTAButton href="/destinations" variant="glass" size="lg">
          Browse destinations
        </CTAButton>
      </div>

      <Link
        href="/contact"
        className="mt-8 text-sm text-white/50 underline-offset-4 transition hover:text-white hover:underline"
      >
        Or tell us where you meant to go
      </Link>
    </section>
  );
}
