import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  SparkleIcon,
  ArrowRightIcon,
  TrashIcon,
  DeliveryIcon,
  ShieldIcon,
  BagIcon,
  SearchIcon,
  CheckIcon,
  ShareIcon,
  GridIcon,
  ListIcon,
  CloseIcon,
} from "../../../components/common/Icons";
import { useWishlist } from "../../../context/WishlistContext";
import { getUserSession } from "../../../lib/core/session";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const Wishlist: React.FC = () => {
  const { wishlist, wishlistCount, totalValue, removeFromWishlist, clearWishlist } =
    useWishlist();
  const { user } = getUserSession();

  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "accords">("grid");
  const [addedItems, setAddedItems] = useState<{ [id: string]: boolean }>({});
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [packagingChoice, setPackagingChoice] = useState<"atelier_box" | "pouch">("atelier_box");
  const [reservationConfirmed, setReservationConfirmed] = useState<string | null>(null);

  // Filter items by category/mood and note/title search query
  const filteredItems = wishlist.filter((item) => {
    const mood = ((item as any).mood || "").toLowerCase();
    const cat = (item.category || "").toLowerCase();
    const title = (item.title || "").toLowerCase();
    const notes = ((item as any).notes || item.shortDescription || "").toLowerCase();
    const filter = selectedFilter.toLowerCase();

    const matchesFilter =
      filter === "all" || mood.includes(filter) || cat.includes(filter);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q || title.includes(q) || notes.includes(q) || mood.includes(q);

    return matchesFilter && matchesSearch;
  });

  const handleQuickAddToBag = (id: string, title: string) => {
    setAddedItems((prev) => ({ ...prev, [id]: true }));
    toast.success(`Reserved 1x ${title} for Atelier dispatch`, {
      icon: false,
    });
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [id]: false }));
    }, 2500);
  };

  const handleShareArchive = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Private archive link copied to clipboard", {
        icon: false,
      });
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const reservationCode = `ORV-${Math.floor(100000 + Math.random() * 900000)}-PARIS`;
    setReservationConfirmed(reservationCode);
    toast.success(`Private reservation ${reservationCode} confirmed with Maison Orvella`, {
      icon: false,
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8 space-y-10 text-perf-text-main animate-fadeIn">
      {/* 1. Guest Synchronize Banner (Visible if patron is not logged in) */}
      {!user && (
        <div className="rounded-2xl border border-perf-gold/30 bg-perf-gold/5 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-perf-gold/15 flex items-center justify-center text-perf-gold flex-shrink-0">
              <SparkleIcon size={16} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-perf-gold">
                Guest Patron Mode
              </p>
              <p className="text-xs text-perf-text-muted mt-0.5">
                Your private curation is saved locally on this device. Sign in to synchronize your bespoke archive across all your ateliers.
              </p>
            </div>
          </div>
          <Link
            to="/auth/signin"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-perf-gold px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <span>Sign In to Sync</span>
            <ArrowRightIcon size={13} />
          </Link>
        </div>
      )}

      {/* 2. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-perf-border bg-perf-card/90 p-6 sm:p-10 backdrop-blur-xl shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-perf-gold/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-perf-gold border border-perf-gold/20">
              <SparkleIcon size={12} /> Private Olfactory Archive
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif-luxury text-perf-text-main">
              Your Curated Flacons
            </h1>
            <p className="text-xs sm:text-sm text-perf-text-muted leading-relaxed font-light">
              Your intimate selection of Orvella signature creations. Review reserved scent profiles, compare olfactory pyramids, and arrange private concierge dispatch.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {wishlistCount > 0 && (
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-perf-gold px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition duration-300 hover:opacity-90 active:scale-95 cursor-pointer"
              >
                <BagIcon size={15} />
                <span>Acquire Collection</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShareArchive}
              className="inline-flex items-center gap-2 rounded-xl border border-perf-border bg-perf-input-bg px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-perf-text-muted hover:text-perf-text-main hover:border-perf-gold/50 transition duration-300 cursor-pointer"
              title="Copy shareable archive link"
            >
              <ShareIcon size={14} />
              <span>Share Archive</span>
            </button>

            {wishlistCount > 0 && (
              <button
                type="button"
                onClick={clearWishlist}
                className="inline-flex items-center gap-2 rounded-xl border border-perf-border bg-perf-input-bg px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-perf-text-muted hover:text-red-500 hover:border-red-500/40 transition duration-300 cursor-pointer"
                title="Clear all saved flacons"
              >
                <TrashIcon size={14} />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Curation Metrics (4 Columns, strictly avoiding 3-in-a-row) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="rounded-2xl border border-perf-border/70 bg-perf-card/50 p-5 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-perf-text-muted font-semibold">
              Archived Flacons
            </span>
            <div className="h-8 w-8 rounded-lg bg-perf-gold/10 flex items-center justify-center text-perf-gold">
              <HeartIcon size={16} filled />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-serif-luxury text-perf-text-main">
            {wishlistCount.toString().padStart(2, "0")} <span className="text-xs font-normal text-perf-text-muted font-sans uppercase tracking-wider">Pieces</span>
          </p>
        </div>

        <div className="rounded-2xl border border-perf-border/70 bg-perf-card/50 p-5 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-perf-text-muted font-semibold">
              Archive Valuation
            </span>
            <div className="h-8 w-8 rounded-lg bg-perf-gold/10 flex items-center justify-center text-perf-gold">
              <BagIcon size={16} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold font-serif-luxury text-perf-gold">
            ${totalValue.toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl border border-perf-border/70 bg-perf-card/50 p-5 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-perf-text-muted font-semibold">
              Maison Dispatch
            </span>
            <div className="h-8 w-8 rounded-lg bg-perf-gold/10 flex items-center justify-center text-perf-gold">
              <DeliveryIcon size={16} />
            </div>
          </div>
          <p className="text-sm font-semibold text-perf-text-main pt-1">
            White Glove Courier
          </p>
          <p className="text-[10px] text-perf-text-muted">
            Complimentary insurance &amp; tracking
          </p>
        </div>

        <div className="rounded-2xl border border-perf-border/70 bg-perf-card/50 p-5 backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-perf-text-muted font-semibold">
              Patron Allocation
            </span>
            <div className="h-8 w-8 rounded-lg bg-perf-gold/10 flex items-center justify-center text-perf-gold">
              <ShieldIcon size={16} />
            </div>
          </div>
          <p className="text-sm font-semibold text-perf-gold pt-1">
            + 2 Discovery Vials
          </p>
          <p className="text-[10px] text-perf-text-muted">
            Included with every acquisition
          </p>
        </div>
      </div>

      {/* 4. Controls Bar: Search, Mood Filter, & Accord/Grid View Switcher */}
      {wishlistCount > 0 && (
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-perf-border/60 pb-5">
          {/* Mood Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {["all", "Velour", "Noir", "Élan", "Aurea", "Nuit"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedFilter(tag)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                  selectedFilter.toLowerCase() === tag.toLowerCase()
                    ? "bg-perf-gold text-white shadow-xs"
                    : "bg-perf-card border border-perf-border text-perf-text-muted hover:text-perf-text-main hover:border-perf-gold/50"
                }`}
              >
                {tag === "all" ? "All Flacons" : tag}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Note/Title Search Input */}
            <div className="relative flex-1 sm:w-60">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-perf-text-muted">
                <SearchIcon size={14} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes or title..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-perf-input-bg border border-perf-border text-perf-text-main placeholder:text-perf-text-muted focus:outline-none focus:border-perf-gold transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-2.5 flex items-center text-perf-text-muted hover:text-perf-text-main"
                >
                  <CloseIcon size={12} />
                </button>
              )}
            </div>

            {/* View Mode Toggle: Grid vs Accords */}
            <div className="inline-flex rounded-xl border border-perf-border bg-perf-input-bg p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-perf-card text-perf-gold shadow-xs"
                    : "text-perf-text-muted hover:text-perf-text-main"
                }`}
                title="Flacon Showcase Grid"
              >
                <GridIcon size={15} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("accords")}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  viewMode === "accords"
                    ? "bg-perf-card text-perf-gold shadow-xs"
                    : "text-perf-text-muted hover:text-perf-text-main"
                }`}
                title="Detailed Olfactory Accords"
              >
                <ListIcon size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Wishlist Content Section */}
      {wishlist.length === 0 ? (
        /* Empty State */
        <div className="rounded-3xl border border-perf-border/70 bg-perf-card/40 p-12 sm:p-20 text-center space-y-6 max-w-2xl mx-auto backdrop-blur-md">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-perf-gold/10 border border-perf-gold/30 flex items-center justify-center text-perf-gold">
            <HeartIcon size={28} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-light font-serif-luxury text-perf-text-main">
              Your Private Archive is Empty
            </h2>
            <p className="text-xs sm:text-sm text-perf-text-muted max-w-md mx-auto leading-relaxed">
              Explore the Orvella olfactory catalogue and tap the heart icon on any flacon to reserve it in your personal curation.
            </p>
          </div>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              to="/all-perfumes"
              className="inline-flex items-center gap-2 rounded-xl bg-perf-gold px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-md hover:opacity-90 transition duration-300"
            >
              <span>Explore Olfactory Catalog</span>
              <ArrowRightIcon size={14} />
            </Link>
          </div>
        </div>
      ) : filteredItems.length === 0 ? (
        /* No Match State */
        <div className="rounded-2xl border border-perf-border bg-perf-card/30 p-12 text-center space-y-3">
          <p className="text-sm font-semibold text-perf-text-main">
            No archived flacons match "{searchQuery}" in {selectedFilter}
          </p>
          <p className="text-xs text-perf-text-muted">
            Try resetting your note query or selecting a different identity aura.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedFilter("all");
              setSearchQuery("");
            }}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-perf-input-bg border border-perf-border text-xs uppercase tracking-wider text-perf-gold font-semibold hover:border-perf-gold/60"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* 4-Column Luxury Flacon Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => {
              const id = item._id || (item as any).id;
              const moodName = (item as any).mood || "Signature";
              const concentration = (item as any).concentration || "Extrait de Parfum";
              const notes = (item as any).notes || item.shortDescription || "Rare botanicals, amber accords";
              const isAdded = Boolean(addedItems[id]);

              return (
                <motion.div
                  key={id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-perf-border/80 bg-perf-card p-4 transition-all duration-500 hover:border-perf-gold/60 hover:shadow-xl"
                >
                  <div>
                    {/* Image Frame */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-perf-input-bg mb-4">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Mood Badge */}
                      <div className="absolute top-3 left-3 bg-perf-card/90 backdrop-blur-md border border-perf-border px-3 py-1 rounded-full">
                        <span className="text-[10px] uppercase font-display tracking-widest text-perf-gold font-semibold">
                          {moodName}
                        </span>
                      </div>

                      {/* Remove from Wishlist Button */}
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(id)}
                        className="absolute top-3 right-3 h-8 w-8 rounded-full bg-perf-card/90 backdrop-blur-md border border-perf-border flex items-center justify-center text-perf-gold hover:text-red-500 hover:border-red-500/40 transition-colors shadow-sm cursor-pointer"
                        aria-label="Remove from Curation"
                        title="Remove from Curation"
                      >
                        <HeartIcon size={14} filled />
                      </button>

                      {/* Subtle Bottom Vial Perk */}
                      <div className="absolute bottom-2 inset-x-2 bg-perf-card/90 backdrop-blur-md border border-perf-border/70 rounded-lg px-2.5 py-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[9px] uppercase tracking-wider text-perf-gold font-medium">
                          + 2ml Extrait Vial Included
                        </span>
                      </div>
                    </div>

                    {/* Flacon Meta */}
                    <div className="space-y-1.5 px-1">
                      <span className="text-[10px] uppercase tracking-wider text-perf-gold font-semibold block">
                        {concentration}
                      </span>
                      <h3 className="text-base font-bold font-serif-luxury text-perf-text-main line-clamp-1 group-hover:text-perf-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-perf-text-muted line-clamp-2 leading-relaxed font-light">
                        {notes}
                      </p>
                    </div>
                  </div>

                  {/* Price and Acquire Actions */}
                  <div className="mt-5 pt-3 border-t border-perf-border/60 flex items-center justify-between gap-2 px-1">
                    <div>
                      <span className="text-[9px] text-perf-text-muted uppercase tracking-wider block">
                        Maison Price
                      </span>
                      <span className="text-base font-bold font-mono text-perf-text-main">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleQuickAddToBag(id, item.title)}
                        className={`h-9 px-3 rounded-xl border text-xs uppercase font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                          isAdded
                            ? "bg-green-700/20 border-green-600/50 text-green-400"
                            : "border-perf-border bg-perf-input-bg text-perf-text-muted hover:text-perf-gold hover:border-perf-gold/60"
                        }`}
                        title="Quick Reserve Flacon"
                      >
                        {isAdded ? (
                          <>
                            <CheckIcon size={13} />
                            <span className="hidden sm:inline text-[10px]">Reserved</span>
                          </>
                        ) : (
                          <>
                            <BagIcon size={13} />
                            <span className="hidden sm:inline text-[10px]">Bag</span>
                          </>
                        )}
                      </button>

                      <Link
                        to={`/perfumes/${id}`}
                        className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-perf-gold text-white text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
                      >
                        <span>Details</span>
                        <ArrowRightIcon size={11} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        /* Detailed Olfactory Accord Spread (List View) */
        <div className="space-y-4">
          <AnimatePresence>
            {filteredItems.map((item) => {
              const id = item._id || (item as any).id;
              const moodName = (item as any).mood || "Velour";
              const concentration = (item as any).concentration || "Extrait de Parfum";
              const notes = (item as any).notes || item.shortDescription || "Rare botanicals, amber accords";
              const isAdded = Boolean(addedItems[id]);

              return (
                <motion.div
                  key={id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl border border-perf-border/80 bg-perf-card p-5 sm:p-6 transition-all duration-300 hover:border-perf-gold/60 hover:shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-5 w-full lg:w-auto">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl object-cover bg-perf-input-bg border border-perf-border flex-shrink-0"
                    />
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-display tracking-widest text-perf-gold font-semibold bg-perf-gold/10 px-2.5 py-0.5 rounded-full border border-perf-gold/20">
                          {moodName}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-perf-text-muted">
                          {concentration}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold font-serif-luxury text-perf-text-main">
                        {item.title}
                      </h3>
                      <p className="text-xs text-perf-text-muted max-w-xl line-clamp-2 leading-relaxed">
                        {notes}
                      </p>
                    </div>
                  </div>

                  {/* Accords Meta */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs border-t lg:border-t-0 border-perf-border/60 pt-4 lg:pt-0 w-full lg:w-auto justify-between lg:justify-end">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-perf-text-muted block">
                        Longevity Aura
                      </span>
                      <span className="font-semibold text-perf-gold">
                        10 - 14 Hours
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-perf-text-muted block">
                        Complimentary
                      </span>
                      <span className="font-semibold text-perf-text-main">
                        2ml Sample Duo
                      </span>
                    </div>

                    <div className="space-y-1 text-right">
                      <span className="text-[10px] uppercase tracking-wider text-perf-text-muted block">
                        Price
                      </span>
                      <span className="text-lg font-bold font-mono text-perf-text-main">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickAddToBag(id, item.title)}
                        className={`px-4 py-2.5 rounded-xl border text-xs uppercase font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                          isAdded
                            ? "bg-green-700/20 border-green-600/50 text-green-400"
                            : "border-perf-border bg-perf-input-bg text-perf-text-muted hover:text-perf-gold hover:border-perf-gold/60"
                        }`}
                      >
                        {isAdded ? <CheckIcon size={14} /> : <BagIcon size={14} />}
                        <span>{isAdded ? "Reserved" : "Reserve"}</span>
                      </button>

                      <Link
                        to={`/perfumes/${id}`}
                        className="px-4 py-2.5 rounded-xl bg-perf-gold text-white text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity shadow-xs"
                      >
                        Acquire
                      </Link>

                      <button
                        type="button"
                        onClick={() => removeFromWishlist(id)}
                        className="h-10 w-10 rounded-xl border border-perf-border bg-perf-input-bg flex items-center justify-center text-perf-text-muted hover:text-red-500 hover:border-red-500/40 transition-colors cursor-pointer"
                        title="Remove from archive"
                      >
                        <TrashIcon size={15} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* 6. Private Atelier Acquisition & Reservation Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCheckoutOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-3xl border border-perf-border bg-perf-card p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-perf-border/70 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-perf-gold flex items-center gap-1.5">
                    <SparkleIcon size={12} /> Maison Concierge Dispatch
                  </span>
                  <h3 className="text-2xl font-serif-luxury font-light text-perf-text-main">
                    Acquire Curated Collection
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="h-9 w-9 rounded-xl border border-perf-border bg-perf-input-bg flex items-center justify-center text-perf-text-muted hover:text-perf-text-main transition-colors cursor-pointer"
                >
                  <CloseIcon size={16} />
                </button>
              </div>

              {reservationConfirmed ? (
                /* Confirmed State */
                <div className="text-center py-8 space-y-5">
                  <div className="h-16 w-16 mx-auto rounded-full bg-perf-gold/15 border border-perf-gold/40 flex items-center justify-center text-perf-gold">
                    <CheckIcon size={28} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-serif-luxury text-perf-text-main">
                      Reservation Registered
                    </h4>
                    <p className="text-xs text-perf-text-muted max-w-md mx-auto leading-relaxed">
                      Your curated flacons have been reserved under dossier code:
                    </p>
                    <div className="inline-block px-5 py-2 rounded-xl bg-perf-input-bg border border-perf-gold/40 font-mono text-sm font-bold text-perf-gold tracking-wider">
                      {reservationConfirmed}
                    </div>
                  </div>
                  <p className="text-[11px] text-perf-text-muted max-w-sm mx-auto">
                    An Orvella master perfumer representative will arrange dispatch verification with white-glove transport.
                  </p>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setReservationConfirmed(null);
                        setIsCheckoutOpen(false);
                      }}
                      className="px-7 py-3 rounded-xl bg-perf-gold text-white text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity"
                    >
                      Return to Maison
                    </button>
                  </div>
                </div>
              ) : (
                /* Checkout Form & Order Summary */
                <form onSubmit={handleConfirmReservation} className="space-y-6">
                  {/* Flacon List Summary */}
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-perf-text-muted block">
                      Archived Flacons ({wishlistCount})
                    </span>
                    <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
                      {wishlist.map((item) => {
                        const id = item._id || (item as any).id;
                        return (
                          <div
                            key={id}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-perf-input-bg border border-perf-border text-xs"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-semibold text-perf-text-main">{item.title}</p>
                                <p className="text-[10px] text-perf-gold">
                                  {(item as any).mood || "Signature"} Extrait
                                </p>
                              </div>
                            </div>
                            <span className="font-mono font-semibold text-perf-text-main">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Packaging Options */}
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-perf-text-muted block">
                      Presentation &amp; Packaging
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        onClick={() => setPackagingChoice("atelier_box")}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-300 ${
                          packagingChoice === "atelier_box"
                            ? "bg-perf-gold/10 border-perf-gold text-perf-text-main"
                            : "bg-perf-input-bg border-perf-border text-perf-text-muted"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">Atelier Box with Wax Seal</span>
                          {packagingChoice === "atelier_box" && (
                            <CheckIcon size={14} className="text-perf-gold" />
                          )}
                        </div>
                        <p className="text-[10px] text-perf-text-muted mt-1">
                          Rigid lacquer keepsake box, gold embossed ribbon
                        </p>
                      </div>

                      <div
                        onClick={() => setPackagingChoice("pouch")}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-300 ${
                          packagingChoice === "pouch"
                            ? "bg-perf-gold/10 border-perf-gold text-perf-text-main"
                            : "bg-perf-input-bg border-perf-border text-perf-text-muted"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">Maison Velvet Travel Pouches</span>
                          {packagingChoice === "pouch" && (
                            <CheckIcon size={14} className="text-perf-gold" />
                          )}
                        </div>
                        <p className="text-[10px] text-perf-text-muted mt-1">
                          Hand-tailored charcoal velvet with embroidered monogram
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Patron Delivery Information */}
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-perf-text-muted block">
                      Patron Dispatch Address
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        defaultValue={user?.name || ""}
                        placeholder="Patron Full Name"
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-perf-input-bg border border-perf-border text-perf-text-main focus:outline-none focus:border-perf-gold"
                      />
                      <input
                        type="email"
                        required
                        defaultValue={user?.email || ""}
                        placeholder="Patron Email Address"
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-perf-input-bg border border-perf-border text-perf-text-main focus:outline-none focus:border-perf-gold"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Delivery Suite / Street Address / City"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-perf-input-bg border border-perf-border text-perf-text-main focus:outline-none focus:border-perf-gold"
                    />
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="rounded-2xl bg-perf-input-bg border border-perf-border/80 p-4 space-y-2 text-xs">
                    <div className="flex justify-between text-perf-text-muted">
                      <span>Curated Flacons Subtotal</span>
                      <span className="font-mono text-perf-text-main">${totalValue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-perf-text-muted">
                      <span>White-Glove Courier Dispatch</span>
                      <span className="font-semibold text-perf-gold">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-perf-text-muted">
                      <span>2x Maison Discovery Vials</span>
                      <span className="font-semibold text-perf-gold">Included</span>
                    </div>
                    <div className="border-t border-perf-border/60 pt-2 flex justify-between font-bold text-sm text-perf-text-main">
                      <span>Total Acquisition Value</span>
                      <span className="font-mono text-base text-perf-gold">
                        ${totalValue.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-perf-border text-xs uppercase font-semibold text-perf-text-muted hover:text-perf-text-main transition-colors cursor-pointer text-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 sm:px-7 py-3 rounded-xl bg-perf-gold text-white text-xs uppercase tracking-wide sm:tracking-widest font-bold hover:opacity-90 transition-opacity shadow-md cursor-pointer text-center"
                    >
                      Confirm Maison Reservation
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wishlist;
