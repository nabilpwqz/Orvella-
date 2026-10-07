import { StarIcon } from "../../common/Icons";
import type { Testimonial } from "./testimonialsData";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="relative flex flex-col justify-between rounded-2xl border border-perf-border/80 bg-perf-card p-8 shadow-sm transition-all duration-300 hover:border-perf-gold/60 w-full h-full">
      <div className="space-y-4">
        {/* Subtle 5-star aura */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 text-perf-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} size={13} filled={true} />
            ))}
          </div>
          <span className="text-[10px] uppercase font-display tracking-widest text-perf-gold font-semibold">
            {testimonial.fragrance}
          </span>
        </div>

        {/* Critique Quote */}
        <p className="text-sm leading-relaxed text-perf-text-main font-serif-luxury italic text-base">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Patron Footer */}
      <div className="mt-6 pt-5 border-t border-perf-border/50 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-perf-text-main">
            {testimonial.name}
          </h4>
          <span className="text-[11px] text-perf-text-muted">
            {testimonial.role} · {testimonial.city}
          </span>
        </div>

        <span className="text-[10px] uppercase tracking-wider text-perf-text-muted font-mono">
          {testimonial.year}
        </span>
      </div>
    </div>
  );
};

export default TestimonialCard;
