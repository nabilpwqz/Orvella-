import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  SparkleIcon,
  UserIcon,
  ShieldIcon,
  GoogleIcon,
} from "../../../components/common/Icons";
import { toast } from "react-toastify";
import { loginWithFirebase, loginDemoAccount, signInWithGoogle } from "../../../lib/authService";
import AOS from "aos";
import "aos/dist/aos.css";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDemoLogin = async (role: "user" | "admin") => {
    try {
      setDemoLoading(role);
      const user = await loginDemoAccount(role);
      toast.success(
        role === "admin"
          ? "Welcome, Atelier Director. Full administration granted."
          : `Welcome, ${user.name}. Scent atelier unlocked.`
      );
      navigate(role === "admin" ? "/dashboard" : "/");
    } catch (err: any) {
      toast.error(err.message || "Demo authentication failed");
    } finally {
      setDemoLoading(null);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const user = await signInWithGoogle();
      toast.success(`Welcome to Orvella, ${user.name}.`);
      navigate("/");
    } catch (err: any) {
      console.error("Google Sign In Error:", err);
      if (err?.code === "auth/popup-closed-by-user") {
        toast.info("Google authentication window closed.");
      } else if (err?.code === "auth/unauthorized-domain") {
        const hostname = typeof window !== "undefined" ? window.location.hostname : "this domain";
        toast.warn(
          `Domain "${hostname}" pending in Firebase Console. Entering as Verified Patron.`,
          { autoClose: 6000 }
        );
        await loginDemoAccount("user");
        navigate("/");
      } else {
        toast.error(err.message || "Failed to authenticate with Google.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter your email and private key.");
      return;
    }

    try {
      setLoading(true);
      await loginWithFirebase(formData.email, formData.password);
      toast.success("Welcome back to the Orvella Maison.");
      navigate("/");
    } catch (error: any) {
      console.error("Sign In Error:", error);
      let message = "Invalid email or private password key.";
      if (error?.code === "auth/unauthorized-domain") {
        const hostname = typeof window !== "undefined" ? window.location.hostname : "this domain";
        toast.warn(
          `Domain "${hostname}" pending in Firebase Console. Entering as Verified Patron.`,
          { autoClose: 6000 }
        );
        await loginDemoAccount("user");
        navigate("/");
        return;
      } else if (error?.code === "auth/invalid-credential" || error?.code === "auth/wrong-password") {
        message = "Incorrect credentials. Please verify or use Quick Atelier Demo.";
      } else if (error?.code === "auth/user-not-found") {
        message = "Account not found in Maison registry. Please register first.";
      } else if (error?.code === "auth/too-many-requests") {
        message = "Too many attempts. Access temporarily restricted.";
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-perf-bg flex items-center justify-center py-8 sm:py-12 px-3.5 sm:px-6 overflow-y-auto text-perf-text-main">
      <div
        data-aos="fade-up"
        className="w-full max-w-md rounded-2xl sm:rounded-3xl border border-perf-border bg-perf-card p-5 sm:p-8 md:p-10 shadow-xl my-auto"
      >
        {/* Header */}
        <div className="text-center space-y-1.5 sm:space-y-2">
          <Link to="/" className="inline-block">
            <span className="font-display text-lg sm:text-xl font-bold tracking-[0.3em] sm:tracking-[0.35em] text-perf-text-main hover:text-perf-gold transition-colors">
              ORVELLA
            </span>
          </Link>
          <div className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-perf-gold font-semibold">
            <SparkleIcon size={11} /> Client Authentication
          </div>
          <p className="text-[11px] sm:text-xs text-perf-text-muted pt-0.5 sm:pt-1 leading-relaxed">
            Access your private allocations and fragrance dossier
          </p>
        </div>

        {/* Section: Sign In with Google */}
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-2.5 sm:gap-3 rounded-xl border border-perf-border bg-perf-input-bg py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-xs font-semibold uppercase tracking-wide sm:tracking-wider text-perf-text-main hover:border-perf-gold hover:text-perf-gold transition-colors cursor-pointer shadow-xs disabled:opacity-50"
          >
            <GoogleIcon size={16} className="shrink-0" />
            <span className="truncate">{googleLoading ? "Connecting to Google..." : "Sign In with Google"}</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative my-4 sm:my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-perf-border/70" />
          </div>
          <span className="relative bg-perf-card px-2.5 sm:px-3 text-[9px] sm:text-[10px] uppercase tracking-widest text-perf-text-muted font-medium">
            or continue with credentials
          </span>
        </div>

        {/* Quick Demo Access */}
        <div className="p-3 sm:p-3.5 rounded-2xl bg-perf-input-bg/70 border border-perf-gold/30 space-y-2">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-perf-gold flex items-center gap-1">
              <SparkleIcon size={11} /> Quick Atelier Demo Access
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-perf-text-muted shrink-0">Instant</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("user")}
              disabled={Boolean(demoLoading)}
              className="flex items-center justify-center gap-1 sm:gap-1.5 rounded-xl border border-perf-border bg-perf-card py-2 px-1.5 sm:px-3 text-[11px] sm:text-xs font-semibold text-perf-text-main hover:border-perf-gold hover:text-perf-gold transition cursor-pointer shadow-xs disabled:opacity-50"
            >
              <UserIcon size={13} className="shrink-0" />
              <span className="truncate">{demoLoading === "user" ? "Entering..." : "Demo Patron"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              disabled={Boolean(demoLoading)}
              className="flex items-center justify-center gap-1 sm:gap-1.5 rounded-xl border border-perf-border bg-perf-card py-2 px-1.5 sm:px-3 text-[11px] sm:text-xs font-semibold text-perf-text-main hover:border-perf-gold hover:text-perf-gold transition cursor-pointer shadow-xs disabled:opacity-50"
            >
              <ShieldIcon size={13} className="shrink-0" />
              <span className="truncate">{demoLoading === "admin" ? "Entering..." : "Demo Director"}</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-4">
          {/* Email */}
          <div className="space-y-1 sm:space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-perf-text-muted">
              Email Address
            </label>
            <div className="flex items-center rounded-xl border border-perf-border bg-perf-input-bg px-3 sm:px-3.5 py-2.5 sm:py-3 transition focus-within:border-perf-gold">
              <MailIcon size={15} className="text-perf-text-muted mr-2 sm:mr-2.5 shrink-0" />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="patron@example.com"
                required
                className="w-full bg-transparent text-xs text-perf-text-main outline-none placeholder:text-perf-text-muted/60"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1 sm:space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-wider text-perf-text-muted">
                Private Key / Password
              </label>
              <span className="text-[9px] sm:text-[10px] text-perf-gold font-light">
                Secured
              </span>
            </div>
            <div className="flex items-center rounded-xl border border-perf-border bg-perf-input-bg px-3 sm:px-3.5 py-2.5 sm:py-3 transition focus-within:border-perf-gold">
              <LockIcon size={15} className="text-perf-text-muted mr-2 sm:mr-2.5 shrink-0" />
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="w-full bg-transparent text-xs text-perf-text-main outline-none placeholder:text-perf-text-muted/60"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-perf-text-muted hover:text-perf-text-main transition ml-1.5 sm:ml-2 cursor-pointer p-0.5"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-perf-gold py-3 sm:py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white transition hover:opacity-90 disabled:opacity-60 cursor-pointer shadow-sm mt-2 sm:mt-3"
          >
            {loading ? "Authenticating..." : "Sign In to Maison"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-5 sm:mt-6 text-center text-xs text-perf-text-muted">
          New to the Maison?{" "}
          <Link
            to="/auth/signup"
            className="font-semibold text-perf-gold hover:underline ml-1"
          >
            Register Membership
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
