import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X } from "../utils/icons";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import PhotoUpload from "../components/PhotoUpload";
import { useProject } from "../contexts/ProjectContext";

const API_URL = "http://localhost:5000";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateProject } = useProject();
  const [project, setProject] = useState({
    projectName: "",
    category: "",
    sqft: "",
    description: "",
    mainPhoto: "",
    descriptionPhotos: [],
  });

  const [mainPhotoFile, setMainPhotoFile] = useState(null);
  const [descriptionPhotoFiles, setDescriptionPhotoFiles] = useState([]);
  const [newCaptions, setNewCaptions] = useState({});
  const [cachedImageUrls, setCachedImageUrls] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [initialProject, setInitialProject] = useState(null);

  // Calculate total photos and check if we can add more
  const totalPhotos =
    project.descriptionPhotos.length + descriptionPhotoFiles.length;
  const canAddMorePhotos = totalPhotos < 8;
  const isPhotosEven = totalPhotos % 2 === 0;

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setError("Project ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`${API_URL}/api/projects/${id}`);

        if (!data) {
          setError("Project not found");
          return;
        }

        const projectData = {
          projectName: data.projectName || "",
          category: data.category || "",
          sqft: data.sqft || "",
          description: data.description || "",
          mainPhoto: data.mainPhoto || "",
          descriptionPhotos: data.descriptionPhotos || [],
        };

        setProject(projectData);
        setInitialProject(projectData);

        // Set initial captions for existing photos
        const initialCaptions = {};
        data.descriptionPhotos?.forEach((photo) => {
          if (photo && photo._id) {
            initialCaptions[photo._id] = photo.caption || "";
          }
        });
        setNewCaptions(initialCaptions);

        // Create cached URLs for images
        const imageCache = {
          mainPhoto: projectData.mainPhoto,
        };

        projectData.descriptionPhotos?.forEach((photo) => {
          if (photo && photo._id) {
            imageCache[photo._id] = photo.url;
          }
        });

        setCachedImageUrls(imageCache);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err.response?.data?.message || "Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Check for changes
  useEffect(() => {
    if (!initialProject) return;

    const hasProjectChanges =
      project.projectName !== initialProject.projectName ||
      project.category !== initialProject.category ||
      project.sqft !== initialProject.sqft ||
      project.description !== initialProject.description ||
      mainPhotoFile !== null ||
      descriptionPhotoFiles.length > 0 ||
      Object.keys(newCaptions).some(
        (key) =>
          newCaptions[key] !==
          initialProject.descriptionPhotos.find((p) => p._id === key)?.caption
      );

    setHasChanges(hasProjectChanges);
  }, [
    project,
    initialProject,
    mainPhotoFile,
    descriptionPhotoFiles,
    newCaptions,
  ]);

  // Handle caption changes
  const handleCaptionChange = (photoId, caption) => {
    if (!photoId) return;
    setNewCaptions((prev) => ({
      ...prev,
      [photoId]: caption || "",
    }));
  };

  // Handle main photo change
  const handleMainPhotoChange = (file) => {
    if (file) {
      setMainPhotoFile(file);
      // Update the preview immediately
      const previewUrl = URL.createObjectURL(file);
      setCachedImageUrls((prev) => ({
        ...prev,
        mainPhoto: previewUrl,
      }));
    }
  };

  // Handle description photos change
  const handleDescriptionPhotosChange = (files) => {
    setDescriptionPhotoFiles(files);
  };

  // Helper function to get image URL with transformations
  const getImageUrl = (url) => {
    if (!url) return "";
    if (!url.includes("cloudinary.com")) return url;

    // Extract the version and public ID from the URL
    const matches = url.match(/\/v(\d+)\/([^/]+)$/);
    if (!matches) return url;

    const [, version, publicId] = matches;
    return `https://res.cloudinary.com/dwafpyiuy/image/upload/fl_force_strip,f_auto,q_auto,dpr_auto,w_auto,c_scale/v${version}/${publicId}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!id) {
      toast.error("Project ID is missing");
      setLoading(false);
      return;
    }

    if (!isPhotosEven) {
      toast.error("Total number of photos must be even");
      setLoading(false);
      return;
    }

    if (totalPhotos > 8) {
      toast.error("Total number of photos cannot exceed 8");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("projectName", project.projectName);
    formData.append("category", project.category);
    formData.append("description", project.description);
    formData.append("sqft", project.sqft || "");

    // Always append mainPhoto if there's a new file
    if (mainPhotoFile) {
      formData.append("mainPhoto", mainPhotoFile);
    }

    // Handle existing photos
    project.descriptionPhotos.forEach((photo) => {
      if (photo && photo._id) {
        const caption = newCaptions[photo._id] || "";
        formData.append(
          "existingPhotos",
          JSON.stringify({
            _id: photo._id,
            url: photo.url,
            caption: caption,
          })
        );
      }
    });

    // Handle new photos
    descriptionPhotoFiles.forEach(({ file }) => {
      if (file) {
        formData.append("descriptionPhotos", file);
        const caption = newCaptions[file.name] || "";
        formData.append(`caption_${file.originalname}`, caption);
      }
    });

    try {
      await updateProject(id, formData);
      toast.success("Project updated successfully!");
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      console.error("Update failed", error);
      toast.error(error.response?.data?.message || "Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-16">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Edit Project</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded-lg space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={project.projectName}
              onChange={(e) =>
                setProject({ ...project, projectName: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={project.category}
              onChange={(e) =>
                setProject({ ...project, category: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select a category</option>
              <option value="home">Home</option>
              <option value="commercial">Commercial</option>
              <option value="hospitality">Hospitality</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Square Footage
            </label>
            <input
              type="number"
              value={project.sqft}
              onChange={(e) => setProject({ ...project, sqft: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Main Photo
          </label>
          {project.mainPhoto && (
            <div className="mb-4">
              <img
                src={getImageUrl(project.mainPhoto)}
                alt="Main project photo"
                className="w-full h-48 object-cover rounded-lg mb-2"
                loading="lazy"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          <PhotoUpload
            label="Main Photo"
            onChange={handleMainPhotoChange}
            initialValue={project.mainPhoto}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Description Photos ({totalPhotos}/8)
            </label>
            {canAddMorePhotos && (
              <button
                type="button"
                onClick={() =>
                  setDescriptionPhotoFiles([...descriptionPhotoFiles, null])
                }
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Add Photo
              </button>
            )}
          </div>
          {!isPhotosEven && (
            <p className="text-red-500 text-sm mb-2">
              Total number of photos must be even
            </p>
          )}
          <div className="grid grid-cols-2 gap-4">
            {project.descriptionPhotos.map((photo, index) => (
              <div key={photo._id} className="relative">
                <img
                  src={getImageUrl(photo.url)}
                  alt={`Description ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                  loading="lazy"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                />
                <input
                  type="text"
                  value={newCaptions[photo._id] || ""}
                  onChange={(e) =>
                    handleCaptionChange(photo._id, e.target.value)
                  }
                  placeholder="Add caption..."
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    setProject({
                      ...project,
                      descriptionPhotos: project.descriptionPhotos.filter(
                        (p) => p._id !== photo._id
                      ),
                    });
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            {descriptionPhotoFiles.map((file, index) => (
              <div key={index} className="relative">
                <PhotoUpload
                  onChange={(newFile) => {
                    const newFiles = [...descriptionPhotoFiles];
                    newFiles[index] = newFile;
                    setDescriptionPhotoFiles(newFiles);
                  }}
                />
                <input
                  type="text"
                  value={newCaptions[file?.name] || ""}
                  onChange={(e) =>
                    handleCaptionChange(file?.name, e.target.value)
                  }
                  placeholder="Add caption..."
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    setDescriptionPhotoFiles(
                      descriptionPhotoFiles.filter((_, i) => i !== index)
                    );
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              loading || !hasChanges || !isPhotosEven || totalPhotos > 8
            }
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} className="mr-2" />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
