import { Link } from "react-router-dom";
import { HeartIcon, ArrowUpRightIcon, SparkleIcon } from "../common/Icons";

interface Perfume {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
  gender: string;
  price: number;
  shortDescription: string;
  mood?: string;
}

import { useWishlist } from "../../context/WishlistContext";

interface PerfumeCardProps {
  perfume: Perfume;
}

const PerfumeCard = ({ perfume }: PerfumeCardProps) => {
  const { _id, title, imageUrl, category, gender, price, shortDescription, mood } =
    perfume;
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(_id || (perfume as any).id);

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-perf-border/80 bg-perf-card p-4 transition-all duration-500 hover:border-perf-gold/70 hover:shadow-xl">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-perf-gold">
            <SparkleIcon size={11} />
            {mood ? `Mood: ${mood}` : category}
          </span>
          <span className="text-[10px] text-perf-border">|</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-perf-text-muted">
            {gender}
          </span>
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(perfume)}
          className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all cursor-pointer ${
            wishlisted
              ? "bg-perf-gold text-white border-perf-gold shadow-sm"
              : "bg-perf-input-bg border-perf-border text-perf-text-muted hover:text-perf-gold hover:border-perf-gold"
          }`}
          aria-label={wishlisted ? "Remove from Curation" : "Add to Curation"}
          title={wishlisted ? "Remove from Curation" : "Add to Curation"}
        >
          <HeartIcon size={14} filled={wishlisted} />
        </button>
      </div>

      {/* Center Flacon Visual Zone */}
      <Link
        to={`/perfumes/${_id}`}
        className="relative aspect-square w-full overflow-hidden rounded-xl bg-perf-input-bg block cursor-pointer"
      >
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Floating Quick View Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full bg-perf-gold px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-xl transition-all duration-300 hover:brightness-105 active:scale-95">
            <span>Inspect Scent</span>
            <ArrowUpRightIcon size={14} />
          </span>
        </div>
      </Link>

      {/* Bottom Information */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <Link
            to={`/perfumes/${_id}`}
            className="font-serif-luxury text-lg font-normal text-perf-text-main group-hover:text-perf-gold transition-colors line-clamp-1"
          >
            {title}
          </Link>
          <span className="text-base font-semibold text-perf-gold font-mono shrink-0">
            ${price}
          </span>
        </div>

        <p className="text-xs text-perf-text-muted leading-relaxed line-clamp-2">
          {shortDescription}
        </p>

        <div className="pt-2 flex items-center justify-between text-[11px] text-perf-text-muted/80 border-t border-perf-border/50">
          <span>{category}</span>
          <Link
            to={`/perfumes/${_id}`}
            className="text-perf-gold font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View Details</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PerfumeCard;
