const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadFile , getProjects ,getProjectsById } = require("../Controller/controller");

const upload = multer(); 


router.post(
  '/upload',
  upload.fields([
    { name: 'mainPhoto', maxCount: 1 },
    { name: 'descriptionPhotos', maxCount: 10 },
  ]),
  uploadFile
);

router.get("/projects", getProjects);
router.get("/projects/:id", getProjectsById);

module.exports = router;
