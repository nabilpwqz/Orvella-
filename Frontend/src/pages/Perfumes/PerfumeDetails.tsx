import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPerfumesById } from "../../lib/api/perfume";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  SparkleIcon,
  BagIcon,
  HeartIcon,
  ShieldIcon,
  DeliveryIcon,
  ReturnIcon,
  StarIcon,
  ChevronRightIcon,
  LoaderIcon,
  TagIcon,
  MinusIcon,
  PlusIcon,
  ClockIcon,
} from "../../components/common/Icons";

interface Perfume {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
  gender: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  scentNotes?: string;
  concentration?: string;
  maceration?: string;
  mood?: string;
}

import { useWishlist } from "../../context/WishlistContext";

const PerfumeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    if (!id) return;

    const loadPerfume = async () => {
      try {
        setLoading(true);
        const data = await getPerfumesById(id);
        setPerfume(data);
      } catch (error) {
        console.error("Error loading perfume details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPerfume();
  }, [id]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-perf-bg flex flex-col items-center justify-center gap-3 text-perf-text-main">
        <LoaderIcon size={32} className="text-perf-gold" />
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-perf-text-muted">
          Accessing Maison Vault...
        </p>
      </div>
    );
  }

  if (!perfume) {
    return (
      <div className="min-h-screen bg-perf-bg flex flex-col items-center justify-center p-4 text-center text-perf-text-main">
        <h2 className="text-3xl font-serif-luxury text-perf-text-main">
          Flacon Not Located
        </h2>
        <p className="text-xs text-perf-text-muted mt-2 mb-6">
          The requested fragrance could not be located in our private register.
        </p>
        <Link
          to="/all-perfumes"
          className="bg-perf-gold text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 transition"
        >
          Return to Collection
        </Link>
      </div>
    );
  }

  const {
    title,
    imageUrl,
    category,
    gender,
    price,
    shortDescription,
    fullDescription,
    scentNotes,
    concentration,
    maceration,
    mood,
  } = perfume;

  return (
    <section
      className="min-h-screen bg-perf-bg text-perf-text-main py-10 px-4 sm:px-6 lg:px-12 overflow-x-hidden mt-20"
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-perf-text-muted mb-8 uppercase tracking-widest font-medium">
          <Link to="/" className="hover:text-perf-gold transition">
            Maison
          </Link>
          <ChevronRightIcon size={12} />
          <Link to="/all-perfumes" className="hover:text-perf-gold transition">
            Collection
          </Link>
          <ChevronRightIcon size={12} />
          <span className="text-perf-gold line-clamp-1">{title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Flacon Visual Display */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-perf-border bg-perf-card shadow-2xl group">
              <img
                src={imageUrl}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                <span className="backdrop-blur-md bg-black/60 border border-white/10 text-perf-gold px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg flex items-center gap-1.5 font-display">
                  <SparkleIcon size={12} />
                  {mood ? `Mood: ${mood}` : category}
                </span>

                <button
                  type="button"
                  onClick={() => perfume && toggleWishlist(perfume)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md border border-white/10 transition-all shadow-lg cursor-pointer active:scale-90 ${
                    perfume && isWishlisted(perfume._id || (perfume as any).id)
                      ? "bg-perf-gold text-white border-perf-gold"
                      : "bg-black/60 text-white/80 hover:text-perf-gold"
                  }`}
                  aria-label="Wishlist"
                  title="Toggle Private Curation"
                >
                  <HeartIcon size={16} filled={Boolean(perfume && isWishlisted(perfume._id || (perfume as any).id))} />
                </button>
              </div>

              <div className="absolute bottom-4 left-4">
                <span className="bg-perf-card/90 backdrop-blur-md text-perf-text-muted text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-lg border border-perf-border/60">
                  Identity: {gender}
                </span>
              </div>
            </div>
          </div>

          {/* Flacon Olfactory Specification & Purchase */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-perf-gold">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size={13} filled={true} />
                  ))}
                </div>
                <span className="text-[11px] text-perf-text-muted font-medium tracking-wide">
                  5.0 (64 Verified Patron Impressions)
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif-luxury text-perf-text-main leading-tight">
                {title}
              </h1>

              <p className="mt-2 text-sm text-perf-gold font-serif-luxury italic">
                "{shortDescription}"
              </p>
            </div>

            {/* Price & Stock Assurance */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-4 py-3.5 sm:py-4 border-y border-perf-border/70">
              <span className="text-2xl sm:text-4xl font-semibold font-mono text-perf-gold">
                ${(price * quantity).toFixed(2)}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wide sm:tracking-wider text-perf-text-muted border border-perf-border px-2.5 sm:px-3 py-1 rounded-full bg-perf-input-bg">
                Cellar Bottled &amp; Ready for Allocation
              </span>
            </div>

            {/* Scent Accord Profile */}
            {scentNotes && (
              <div className="bg-perf-card border border-perf-border rounded-2xl p-3.5 sm:p-4 space-y-1.5 shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-widest text-perf-gold flex items-center gap-1.5">
                  <TagIcon size={13} /> Olfactory Notes &amp; Key Accords
                </span>
                <p className="text-xs text-perf-text-main leading-relaxed font-serif-luxury text-base">
                  {scentNotes}
                </p>
              </div>
            )}

            {/* Overview / Story */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-perf-text-muted">
                The Olfactory Composition
              </h3>
              <p className="text-xs sm:text-sm text-perf-text-muted leading-relaxed whitespace-pre-line">
                {fullDescription}
              </p>
            </div>

            {/* Technical Specifications */}
            <div className="grid grid-cols-2 gap-4 text-xs border-y border-perf-border/70 py-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-perf-text-muted block">
                  Concentration Tier
                </span>
                <span className="font-semibold text-perf-text-main">
                  {concentration || category}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-perf-text-muted block">
                  Maturation Process
                </span>
                <span className="font-semibold text-perf-text-main">
                  {maceration || "12-Week Cold Maceration"}
                </span>
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center justify-between border border-perf-border rounded-xl bg-perf-input-bg p-1.5 w-full sm:w-36">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-perf-card text-perf-text-main transition active:scale-95 cursor-pointer"
                  >
                    <MinusIcon size={14} />
                  </button>
                  <span className="font-bold text-sm px-2 font-mono">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-perf-card text-perf-text-main transition active:scale-95 cursor-pointer"
                  >
                    <PlusIcon size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-perf-gold hover:opacity-90 text-white font-semibold py-3.5 px-4 sm:px-6 rounded-xl transition duration-300 shadow-md cursor-pointer text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.2em]"
                >
                  <BagIcon size={16} className="shrink-0" />
                  <span>
                    {addedToCart
                      ? "Acquisition Recorded"
                      : `Acquire Flacon · $${(price * quantity).toFixed(2)}`}
                  </span>
                </button>
              </div>
            </div>

            {/* 4 Pillars of Assurance (Strict: Never 3 in a row!) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-perf-border/70">
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-perf-card border border-perf-border/60 space-y-1">
                <ShieldIcon size={18} className="text-perf-gold" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-perf-text-main">
                  Grasse Origin
                </span>
                <span className="text-[9px] text-perf-text-muted">
                  Direct From Maison
                </span>
              </div>

              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-perf-card border border-perf-border/60 space-y-1">
                <DeliveryIcon size={18} className="text-perf-gold" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-perf-text-main">
                  Insured Transit
                </span>
                <span className="text-[9px] text-perf-text-muted">
                  White Glove Carrier
                </span>
              </div>

              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-perf-card border border-perf-border/60 space-y-1">
                <ReturnIcon size={18} className="text-perf-gold" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-perf-text-main">
                  Sample Pairing
                </span>
                <span className="text-[9px] text-perf-text-muted">
                  Test Before Unsealing
                </span>
              </div>

              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-perf-card border border-perf-border/60 space-y-1">
                <ClockIcon size={18} className="text-perf-gold" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-perf-text-main">
                  Cellar Aged
                </span>
                <span className="text-[9px] text-perf-text-muted">
                  Optimal Equilibrium
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfumeDetails;
