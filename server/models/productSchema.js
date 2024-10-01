const mongoose = require("mongoose");

// const ObjectId = Schema.ObjectId;

const Product = new mongoose.Schema({
  name: String,
  rate: Number,
  review: Number,
  description: String,
  price: Number,
  discount: Number,
  image: String,
  colors: Array,
  sizes: Array,
  stoke: Number,
  company: String,
  category: String,
});

const model = mongoose.model("Product", Product);

module.exports = model;