import React from "react";
import { Plus } from "../utils/icons";
import { Link } from "react-router-dom";

const FloatingActionButton = ({ to, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-20 flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
      aria-label="Add New"
    >
      <Plus size={24} />
    </Link>
  );
};

export default FloatingActionButton;
