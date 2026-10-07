import { NavLink, useNavigate } from "react-router-dom";
import { HomeIcon, LogOutIcon } from "../common/Icons";
import { toast } from "react-toastify";
import { dashboardNavLinks } from "./dashboardLinks";
import { getUserSession } from "../../lib/core/session";
import { signOut } from "../../lib/actions/signOut";

interface ExtendedUser {
  id: string;
  name: string;
  email: string;
  role?: "user" | "admin";
}

const DesktopSidebar = () => {
  const navigate = useNavigate();
  const session = getUserSession();
  const user = session?.user as ExtendedUser | undefined;
  const role = user?.role || "user";

  const menus =
    dashboardNavLinks[role as keyof typeof dashboardNavLinks] ||
    dashboardNavLinks.user;

  const handleLogout = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 bg-perf-card border-r border-perf-border/80 shadow-sm z-20 text-perf-text-main">
      {/* Brand Header */}
      <div className="p-6 border-b border-perf-border/60">
        <NavLink to="/" className="inline-block group">
          <span className="font-display text-2xl font-bold tracking-[0.32em] text-perf-text-main group-hover:text-perf-gold transition-colors">
            ORVELLA
          </span>
          <span className="block text-[8px] uppercase tracking-[0.45em] text-perf-gold font-medium mt-0.5">
            Maison Atelier
          </span>
        </NavLink>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-perf-gold animate-pulse" />
          <p className="uppercase tracking-[0.25em] text-[10px] font-semibold text-perf-text-muted">
            {role === "admin" ? "Sommelier Suite" : "Patron Suite"}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 scrollbar-thin">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-perf-gold/15 text-perf-gold border-l-4 border-perf-gold pl-3 shadow-xs"
                    : "text-perf-text-muted hover:bg-perf-input-bg hover:text-perf-text-main"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={16}
                    className={`transition-colors duration-300 ${
                      isActive
                        ? "text-perf-gold"
                        : "text-perf-text-muted group-hover:text-perf-gold"
                    }`}
                  />
                  <span>{item.title}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Profile & Actions */}
      <div className="border-t border-perf-border/80 p-5 bg-perf-bg/40">
        {/* Profile Card */}
        <div className="mb-4 flex items-center gap-3.5 p-2 rounded-2xl bg-perf-card border border-perf-border/60">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-perf-gold/20 border border-perf-gold/40 flex items-center justify-center text-xs font-bold font-display text-perf-gold">
              {user?.name?.charAt(0).toUpperCase() || "P"}
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-perf-gold ring-2 ring-perf-card" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-perf-text-main font-serif-luxury truncate">
              {user?.name || "Patron Member"}
            </h4>
            <p className="text-[10px] text-perf-text-muted truncate">
              {user?.email || "patron@orvella.com"}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="space-y-1.5">
          <NavLink
            to="/"
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-perf-text-muted hover:bg-perf-input-bg hover:text-perf-gold transition-colors"
          >
            <HomeIcon size={15} />
            <span>Return to Maison</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-perf-border py-2 text-xs font-semibold text-perf-text-muted hover:text-red-500 hover:border-red-500/40 transition-colors cursor-pointer"
          >
            <LogOutIcon size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
