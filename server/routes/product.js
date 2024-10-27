const express = require("express");
const router = express.Router();
const productModel = require("../models/productSchema");
const connectDatabase = require("../database/db");


router.get("/", async (req, res) => {
  res.send("I send you all products and services");
  connectDatabase();
  const product = productModel({
    name: "T-shirt For Mens",
    image: "https://flyingcart.pk/cdn/shop/files/BLACK_75832464-0c56-4897-bea2-1d5b9d2a4e2f.jpg?v=1705313601&width=1946",
    description: "A generic product",
    price: 300,
    stock: Math.floor(Math.random() * (1000 - 50) + 50), // Random stock between 50 and 1000
    company: "lums lum",
    category: "t-shirt",
    colors: ["Black", "White", "Red", "Blue"],
    // sizes: ["S", "M", "L", "XL"],
    review: Math.floor(Math.random() * (5 - 1) + 1), // Random review between 1 and 5
    rate: 4.7,
    discount: 90, 
  });
  product.save().then(() => {
    console.log("Product saved to database");
  });
  // console.log(productModel);
});

router.post("/add", async (req, res) => {
  let body = await req.body;
  connectDatabase();
  let addProduct = await productModel(body);
  addProduct.save();
  res.json({msg: "Product saved to database"});
});

router.get("/all", async (req, res) => {
  connectDatabase();
  let allProducts = await productModel.find({});
  res.json(allProducts);
});

router.get("/find/:id", async (req, res) => {
  connectDatabase();
  let productId = req.params.id;
  console.log(productId);
  let product = await productModel.find({ _id: productId });
  console.log(product);
  res.send(product);
});

router.post('/category', async(req, res) => {
  let body = await req.body;
  connectDatabase();
  let products = await productModel.find({ category: body.category });
  console.log(products, body);
  res.json(products);
})

router.get("/delete/all", async (req, res) => {
  connectDatabase();
  await productModel.deleteMany({});
  res.send("All products deleted");
});

module.exports = router;
