import { BellIcon } from "../common/Icons";
import { getUserSession } from "../../lib/core/session";
import UseTheme from "../../hooks/UseTheme";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  const { user } = getUserSession();

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-perf-border/80 bg-perf-card/90 backdrop-blur-md text-perf-text-main">
      <div className="flex h-full items-center justify-between px-5 lg:px-8">
        {/* Left: Brand Monogram */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex flex-col">
            <span className="font-display text-lg sm:text-xl font-bold tracking-[0.3em] text-perf-text-main group-hover:text-perf-gold transition-colors">
              ORVELLA
            </span>
            <span className="text-[8px] uppercase tracking-[0.35em] text-perf-gold font-medium -mt-0.5">
              Atelier Suite
            </span>
          </div>
        </Link>

        {/* Right: Controls & User Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-perf-border bg-perf-input-bg text-perf-text-muted hover:text-perf-gold hover:border-perf-gold transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <BellIcon size={17} />
            <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-perf-gold" />
          </button>

          <UseTheme />

          <div className="flex items-center gap-3 rounded-2xl border border-perf-border bg-perf-input-bg px-3 py-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-perf-gold font-display text-xs font-bold text-white shadow-xs">
              {user?.name?.charAt(0).toUpperCase() || "P"}
            </div>

            <div className="hidden lg:block text-left">
              <h4 className="text-xs font-semibold text-perf-text-main font-serif-luxury leading-tight">
                {user?.name || "Patron"}
              </h4>
              <p className="text-[9px] uppercase tracking-wider text-perf-text-muted">
                {user?.role || "Member"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
