import React, { useEffect, useCallback, useMemo } from "react";
import { useProject } from "../contexts/ProjectContext";
import { useAdmin } from "../contexts/AdminContext";
import ProjectCard from "../components/ProjectCard";
import FloatingActionButton from "../components/FloatingActionButton";

const Dashboard = () => {
  const {
    projects,
    loading: projectsLoading,
    fetchProjects,
    deleteProject,
  } = useProject();
  const { admins, loading: adminsLoading, fetchAdmins } = useAdmin();

  const loadData = useCallback(async () => {
    try {
      await Promise.all([fetchProjects(), fetchAdmins()]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  }, [fetchProjects, fetchAdmins]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const projectCards = useMemo(() => {
    if (!projects || !Array.isArray(projects) || projects.length === 0) {
      return (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            No Projects Yet
          </h2>
          <p className="text-gray-600 mb-6">
            Add your first project to get started
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onDelete={deleteProject}
          />
        ))}
      </div>
    );
  }, [projects, deleteProject]);

  if (projectsLoading || adminsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Total Projects
            </h2>
            <p className="text-4xl font-bold text-indigo-600">
              {Array.isArray(projects) ? projects.length : 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Total Admins
            </h2>
            <p className="text-4xl font-bold text-indigo-600">
              {Array.isArray(admins) ? admins.length : 0}
            </p>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-2">
            Manage your architectural projects
          </p>
        </header>

        {projectCards}
      </div>

      <FloatingActionButton to="/admin/add-project" />
    </div>
  );
};

export default Dashboard;
