import { useState } from "react";
import { motion } from "framer-motion";
import './Navbar.css';
import { useNavigate } from "react-router-dom"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleNavClick = (item) => {
    setIsOpen(false); 
    if (item === "Projects") {
      navigate("/projects");  
    } else if (item === "Home") {
      navigate("/"); 
    }
  };

  const navItems = ["Home", "Projects","Contact"];  

  return (
    <nav className="fixed top-0 left-0 w-full bg-[rgb(238,238,238)] backdrop-blur-lg px-4 py-3 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <img src="/brep-bgr.png" alt="Logo" className="h-12" />

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => handleNavClick(item)}
              className="text-black text-lg font-bold"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              {item}
            </motion.button>
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
              <li key={index} className="cursor-pointer" onClick={() => handleNavClick(item)}>
                {item}
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
