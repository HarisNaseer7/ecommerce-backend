const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");


// CREATE PRODUCT
router.post("/", protect, admin, createProduct);

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET SINGLE PRODUCT
router.get("/:id", getProductById);

// UPDATE PRODUCT
router.put("/:id", protect, admin, updateProduct);

// DELETE PRODUCT
router.delete("/:id", protect, admin, deleteProduct);

// ADD REVIEW
router.post("/:id/reviews", protect, createProductReview);


module.exports = router;