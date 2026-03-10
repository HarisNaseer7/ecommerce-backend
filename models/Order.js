const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  orderItems: [
    {
      name: String,
      qty: Number,
      image: String,
      price: Number,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    }
  ],

  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },

  paymentMethod: String,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,

  isPaid: {
    type: Boolean,
    default: false
  },

  isDelivered: {
    type: Boolean,
    default: false
  },
  deliveredAt: Date



}, {
  timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);