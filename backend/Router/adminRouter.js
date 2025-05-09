const express = require("express");
const router = express.Router();
const {
  getAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminProfile,
  updateAdminProfile,
  changePassword,
} = require("../Controller/adminController");
const auth = require("../middleware/auth");

// Public routes
router.post("/", createAdmin);

// Profile routes (must come before /:id routes)
router.get("/profile", auth, getAdminProfile);
router.put("/profile", auth, updateAdminProfile);
router.put("/profile/password", auth, changePassword);

// Protected routes
router.get("/", auth, getAdmins);
router.get("/:id", auth, getAdminById);
router.put("/:id", auth, updateAdmin);
router.delete("/:id", auth, deleteAdmin);

module.exports = router;
