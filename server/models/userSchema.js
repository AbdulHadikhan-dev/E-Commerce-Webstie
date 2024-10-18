const mongoose = require("mongoose");

// const ObjectId = Schema.ObjectId;

const User = new mongoose.Schema({
  email: String,
  isAdmin: Boolean,
  email_verified: Boolean,
  family_name: String,
  given_name: String,
  name: String,
  nickname: String,
  picture: String,
  sub: String,
  updated_at: String,
});

const model = mongoose.model("users", User);

module.exports = model;
