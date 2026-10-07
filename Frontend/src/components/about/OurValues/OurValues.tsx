import { ShieldIcon, SparkleIcon, BottleIcon, CompassIcon } from "../../common/Icons";

const values = [
  {
    icon: ShieldIcon,
    number: "01",
    title: "Olfactory Purity",
    description:
      "Every Orvella fragrance is formulated using unadulterated botanical absolutes, cold-pressed oils, and rare resins.",
  },
  {
    icon: BottleIcon,
    number: "02",
    title: "Contemporary Luxury",
    description:
      "Minimalist aesthetics paired with olfactory complexity and hand-finished architectural crystal flacons.",
  },
  {
    icon: SparkleIcon,
    number: "03",
    title: "Intimacy & Presence",
    description:
      "Fragrances composed to feel personal and skin-close, leaving a delicate impression that stays after you leave.",
  },
  {
    icon: CompassIcon,
    number: "04",
    title: "Ethical Sourcing",
    description:
      "Sustainable botanical harvesting, ethical smallholder partnerships, and refillable heirloom glassware.",
  },
];

const OurValues = () => {
  return (
    <section className="py-24 bg-perf-bg text-perf-text-main">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-perf-gold inline-flex items-center gap-1.5">
            <SparkleIcon size={13} />
            Maison Principles
          </span>

          <h2 className="text-3xl sm:text-4xl font-light font-serif-luxury text-perf-text-main">
            What Defines Orvella
          </h2>

          <p className="text-xs sm:text-sm text-perf-text-muted leading-relaxed">
            Our values guide every formulation we extract, every flacon we sculpt,
            and every memorable impression we deliver.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="rounded-2xl border border-perf-border/80 bg-perf-card p-7 transition-all duration-300 hover:border-perf-gold/60 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-perf-gold">
                      {value.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-perf-input-bg text-perf-gold border border-perf-border/60 group-hover:bg-perf-gold group-hover:text-white transition-colors duration-300">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="text-xl font-normal font-serif-luxury text-perf-text-main group-hover:text-perf-gold transition-colors">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-perf-text-muted">
                    {value.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-perf-border/40 text-[10px] uppercase tracking-widest text-perf-text-muted">
                  Maison Value
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
