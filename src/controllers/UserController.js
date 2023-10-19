const mongoose = require("mongoose");
const User = require("../model/User");
const mongoDB = require("../db/mongodb");

async function saveUser(req, res) {
  console.log(req.body);
  const db = await mongoDB("School");
  const collection = await db.collection("students");
  const data = await collection.findOne({ code: req.body.code });
  if(data != null) {
      const user = {
        _id: new mongoose.Types.ObjectId(),
        publicKey: req.body.publicKey,
        code: req.body.code,
        uni: req.body.school,
        class: req.body.class,
        major: req.body.majors,
        birth: req.body.birthday,
        course: req.body.courses,
        refreshToken: req.body.refreshToken,
      };
    
      try {
        const newUser = await collection.insertOne(user);
        return res.status(201).json({
          success: true,
          message: "New cause created successfully",
          user: newUser,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: error.message,
        });
      }
  }else {
    res.status(500).json({
        success: false,
        message: "This student is exist",
        error: error.message,
      });
  }
}

async function getUser(req, res) {
  const code = req.code;
  console.log("aaaaa", code);
  await User.find({ code: code })
    .then((data) => {
      res.status(200).json({ result: true, user: data[0] });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ result: false, user: [] });
    });
}

module.exports = {
  saveUser,
  getUser,
};
