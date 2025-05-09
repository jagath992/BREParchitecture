import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Teams", path: "/teams" },
  ];

  const linkClass =
    "text-black text-lg font-bold hover:scale-110 transition-transform duration-200";

  const activeClass = "underline decoration-2 underline-offset-8";

  return (
    <nav className="fixed top-0 left-0 w-full bg-[rgb(238,238,238)] backdrop-blur-lg px-4 py-3 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <img src="/brep-bgr.png" alt="Logo" className="h-12" />

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="relative">
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="md:hidden absolute left-0 top-full w-full bg-[rgb(238,238,238)] p-4 flex flex-col gap-5 text-black font-bold shadow-md"
          >
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeClass : ""}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
