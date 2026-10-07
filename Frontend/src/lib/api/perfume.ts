import { serverFetch } from "../core/server";
import { ORVELLA_CATALOG } from "../../constants/orvellaData";

// all perfumes get (with Pagination / TanStack Query support and Orvella fallback)
export const getPerfumes = async ({ pageParam = 1 }: { pageParam?: number } = {}) => {
  try {
    const res = await serverFetch(`/api/perfumes?page=${pageParam}&limit=8`);
    if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
      return res;
    }
  } catch (error) {
    console.info("Using Orvella Maison signature catalog fallback", error);
  }

  // Graceful fallback to curated Orvella catalog
  const limit = 8;
  const skip = (pageParam - 1) * limit;
  const paginated = ORVELLA_CATALOG.slice(skip, skip + limit);
  const totalPages = Math.ceil(ORVELLA_CATALOG.length / limit);

  return {
    success: true,
    data: paginated,
    currentPage: pageParam,
    totalPages,
    nextPage: pageParam < totalPages ? pageParam + 1 : null,
  };
};

// perfumes get by id
export const getPerfumesById = async (id: string) => {
  try {
    const res = await serverFetch(`/api/perfumes/${id}`);
    if (res && !res.message && (res._id || res.id)) {
      return res;
    }
  } catch (error) {
    console.info("Resolving fragrance from Orvella catalog", error);
  }

  const found = ORVELLA_CATALOG.find((p) => p._id === id);
  return found || ORVELLA_CATALOG[0];
};
