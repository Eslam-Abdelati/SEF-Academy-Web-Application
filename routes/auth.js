const express = require("express");

const {
    register,
    registerByAdmin,
    generateUserId,
    login } = require("../controllers/authController");
const router = express.Router();

// /api/auth/registerbyadmin
router.post("/register", register);

// /api/auth/registerbyadmin
router.post("/registerbyadmin", registerByAdmin);

// /api/auth/generateuserid
router.get("/generateuserid", generateUserId);

// /api/auth/login
router.post("/login", login);

module.exports = router;
