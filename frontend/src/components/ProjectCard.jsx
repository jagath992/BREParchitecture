import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Edit2, Trash2 } from "lucide-react";

const ProjectCard = ({ project, onDelete }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.includes("/admin");

  const getImageUrl = (url) => {
    if (!url) return "/placeholder-image.jpg";
    // If it's a Cloudinary URL, add the necessary parameters
    if (url.includes("cloudinary.com")) {
      return url.replace("/upload/", "/upload/f_auto,q_auto/");
    }
    return url;
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/admin/project/${project._id}`);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await onDelete(project._id);
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleCardClick = () => {
    if (!isAdminRoute) {
      navigate(`/projects/project/${project._id}`);
    }
  };

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl bg-white cursor-pointer"
      onClick={handleCardClick}
    >
      {!isAdminRoute && (
        <Link
          to={`/projects/project/${project._id}`}
          className="absolute inset-0 z-10"
        />
      )}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={getImageUrl(project.mainPhoto)}
          alt={project.projectName}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "/placeholder-image.jpg";
          }}
          loading="lazy"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-white/70">
                {project.sqft ? `${project.sqft} sqft` : "View Details"}
              </p>
            </div>
            <ArrowUpRight className="text-white" size={20} />
          </div>
        </div>
      </div>

      <div className="flex flex-col p-6 flex-grow">
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          {project.projectName}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
          {project.description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="uppercase font-medium">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
          {isAdminRoute && (
            <div className="flex items-center gap-4 z-20 relative">
              <button
                onClick={handleEdit}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
