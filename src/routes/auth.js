const express = require('express');
const route = require('.');
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/login", AuthController.login)

module.exports = router; 