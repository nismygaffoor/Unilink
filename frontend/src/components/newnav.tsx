import { Link, useLocation } from "react-router-dom";
import theme from "../styles/theme";
import { AcademicCapIcon } from "@heroicons/react/24/solid";




export default function PublicNavbar() {
  const location = useLocation();
  return (
   
       <header
        className="w-full sticky top-0 z-40"
        style={{ background: theme.gradients.navbar }}
      >
       <nav className="max-w-8xl mx-auto px-10 py-1 flex items-center justify-between">
  {/* Logo */}
  <a href="/" className="flex flex-col items-start ml-7">
    <div className="flex items-center gap-1">
      <AcademicCapIcon className="w-16 h-10 text-white" />
      <span className="text-4xl font-extrabold text-white">UniLink</span>
    </div>
    <span className="text-xl text-gray-200 ml-6">Connect. Share. Learn.</span>
  </a> 

  {/* Desktop nav */}
   <ul className="hidden md:flex items-center gap-8">
    {["Home", "Faq", "Contact", "Login"].map((item) => (
      <li key={item}>
        <a
          href={item === "Login" ? "/login" : `#${item.toLowerCase()}`}
          className=" text-lg font-bold text-white hover:text-gray-200 transition"
        >
          {item}
        </a>
      </li>
    ))}
  </ul> 

  {/* Mobile button */}
   <a
    href="/login"
    className="md:hidden px-4 py-2 rounded-lg font-semibold bg-white text-teal-600"
  >
    Login
  </a>
</nav>

      </header> 

 
 
       
  );
}
