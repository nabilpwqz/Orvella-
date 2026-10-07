import { NavLink } from "react-router-dom";

interface NavLinksProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLinks = ({ to, children, onClick }: NavLinksProps) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 px-3.5 py-2 select-none group
        ${
          isActive
            ? "text-perf-gold font-semibold"
            : "text-perf-text-muted hover:text-perf-text-main"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span>{children}</span>
          <span
            className={`absolute bottom-0 left-3.5 right-3.5 h-[1.5px] bg-perf-gold transition-all duration-300 ${
              isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100"
            }`}
          />
        </>
      )}
    </NavLink>
  );
};

export default NavLinks;
