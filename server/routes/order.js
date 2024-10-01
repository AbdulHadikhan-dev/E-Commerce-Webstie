const express = require("express");
const router = express.Router();
const orderModel = require("../models/orderSchema");
const connectDatabase = require("../database/db");

router.post("/", async (req, res) => {
  let body = req.body;
  console.log(body);
  await connectDatabase();
  let order = await orderModel(body);
  order
    .save()
    .then(() => {
      console.log("Order saved");
      res.json({ msg: "Order saved", ok: true });
    })
    .catch(() => {
      console.log("Error saving order");
      res.json({ msg: "Error saving order", ok: false });
    });
});

module.exports = router;
