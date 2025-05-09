import { Project, ProjectsData } from '../types';

const fetchProjects = async (): Promise<ProjectsData> => {
  try {
    const res = await fetch('http://localhost:5000/api/project');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const projectDetails: Project[] = await res.json();

    const residential = projectDetails.filter(
      (project) => project.category === 'home'
    );
    const commercial = projectDetails.filter(
      (project) => project.category === 'commercial'
    );
    const hospitality = projectDetails.filter(
      (project) => project.category === 'hospitality'
    );

    return { projectDetails, residential, commercial, hospitality };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return {
      projectDetails: [],
      residential: [],
      commercial: [],
      hospitality: [],
    };
  }
};

export default fetchProjects;
