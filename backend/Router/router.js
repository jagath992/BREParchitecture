const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadFile } = require("../Controller/controller");

const upload = multer(); // default in-memory storage


router.post(
  '/upload',
  upload.fields([
    { name: 'mainPhoto', maxCount: 1 },
    { name: 'descriptionPhotos', maxCount: 10 }, // allow up to 10 side photos
  ]),
  uploadFile
);

module.exports = router;
