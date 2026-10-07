import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CloseIcon, UserIcon, LogOutIcon } from "../Icons";
import UseTheme from "../../../hooks/UseTheme";
import { getUserSession } from "../../../lib/core/session";
import { signOut } from "../../../lib/actions/signOut";
import { toast } from "react-toastify";
import type { NavLinkItem } from "./navbarLinks";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  links: NavLinkItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, links }) => {
  const navigate = useNavigate();
  const { user, loading } = getUserSession();

  // Handle body scroll locking, escape key, and auto-close on desktop resize
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      setIsOpen(false);
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] transition-all duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto visible"
          : "opacity-0 pointer-events-none invisible"
      }`}
    >
      {/* Background Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300 ease-out cursor-pointer pointer-events-auto ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Luxury Drawer */}
      <div
        className={`absolute top-0 left-0 h-full max-h-[100dvh] w-[85%] max-w-[320px] bg-perf-card border-r border-perf-border shadow-2xl flex flex-col pointer-events-auto z-10 transition-transform duration-300 ease-out will-change-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-5 sm:px-6 py-4 sm:py-5 border-b border-perf-border/70 shrink-0 bg-perf-card">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex flex-col group cursor-pointer pointer-events-auto"
          >
            <span className="font-display text-lg font-bold tracking-[0.3em] text-perf-text-main group-hover:text-perf-gold transition-colors">
              ORVELLA
            </span>
            <span className="text-[8px] uppercase tracking-[0.38em] text-perf-gold font-medium -mt-0.5">
              Haute Parfumerie
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="h-9 w-9 rounded-xl border border-perf-border bg-perf-input-bg flex items-center justify-center text-perf-text-muted hover:text-perf-gold hover:border-perf-gold transition-colors cursor-pointer pointer-events-auto active:scale-95"
            aria-label="Close menu"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Scrollable Container with Links and Bottom Actions */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="min-h-full flex flex-col justify-between">
            {/* Navigation Links */}
            <div className="px-4 sm:px-5 py-4 space-y-1">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between text-xs uppercase tracking-[0.2em] py-3 px-3.5 rounded-xl border transition-all duration-300 cursor-pointer pointer-events-auto ${
                      isActive
                        ? "bg-perf-gold/15 text-perf-gold border-perf-gold/40 font-semibold"
                        : "text-perf-text-muted hover:text-perf-text-main hover:bg-perf-input-bg/70 border-transparent"
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] text-perf-gold opacity-60">·</span>
                </NavLink>
              ))}
            </div>

            {/* Bottom Corner Section */}
            <div className="p-4 sm:p-5 border-t border-perf-border/70 bg-perf-input-bg/40 space-y-3.5 shrink-0">
              {/* Atmosphere Theme Switcher */}
              <div className="flex items-center justify-between text-xs text-perf-text-muted py-0.5 pointer-events-auto">
                <span className="uppercase tracking-widest text-[10px] font-semibold text-perf-text-muted">
                  Atmosphere
                </span>
                <UseTheme />
              </div>

              {/* Authentication Actions */}
              <div className="pt-0.5">
                {loading && !user && (
                  <div className="h-10 w-full animate-pulse rounded-xl bg-perf-input-bg" />
                )}

                {!loading && !user && (
                  <div className="space-y-2">
                    <Link
                      to="/auth/signin"
                      onClick={() => setIsOpen(false)}
                      className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-perf-gold text-white text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] flex items-center justify-center gap-2 hover:opacity-95 active:scale-98 transition-all shadow-sm cursor-pointer pointer-events-auto"
                    >
                      <UserIcon size={14} className="shrink-0" />
                      <span>Sign In to Maison</span>
                    </Link>

                    <Link
                      to="/auth/signup"
                      onClick={() => setIsOpen(false)}
                      className="block text-center text-[11px] text-perf-text-muted hover:text-perf-gold transition-colors py-1 cursor-pointer font-light tracking-wide pointer-events-auto"
                    >
                      New Patron? <span className="underline font-normal text-perf-gold">Register Membership</span>
                    </Link>
                  </div>
                )}

                {!loading && user && (
                  <div className="space-y-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-perf-card border border-perf-gold/40 text-perf-text-main hover:border-perf-gold transition-colors group cursor-pointer pointer-events-auto"
                    >
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold text-perf-text-main font-serif-luxury">
                          {user.name}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider text-perf-gold font-medium">
                          Maison Dossier
                        </p>
                      </div>
                      <UserIcon size={16} className="text-perf-gold" />
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-4 text-[11px] uppercase tracking-wider text-perf-text-muted hover:text-red-500 transition-colors border border-perf-border/70 rounded-xl cursor-pointer pointer-events-auto active:scale-95"
                    >
                      <LogOutIcon size={13} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileMenu;
