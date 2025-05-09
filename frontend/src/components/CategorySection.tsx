import React from "react";
import ProjectCard from "./ProjectCard";

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

interface CategorySectionProps {
  title: string;
  projects: Project[];
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  projects,
}) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-light mb-12 tracking-tight">
          {title}
          <span className="font-bold">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
