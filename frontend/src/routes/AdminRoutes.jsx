import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminList from "../pages/AdminList";
import CreateAdmin from "../pages/CreateAdmin";
import EditAdmin from "../pages/EditAdmin";
import AdminProfile from "../pages/AdminProfile";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/list" element={<AdminList />} />
      <Route path="/create" element={<CreateAdmin />} />
      <Route path="/edit/:id" element={<EditAdmin />} />
      <Route path="/profile" element={<AdminProfile />} />
      <Route path="/" element={<Navigate to="/admin/list" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
