import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProject } from "../contexts/ProjectContext";
import ProjectDetails from "../components/ProjectDetails";

const ProjectPage = () => {
  const { id } = useParams();
  const { getProjectById } = useProject();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        const fetchedProject = await getProjectById(id);
        setProject(fetchedProject);
      }
      setLoading(false);
    };
    fetch();
  }, [id, getProjectById]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return <ProjectDetails project={project} />;
};

export default ProjectPage;
