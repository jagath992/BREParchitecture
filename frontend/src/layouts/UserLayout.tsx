import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Users/Navbar";

const UserLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
