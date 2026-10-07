import React from "react";
import { SparkleIcon, ClockIcon, MapPinIcon, ShieldIcon } from "../common/Icons";

const ContactInfo: React.FC = () => {
  return (
    <section className="bg-perf-bg py-16 border-b border-perf-border/70 text-perf-text-main">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* 4 Atelier Pillars Grid (Never 3 in a row!) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Private Fragrance Consultation */}
          <div className="rounded-2xl border border-perf-border/80 bg-perf-card p-7 relative overflow-hidden group hover:border-perf-gold/60 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="h-10 w-10 rounded-xl bg-perf-input-bg border border-perf-border/60 flex items-center justify-center text-perf-gold mb-5 group-hover:bg-perf-gold group-hover:text-white transition-colors duration-300">
                <SparkleIcon size={18} />
              </div>
              <h3 className="text-base font-normal font-serif-luxury text-perf-text-main">
                Private Consultation
              </h3>
              <p className="mt-2 text-xs text-perf-text-muted leading-relaxed">
                Reserve an appointment with our in-house sommelier to uncover your
                bespoke mood accord.
              </p>
            </div>
            <p className="mt-5 text-xs font-semibold text-perf-gold pt-3 border-t border-perf-border/40 font-mono">
              atelier@orvella.com
            </p>
          </div>

          {/* Card 2: New York Flagship */}
          <div className="rounded-2xl border border-perf-border/80 bg-perf-card p-7 relative overflow-hidden group hover:border-perf-gold/60 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="h-10 w-10 rounded-xl bg-perf-input-bg border border-perf-border/60 flex items-center justify-center text-perf-gold mb-5 group-hover:bg-perf-gold group-hover:text-white transition-colors duration-300">
                <MapPinIcon size={18} />
              </div>
              <h3 className="text-base font-normal font-serif-luxury text-perf-text-main">
                New York Flagship
              </h3>
              <p className="mt-2 text-xs text-perf-text-muted leading-relaxed">
                440 Madison Avenue, Suite 14, New York. Visit our scent gallery
                to sample rare macerations.
              </p>
            </div>
            <p className="mt-5 text-xs font-semibold text-perf-gold pt-3 border-t border-perf-border/40 font-mono">
              +1 (800) 492-7835
            </p>
          </div>

          {/* Card 3: Paris Atelier */}
          <div className="rounded-2xl border border-perf-border/80 bg-perf-card p-7 relative overflow-hidden group hover:border-perf-gold/60 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="h-10 w-10 rounded-xl bg-perf-input-bg border border-perf-border/60 flex items-center justify-center text-perf-gold mb-5 group-hover:bg-perf-gold group-hover:text-white transition-colors duration-300">
                <MapPinIcon size={18} />
              </div>
              <h3 className="text-base font-normal font-serif-luxury text-perf-text-main">
                Paris Salon
              </h3>
              <p className="mt-2 text-xs text-perf-text-muted leading-relaxed">
                12 Place Vendôme, 75001 Paris, France. Private archives and
                limited vintage library.
              </p>
            </div>
            <p className="mt-5 text-xs font-semibold text-perf-gold pt-3 border-t border-perf-border/40 font-mono">
              paris@orvella.com
            </p>
          </div>

          {/* Card 4: Concierge & Allocations */}
          <div className="rounded-2xl border border-perf-border/80 bg-perf-card p-7 relative overflow-hidden group hover:border-perf-gold/60 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="h-10 w-10 rounded-xl bg-perf-input-bg border border-perf-border/60 flex items-center justify-center text-perf-gold mb-5 group-hover:bg-perf-gold group-hover:text-white transition-colors duration-300">
                <ShieldIcon size={18} />
              </div>
              <h3 className="text-base font-normal font-serif-luxury text-perf-text-main">
                Client Concierge
              </h3>
              <p className="mt-2 text-xs text-perf-text-muted leading-relaxed">
                Inquiries regarding batch numbers, dispatch tracking, or private
                reserve commissions.
              </p>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-xs text-perf-gold pt-3 border-t border-perf-border/40 font-mono">
              <ClockIcon size={13} />
              <span>Mon - Sat: 09:00 - 18:00 EST</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
