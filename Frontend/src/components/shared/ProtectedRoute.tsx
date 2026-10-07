import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserSession } from "../../lib/core/session";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = getUserSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      if (!toast.isActive("auth-required")) {
        toast.warning("Please sign in to access this private section.", {
          toastId: "auth-required",
        });
      }
      navigate("/auth/signin");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-perf-bg">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-perf-border border-t-perf-gold" />
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
