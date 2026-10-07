import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ORVELLA_MOODS, type MoodProfile } from "../../../constants/orvellaData";
import { ArrowUpRightIcon, SparkleIcon, TagIcon } from "../../common/Icons";

const ShopCollections = () => {
  const [selectedMood, setSelectedMood] = useState<MoodProfile>(ORVELLA_MOODS[0]);

  return (
    <section id="moods" className="py-24 bg-perf-bg text-perf-text-main">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-perf-gold">
            <SparkleIcon size={14} />
            <span>Identity &amp; Emotional Atmosphere</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-light font-serif-luxury text-perf-text-main leading-tight">
            Curated by Mood. <br />
            <span className="italic font-normal text-perf-gold font-serif-luxury">
              Defined by presence.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-perf-text-muted leading-relaxed max-w-xl">
            At Orvella, we abandon conventional gender constraints. Each flacon
            is composed around personal identity and emotional aura.
          </p>
        </div>

        {/* 5-Mood Navigation Pills (No 3-card grid!) */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 pb-4 sm:pb-6 mb-6 sm:mb-10">
          {ORVELLA_MOODS.map((mood) => {
            const isActive = selectedMood.id === mood.id;
            return (
              <button
                key={mood.id}
                type="button"
                onClick={() => setSelectedMood(mood)}
                className={`py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-[11px] sm:text-xs font-display tracking-[0.12em] sm:tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-perf-gold text-white font-bold shadow-md"
                    : "bg-perf-card border border-perf-border text-perf-text-muted hover:text-perf-text-main hover:border-perf-gold/60"
                }`}
              >
                <span>{mood.name}</span>
                <span className="text-[10px] opacity-70 ml-1.5 sm:ml-2 hidden sm:inline font-sans">
                  · {mood.identity}
                </span>
              </button>
            );
          })}
        </div>

        {/* Asymmetrical 2-Column Luxury Mood Inspection Spread */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMood.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-perf-card rounded-2xl sm:rounded-3xl p-4 sm:p-10 lg:p-12 border border-perf-border shadow-sm"
          >
            {/* Left: Editorial Image of the Flacon */}
            <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl bg-perf-input-bg aspect-[4/5] shadow-lg">
              <img
                src={selectedMood.image}
                alt={`Orvella ${selectedMood.name}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-perf-card/90 backdrop-blur-md border border-perf-border px-4 py-1.5 rounded-full">
                <span className="text-[10px] uppercase font-display tracking-widest text-perf-gold font-semibold">
                  {selectedMood.intensity}
                </span>
              </div>
            </div>

            {/* Right: Olfactory Breakdown & Maison Rationale */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] font-medium text-perf-gold">
                  {selectedMood.frenchTitle}
                </span>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-perf-text-main">
                  Orvella {selectedMood.name}
                </h3>

                <p className="text-base text-perf-gold font-serif-luxury italic">
                  "{selectedMood.tagline}"
                </p>
              </div>

              <p className="text-sm sm:text-base text-perf-text-muted leading-relaxed">
                {selectedMood.description}
              </p>

              {/* Olfactive Pyramid Breakdown */}
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-perf-input-bg border border-perf-border/80 space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-perf-gold font-semibold flex items-center gap-1.5">
                    <TagIcon size={13} /> Head Notes
                  </span>
                  <p className="text-xs text-perf-text-main font-serif-luxury text-base">
                    {selectedMood.topNotes}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-perf-input-bg border border-perf-border/80 space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-perf-gold font-semibold flex items-center gap-1.5">
                    <TagIcon size={13} /> Heart &amp; Soul Accord
                  </span>
                  <p className="text-xs text-perf-text-main font-serif-luxury text-base">
                    {selectedMood.heartNotes}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-perf-input-bg border border-perf-border/80 space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-perf-gold font-semibold flex items-center gap-1.5">
                    <TagIcon size={13} /> Foundation &amp; Sillage
                  </span>
                  <p className="text-xs text-perf-text-main font-serif-luxury text-base">
                    {selectedMood.baseNotes}
                  </p>
                </div>
              </div>

              {/* Sillage & Moment Meta */}
              <div className="grid grid-cols-2 gap-4 pt-2 text-xs border-t border-perf-border/60">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-perf-text-muted block">
                    Ideal Resonance
                  </span>
                  <span className="font-semibold text-perf-text-main">
                    {selectedMood.idealMoment}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-perf-text-muted block">
                    Projection Aura
                  </span>
                  <span className="font-semibold text-perf-text-main">
                    {selectedMood.sillage}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/all-perfumes"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-perf-gold text-white text-xs uppercase tracking-[0.22em] font-semibold hover:opacity-90 transition-all duration-300 shadow-sm"
                >
                  <span>Acquire {selectedMood.name}</span>
                  <ArrowUpRightIcon size={15} />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ShopCollections;
