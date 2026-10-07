import React from "react";
import { Link } from "react-router-dom";
import {
  BagIcon,
  SparkleIcon,
  ClockIcon,
  ArrowRightIcon,
  DeliveryIcon,
  DiamondIcon,
  BottleIcon,
  CompassIcon,
} from "../../common/Icons";
import { getUserSession } from "../../../lib/core/session";

// Mock user activities & purchases
const recentOrders = [
  {
    id: "ORV-8821",
    perfume: "Orvella Velour",
    category: "Extrait de Parfum",
    price: "$295.00",
    date: "12 July 2026",
    status: "Maison Dispatch",
  },
  {
    id: "ORV-8410",
    perfume: "Orvella Noir",
    category: "Extrait de Parfum",
    price: "$320.00",
    date: "28 June 2026",
    status: "Delivered",
  },
];

const UserDashboardContent: React.FC = () => {
  const session = getUserSession();
  const currentUser = (session?.user || session) as any;

  const name = currentUser?.name || "Distinguished Patron";

  return (
    <div className="space-y-8 text-perf-text-main p-4 sm:p-6 lg:p-8">
      {/* 1. Welcome Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-perf-gold/30 bg-perf-card/90 p-6 sm:p-8 backdrop-blur-xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-perf-gold/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-perf-gold border border-perf-gold/20">
              <SparkleIcon size={12} /> Personal Scent Atelier
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-perf-text-main">
              Welcome back, {name}
            </h1>
            <p className="text-sm text-perf-text-muted max-w-lg leading-relaxed">
              Track your bespoke deliveries, view archival olfactory acquisitions, and explore private allocations.
            </p>
          </div>

          <Link
            to="/all-perfumes"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-perf-gold px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-perf-bg shadow-md transition duration-300 hover:opacity-90 active:scale-95 shrink-0 self-start sm:self-auto"
          >
            <CompassIcon size={15} />
            <span>Explore Fragrance Archive</span>
          </Link>
        </div>
      </div>

      {/* 2. Customer Summary Metric Cards (4 Columns - strictly avoiding 3-in-a-row) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="rounded-2xl border border-perf-border/70 bg-perf-card/50 p-5 backdrop-blur-md transition duration-300 hover:border-perf-gold/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-perf-text-muted">
              Acquisitions
            </span>
            <div className="h-8 w-8 rounded-lg bg-perf-gold/10 flex items-center justify-center text-perf-gold">
              <BagIcon size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold font-serif-luxury text-perf-text-main">
            02 Flacons
          </p>
        </div>

        <div className="rounded-2xl border border-perf-border/70 bg-perf-card/50 p-5 backdrop-blur-md transition duration-300 hover:border-perf-gold/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-perf-text-muted">
              In Dispatch
            </span>
            <div className="h-8 w-8 rounded-lg bg-perf-gold/10 flex items-center justify-center text-perf-gold">
              <DeliveryIcon size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold font-serif-luxury text-perf-text-main">
            1 Courier
          </p>
        </div>

        <div className="rounded-2xl border border-perf-border/70 bg-perf-card/50 p-5 backdrop-blur-md transition duration-300 hover:border-perf-gold/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-perf-text-muted">
              Patron Tier
            </span>
            <div className="h-8 w-8 rounded-lg bg-perf-gold/10 flex items-center justify-center text-perf-gold">
              <SparkleIcon size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold font-serif-luxury text-perf-gold">
            Signature
          </p>
        </div>

        <div className="rounded-2xl border border-perf-border/70 bg-perf-card/50 p-5 backdrop-blur-md transition duration-300 hover:border-perf-gold/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-perf-text-muted">
              Vial Credits
            </span>
            <div className="h-8 w-8 rounded-lg bg-perf-gold/10 flex items-center justify-center text-perf-gold">
              <BottleIcon size={16} />
            </div>
          </div>
          <p className="text-2xl font-bold font-serif-luxury text-perf-text-main">
            4 Samples
          </p>
        </div>
      </div>

      {/* 3. Orders Overview & VIP Benefits Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Orders (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-perf-border/70 bg-perf-card/40 p-6 space-y-5 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-perf-border/40 pb-4">
            <h2 className="text-lg font-bold font-serif-luxury text-perf-text-main flex items-center gap-2">
              <BottleIcon size={18} className="text-perf-gold" /> Recent Acquisitions
            </h2>
            <span className="text-xs text-perf-text-muted uppercase tracking-wider">Archive</span>
          </div>

          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-perf-input-bg/40 border border-perf-border/30 hover:border-perf-gold/40 transition duration-300 gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-perf-gold">
                      {order.id}
                    </span>
                    <span className="text-[10px] text-perf-text-muted">
                      • {order.date}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-perf-text-main">
                    {order.perfume}
                  </h3>
                  <p className="text-xs text-perf-text-muted font-light">
                    {order.category}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 border-t sm:border-t-0 border-perf-border/30 pt-2 sm:pt-0">
                  <span className="text-sm font-bold font-mono text-perf-text-main">
                    {order.price}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      order.status === "Delivered"
                        ? "bg-perf-gold/15 text-perf-gold border-perf-gold/30"
                        : "bg-perf-card text-perf-text-muted border-perf-border"
                    }`}
                  >
                    {order.status === "Delivered" ? (
                      <DiamondIcon size={8} className="text-perf-gold fill-current" />
                    ) : (
                      <ClockIcon size={10} />
                    )}
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Exclusive Privileges & Quick Navigation (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-perf-gold/30 bg-perf-gold/10 p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-perf-gold flex items-center gap-1.5">
              <SparkleIcon size={15} /> Patron Privileges
            </h3>
            <ul className="space-y-3 text-xs text-perf-text-muted">
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-perf-gold shrink-0 mt-1.5" />
                <span>
                  Complimentary 5ml discovery vials with every signature flacon purchase.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-perf-gold shrink-0 mt-1.5" />
                <span>
                  Priority white glove courier dispatch on all archival orders.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-perf-gold shrink-0 mt-1.5" />
                <span>
                  Invitations to seasonal preview releases before public unveiling.
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Browse Link */}
          <Link
            to="/all-perfumes"
            className="flex items-center justify-between p-5 rounded-2xl bg-perf-card/60 border border-perf-border hover:border-perf-gold text-perf-text-main hover:text-perf-gold transition duration-300 group"
          >
            <span className="text-xs font-bold uppercase tracking-wider">
              Browse All Orvella Creations
            </span>
            <ArrowRightIcon
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardContent;
