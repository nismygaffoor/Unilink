import { Link, useNavigate, useLocation } from "react-router-dom";
import Avatar from "react-avatar";
import { useState, useRef, useEffect } from "react";
import {
  AcademicCapIcon,
  CalendarIcon,
  UsersIcon,
  CpuChipIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import theme from "../styles/theme";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: CpuChipIcon },
  { to: "/repository", label: "Resources", icon: AcademicCapIcon },
  { to: "/events", label: "Events", icon: CalendarIcon },
  { to: "/forum", label: "Forum", icon: UsersIcon },
  { to: "/leaderboard", label: "Leaderboard", icon: TrophyIcon },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = localStorage.getItem("userEmail") || "";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    localStorage.removeItem("userEmail");
    navigate("/"); // Redirect to landing page
  }

  return (
    <header className="w-full shadow-md">
      {/* Top Navbar (White) */}
      <div className="flex justify-between items-center bg-white px-14 py-3">
        {/* Logo / Web Name */}
        <div className="flex flex-col items-start ml-28">
          <div className="flex items-center gap-1">
            <AcademicCapIcon className="w-16 h-10 text-teal-600" />
            <span className="text-4xl font-extrabold text-teal-600">UniLink</span>
          </div>
          <span className="text-lg text-gray-500 ml-6">Connect. Share. Learn.</span>
        </div>
      </div>

      {/* Secondary Navbar (Centered with gap) */}
      <nav
        className="flex justify-center items-center gap-20 px-2 py-2"
        style={{ backgroundColor: theme.colors.primary }}
      >
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          return (
           <Link
  key={link.to}
  to={link.to}
  className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 relative ${
    isActive
      ? "text-white font-semibold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[3px] after:bg-white"
      : "text-white hover:text-gray-200"
  }`}
>
  <Icon className="w-8 h-8" />
  <span className="text-lg font-medium">{link.label}</span>
</Link>

          );
        })}

        {/* Profile Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center focus:outline-none"
          >
            <Avatar name={userEmail} size="40" round={true} />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-left px-4 py-2 text-teal-700 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

