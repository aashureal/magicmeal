const { Router } = require("express");
const router = Router();
const authController = require("../controllers/auth.controller");

// Auth APIs
router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.get("/logout", authController.logoutUser);

module.exports = router;
