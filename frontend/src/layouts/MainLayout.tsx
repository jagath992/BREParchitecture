import React, { useState } from "react";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { Menu, X, Building2, UserPlus, User, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

const MainLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout");
    }
  };

  const menuItems = [
    {
      path: "/admin/dashboard",
      label: "Projects",
      icon: <Building2 className="mr-2" size={20} />,
    },
    {
      path: "/admin/admin-profile",
      label: "Admin Profile",
      icon: <User className="mr-2" size={20} />,
    },
    {
      path: "/admin/admin-addition",
      label: "Add Admin",
      icon: <UserPlus className="mr-2" size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8 pt-10">Architektur</h1>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <LogOut className="mr-2" size={20} />
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-30 lg:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Main Content */}
      <div className="p-4 sm:p-6 md:p-8 pt-16">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
