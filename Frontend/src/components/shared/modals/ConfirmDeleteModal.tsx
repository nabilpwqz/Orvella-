import React, { useState } from "react";
import { AlertIcon, CloseIcon } from "../../common/Icons";
import { toast } from "react-toastify";
import type { Perfume } from "../../../types/perfume";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemToDelete: Perfume | null;
  onDeleteConfirm: (
    id: string,
  ) => Promise<{ success: boolean; message?: string }>;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  itemToDelete,
  onDeleteConfirm,
}) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleConfirmDelete = async () => {
    if (!itemToDelete?._id) return;

    setIsDeleting(true);
    try {
      const res = await onDeleteConfirm(itemToDelete._id);

      if (res?.success) {
        toast.success(
          `"${itemToDelete.title}" has been permanently retired from the vault.`,
        );
        onClose();
      } else {
        toast.error(res?.message || "Failed to delete the perfume.");
      }
    } catch (error) {
      toast.error("Failed to delete the perfume item.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen || !itemToDelete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60 transition-all">
      <div className="max-w-md w-full border border-perf-border p-6 sm:p-8 rounded-3xl shadow-2xl relative bg-perf-card text-perf-text-main">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 text-perf-text-muted hover:text-perf-text-main transition-colors cursor-pointer"
        >
          <CloseIcon size={18} />
        </button>

        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          {/* Warning Icon */}
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500">
            <AlertIcon size={26} />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-serif-luxury font-normal text-perf-text-main">
              Confirm Flacon Deletion
            </h3>
            <p className="text-xs text-perf-text-muted px-2 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <span className="text-perf-gold font-semibold">
                "{itemToDelete.title}"
              </span>{" "}
              from the active Maison catalogue? This action cannot be undone.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 w-full pt-4 border-t border-perf-border/50">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 py-3 px-4 rounded-xl border border-perf-border bg-perf-input-bg text-perf-text-muted hover:text-perf-text-main text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider transition cursor-pointer shadow-md disabled:opacity-50"
            >
              {isDeleting ? "Retiring..." : "Permanently Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
