import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProjectPage from "./pages/ProjectPage";
import fetchProjects from "./utils/fetchProjects";

function ProjectTotalPage() {
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjectsData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
        setLoading(false);
        console.error("Error loading projects:", err);
      }
    };

    getProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Oops!</h2>
        <p className="text-gray-600 mb-8">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route index element={<Home projectsData={projectsData} />} />
        <Route
          path="commercial"
          element={<CategoryPage projectsData={projectsData} category="commercial" />}
        />
        <Route
          path="hospitality"
          element={<CategoryPage projectsData={projectsData} category="hospitality" />}
        />
        <Route path="project/:id" element={<ProjectPage />} />
      </Routes>
    </div>
  );
}

export default ProjectTotalPage;
