import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
  { to: "/login", label: "Login" }
];

export default function PublicNavbar() {
  const location = useLocation();
  return (
    <nav className="bg-white shadow flex justify-between items-center px-8 py-4">
      <span className="text-2xl font-bold text-blue-700">UniLink</span>
      <div className="flex gap-6">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-blue-800 hover:underline ${
              location.pathname === link.to ? "font-bold underline" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
} 