import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CompassIcon } from "../../common/Icons";
import { ORVELLA_MOODS } from "../../../constants/orvellaData";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroCarousel: React.FC = () => {
  const [activeMoodIndex, setActiveMoodIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const activeMood = ORVELLA_MOODS[activeMoodIndex];

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-16 bg-perf-bg text-perf-text-main">
      {/* Background Editorial Canvas with Soft Warm Vignette */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <img
          src="/images/orvella-hero.jpg"
          alt="Orvella Haute Parfumerie Flacon"
          className="w-full h-full object-cover object-center opacity-30 dark:opacity-20 scale-105 transition-transform duration-10000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-perf-bg via-perf-bg/70 to-perf-bg/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Brand Vision & Editorial Typography */}
          <div className="lg:col-span-7 space-y-7 text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-6xl lg:text-7xl font-light font-serif-luxury leading-[1.08] text-perf-text-main tracking-tight"
            >
              A fragrance that <br />
              <span className="italic font-normal text-perf-gold font-serif-luxury">
                stays after you leave.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs sm:text-base text-perf-text-muted max-w-xl leading-relaxed font-light"
            >
              Handcrafted luxury fragrances sculpted around emotional mood and personal identity. Composed with rare Grasse absolutes, designed to feel intimate and leave a lasting impression.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link
                to="/all-perfumes"
                className="group relative overflow-hidden px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-perf-gold text-white text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] font-semibold transition-all duration-300 hover:shadow-lg hover:brightness-105 flex items-center justify-center gap-2 sm:gap-2.5 cursor-pointer w-full sm:w-auto"
              >
                <span>Explore The Flacons</span>
                <ArrowRightIcon
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1 shrink-0"
                />
              </Link>

              <a
                href="#moods"
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border border-perf-border bg-perf-card/90 hover:border-perf-gold text-perf-text-main text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] font-medium transition-all duration-300 backdrop-blur-sm cursor-pointer inline-flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <CompassIcon size={14} className="text-perf-gold shrink-0" />
                <span>Discover Moods</span>
              </a>
            </motion.div>

            {/* Subtle Provenance Badges (Clean luxury pills, no dividing line) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-perf-text-muted"
            >
              <span className="px-2.5 sm:px-3 py-1 rounded-md bg-perf-card/60 border border-perf-border/70 uppercase tracking-wider sm:tracking-widest text-[9px] sm:text-[10px] text-perf-gold font-medium">
                32% Pure Concentration
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-md bg-perf-card/60 border border-perf-border/70 uppercase tracking-wider sm:tracking-widest text-[9px] sm:text-[10px] text-perf-text-muted">
                Hand-Blown Crystal
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-md bg-perf-card/60 border border-perf-border/70 uppercase tracking-wider sm:tracking-widest text-[9px] sm:text-[10px] text-perf-text-muted">
                Maison Grasse Absolutes
              </span>
            </motion.div>
          </div>

          {/* Right Column: Interactive Mood Flacon Showcase */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative rounded-2xl sm:rounded-3xl border border-perf-border bg-perf-card p-4 sm:p-7 shadow-xl backdrop-blur-md overflow-hidden"
            >
              {/* Active Mood Image Presentation */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-perf-input-bg">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeMood.id}
                    src={activeMood.image}
                    alt={`Orvella ${activeMood.name}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Floating Tag */}
                <div className="absolute top-4 left-4 bg-perf-card/90 backdrop-blur-md border border-perf-border px-3.5 py-1 rounded-full">
                  <span className="text-[10px] font-display uppercase tracking-widest text-perf-gold font-semibold">
                    Mood: {activeMood.name}
                  </span>
                </div>

                <div className="absolute bottom-4 inset-x-4 bg-perf-card/90 backdrop-blur-md border border-perf-border p-3.5 rounded-xl space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-perf-gold font-semibold">
                    {activeMood.tagline}
                  </p>
                  <p className="text-xs text-perf-text-main font-serif-luxury italic line-clamp-1">
                    {activeMood.topNotes}
                  </p>
                </div>
              </div>

              {/* Mood Selector Tabs */}
              <div className="mt-4 sm:mt-5 pt-3 sm:pt-4">
                <p className="text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-perf-text-muted mb-2 sm:mb-2.5 font-medium">
                  Select An Olfactory Identity
                </p>
                <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
                  {ORVELLA_MOODS.map((mood, index) => {
                    const isSelected = activeMoodIndex === index;
                    return (
                      <button
                        key={mood.id}
                        type="button"
                        onClick={() => setActiveMoodIndex(index)}
                        className={`py-1.5 sm:py-2 px-0.5 sm:px-1 text-center rounded-lg text-[9px] sm:text-[11px] font-display uppercase tracking-tight sm:tracking-wider transition-all duration-300 cursor-pointer truncate ${
                          isSelected
                            ? "bg-perf-gold text-white font-bold shadow-sm"
                            : "bg-perf-input-bg text-perf-text-muted hover:text-perf-text-main hover:bg-perf-card border border-perf-border/50"
                        }`}
                        title={mood.name}
                      >
                        {mood.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
