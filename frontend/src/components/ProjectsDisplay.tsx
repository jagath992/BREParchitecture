import React from 'react';
import CategorySection from './CategorySection';

interface Project {
  _id: string;
  projectName: string;
  description: string;
  category: string;
  mainPhoto: string;
  sqft: string;
  descriptionPhotos: Array<{
    url: string;
    caption: string;
  }>;
}

interface ProjectsData {
  residential: Project[];
  commercial: Project[];
  hospitality: Project[];
}

interface ProjectsDisplayProps {
  projectsData: ProjectsData;
  category?: 'residential' | 'commercial' | 'hospitality';
}

const ProjectsDisplay: React.FC<ProjectsDisplayProps> = ({ projectsData, category }) => {
  if (!projectsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  const { residential, commercial, hospitality } = projectsData;

  // If category is specified, only show that category
  if (category === 'residential') {
    return (
      <div className="pt-20">
        <CategorySection title="Residential" projects={residential} />
      </div>
    );
  }

  if (category === 'commercial') {
    return (
      <div className="pt-20">
        <CategorySection title="Commercial" projects={commercial} />
      </div>
    );
  }

  if (category === 'hospitality') {
    return (
      <div className="pt-20">
        <CategorySection title="Hospitality" projects={hospitality} />
      </div>
    );
  }

  // If no category is specified, show all categories
  return (
    <div className="pt-20">
      {residential.length > 0 && <CategorySection title="Residential" projects={residential} />}
      {commercial.length > 0 && <CategorySection title="Commercial" projects={commercial} />}
      {hospitality.length > 0 && <CategorySection title="Hospitality" projects={hospitality} />}
    </div>
  );
};

export default ProjectsDisplay;