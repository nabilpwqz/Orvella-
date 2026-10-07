import React, { createContext, useContext, useState, useEffect } from "react";
import type { Perfume } from "../types/perfume";
import { ORVELLA_CATALOG } from "../constants/orvellaData";
import { toast } from "react-toastify";

interface WishlistContextType {
  wishlist: Perfume[];
  wishlistCount: number;
  totalValue: number;
  addToWishlist: (perfume: Perfume) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (perfume: Perfume) => void;
  isWishlisted: (id: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = "orvella_curated_wishlist";

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Perfume[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    // Initial luxury curation seed: Velour and Noir
    return [ORVELLA_CATALOG[0], ORVELLA_CATALOG[1]];
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // Ignore write errors
    }
  }, [wishlist]);

  const isWishlisted = (id: string) => {
    return wishlist.some((item) => (item._id || (item as any).id) === id);
  };

  const addToWishlist = (perfume: Perfume) => {
    const id = perfume._id || (perfume as any).id;
    if (!isWishlisted(id)) {
      setWishlist((prev) => [perfume, ...prev]);
      toast.success(`"${perfume.title}" added to your Private Curation.`);
    }
  };

  const removeFromWishlist = (id: string) => {
    const item = wishlist.find((p) => (p._id || (p as any).id) === id);
    setWishlist((prev) => prev.filter((p) => (p._id || (p as any).id) !== id));
    if (item) {
      toast.info(`"${item.title}" removed from your Private Curation.`);
    }
  };

  const toggleWishlist = (perfume: Perfume) => {
    const id = perfume._id || (perfume as any).id;
    if (isWishlisted(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(perfume);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.info("Private curation archive cleared.");
  };

  const wishlistCount = wishlist.length;
  const totalValue = wishlist.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        totalValue,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
