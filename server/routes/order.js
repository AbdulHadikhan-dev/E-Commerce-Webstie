const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

router.post("/add", async (req, res) => {
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
});

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

router.get("/deliverd/:data", async (req, res) => {
  let email = req.query.user_email;
  let order_id =  Number(req.query.order_id);;
  console.log("User email:", email, "Order ID:", order_id);

  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    let db = client.db("Review");
    let orders = db.collection("orders");

    let deleverd = await orders.updateOne(
      { "user.email": email, "cart.id": order_id },
      { $set: { "cart.$[elem].status": "deliverd" } },
      { arrayFilters: [{ "elem.id": order_id }] }
    );
    res.json({ msg: "Order deleverd", ok: true, deleverd, email, order_id });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ msg: "Failed to deleverd order", error });
  } finally {
    await client.close(); // Ensure the client is closed
  }
});

router.get("/cancel/:data", async (req, res) => {
  let email = req.query.user_email;
  let order_id =  Number(req.query.order_id);;
  console.log("User email:", email, "Order ID:", order_id);

  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    let db = client.db("Review");
    let orders = db.collection("orders");

    let cancel = await orders.updateOne(
      { "user.email": email, "cart.id": order_id },
      { $set: { "cart.$[elem].status": "cancel" } },
      { arrayFilters: [{ "elem.id": order_id }] }
    );
    res.json({ msg: "Order Cancel", ok: true, cancel, email, order_id });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ msg: "Failed to cancel order", error });
  } finally {
    await client.close(); // Ensure the client is closed
  }
});


router.get("/delete/:data", async (req, res) => {
  let email = req.query.user_email;
  let order_id =  Number(req.query.order_id);;
  console.log("User email:", email, "Order ID:", order_id);

  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    let db = client.db("Review");
    let orders = db.collection("orders");

    let Delete = await orders.updateOne(
      { "user.email": email, "cart.id": order_id },
      { $set: { "cart.$[elem].status": "delete" } },
      { arrayFilters: [{ "elem.id": order_id }] }
    );
    res.json({ msg: "Order Delete", ok: true, Delete, email, order_id });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ msg: "Failed to Delete order", error });
  } finally {
    await client.close(); // Ensure the client is closed
  }
});

router.get("/:slug", async (req, res) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  let id = req.query.user_id;
  console.log(id);
  try {
    await client.connect();
    let db = client.db("Review");
    let orders = db.collection("orders");
    let data = await orders.find({ "user.sub": id }).toArray();
    res.json(data);
  } finally {
    client.close();
  }
});

module.exports = router;
