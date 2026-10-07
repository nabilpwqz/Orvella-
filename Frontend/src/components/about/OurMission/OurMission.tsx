import { ShieldIcon, SparkleIcon, BottleIcon, ClockIcon } from "../../common/Icons";

const items = [
  {
    icon: SparkleIcon,
    number: "01",
    title: "Artisanal Integrity",
    description:
      "Sourcing without compromise: extracting purely from ethical growers in Grasse, Calabria, Java, and the Atlas Mountains.",
  },
  {
    icon: ShieldIcon,
    number: "02",
    title: "Identity Centricity",
    description:
      "Composing scents that amplify personal presence and quiet confidence rather than conforming to mass-market conventions.",
  },
  {
    icon: ClockIcon,
    number: "03",
    title: "Atmospheric Longevity",
    description:
      "Formulating high-concentration extraits and eaux de parfum engineered to develop continuously throughout a full day.",
  },
  {
    icon: BottleIcon,
    number: "04",
    title: "Enduring Objects",
    description:
      "Crafting heavy crystal flacons with hand-brushed metallic details that stand as timeless decorative art pieces.",
  },
];

const OurMission = () => {
  return (
    <section className="bg-perf-bg py-24 text-perf-text-main border-b border-perf-border/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-perf-gold inline-flex items-center gap-1.5">
            <SparkleIcon size={13} />
            Maison Commitments
          </span>

          <h2 className="text-3xl sm:text-4xl font-light font-serif-luxury text-perf-text-main">
            Guided by Refinement
          </h2>

          <p className="text-xs sm:text-sm text-perf-text-muted leading-relaxed">
            Orvella is dedicated to creating extraordinary olfactive impressions
            that celebrate individuality, elegance, and tactile luxury.
          </p>
        </div>

        {/* 4 Pillars Grid (Strict: 4 columns, never 3 in a row!) */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-perf-border/80 bg-perf-card p-7 transition-all duration-300 hover:border-perf-gold/60 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-perf-gold">
                      {item.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-perf-input-bg text-perf-gold border border-perf-border/60 group-hover:bg-perf-gold group-hover:text-white transition-colors duration-300">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="text-xl font-normal font-serif-luxury text-perf-text-main group-hover:text-perf-gold transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-perf-text-muted">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-perf-border/40 text-[10px] uppercase tracking-widest text-perf-text-muted">
                  Orvella Standard
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurMission;
