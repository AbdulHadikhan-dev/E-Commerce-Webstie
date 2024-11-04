const express = require("express");
const router = express.Router();
// const UserModel = require("../models/userSchema");
const { MongoClient } = require("mongodb");
// const connectDatabase = require("../database/db");

router.get("/all", async (req, res) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    let db = client.db("Review");
    let users = db.collection("users");
    let allUsers = await users.find({}).toArray();
    res.json(allUsers);
  } finally {
    client.close();
  }
});

router.post("/find/add", async (req, res) => {
  let body = await req.body;
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  await client.connect();
  let db = client.db("Review");
  let users = db.collection("users");
  let findUser = await users.findOne({ sub: body.user.sub });
  if (findUser) {
    res.json({ msg: "user already exist", ok: true, findUser });
    return;
  } else {
    if (
      !body.user.email ||
      !body.user.isAdmin ||
      !body.user.email_verified ||
      !body.user.family_name ||
      !body.user.name ||
      !body.user.nickname ||
      !body.user.sub
    ) {
      res.json({ msg: "Invalid user data", ok: false });
      return;
    }
    await users
      .insertOne({
        email: body.user.email,
        isAdmin: body.isAdmin,
        email_verified: body.user.email_verified,
        family_name: body.user.family_name,
        given_name: body.user.given_name,
        name: body.user.name,
        nickname: body.user.nickname,
        picture: body.user.picture,
        sub: body.user.sub,
        updated_at: body.user._updated_at,
      })
      .then(() => {
        res.json({ msg: "user add succesfully", ok: true });
      })
      .catch((err) => {
        res.json({ msg: "user not add", ok: false, err });
      });
  }
});

router.get("/:id", async (req, res) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  let id = req.params.id;
  console.log(id);
  try {
    await client.connect();
    let db = client.db("Review");
    let users = db.collection("users");
    let data = await users.findOne({ sub: id });
    res.json(data);
  } finally {
    client.close();
  }
});

router.put("/update/user/:slug", async (req, res) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  let body = req.body;
  console.log(body);
  try {
    await client.connect();
    let db = client.db("Review");
    let users = db.collection("users");
    for (let key in body) {
      console.log(key, body[key]);
      if (key !== "sub") {
        await users.updateOne(
          { sub: body.sub },
          { $set: { [key]: body[key] } }
        );
      }
    }
    // let updateUser  = await users.updateOne({sub: body.sub}, {name: body.name, location: body.location, bio: body.bio, address: body.address, contact: body.contact});
    let user = await users.findOne({ sub: body.sub });
    res.json(user);
  } finally {
    client.close();
  }

  // res.json({ msg: 'User data received', ok: true, body });
});

router.delete("/delete/account/:id", async (req, res) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  try{
    await client.connect();
    let db = client.db("Review");
    let users = db.collection("users");
    let deleteAccount = await users.deleteOne({ sub: req.params.id });
    res.json({ msg: 'User deleted successfully', ok: true, deleteAccount });
  }finally{
    client.close();
  }
});

module.exports = router;
