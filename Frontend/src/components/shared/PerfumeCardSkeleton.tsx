const PerfumeCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-3xl border border-perf-border bg-perf-card overflow-hidden">
      {/* Image */}
      <div className="h-72 w-full bg-perf-input-bg" />

      <div className="p-5 space-y-4">
        {/* Category */}
        <div className="h-3 w-20 rounded bg-perf-input-bg" />

        {/* Title */}
        <div className="h-5 w-3/4 rounded bg-perf-input-bg" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 rounded bg-perf-input-bg" />
          <div className="h-3 w-5/6 rounded bg-perf-input-bg" />
        </div>

        {/* Price */}
        <div className="h-5 w-24 rounded bg-perf-input-bg" />

        {/* Button */}
        <div className="h-10 w-full rounded-xl bg-perf-input-bg" />
      </div>
    </div>
  );
};

export default PerfumeCardSkeleton;
