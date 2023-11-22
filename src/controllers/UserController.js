const mongoose = require("mongoose");
const User = require("../model/User");
const mongoDB = require("../db/mongodb");

async function saveUser(req, res) {
  console.log(req.body);
  const db = await mongoDB("School");
  const collection = await db.collection("students");
  const data = await collection.findOne({ code: req.body.code });
  if (data != null) {
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
      balance: "0",
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
      res.json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    }
  } else {
    res.json({
      success: false,
      message: "This student is exist",
      error: error.message,
    });
  }
}

async function getUser(req, res) {
  const code = req.code;
  const db = await mongoDB("School");
  const collection = await db.collection("students");
  const data = await collection.findOne({ code: code });
  if (data != null) {
    res.json({ result: true, user: data });
  } else res.json({ result: false, user: {} });
}

async function saveBalance(req, res) {
  try {
    const code = req.body.code;
    const amt = req.body.amount;
    const db = await mongoDB("School");
    const result = await db
      .collection("students")
      .updateOne({ key: code }, { $set: { balance: amt } });
    res.json({ result})
  } catch (error) {
    res.json({ result: false})
  }
}

module.exports = {
  saveUser,
  getUser,
  saveBalance
};
