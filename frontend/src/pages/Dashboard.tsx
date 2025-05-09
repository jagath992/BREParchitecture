import React, { useEffect } from "react";
import { useProject } from "../contexts/ProjectContext";
import { useAdmin } from "../contexts/AdminContext";

const Dashboard: React.FC = () => {
  const { projects, loading: projectsLoading, fetchProjects } = useProject();
  const { admins, loading: adminsLoading, fetchAdmins } = useAdmin();

  useEffect(() => {
    fetchProjects();
    fetchAdmins();
  }, [fetchProjects, fetchAdmins]);

  if (projectsLoading || adminsLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <div>
          <h2>Projects Overview</h2>
          <p>Total Projects: {projects.length}</p>
        </div>
        <div>
          <h2>Admins Overview</h2>
          <p>Total Admins: {admins.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
