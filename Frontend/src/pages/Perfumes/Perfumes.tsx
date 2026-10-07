import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AllPerfumes from "../../components/modules/perfume/AllPerfumes";
import { SparkleIcon } from "../../components/common/Icons";

const Perfumes = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section
      className="min-h-screen bg-perf-bg pt-28 pb-20 overflow-x-hidden text-perf-text-main"
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-perf-gold">
            <SparkleIcon size={13} />
            The Maison Catalog
          </div>

          <h1 className="text-3xl sm:text-5xl font-light font-serif-luxury text-perf-text-main">
            The Flacon Collection
          </h1>

          <p className="text-xs sm:text-sm text-perf-text-muted leading-relaxed">
            Organized around personal identity and mood. Each composition is
            macerated to leave an unforgettable impression.
          </p>
        </div>

        <AllPerfumes />
      </div>
    </section>
  );
};

export default Perfumes;
