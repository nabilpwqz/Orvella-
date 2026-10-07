import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BottleIcon,
  BagIcon,
  UsersIcon,
  SparkleIcon,
  LoaderIcon,
} from "../../common/Icons";
import { getPerfumes } from "../../../lib/api/perfume";
import { getUsers } from "../../../lib/api/user";
import { getUserSession } from "../../../lib/core/session";
import DashboardChart from "./DashboardChart";

interface PerfumeItem {
  _id: string;
  title: string;
  category: string;
  price: number;
  gender: string;
}

interface UserItem {
  _id: string;
  name: string;
  email: string;
}

const AdminDashboardContent = () => {
  const userData = getUserSession();

  const [perfumes, setPerfumes] = useState<PerfumeItem[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPerfumes = await getPerfumes();
        const allUsers = await getUsers();

        setPerfumes(allPerfumes?.data || []);
        setUsers(Array.isArray(allUsers) ? allUsers : (allUsers as any)?.data || []);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <LoaderIcon size={28} className="text-perf-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-perf-text-main p-4 sm:p-6 lg:p-8">
      {/* 1. Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-perf-border bg-perf-card p-6 sm:p-8 shadow-sm">
        <div className="space-y-1">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-perf-gold">
            <SparkleIcon size={13} /> Sommelier Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-light font-serif-luxury text-perf-text-main">
            Welcome Back, {userData?.user?.name || "Sommelier"}
          </h1>
          <p className="text-xs text-perf-text-muted">
            Executive summary of active vault catalog, patron registries, and allocation activity.
          </p>
        </div>

        <Link
          to="/dashboard/add-perfume"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-perf-gold px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition hover:opacity-90 self-start sm:self-auto"
        >
          <span>Catalog New Flacon</span>
        </Link>
      </div>

      {/* 2. Stats Cards (4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="overflow-hidden rounded-2xl border border-perf-border bg-perf-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-perf-text-muted">
              Vault Valuation
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-perf-input-bg text-perf-gold">
              <SparkleIcon size={16} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl font-semibold font-mono text-perf-text-main">
              ${perfumes.reduce((acc, curr) => acc + curr.price, 0) * 8}
            </span>
            <span className="text-[10px] uppercase font-semibold text-perf-gold">
              Live Vault
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-perf-border bg-perf-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-perf-text-muted">
              Active Flacons
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-perf-input-bg text-perf-gold">
              <BottleIcon size={16} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl font-semibold font-mono text-perf-text-main">
              {perfumes.length} Flacons
            </span>
            <span className="text-[10px] uppercase font-semibold text-perf-gold">
              In Maceration
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-perf-border bg-perf-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-perf-text-muted">
              Enrolled Patrons
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-perf-input-bg text-perf-gold">
              <UsersIcon size={16} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl font-semibold font-mono text-perf-text-main">
              {users.length} Patrons
            </span>
            <span className="text-[10px] uppercase font-semibold text-perf-gold">
              Active Registry
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-perf-border bg-perf-card p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-perf-text-muted">
              Monthly Allocations
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-perf-input-bg text-perf-gold">
              <BagIcon size={16} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl font-semibold font-mono text-perf-text-main">
              48 Dispatches
            </span>
            <span className="text-[10px] uppercase font-semibold text-perf-gold">
              Delivered
            </span>
          </div>
        </div>
      </div>

      {/* 3. Perfume Analytics */}
      <DashboardChart perfumes={perfumes} />

      {/* 4. Recent Clients & Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Clients */}
        <div className="lg:col-span-8 rounded-3xl border border-perf-border bg-perf-card p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-perf-border/60">
            <h3 className="text-base font-serif-luxury font-normal text-perf-text-main">
              Recent Patron Registrations
            </h3>
            <p className="text-xs text-perf-text-muted">
              Latest clientele authenticated into the Maison register.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-perf-border/40 text-perf-text-muted uppercase text-[10px] font-bold tracking-widest">
                  <th className="pb-3 px-2">Patron Name</th>
                  <th className="pb-3 px-2">Email Address</th>
                  <th className="pb-3 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-perf-border/30">
                {users.slice(0, 4).map((user) => (
                  <tr key={user._id} className="hover:bg-perf-input-bg/40 transition-colors">
                    <td className="py-3 px-2 font-medium font-serif-luxury text-sm">
                      {user.name}
                    </td>
                    <td className="py-3 px-2 text-perf-text-muted font-mono text-xs">
                      {user.email}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold bg-perf-gold/15 text-perf-gold border border-perf-gold/30">
                        Authenticated
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Premium Fragrances */}
        <div className="lg:col-span-4 rounded-3xl border border-perf-border bg-perf-card p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-perf-border/60">
            <h3 className="text-base font-serif-luxury font-normal text-perf-text-main">
              Vault Highlights
            </h3>
            <p className="text-xs text-perf-text-muted">
              Active reserve formulations.
            </p>
          </div>

          <div className="space-y-3">
            {perfumes.slice(0, 4).map((perfume) => (
              <div
                key={perfume._id}
                className="flex items-center justify-between p-3 rounded-xl bg-perf-input-bg border border-perf-border/60"
              >
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-perf-text-main line-clamp-1 font-serif-luxury text-sm">
                    {perfume.title}
                  </p>
                  <p className="text-[10px] uppercase text-perf-gold font-medium">
                    {perfume.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold font-mono text-perf-text-main">
                    ${perfume.price}
                  </p>
                  <p className="text-[10px] text-perf-text-muted">
                    {perfume.gender}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;
