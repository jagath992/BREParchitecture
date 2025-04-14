const cloudinary = require('../config/Cloudinary');
const streamifier = require('streamifier');
const Project = require('../Models/projectSchema');

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
    const { projectName, category, description } = req.body;

    // Upload main photo
    const mainPhotoFile = req.files?.mainPhoto?.[0];
    const mainPhotoUpload = await streamUpload(mainPhotoFile.buffer);

    // Upload description photos (if any)
    const descriptionPhotos = [];

    if (req.files?.descriptionPhotos) {
      for (const file of req.files.descriptionPhotos) {
        const uploadResult = await streamUpload(file.buffer);
        descriptionPhotos.push({
          url: uploadResult.secure_url,
          caption: req.body[`caption_${file.originalname}`] || '',
        });
      }
    }

    // Create project document
    const newProject = new Project({
      projectName,
      category,
      description,
      mainPhoto: mainPhotoUpload.secure_url,
      descriptionPhotos,
    });

    await newProject.save();

    res.status(201).json({
      message: 'Project uploaded successfully',
      project: newProject,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadFile };
