import React, { useState } from "react";
import { useProject } from "../contexts/ProjectContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import PhotoUpload from "../components/PhotoUpload";
import { Plus, ArrowLeft, Save } from "lucide-react";

const AddProject = () => {
  const navigate = useNavigate();
  const { addProject } = useProject();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    category: "home",
    sqft: "",
    description: "",
    mainPhoto: null,
    descriptionPhotos: [],
  });

  const [descriptionPhotoFiles, setDescriptionPhotoFiles] = useState([]);
  const [newCaptions, setNewCaptions] = useState({});

  // Calculate total photos and check if we can add more
  const totalPhotos = descriptionPhotoFiles.length;
  const canAddMorePhotos = totalPhotos < 8;
  const isPhotosEven = totalPhotos % 2 === 0;

  // Handle caption changes
  const handleCaptionChange = (photoId, caption) => {
    setNewCaptions((prev) => ({
      ...prev,
      [photoId]: caption,
    }));
  };

  // Handle main photo change
  const handleMainPhotoChange = (file) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        mainPhoto: file,
      }));
    }
  };

  // Handle new photo uploads
  const handleNewPhotoUpload = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const remainingSlots = 8 - totalPhotos;
      const filesToAdd = files.slice(0, remainingSlots);

      if (filesToAdd.length < files.length) {
        toast.warning(`Only ${remainingSlots} more photos can be added`);
      }

      // Create preview URLs for new files
      const newFiles = filesToAdd.map((file) => {
        const url = URL.createObjectURL(file);
        return {
          file,
          preview: url,
          originalname: file.name,
        };
      });

      setDescriptionPhotoFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // Clean up preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      descriptionPhotoFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [descriptionPhotoFiles]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("projectName", formData.projectName);
      submitData.append("category", formData.category);
      submitData.append("sqft", formData.sqft);
      submitData.append("description", formData.description);

      if (formData.mainPhoto) {
        submitData.append("mainPhoto", formData.mainPhoto);
      }

      // Add description photos and their captions
      descriptionPhotoFiles.forEach((file, index) => {
        if (file && file.file) {
          submitData.append("descriptionPhotos", file.file);
          const caption = newCaptions[`photo_${index}`] || "";
          submitData.append(`caption_${file.file.name}`, caption);
        }
      });

      await addProject(submitData);
      toast.success("Project added successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error(error.response?.data?.message || "Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-16">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Add New Project</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded-lg space-y-6"
      >
        <div className="mb-4">
          <label
            htmlFor="projectName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Project Name
          </label>
          <input
            id="projectName"
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Modern Lakeside Villa"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="home">Home</option>
            <option value="commercial">Commercial</option>
            <option value="hospitality">Hospitality</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="sqft"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Square Footage
          </label>
          <input
            id="sqft"
            type="text"
            name="sqft"
            value={formData.sqft}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. 3500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            placeholder="Describe the project"
            required
          />
        </div>

        <PhotoUpload
          label="Main Project Photo"
          onChange={handleMainPhotoChange}
        />

        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Description Photos</h3>
            {canAddMorePhotos && (
              <label className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors duration-200 cursor-pointer">
                <Plus size={16} />
                <span>Add Photos</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleNewPhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {descriptionPhotoFiles.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Add photos to showcase your project
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {descriptionPhotoFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={file.preview}
                    alt={`Description ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Add caption..."
                    value={newCaptions[`photo_${index}`] || ""}
                    onChange={(e) =>
                      handleCaptionChange(`photo_${index}`, e.target.value)
                    }
                    className="mt-2 w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-4 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !isPhotosEven}
            className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            <span>
              {loading
                ? "Adding..."
                : !isPhotosEven
                ? "Add even number of photos"
                : "Add Project"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
