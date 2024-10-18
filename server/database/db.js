const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = async () => {
  // console.log(process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("connection failed");
  }
};

module.exports = connectDatabase;
