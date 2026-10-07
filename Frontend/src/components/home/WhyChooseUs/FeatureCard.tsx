import type { Feature } from "./featuresData";

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  const Icon = feature.icon;

  return (
    <div className="relative flex flex-col justify-between rounded-2xl border border-perf-border/80 bg-perf-card p-7 shadow-sm transition-all duration-300 hover:border-perf-gold/60 hover:-translate-y-1 w-full min-h-[240px] group">
      {/* Top Header: Number and Icon */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-perf-gold font-bold tracking-wider">
          {feature.number}
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-perf-input-bg border border-perf-border/60 text-perf-gold group-hover:bg-perf-gold group-hover:text-white transition-colors duration-300">
          <Icon size={18} />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1.5 mt-6">
        <span className="text-[10px] uppercase tracking-[0.25em] text-perf-gold font-semibold block">
          {feature.subtitle}
        </span>
        <h3 className="text-xl font-normal font-serif-luxury text-perf-text-main group-hover:text-perf-gold transition-colors">
          {feature.title}
        </h3>
        <p className="text-xs text-perf-text-muted leading-relaxed pt-1">
          {feature.description}
        </p>
      </div>

      {/* Subtle Bottom Gold Hairline */}
      <div className="mt-4 pt-3 border-t border-perf-border/40 flex items-center justify-between text-[10px] uppercase tracking-widest text-perf-text-muted">
        <span>Standard</span>
        <span className="text-perf-gold">Verified</span>
      </div>
    </div>
  );
};

export default FeatureCard;
