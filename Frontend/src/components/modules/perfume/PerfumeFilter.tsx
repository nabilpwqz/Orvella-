import { SearchIcon } from "../../common/Icons";

interface PerfumeFilterProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;

  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;

  selectedGender: string;
  setSelectedGender: React.Dispatch<React.SetStateAction<string>>;

  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

const PerfumeFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedGender,
  setSelectedGender,
  sortBy,
  setSortBy,
}: PerfumeFilterProps) => {
  return (
    <section className="rounded-2xl sm:rounded-3xl border border-perf-border bg-perf-card p-4 sm:p-6 mb-6 sm:mb-8 text-perf-text-main shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search */}
        <div className="md:col-span-5">
          <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-perf-text-muted">
            Search Flacons
          </label>

          <div className="relative">
            <SearchIcon
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-perf-text-muted"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by note, mood, or name..."
              className="w-full rounded-xl border border-perf-border bg-perf-input-bg py-2.5 pl-10 pr-4 text-xs text-perf-text-main outline-none focus:border-perf-gold transition-colors"
            />
          </div>
        </div>

        {/* Concentration / Category */}
        <div className="md:col-span-3">
          <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-perf-text-muted">
            Concentration
          </label>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-xl border border-perf-border bg-perf-input-bg px-3.5 py-2.5 text-xs text-perf-text-main outline-none focus:border-perf-gold transition-colors cursor-pointer"
          >
            <option value="all">All Concentrations</option>
            <option value="Extrait de Parfum">Extrait de Parfum</option>
            <option value="Eau de Parfum">Eau de Parfum</option>
            <option value="Eau de Toilette">Eau de Toilette</option>
            <option value="Attar Oil">Pure Attar Oil</option>
          </select>
        </div>

        {/* Identity / Gender */}
        <div className="md:col-span-2">
          <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-perf-text-muted">
            Identity
          </label>

          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="w-full rounded-xl border border-perf-border bg-perf-input-bg px-3.5 py-2.5 text-xs text-perf-text-main outline-none focus:border-perf-gold transition-colors cursor-pointer"
          >
            <option value="all">All Identities</option>
            <option value="Unisex">Unisex</option>
            <option value="Women">Pour Femme</option>
            <option value="Men">Pour Homme</option>
          </select>
        </div>

        {/* Sort */}
        <div className="md:col-span-2">
          <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-perf-text-muted">
            Sort Order
          </label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-xl border border-perf-border bg-perf-input-bg px-3.5 py-2.5 text-xs text-perf-text-main outline-none focus:border-perf-gold transition-colors cursor-pointer"
          >
            <option value="default">Default Order</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="a-z">Title: A to Z</option>
            <option value="z-a">Title: Z to A</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default PerfumeFilter;
