import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="group flex items-center select-none text-center">
      <span className="font-display text-xl sm:text-2xl font-bold tracking-[0.32em] text-perf-text-main group-hover:text-perf-gold transition-colors duration-300">
        ORVELLA
      </span>
    </Link>
  );
};

export default Logo;
