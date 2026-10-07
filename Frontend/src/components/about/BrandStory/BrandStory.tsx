import { SparkleIcon, ShieldIcon, BottleIcon } from "../../common/Icons";

const BrandStory = () => {
  return (
    <section className="bg-perf-bg py-24 text-perf-text-main border-b border-perf-border/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        {/* Left Image: Editorial Flacon Presentation */}
        <div className="lg:col-span-6 relative">
          <div className="overflow-hidden rounded-3xl border border-perf-border bg-perf-card shadow-2xl">
            <img
              src="/images/orvella-aurea.jpg"
              alt="Orvella Aurea Flacon on Limestone"
              className="w-full h-[520px] sm:h-[600px] object-cover"
            />
          </div>

          <div className="absolute -bottom-6 left-6 sm:left-10 rounded-2xl border border-perf-border bg-perf-card/95 backdrop-blur-md px-6 py-4 shadow-xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-perf-gold font-display font-semibold">
              Orvella Atelier · Paris
            </p>
            <h4 className="mt-1 text-2xl font-serif-luxury font-normal text-perf-text-main">
              The Architecture of Scent
            </h4>
          </div>
        </div>

        {/* Right Editorial Story */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-perf-gold">
            <SparkleIcon size={14} />
            <span>Origins &amp; Vision</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-light font-serif-luxury text-perf-text-main leading-tight">
            Crafting presence through <br />
            <span className="italic font-normal text-perf-gold font-serif-luxury">
              uncompromising purity.
            </span>
          </h2>

          <p className="text-xs sm:text-sm leading-relaxed text-perf-text-muted">
            Orvella was founded with a singular conviction: to establish a modern
            luxury fragrance house focused on individuality, architectural elegance,
            and memorable scent experiences. We combine contemporary luxury with
            historical French craftsmanship, creating fragrances that feel
            distinctive without being overly extravagant.
          </p>

          <p className="text-xs sm:text-sm leading-relaxed text-perf-text-muted">
            Rather than following fleeting trends, we organize our creations
            around emotional moods: Noir, Élan, Velour, Aurea, and Nuit. Each
            flacon is an intimate signature, bottled to leave an impression that
            endures long after departure.
          </p>

          {/* 2 Feature Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
            <div className="p-5 rounded-2xl bg-perf-card border border-perf-border/80 space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-perf-input-bg text-perf-gold border border-perf-border/60">
                <ShieldIcon size={18} />
              </div>
              <h4 className="font-serif-luxury text-lg font-normal text-perf-text-main">
                Rare Botanical Extracts
              </h4>
              <p className="text-xs text-perf-text-muted leading-relaxed">
                Cold-pressed citruses, Persian saffron threads, and vintage aged resins.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-perf-card border border-perf-border/80 space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-perf-input-bg text-perf-gold border border-perf-border/60">
                <BottleIcon size={18} />
              </div>
              <h4 className="font-serif-luxury text-lg font-normal text-perf-text-main">
                Artisanal Crystal Flacons
              </h4>
              <p className="text-xs text-perf-text-muted leading-relaxed">
                Hand-cut weighted glass finished with brushed champagne gold closures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
