import { NavLink } from "react-router-dom";

type NavItemProps = {
  to: string;
  title: string;
  icon: React.ElementType;
};

const NavItem = ({ to, title, icon: Icon }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300
        ${
          isActive
            ? "bg-perf-gold text-white shadow-md"
            : "text-perf-text-muted hover:bg-perf-gold/10 hover:text-perf-gold"
        }`
      }
    >
      <Icon size={18} />

      <span>{title}</span>
    </NavLink>
  );
};

export default NavItem;
