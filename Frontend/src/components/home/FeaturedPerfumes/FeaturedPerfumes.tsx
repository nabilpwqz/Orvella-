import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPerfumes } from "../../../lib/api/perfume";
import { SparkleIcon, ArrowRightIcon } from "../../common/Icons";
import PerfumeCard from "../../shared/PerfumeCard";
import PerfumeCardSkeleton from "../../shared/PerfumeCardSkeleton";

export interface Perfume {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
  gender: string;
  price: number;
  shortDescription: string;
  scentNotes?: string;
  mood?: string;
}

const FeaturedPerfumes = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeaturedPerfumes = async () => {
      try {
        setLoading(true);
        const allPerfumes = await getPerfumes();
        // Display 4 or 8 featured flacons (4-column grid, NEVER 3 in a row!)
        setPerfumes(
          Array.isArray(allPerfumes?.data) ? allPerfumes.data.slice(0, 4) : [],
        );
      } catch (error) {
        console.error("Error fetching featured perfumes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPerfumes();
  }, []);

  return (
    <section className="py-20 bg-perf-bg text-perf-text-main">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-perf-border/70 pb-6">
          <div className="space-y-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-perf-gold">
              <SparkleIcon size={13} />
              The Private Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-light font-serif-luxury text-perf-text-main">
              Signature Flacons
            </h2>
            <p className="text-xs sm:text-sm text-perf-text-muted max-w-lg">
              Crafted in limited extraction runs using aged resins, rare florals, and
              distilled botanicals.
            </p>
          </div>

          <Link
            to="/all-perfumes"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-perf-gold hover:text-perf-text-main transition-colors group self-start sm:self-auto"
          >
            <span>Explore All Flacons</span>
            <ArrowRightIcon
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <PerfumeCardSkeleton key={index} />
            ))}
          </div>
        ) : perfumes.length === 0 ? (
          <div className="text-center py-16 bg-perf-card/40 rounded-3xl border border-perf-border/60">
            <p className="text-sm text-perf-text-muted">
              Current extraction batch is curing in cellar. Explore the full catalog.
            </p>
          </div>
        ) : (
          /* 4 Columns Product Grid (Never 3 in a row) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perfumes.map((perfume) => (
              <PerfumeCard key={perfume._id} perfume={perfume} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPerfumes;
