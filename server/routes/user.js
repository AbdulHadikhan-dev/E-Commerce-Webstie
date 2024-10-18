const express = require("express");
const router = express.Router();
const UserModel = require("../models/userSchema");
const connectDatabase = require("../database/db");

router.post("/find/add", async (req, res) => {
  let body = await req.body;
  connectDatabase();
  console.log(body);
  let findUser = await UserModel.findOne({ email: body.user.email });
  if (findUser) {
    res.json({ msg: "user already exist", ok: true, findUser });
    return;
  } else {
    let addUser = await UserModel({
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
    });
    addUser
      .save()
      .then(() => {
        res.json({ msg: "user add succesfully", ok: true });
      })
      .catch((err) => {
        res.json({ msg: "user not add", ok: false, err });
      });
  }
});

router.get("/all", async (req, res) => {
  connectDatabase();
  let allUsers = await UserModel.find({});
  console.log(allUsers);
  res.json(allUsers);
});

module.exports = router;
