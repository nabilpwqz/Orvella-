import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import { testimonialsData } from "./testimonialsData";
import { SparkleIcon } from "../../common/Icons";

const Testimonials = () => {
  return (
    <section className="py-24 bg-perf-bg text-perf-text-main">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center max-w-2xl mx-auto space-y-2"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-perf-gold">
            <SparkleIcon size={13} />
            Patron Impressions
          </div>

          <h2 className="text-3xl sm:text-4xl font-light font-serif-luxury text-perf-text-main">
            Words That Linger
          </h2>

          <p className="text-xs sm:text-sm text-perf-text-muted leading-relaxed">
            Reflections from patrons who have made Orvella part of their everyday
            presence and memorable occasions.
          </p>
        </motion.div>

        {/* 2-Column Luxury Layout (Strict: Never 3 cards in a row!) */}
        <div className="grid gap-6 md:grid-cols-2">
          {testimonialsData.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
