import { useState } from "react";
import { SparkleIcon, SendIcon } from "../../common/Icons";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section className="w-full text-perf-text-main py-20 px-6 sm:px-8 lg:px-12 bg-perf-card/50">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-perf-gold">
          <SparkleIcon size={14} />
          <span>The Orvella Society</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-light font-serif-luxury text-perf-text-main leading-tight">
          Private Allocations &amp; Scent Unveilings
        </h2>

        <p className="text-xs sm:text-sm text-perf-text-muted leading-relaxed max-w-lg mx-auto">
          Enroll in our private register for advance allocations of limited seasonal
          extractions, private salon invitations, and formulation essays.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto pt-2"
        >
          <div className="relative w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your preferred email address"
              required
              className="w-full px-5 py-3.5 rounded-full border border-perf-border bg-perf-input-bg text-perf-text-main text-xs outline-none focus:border-perf-gold transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-perf-gold text-white text-xs uppercase tracking-[0.2em] font-semibold hover:opacity-90 transition-all duration-300 shadow-md cursor-pointer shrink-0 flex items-center justify-center gap-2"
          >
            <span>Request Entry</span>
            <SendIcon size={13} />
          </button>
        </form>

        {subscribed && (
          <p className="text-xs text-perf-gold font-medium tracking-wide">
            Your request has been received. Welcome to The Orvella Society.
          </p>
        )}

        <div className="pt-6 flex items-center justify-center gap-8 text-[11px] uppercase tracking-[0.25em] text-perf-text-muted">
          <span>Private Bottlings</span>
          <span className="text-perf-gold">·</span>
          <span>Numbered Flacons</span>
          <span className="text-perf-gold">·</span>
          <span>Zero Solicitations</span>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
