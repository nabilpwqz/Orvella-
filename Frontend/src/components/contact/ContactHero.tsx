import React from "react";
import { SparkleIcon, CompassIcon } from "../common/Icons";

const ContactHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-perf-border/70 bg-perf-bg py-28 text-perf-text-main">
      <div className="relative mx-auto max-w-5xl px-6 text-center space-y-4">
        <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-perf-gold bg-perf-card border border-perf-gold/30 px-4 py-1.5 rounded-full backdrop-blur-md">
          <SparkleIcon size={13} />
          <span>Haute Parfumerie Atelier</span>
        </span>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-light text-perf-text-main tracking-tight leading-tight">
          Private Consultations &amp; Atelier Services
        </h1>

        <p className="mx-auto max-w-xl text-xs sm:text-sm text-perf-text-muted leading-relaxed font-light">
          Whether seeking a signature personal scent profile, private collection
          allocation, or flagship appointment: our Master Sommelier and Concierge
          are at your service.
        </p>

        <div className="pt-4 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] text-perf-text-muted font-display uppercase tracking-wider sm:tracking-widest">
          <span className="flex items-center gap-1.5">
            <CompassIcon size={14} className="text-perf-gold" /> Paris Atelier
          </span>
          <span className="text-perf-gold hidden xs:inline">·</span>
          <span>New York Flagship</span>
          <span className="text-perf-gold hidden xs:inline">·</span>
          <span>Private Salon</span>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
