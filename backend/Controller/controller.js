const cloudinary = require("../config/Cloudinary");
const streamifier = require("streamifier");
const Project = require("../Models/projectSchema");

const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

const uploadFile = async (req, res) => {
  try {
    const { projectName, category, description, sqft } = req.body;

    const mainPhotoFile = req.files?.mainPhoto?.[0];
    const mainPhotoUpload = await streamUpload(mainPhotoFile.buffer);

    const descriptionPhotos = [];

    if (req.files?.descriptionPhotos) {
      for (const file of req.files.descriptionPhotos) {
        const uploadResult = await streamUpload(file.buffer);
        const caption = req.body[`caption_${file.originalname}`];
        // Ensure caption is a string
        const captionString = Array.isArray(caption)
          ? caption[0] || ""
          : caption || "";
        descriptionPhotos.push({
          url: uploadResult.secure_url,
          caption: captionString,
        });
      }
    }

    const newProject = new Project({
      projectName,
      category,
      description,
      sqft: sqft ? sqft.toString() : "",
      mainPhoto: mainPhotoUpload.secure_url,
      descriptionPhotos,
    });

    await newProject.save();

    res.status(201).json({
      message: "Project uploaded successfully",
      project: newProject,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getProjectsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Data Not Found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid project ID format" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

// controllers/projectController.js

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectName, category, description, sqft } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const updateData = {
      projectName,
      category,
      description,
      sqft: sqft ? sqft.toString() : "",
    };

    if (req.files?.mainPhoto) {
      const mainPhotoFile = req.files.mainPhoto[0];
      const mainPhotoUpload = await streamUpload(mainPhotoFile.buffer);
      updateData.mainPhoto = mainPhotoUpload.secure_url;
    }

    const updatedPhotos = [];

    if (req.body.existingPhotos) {
      const parsed = Array.isArray(req.body.existingPhotos)
        ? req.body.existingPhotos.map(JSON.parse)
        : [JSON.parse(req.body.existingPhotos)];

      // Ensure each caption is a string
      updatedPhotos.push(
        ...parsed.map((photo) => ({
          ...photo,
          caption: Array.isArray(photo.caption)
            ? photo.caption[0] || ""
            : photo.caption || "",
        }))
      );
    }

    if (req.files?.descriptionPhotos) {
      for (const file of req.files.descriptionPhotos) {
        const uploadResult = await streamUpload(file.buffer);
        const caption = req.body[`caption_${file.originalname}`];
        // Ensure caption is a string
        const captionString = Array.isArray(caption)
          ? caption[0] || ""
          : caption || "";
        updatedPhotos.push({
          url: uploadResult.secure_url,
          caption: captionString,
        });
      }
    }

    if (updatedPhotos.length > 8 || updatedPhotos.length % 2 !== 0) {
      return res.status(400).json({
        message: "Side photos must be even in number and not exceed 8",
      });
    }

    updateData.descriptionPhotos = updatedPhotos;

    const updatedProject = await Project.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid project ID format" });
    }
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  uploadFile,
  getProjects,
  getProjectsById,
  updateProject,
  deleteProject,
};
