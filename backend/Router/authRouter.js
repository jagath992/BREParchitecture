const express = require("express");
const router = express.Router();
const { login, verify } = require("../Controller/authController");

router.post("/login", login);
router.get("/verify", verify);

module.exports = router;
