const mongoose = require("mongoose");

const Order = new mongoose.Schema({
  user: Object,
  creditCard: Object,
  promoCode: String,
  cart: Array,
});

const model = mongoose.model("order", Order);

module.exports = model;
