import React from "react";
import {
  UserIcon,
  MailIcon,
  ShieldIcon,
  SparkleIcon,
  MapPinIcon,
  PhoneIcon,
  HeartIcon,
} from "../../common/Icons";
import { getUserSession } from "../../../lib/core/session";

const UserProfileContent: React.FC = () => {
  const session = getUserSession();
  const currentUser = (session?.user || session) as any;

  const name = currentUser?.name || "Distinguished Patron";
  const email = currentUser?.email || "patron@orvella.com";
  const role = currentUser?.role || "Patron";
  const avatar =
    currentUser?.image ||
    currentUser?.avatar ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop";

  return (
    <div className="space-y-8 text-perf-text-main p-4 sm:p-6 lg:p-8">
      {/* 1. Header & Identity Card */}
      <div className="relative overflow-hidden rounded-2xl border border-perf-gold/30 bg-perf-card/90 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          {/* Profile Avatar Frame */}
          <div className="relative shrink-0">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border border-perf-gold/60 shadow-xl bg-perf-input-bg flex items-center justify-center">
              <img
                src={avatar}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Profile Details Header */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-perf-gold bg-perf-gold/10 px-2.5 py-1 rounded-md border border-perf-gold/20">
                <SparkleIcon size={11} /> Signature Patron
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-perf-text-main">
              {name}
            </h1>

            <p className="text-xs text-perf-text-muted flex items-center justify-center sm:justify-start gap-1.5 font-light tracking-wide">
              <MailIcon size={13} className="text-perf-gold" /> {email}
            </p>

            <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-perf-gold bg-perf-gold/15 px-3 py-0.5 rounded-full border border-perf-gold/30 uppercase tracking-wider">
                <ShieldIcon size={13} /> {role} Account
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Profile Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Personal Info (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-perf-border/70 bg-perf-card/40 p-6 sm:p-8 space-y-6 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-perf-border/40 pb-4">
            <h2 className="text-lg font-bold font-serif-luxury text-perf-text-main flex items-center gap-2">
              <UserIcon size={18} className="text-perf-gold" /> Account Profile
            </h2>
            <span className="text-xs text-perf-text-muted uppercase tracking-wider">Patron Dossier</span>
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
                  className="w-full rounded-xl border border-perf-border/80 bg-perf-input-bg/60 py-3 pl-10 pr-4 text-xs font-medium text-perf-text-main transition focus:border-perf-gold focus:outline-none"
                  readOnly
                />
                <UserIcon
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-perf-text-muted"
                />
              </div>
            </div>

            {/* Email Address Field */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-perf-text-muted">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  defaultValue={email}
                  className="w-full rounded-xl border border-perf-border/80 bg-perf-input-bg/60 py-3 pl-10 pr-4 text-xs font-medium text-perf-text-main transition focus:border-perf-gold focus:outline-none"
                  readOnly
                />
                <MailIcon
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-perf-text-muted"
                />
              </div>
            </div>

            {/* Delivery Phone Number */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-perf-text-muted">
                Private Courier Phone
              </label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue="+1 (555) 019-2834"
                  className="w-full rounded-xl border border-perf-border/80 bg-perf-input-bg/60 py-3 pl-10 pr-4 text-xs font-medium text-perf-text-main transition focus:border-perf-gold focus:outline-none"
                />
                <PhoneIcon
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-perf-text-muted"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Preferences & Address (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Default Shipping Address Card */}
          <div className="rounded-2xl border border-perf-border/70 bg-perf-card/40 p-6 space-y-4 backdrop-blur-md">
            <div className="border-b border-perf-border/40 pb-3 flex items-center justify-between">
              <h2 className="text-base font-bold font-serif-luxury text-perf-text-main flex items-center gap-2">
                <MapPinIcon size={16} className="text-perf-gold" /> Maison Courier Address
              </h2>
              <span className="text-[10px] text-perf-gold font-bold uppercase bg-perf-gold/15 px-2 py-0.5 rounded border border-perf-gold/30">
                Primary
              </span>
            </div>

            <div className="text-xs text-perf-text-muted space-y-1 leading-relaxed">
              <p className="font-bold text-perf-text-main">{name}</p>
              <p>742 Vendôme Boulevard, Suite 1400</p>
              <p>New York, NY 10021</p>
              <p>United States</p>
            </div>
          </div>

          {/* Scent Preferences Badge Card */}
          <div className="rounded-2xl border border-perf-gold/30 bg-perf-gold/10 p-6 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-perf-gold flex items-center gap-1.5">
              <HeartIcon size={14} /> Olfactory Profile
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-perf-card border border-perf-border text-perf-text-main">
                Smoky Amber & Cedar
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-perf-card border border-perf-border text-perf-text-main">
                Extrait de Parfum
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-perf-card border border-perf-border text-perf-text-main">
                Velour & Noir
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileContent;
