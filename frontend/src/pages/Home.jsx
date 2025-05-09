import React, { useEffect } from "react";
import { useProject } from "../contexts/ProjectContext";
import ProjectsDisplay from "../components/ProjectsDisplay";
import LandingHero from "../components/LandingHero";

const Home = () => {
  const { projects, loading, fetchProjects } = useProject();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Group projects by category
  const projectsData = {
    residential: projects.filter((p) => p.category === "home"),
    commercial: projects.filter((p) => p.category === "commercial"),
    hospitality: projects.filter((p) => p.category === "hospitality"),
  };

  return (
    <div>
      <LandingHero />
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : (
        <ProjectsDisplay projectsData={projectsData} />
      )}
    </div>
  );
};

export default Home;
