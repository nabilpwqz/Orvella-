import React from "react";
import { Link } from "react-router-dom";
import { TrashIcon, EyeIcon, LoaderIcon, AlertIcon } from "../../../common/Icons";
import type { Perfume } from "../../../../types/perfume";

interface ManagePerfumeTableProps {
  loading: boolean;
  filteredPerfumes: Perfume[];
  deletingId: string | null;
  onDeleteClick: (perfume: Perfume) => void;
}

const ManagePerfumeTable: React.FC<ManagePerfumeTableProps> = ({
  loading,
  filteredPerfumes,
  deletingId,
  onDeleteClick,
}) => {
  return (
    <div className="rounded-3xl border border-perf-border bg-perf-card shadow-sm overflow-hidden w-full">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <LoaderIcon size={28} className="text-perf-gold" />
          <p className="text-xs font-semibold tracking-widest uppercase text-perf-text-muted">
            Accessing Maison Vault...
          </p>
        </div>
      ) : filteredPerfumes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
          <AlertIcon size={32} className="text-perf-gold" />
          <p className="text-sm font-serif-luxury text-perf-text-main">
            No matching flacons found in current catalog.
          </p>
          <p className="text-xs text-perf-text-muted max-w-sm">
            Adjust your search terms or catalog a new fragrance creation.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-perf-border bg-perf-input-bg text-perf-text-muted uppercase text-[10px] font-bold tracking-widest">
                <th className="py-4 px-6">Flacon Creation</th>
                <th className="py-4 px-4 hidden md:table-cell">Concentration</th>
                <th className="py-4 px-4">Orientation</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-6 text-right">Atelier Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-perf-border/40 text-perf-text-main">
              {filteredPerfumes.map((perfume) => (
                <tr
                  key={perfume._id}
                  className="group hover:bg-perf-input-bg/60 transition-colors"
                >
                  {/* Flacon Visual + Name */}
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl overflow-hidden bg-perf-input-bg border border-perf-border shrink-0">
                        <img
                          src={perfume.imageUrl}
                          alt={perfume.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-semibold text-perf-text-main font-serif-luxury text-base line-clamp-1">
                          {perfume.title}
                        </p>
                        <p className="text-[10px] text-perf-text-muted font-mono">
                          LOT: {perfume._id.slice(-6).toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Concentration */}
                  <td className="py-3.5 px-4 font-medium text-perf-gold hidden md:table-cell text-xs">
                    {perfume.category}
                  </td>

                  {/* Gender */}
                  <td className="py-3.5 px-4 text-perf-text-muted text-xs">
                    {perfume.gender}
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 font-mono font-bold text-perf-text-main text-xs">
                    ${perfume.price}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/perfumes/${perfume._id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-xl border border-perf-border bg-perf-input-bg text-perf-text-muted hover:border-perf-gold hover:text-perf-gold transition"
                        title="View Flacon"
                      >
                        <EyeIcon size={14} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => onDeleteClick(perfume)}
                        disabled={deletingId === perfume._id}
                        className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition cursor-pointer disabled:opacity-50"
                        title="Archive Flacon"
                      >
                        {deletingId === perfume._id ? (
                          <LoaderIcon size={13} />
                        ) : (
                          <TrashIcon size={14} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManagePerfumeTable;
