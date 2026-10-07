import { Link } from "react-router-dom";
import { SparkleIcon, ArrowRightIcon } from "../../common/Icons";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-perf-bg py-28 lg:py-36 text-perf-text-main border-b border-perf-border/80">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-perf-gold/30 bg-perf-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-perf-gold">
          <SparkleIcon size={13} />
          <span>The Maison Orvella</span>
        </div>

        <h1 className="mt-8 font-serif-luxury text-4xl font-light leading-[1.1] text-perf-text-main sm:text-6xl lg:text-7xl max-w-4xl mx-auto">
          Built on the belief that scent is <br />
          <span className="italic font-normal text-perf-gold font-serif-luxury">
            part of personal identity.
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-xs sm:text-sm leading-relaxed text-perf-text-muted">
          Orvella was conceived as a modern luxury fragrance house dedicated to
          refined aesthetics, emotional resonance, and distinctive compositions
          crafted to stay long after you leave.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/all-perfumes"
            className="rounded-full bg-perf-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 shadow-md"
          >
            Explore The Flacons
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-perf-border bg-perf-card px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-perf-text-main transition hover:border-perf-gold/80"
          >
            <span>Book Private Atelier</span>
            <ArrowRightIcon size={14} />
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6 text-[10px] uppercase tracking-[0.25em] text-perf-text-muted">
          <span>Grasse Maceration</span>
          <span className="text-perf-gold">·</span>
          <span>Architectural Crystal</span>
          <span className="text-perf-gold">·</span>
          <span>Bespoke Formulations</span>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
