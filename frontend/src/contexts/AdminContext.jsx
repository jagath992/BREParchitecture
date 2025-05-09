import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:5000";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

const AdminProvider = ({ children }) => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/admins`, {
        withCredentials: true,
      });

     

      // Check if response data is an array
      if (response.data && Array.isArray(response.data)) {
        setAdmins(response.data);
      } else {
        throw new Error("Invalid response format: expected an array of admins");
      }
    } catch (error) {
      console.error("Failed to fetch admins:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch admins");
      }
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addAdmin = async (adminData) => {
    try {
      const response = await axios.post(`${API_URL}/api/admins`, adminData, {
        withCredentials: true,
      });
      
      console.log("Add admin response:", response.data);
      
      if (response.data) {
        setAdmins((prev) => [...prev, response.data]);
        toast.success("Admin added successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add admin");
      throw error;
    }
  };

  const updateAdmin = async (id, adminData) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/admins/${id}`,
        adminData,
        {
          withCredentials: true,
        }
      );
      
      console.log("Update admin response:", response.data);
      
      if (response.data) {
        setAdmins((prev) =>
          prev.map((admin) =>
            admin._id === id ? { ...admin, ...response.data } : admin
          )
        );
        toast.success("Admin updated successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update admin");
      throw error;
    }
  };

  const deleteAdmin = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/admins/${id}`, {
        withCredentials: true,
      });
      
      console.log("Delete admin response:", response.data);
      
      if (response.data) {
        setAdmins((prev) => prev.filter((admin) => admin._id !== id));
        toast.success("Admin deleted successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete admin");
      throw error;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        admins,
        loading,
        fetchAdmins,
        addAdmin,
        updateAdmin,
        deleteAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export { AdminProvider };
