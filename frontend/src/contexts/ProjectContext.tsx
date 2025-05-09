import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:5000";

interface Project {
  _id: string;
  projectName: string;
  description: string;
  mainPhoto: string;
  sqft: string;
  category: string;
  descriptionPhotos: Array<{
    url: string;
    caption: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  fetchProjects: () => Promise<void>;
  addProject: (
    projectData: Omit<Project, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateProject: (id: string, projectData: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  getProjectById: (id: string) => Promise<Project | null>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const isFetching = useRef(false);

  const fetchProjects = useCallback(async () => {
    if (isFetching.current) return;

    try {
      isFetching.current = true;
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/projects`);
      const projectsData = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      setProjects(projectsData);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      toast.error("Failed to fetch projects");
      setProjects([]);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, []);

  const addProject = async (
    projectData: Omit<Project, "_id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/projects`,
        projectData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000, // 30 seconds timeout
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );
      setProjects((prev) => [...prev, response.data]);
      toast.success("Project added successfully");
    } catch (error: any) {
      console.error("Failed to add project:", error);
      if (error.code === "ECONNABORTED") {
        toast.error("Request timed out. Please try again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to add project");
      }
      throw error;
    }
  };

  const updateProject = async (id: string, projectData: Partial<Project>) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/projects/${id}`,
        projectData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000, // 30 seconds timeout
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );
      setProjects((prev) =>
        prev.map((project) =>
          project._id === id ? { ...project, ...response.data } : project
        )
      );
      toast.success("Project updated successfully");
    } catch (error: any) {
      console.error("Failed to update project:", error);
      if (error.code === "ECONNABORTED") {
        toast.error("Request timed out. Please try again.");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to update project"
        );
      }
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/api/projects/${id}`);
      setProjects((prev) => prev.filter((project) => project._id !== id));
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
      throw error;
    }
  };

  const getProjectById = async (id: string): Promise<Project | null> => {
    const cached = projects.find((p) => p._id === id);
    if (cached) return cached;

    try {
      const response = await axios.get(`${API_URL}/api/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch project:", error);
      toast.error("Failed to fetch project");
      return null;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        fetchProjects,
        addProject,
        updateProject,
        deleteProject,
        getProjectById,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
