const express = require("express");
const router = express.Router();
import { MongoClient } from "mongodb";

router.post("/", async (req, res) => {
  let body = req.body;
  console.log(body);
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    let database = client.db("Review");
    let orders = database.collection("orders");
    let data = await orders.insertOne(body);
    res.json({ msg: "Order saved", ok: true, data });
  } finally {
    client.close();
  }

  // let order = await orderModel(body);
  // order
  //   .save()
  //   .then((data) => {
  //     console.log("Order saved");
  //     res.json({ msg: "Order saved", ok: true, data });
  //   })
  //   .catch(() => {
  //     console.log("Error saving order");
  //     res.json({ msg: "Error saving order", ok: false });
  //   });
});

router.get("/all", async (req, res) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    let database = client.db("Review");
    let orders = database.collection("orders");
    let data = await orders.find().toArray();
    res.json(data);
  } finally {
    client.close();
  }
});

module.exports = router;
