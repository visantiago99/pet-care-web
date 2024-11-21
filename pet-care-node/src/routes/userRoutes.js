const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rota para registro
router.post("/register", userController.registerUser);

// Rota para login
router.post("/login", userController.loginUser);

module.exports = router;
