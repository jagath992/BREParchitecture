import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:5000";

interface Admin {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  location: string;
  role: string;
}

interface AdminContextType {
  admins: Admin[];
  loading: boolean;
  fetchAdmins: () => Promise<void>;
  addAdmin: (adminData: Omit<Admin, "_id">) => Promise<void>;
  updateAdmin: (id: string, adminData: Partial<Admin>) => Promise<void>;
  deleteAdmin: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    try {
    
      const response = await axios.get(`${API_URL}/api/admins`);
     
      const adminsData = Array.isArray(response.data) ? response.data : response.data.data || [];
      setAdmins(adminsData);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
      toast.error("Failed to fetch admins");
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addAdmin = async (adminData: Omit<Admin, "_id">) => {
    try {
      const response = await axios.post(`${API_URL}/api/admins`, adminData);
      setAdmins((prev) => [...prev, response.data]);
      toast.success("Admin added successfully");
    } catch (error) {
      toast.error("Failed to add admin");
      throw error;
    }
  };

  const updateAdmin = async (id: string, adminData: Partial<Admin>) => {
    try {
      const response = await axios.put(`${API_URL}/api/admins/${id}`, adminData);
      setAdmins((prev) =>
        prev.map((admin) =>
          admin._id === id ? { ...admin, ...response.data } : admin
        )
      );
      toast.success("Admin updated successfully");
    } catch (error) {
      toast.error("Failed to update admin");
      throw error;
    }
  };

  const deleteAdmin = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/api/admins/${id}`);
      setAdmins((prev) => prev.filter((admin) => admin._id !== id));
      toast.success("Admin deleted successfully");
    } catch (error) {
      toast.error("Failed to delete admin");
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
