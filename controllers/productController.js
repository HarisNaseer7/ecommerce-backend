const Product = require("../models/Product");
const mongoose = require("mongoose");


// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      user: req.user._id,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// GET ALL PRODUCTS
// GET ALL PRODUCTS WITH SEARCH + PAGINATION
const getProducts = async (req, res) => {
  try {

    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });

    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// GET SINGLE PRODUCT
const getProductById = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.image = req.body.image || product.image;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.countInStock = req.body.countInStock || product.countInStock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product removed" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// CREATE PRODUCT REVIEW
const createProductReview = async (req, res) => {
  try {

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// GET TOP RATED PRODUCTS
const getTopProducts = async (req, res) => {
  try {

    const products = await Product.find({})
      .sort({ rating: -1 }) // highest rating first
      .limit(5); // return only top 5

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  createProduct,
  getProducts,
  getTopProducts, 
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
};
