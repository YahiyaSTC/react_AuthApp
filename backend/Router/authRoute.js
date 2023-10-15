const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getUser,
} = require("../Controller/authController");
const authHandler = require("../Middleware/authmiddleware");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/user").get(authHandler, getUser);

module.exports = router;
