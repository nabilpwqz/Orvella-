import { useState, useEffect } from "react";
import { MenuIcon, CloseIcon, HeartIcon } from "../Icons";
import Logo from "./Logo";
import UseTheme from "../../../hooks/UseTheme";
import MobileMenu from "./MobileMenu";
import { navbarLinks } from "./navbarLinks";
import { getUserSession } from "../../../lib/core/session";
import { useWishlist } from "../../../context/WishlistContext";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../../lib/actions/signOut";
import { toast } from "react-toastify";
import NavLinks from "./NavLinks";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = getUserSession();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <nav
      data-aos="fade-down"
      className="fixed top-0 md:top-3 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-11/12 md:max-w-7xl z-[100] transition-all duration-300 bg-perf-card/90 backdrop-blur-md border-b md:border border-perf-border/80 md:rounded-2xl shadow-sm py-3 px-5 sm:px-6"
    >
      <div className="w-full flex justify-between items-center">
        {/* Brand Logo */}
        <Logo />

        {/* Center Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navbarLinks.map((link) => (
            <NavLinks key={link.path} to={link.path}>
              {link.label}
            </NavLinks>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-perf-border bg-perf-input-bg text-perf-text-muted hover:text-perf-gold hover:border-perf-gold transition-colors cursor-pointer"
            aria-label="Private Wishlist Curation"
            title="Private Wishlist Curation"
          >
            <HeartIcon size={16} filled={wishlistCount > 0} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-perf-gold text-[9px] font-bold text-white shadow-xs">
                {wishlistCount}
              </span>
            )}
          </Link>

          <div className="hidden lg:flex items-center gap-3">
            <UseTheme />

            {loading && !user && (
              <div className="h-8 w-16 animate-pulse rounded-full bg-perf-input-bg" />
            )}

            {!loading && user && (
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-perf-text-main border border-perf-border hover:border-red-500/50 hover:text-red-500 rounded-full transition-all duration-300 cursor-pointer"
              >
                Sign Out
              </button>
            )}

            {!loading && !user && (
              <Link
                to="/auth/signin"
                className="px-5 py-1.5 text-xs font-semibold uppercase tracking-widest bg-perf-gold text-white hover:opacity-90 rounded-full transition-all duration-300 cursor-pointer shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden text-perf-text-main hover:text-perf-gold cursor-pointer p-2 rounded-xl border border-perf-border/70 bg-perf-input-bg/70 hover:border-perf-gold transition-all duration-200 flex items-center justify-center min-w-[38px] min-h-[38px] active:scale-95 shadow-2xs"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <CloseIcon size={20} /> : <MenuIcon size={22} />}
          </button>
        </div>

        <MobileMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          links={navbarLinks}
        />
      </div>
    </nav>
  );
};

export default Navbar;
