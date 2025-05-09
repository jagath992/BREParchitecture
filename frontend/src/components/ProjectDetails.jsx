import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getCloudinaryImageUrl } from "../utils/imageProxy";

const ProjectDetails = ({ project }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(true);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <p className="text-gray-600 mb-8">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-700 hover:text-black transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Back</span>
        </button>
      </div>

      <div className="relative h-[70vh] w-full overflow-hidden">
        <div>
          <img
            src={project.mainPhoto}
            alt={project.title}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            style={{ opacity: 0, transition: "opacity 1s ease-in-out" }}
            onTransitionEnd={(e) => {
              if (e.propertyName === "opacity") {
                e.target.style.opacity = "1";
              }
            }}
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter mb-4">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h2 className="text-2xl font-medium text-gray-400 mb-2">
              Square Footage
            </h2>
            <p className="text-4xl font-bold">
              {project.sqft ? `${project.sqft} sqft` : "N/A"}
            </p>
          </div>

          <div className="md:w-2/3">
            <h2 className="text-2xl font-medium text-gray-400 mb-4">
              Project Overview
            </h2>
            <p className="text-xl leading-relaxed text-gray-800">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-light mb-16 tracking-tight">
          Gallery<span className="font-bold">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.descriptionPhotos.map((photo, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg"
            >
              <img
                src={getCloudinaryImageUrl(photo.url)}
                alt={photo.caption}
                className="w-full h-full object-cover aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-lg font-medium">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
