import { featuresData } from "./featuresData";
import FeatureCard from "./FeatureCard";
import { SparkleIcon } from "../../common/Icons";

const WhyChooseUs = () => {
  return (
    <section className="py-24 relative bg-perf-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-perf-gold">
            <SparkleIcon size={13} />
            Maison Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-light font-serif-luxury text-perf-text-main">
            The Philosophy of Refinement
          </h2>
          <p className="text-xs sm:text-sm text-perf-text-muted leading-relaxed">
            Every Orvella composition is governed by four uncompromising tenets
            of modern high perfumery.
          </p>
        </div>

        {/* 4 Pillars Grid (Strict: 4 columns, never 3 in a row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {featuresData.map((feature, index) => (
            <div key={feature.id} className="flex">
              <FeatureCard feature={feature} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
