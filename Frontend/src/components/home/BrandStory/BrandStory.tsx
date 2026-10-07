import { Link } from "react-router-dom";
import { SparkleIcon, ShieldIcon, BottleIcon, ArrowRightIcon } from "../../common/Icons";

const BrandStory = () => {
  return (
    <section className="bg-perf-bg py-24 text-perf-text-main">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        {/* Left Column: Visual Flacon & Silk Still Life */}
        <div className="lg:col-span-6 relative">
          <div className="overflow-hidden rounded-3xl border border-perf-border bg-perf-card shadow-2xl">
            <img
              src="/images/orvella-velour.jpg"
              alt="Orvella Haute Parfumerie Flacon"
              className="h-[520px] sm:h-[600px] w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 right-3 left-3 sm:left-auto sm:right-10 rounded-2xl border border-perf-border bg-perf-card/95 backdrop-blur-md p-4 sm:p-5 shadow-xl sm:max-w-xs space-y-1">
            <p className="text-[10px] uppercase tracking-[0.25em] text-perf-gold font-semibold font-display">
              Maison Orvella · Est. 2026
            </p>
            <h4 className="text-lg sm:text-xl font-serif-luxury font-normal text-perf-text-main">
              Your Signature, Bottled.
            </h4>
            <p className="text-[11px] text-perf-text-muted leading-relaxed">
              Formulated to merge seamlessly with body chemistry, developing a unique aura for every individual.
            </p>
          </div>
        </div>

        {/* Right Column: Editorial Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-perf-gold">
            <SparkleIcon size={14} />
            <span>The Maison Identity</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-light font-serif-luxury text-perf-text-main leading-tight">
            Scent as an intimate <br />
            <span className="italic font-normal text-perf-gold font-serif-luxury">
              garment of presence.
            </span>
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-perf-text-muted">
            Orvella was established on the conviction that perfume is not a decorative
            afterthought, but a core component of personal identity. We craft
            fragrances that feel distinctive without being extravagant: compositions
            designed to stay long after you leave.
          </p>

          <p className="text-xs sm:text-sm leading-relaxed text-perf-text-muted">
            Balancing minimalist geometry with sensual accords, each Orvella flacon
            is conceived as an intimate dialogue between rare raw botanicals and
            modern skin.
          </p>

          {/* 2 Refined Feature Columns (No 3-column rows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
            <div className="p-5 rounded-2xl bg-perf-card border border-perf-border/80 space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-perf-input-bg text-perf-gold border border-perf-border/60">
                <ShieldIcon size={18} />
              </div>
              <h4 className="font-serif-luxury text-lg font-normal text-perf-text-main">
                Rare Extracted Absolutes
              </h4>
              <p className="text-xs text-perf-text-muted leading-relaxed">
                Raw resins, distilled petals, and cold-pressed peels sourced directly from partner fields.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-perf-card border border-perf-border/80 space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-perf-input-bg text-perf-gold border border-perf-border/60">
                <BottleIcon size={18} />
              </div>
              <h4 className="font-serif-luxury text-lg font-normal text-perf-text-main">
                Weighted Crystal Artistry
              </h4>
              <p className="text-xs text-perf-text-muted leading-relaxed">
                Thick-walled flacons and champagne metallic closures designed to be kept forever.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-perf-gold hover:text-perf-text-main transition-colors group"
            >
              <span>Read The Full Maison Philosophy</span>
              <ArrowRightIcon
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
