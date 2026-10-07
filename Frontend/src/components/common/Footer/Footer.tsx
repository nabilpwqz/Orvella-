import { useState } from "react";
import { Link } from "react-router-dom";
import { SendIcon, MapPinIcon, PhoneIcon, MailIcon } from "../Icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative w-full bg-perf-card text-perf-text-main border-t border-perf-border/80 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-perf-border/60">
          {/* Brand Info & Vision */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-block group">
              <span className="font-display text-2xl font-bold tracking-[0.35em] text-perf-text-main group-hover:text-perf-gold transition-colors duration-300">
                ORVELLA
              </span>
              <p className="text-[9px] uppercase tracking-[0.45em] text-perf-gold font-medium mt-0.5">
                Haute Parfumerie · Paris &amp; New York
              </p>
            </Link>

            <p className="text-perf-text-muted text-sm leading-relaxed max-w-md pt-2">
              Orvella: Leave a lasting impression. A modern luxury fragrance house
              dedicated to personal identity, refined aesthetics, and scents
              created to stay long after you leave.
            </p>

            <div className="space-y-2.5 pt-4 text-xs text-perf-text-muted">
              <div className="flex items-center gap-3">
                <MapPinIcon size={16} className="text-perf-gold shrink-0" />
                <span>440 Madison Avenue, New York · 12 Place Vendôme, Paris</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon size={16} className="text-perf-gold shrink-0" />
                <span className="tracking-wider">+1 (800) 492-7835</span>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon size={16} className="text-perf-gold shrink-0" />
                <a
                  href="mailto:concierge@orvella.com"
                  className="hover:text-perf-gold transition-colors duration-300"
                >
                  concierge@orvella.com
                </a>
              </div>
            </div>
          </div>

          {/* Scent Moods */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-perf-text-main pb-2 border-b border-perf-border/40 inline-block font-display">
              Olfactory Moods
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: "Noir : Smoked Timber & Amber", path: "/all-perfumes" },
                { label: "Élan : Kinetic Solar Citrus", path: "/all-perfumes" },
                { label: "Velour : Powdery Iris & Tonka", path: "/all-perfumes" },
                { label: "Aurea : Gilded Solar Saffron", path: "/all-perfumes" },
                { label: "Nuit : Midnight Damask Rose", path: "/all-perfumes" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-perf-text-muted hover:text-perf-gold transition-colors duration-300 block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The Maison */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-perf-text-main pb-2 border-b border-perf-border/40 inline-block font-display">
              The Maison
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: "Philosophy & Heritage", path: "/about" },
                { label: "The Flacon Collection", path: "/all-perfumes" },
                { label: "Private Atelier Service", path: "/contact" },
                { label: "Client Suite Portal", path: "/dashboard" },
                { label: "Bespoke Commissions", path: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-perf-text-muted hover:text-perf-gold transition-colors duration-300 block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Private Society Subscription */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-perf-text-main pb-2 border-b border-perf-border/40 inline-block font-display">
              The Orvella Society
            </h4>
            <p className="text-perf-text-muted text-xs leading-relaxed">
              Receive private extraction dispatches, bespoke formulation previews,
              and private salon invitations.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-perf-input-bg border border-perf-border text-perf-text-main text-xs focus:outline-none focus:border-perf-gold transition-all duration-300 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-perf-gold hover:text-perf-text-main transition-colors duration-300 cursor-pointer"
                  aria-label="Subscribe"
                >
                  <SendIcon size={16} />
                </button>
              </div>

              {isSubscribed && (
                <p className="text-[11px] text-perf-gold font-medium pt-1">
                  You are now enrolled in the Orvella dispatches.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-perf-text-muted text-center sm:text-left">
          <p className="tracking-wide">
            © {new Date().getFullYear()} Orvella Haute Parfumerie. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center sm:justify-end gap-x-5 sm:gap-x-6 gap-y-2 text-xs">
            <Link to="/" className="hover:text-perf-gold transition-colors duration-300">
              Privacy Statement
            </Link>
            <Link to="/" className="hover:text-perf-gold transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/" className="hover:text-perf-gold transition-colors duration-300">
              Olfactory Ethics
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
