import React from "react";
import {
  UserIcon,
  MailIcon,
  ShieldIcon,
  KeyIcon,
  SparkleIcon,
  CameraIcon,
  SaveIcon,
  LockIcon,
} from "../../common/Icons";
import { getUserSession } from "../../../lib/core/session";

const AdminProfileContent: React.FC = () => {
  const session = getUserSession();
  const currentUser = (session?.user || session) as any;

  const name = currentUser?.name || "Orvella Atelier Director";
  const email = currentUser?.email || "director@orvella.com";
  const role = currentUser?.role || "Director of Haute Parfumerie";
  const avatar =
    currentUser?.image ||
    currentUser?.avatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop";

  return (
    <div className="space-y-8 text-perf-text-main p-4 sm:p-6 lg:p-8">
      {/* 1. Header & Admin Identity Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-perf-gold/30 bg-perf-card/90 p-6 sm:p-8 backdrop-blur-xl shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          {/* Profile Picture Frame */}
          <div className="relative group shrink-0">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border border-perf-gold/60 shadow-xl bg-perf-input-bg flex items-center justify-center">
              <img
                src={avatar}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <button
              type="button"
              className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-perf-gold text-perf-bg shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Change Portrait"
            >
              <CameraIcon size={14} />
            </button>
          </div>

          {/* Profile Details Header */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-perf-gold bg-perf-gold/10 px-2.5 py-1 rounded-md border border-perf-gold/20">
                <SparkleIcon size={11} /> Verified Maison Access
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-perf-text-main">
              {name}
            </h1>

            <p className="text-sm text-perf-text-muted flex items-center justify-center sm:justify-start gap-1.5 font-light tracking-wide">
              <MailIcon size={13} className="text-perf-gold" /> {email}
            </p>

            <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-perf-gold bg-perf-gold/15 px-3 py-0.5 rounded-full border border-perf-gold/30 uppercase tracking-wider">
                <ShieldIcon size={13} /> {role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Information Form */}
        <div className="lg:col-span-7 rounded-2xl border border-perf-border/70 bg-perf-card/60 p-6 sm:p-8 space-y-6 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-perf-border/40 pb-4">
            <h2 className="text-lg font-bold font-serif-luxury text-perf-text-main flex items-center gap-2">
              <UserIcon size={18} className="text-perf-gold" /> Maison Registry Details
            </h2>
            <span className="text-xs text-perf-gold tracking-widest uppercase font-semibold">
              Orvella Atelier
            </span>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-perf-text-muted">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue={name}
                  className="w-full rounded-xl border border-perf-border/80 bg-perf-input-bg/60 py-3 pl-10 pr-4 text-sm font-medium text-perf-text-main transition focus:border-perf-gold focus:outline-none"
                  required
                />
                <UserIcon
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-perf-text-muted"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-perf-text-muted">
                Atelier Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  defaultValue={email}
                  className="w-full rounded-xl border border-perf-border/80 bg-perf-input-bg/60 py-3 pl-10 pr-4 text-sm font-medium text-perf-text-main transition focus:border-perf-gold focus:outline-none"
                  required
                />
                <MailIcon
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-perf-text-muted"
                />
              </div>
            </div>

            {/* System Role (Read-only) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-perf-text-muted">
                Authorization Tier
              </label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue={role}
                  disabled
                  className="w-full rounded-xl border border-perf-border/40 bg-perf-card/80 py-3 pl-10 pr-4 text-sm font-semibold text-perf-gold cursor-not-allowed uppercase"
                />
                <LockIcon
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-perf-gold"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-perf-gold px-6 py-3 text-xs font-bold uppercase tracking-widest text-perf-bg shadow-md transition duration-300 hover:opacity-90 active:scale-95 cursor-pointer"
              >
                <SaveIcon size={14} />
                <span>Save Registry Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Security Credentials Status */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-perf-border/70 bg-perf-card/60 p-6 space-y-5 backdrop-blur-md">
            <div className="border-b border-perf-border/40 pb-4">
              <h2 className="text-lg font-bold font-serif-luxury text-perf-text-main flex items-center gap-2">
                <KeyIcon size={18} className="text-perf-gold" /> Security & Access
              </h2>
              <p className="text-xs text-perf-text-muted mt-1">
                Cryptographic session authentication status.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-perf-input-bg/40 border border-perf-border/30">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-perf-text-main">
                    Maison Key
                  </p>
                  <p className="text-[10px] text-perf-text-muted">
                    Encrypted Session Access Active
                  </p>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-1 text-[11px] font-bold text-perf-gold hover:underline cursor-pointer"
                >
                  <KeyIcon size={12} /> Rotate
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-perf-input-bg/40 border border-perf-border/30">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-perf-text-main">
                    Atelier Authority
                  </p>
                  <p className="text-[10px] text-perf-gold font-semibold uppercase tracking-wider">
                    Full Director Privileges
                  </p>
                </div>
                <span className="h-2 w-2 rounded-full bg-perf-gold animate-pulse" />
              </div>
            </div>
          </div>

          {/* System Access Card */}
          <div className="rounded-2xl border border-perf-gold/30 bg-perf-gold/10 p-6 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-perf-gold flex items-center gap-1.5">
              <ShieldIcon size={15} /> Maison Master Key
            </h3>
            <p className="text-xs text-perf-text-muted leading-relaxed">
              Your credentials possess comprehensive curation privileges for olfactory collections, archival catalog management, and private patron allocations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileContent;
