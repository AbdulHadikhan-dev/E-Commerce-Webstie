const express = require("express");
const router = express.Router();
const UserModel = require("../models/userSchema");
const connectDatabase = require("../database/db");

router.post("/", async (req, res) => {
  let body = await req.body;
  connectDatabase();
  console.log(body);
  let user = await UserModel.findOne({
    email: body.email,
    password: body.password,
  });
  if (user) {
    res.json({ user, msg: "user find successfully", ok: true });
  } else {
    res.send({ msg: "user not found", ok: false });
  }
});

module.exports = router;
