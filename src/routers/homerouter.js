const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.homePage);
router.get("/register", userController.registerForm);
router.get("/login", userController.loginForm);
router.post("/submit", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/home",userController.adminHomePage);
router.get("/HomePage",userController.loginHomePage);
router.get("/logout", userController.logoutUser);

module.exports = router;
