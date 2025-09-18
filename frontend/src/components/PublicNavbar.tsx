import { Link, useLocation } from "react-router-dom";
import theme from "../styles/theme";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
  { to: "/login", label: "Login" }
];

export default function PublicNavbar() {
  const location = useLocation();
  return (
    <nav
      className="flex justify-between items-center px-14 py-4 shadow-md"
      style={{ backgroundColor: theme.colors.white }}
    >
      {/* Logo / Web Name */}
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2">
          <AcademicCapIcon
            className="w-10 h-10"
            style={{ color: theme.colors.primary }}
          />
          <span
            className="text-4xl font-extrabold"
            style={{ color: theme.colors.primary }}
          >
            UniLink
          </span>
        </div>
        <span
          className="text-sm md:text-lg"
          style={{ color: theme.colors.textSecondary }}
        >
          Connect. Share. Learn.
        </span>
      </div>

      {/* Navigation Links */}
          <div className="flex gap-8">
        {navLinks.map(link => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xl font-medium relative px-2 py-1 transition-all duration-300 hover:scale-105`}
              style={{
                color: isActive
                  ? theme.colors.secondary
                  : theme.colors.textPrimary,
              }}
            >
              {link.label}
              {isActive && (
                <span
                  className="absolute -bottom-1 left-0 w-full h-1 rounded-full"
                  style={{ backgroundColor: theme.colors.secondary }}
                ></span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
