import { useEffect } from "react";
import { useRouteError, Link, useNavigate } from "react-router-dom";
import { HomeIcon, ArrowLeftIcon, AlertIcon, CompassIcon } from "../../components/common/Icons";
import AOS from "aos";
import "aos/dist/aos.css";

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

const ErrorPage = () => {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section className="min-h-screen w-full bg-perf-bg text-perf-text-main flex items-center justify-center py-8 sm:py-12 px-3.5 sm:px-6 lg:px-8 relative overflow-y-auto">
      <div
        data-aos="fade-up"
        className="relative w-full max-w-xl bg-perf-card border border-perf-border rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-12 text-center shadow-lg space-y-6 my-auto"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-perf-input-bg border border-perf-border text-perf-gold">
          <CompassIcon size={28} />
        </div>

        <div className="space-y-1">
          <span className="text-5xl sm:text-6xl font-serif-luxury font-light text-perf-gold tracking-tight">
            {error?.status || "404"}
          </span>
          <h2 className="text-xl sm:text-2xl font-serif-luxury font-normal text-perf-text-main">
            Olfactory Path Uncharted
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-perf-text-muted leading-relaxed max-w-md mx-auto">
          {error?.statusText ||
            error?.message ||
            "The requested flacon, private salon dispatch, or page has been moved or retired from the active register."}
        </p>

        {(error?.statusText || error?.message) && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-perf-input-bg border border-perf-border text-perf-gold text-xs font-mono">
            <AlertIcon size={14} className="shrink-0" />
            <span className="truncate max-w-xs">
              {error.statusText || error.message}
            </span>
          </div>
        )}

        <div className="pt-2 border-t border-perf-border/50" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-perf-border bg-perf-input-bg hover:border-perf-gold text-perf-text-main px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition duration-300 cursor-pointer"
          >
            <ArrowLeftIcon size={14} />
            <span>Previous Station</span>
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-perf-gold hover:opacity-90 text-white px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition duration-300 shadow-md"
          >
            <HomeIcon size={14} />
            <span>Return to Maison</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
