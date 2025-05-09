const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  uploadFile,
  getProjects,
  getProjectsById,
  updateProject,
  deleteProject,
} = require("../Controller/controller");
const authRouter = require("./authRouter");
const adminRouter = require("./adminRouter");

const upload = multer();

// Auth routes
router.use("/api/auth", authRouter);

// Admin routes
router.use("/api/admins", adminRouter);

// Project routes
router.get("/api/projects", getProjects);
router.get("/api/projects/:id", getProjectsById);
router.post(
  "/api/projects",
  upload.fields([
    { name: "mainPhoto", maxCount: 1 },
    { name: "descriptionPhotos", maxCount: 10 },
  ]),
  uploadFile
);
router.put(
  "/api/projects/:id",
  upload.fields([
    { name: "mainPhoto", maxCount: 1 },
    { name: "descriptionPhotos", maxCount: 10 },
  ]),
  updateProject
);
router.delete("/api/projects/:id", deleteProject);

module.exports = router;
