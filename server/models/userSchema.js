const mongoose = require("mongoose");

// const ObjectId = Schema.ObjectId;

const User = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const model = mongoose.model("users", User);

module.exports = model;