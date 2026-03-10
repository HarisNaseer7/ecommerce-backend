const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload endpoint
router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded",
    image: `/uploads/${req.file.filename}`,
  });
});

module.exports = router;