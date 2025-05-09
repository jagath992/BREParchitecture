import React from 'react';
import ProjectsDisplay from '../components/ProjectsDisplay';

const CategoryPage = ({ projectsData, category }) => {
  return (
    <div>
      <ProjectsDisplay projectsData={projectsData} category={category} />
    </div>
  );
};

export default CategoryPage;