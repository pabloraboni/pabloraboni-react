const express = require("express");
const router = express.Router();

// Controller
const { register, login, getCurrentUser, update, getUserById } = require("../controllers/UserController");

// Middlewares
const { userCreateValidation, loginValidation, userUpdateValidations } = require("../middlewares/userValidations");
const validate = require("../middlewares/handleValidations");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, userUpdateValidations(), validate, imageUpload.single("profileImage"), update);
router.get("/:id", getUserById);

module.exports = router;
