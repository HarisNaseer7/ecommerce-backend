const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const cors = require("cors");



const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(cors());

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", require("./routes/user"));
app.use("/api/products", require("./routes/product"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/upload", require("./routes/uploadRoutes"));

// Make uploads folder public
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});