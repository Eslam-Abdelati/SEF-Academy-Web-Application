const express = require("express");
const { uploadImageMiddleware } = require("../middlewares/upload")

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

// /api/users
router.get("/", getAllUsers);

// /api/users/:id
router.get("/:id", getUserById);
router.put("/:id", uploadImageMiddleware, updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
