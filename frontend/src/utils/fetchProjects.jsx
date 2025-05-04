import axios from 'axios';

const fetchProjects = async () => {
  try {
    const response = await axios.get("http://localhost:5000/projects"); 
    const projectDetails = response.data;

    const residential = projectDetails.filter(
      (project) => project.category === "home" 
    );
    const commercial = projectDetails.filter(
      (project) => project.category === "commercial"
    );
    const hospitality = projectDetails.filter(
      (project) => project.category === "hospitality"
    );

    return { projectDetails, residential, commercial, hospitality };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { projectDetails: [], residential: [], commercial: [], hospitality: [] };
  }
};

export default fetchProjects;
