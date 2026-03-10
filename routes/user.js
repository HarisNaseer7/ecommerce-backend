const express = require("express");
const router = express.Router();

const {
  registerUser,
  authUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Register
router.post("/", registerUser);

// Login
router.post("/login", authUser);

// Get all users
router.get("/", getUsers);

// Get single user
router.get("/:id", getUserById);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

module.exports = router;