import React, { useState } from "react";
import { SendIcon, LoaderIcon, SparkleIcon } from "../common/Icons";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [inquiryType, setInquiryType] = useState("bespoke");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success("Your inquiry has been relayed to the Master Perfumer.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to relay message.");
    } finally {
      setLoading(false);
    }
  };

  const topics = [
    { id: "bespoke", label: "Bespoke Scent Profile" },
    { id: "allocation", label: "Private Allocation" },
    { id: "flagship", label: "Flagship Appointment" },
    { id: "press", label: "Press & Cultural Inquiry" },
  ];

  return (
    <section className="bg-perf-bg pb-20 sm:pb-28 pt-6 sm:pt-8 text-perf-text-main">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <div className="rounded-2xl sm:rounded-3xl border border-perf-border bg-perf-card p-5 sm:p-10 md:p-14 shadow-lg relative">
          <div className="text-center space-y-2 mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-perf-gold">
              <SparkleIcon size={12} /> Direct Transmission
            </span>
            <h2 className="text-2xl sm:text-4xl font-light font-serif-luxury text-perf-text-main">
              Inquire With The Atelier
            </h2>
            <p className="text-xs sm:text-sm text-perf-text-muted max-w-md mx-auto">
              Select your inquiry topic to route your dispatch to the appropriate
              Maison department.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Inquiry Type Chips (4 options) */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-perf-text-muted">
                Nature of Dispatch
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {topics.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setInquiryType(t.id)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-[10px] sm:text-[11px] uppercase tracking-normal sm:tracking-wider font-semibold transition-all duration-300 cursor-pointer text-center ${
                      inquiryType === t.id
                        ? "bg-perf-gold text-white border-perf-gold shadow-sm"
                        : "bg-perf-input-bg border-perf-border text-perf-text-muted hover:border-perf-gold/60"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-perf-text-muted">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Alexandra Laurent"
                  required
                  className="w-full rounded-xl border border-perf-border bg-perf-input-bg px-4 py-3 text-xs text-perf-text-main outline-none focus:border-perf-gold transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-perf-text-muted">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alexandra@example.com"
                  required
                  className="w-full rounded-xl border border-perf-border bg-perf-input-bg px-4 py-3 text-xs text-perf-text-main outline-none focus:border-perf-gold transition-colors"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-perf-text-muted">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Brief subject of inquiry..."
                required
                className="w-full rounded-xl border border-perf-border bg-perf-input-bg px-4 py-3 text-xs text-perf-text-main outline-none focus:border-perf-gold transition-colors"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-perf-text-muted">
                Detailed Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Share your olfactory preferences, questions, or appointment schedule..."
                required
                className="w-full rounded-xl border border-perf-border bg-perf-input-bg px-4 py-3 text-xs text-perf-text-main outline-none focus:border-perf-gold transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-perf-gold text-white text-xs uppercase tracking-[0.25em] font-semibold hover:opacity-90 transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <LoaderIcon size={14} />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Transmit Dispatch</span>
                    <SendIcon size={14} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
