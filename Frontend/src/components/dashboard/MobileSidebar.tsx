import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MenuIcon, CloseIcon, HomeIcon, LogOutIcon } from "../common/Icons";
import { toast } from "react-toastify";

import { signOut } from "../../lib/actions/signOut";
import { dashboardNavLinks } from "./dashboardLinks";
import { getUserSession } from "../../lib/core/session";

interface ExtendedUser {
  id: string;
  name: string;
  email: string;
  role?: string;
}

const MobileSidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const session = getUserSession();
  const user = session?.user as ExtendedUser | undefined;
  const role = user?.role || "user";

  const menus =
    dashboardNavLinks[role as keyof typeof dashboardNavLinks] ||
    dashboardNavLinks.user ||
    [];

  const handleLogout = async () => {
    await signOut();
    toast.success("Signed out successfully");
    setOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-perf-card/90 backdrop-blur-md border-b border-perf-border/80 flex items-center justify-between px-5 text-perf-text-main shadow-xs">
        <NavLink to="/" className="inline-block">
          <span className="font-display text-xl font-bold tracking-[0.3em] text-perf-text-main">
            ORVELLA
          </span>
        </NavLink>

        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-xl text-perf-text-main hover:text-perf-gold transition-colors cursor-pointer"
          aria-label="Open Navigation"
        >
          <MenuIcon size={22} />
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 lg:hidden"
        />
      )}

      {/* Drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-80 bg-perf-card border-r border-perf-border/80 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out text-perf-text-main ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-perf-border/60">
          <div>
            <span className="font-display text-2xl font-bold tracking-[0.32em] text-perf-text-main">
              ORVELLA
            </span>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-perf-gold animate-pulse" />
              <p className="uppercase tracking-[0.2em] text-[10px] font-semibold text-perf-text-muted">
                {role === "admin" ? "Sommelier Suite" : "Patron Suite"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-xl text-perf-text-muted hover:text-perf-gold transition-colors cursor-pointer"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* User Summary */}
        <div className="p-5 border-b border-perf-border/40 bg-perf-bg/30">
          <div className="flex items-center gap-3.5 p-2 rounded-2xl bg-perf-card border border-perf-border/60">
            <div className="h-10 w-10 rounded-full bg-perf-gold/20 border border-perf-gold/40 flex items-center justify-center text-xs font-bold font-display text-perf-gold">
              {user?.name?.charAt(0).toUpperCase() || "P"}
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
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5 scrollbar-thin">
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-perf-gold/15 text-perf-gold border-l-4 border-perf-gold pl-3"
                      : "text-perf-text-muted hover:bg-perf-input-bg hover:text-perf-text-main"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={16}
                      className={`transition-colors duration-300 ${
                        isActive ? "text-perf-gold" : "text-perf-text-muted"
                      }`}
                    />
                    <span>{item.title}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Actions */}
        <div className="border-t border-perf-border/80 p-5 bg-perf-bg/30 space-y-1.5">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-perf-text-muted hover:text-perf-gold transition-colors"
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
      </aside>
    </>
  );
};

export default MobileSidebar;
