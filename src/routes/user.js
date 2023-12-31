const express = require('express');
const route = require('.');
const router = express.Router();
const UserController = require("../controllers/UserController");
const isAuth = require('../middlewares/authMiddleware')

router.post("/saveUser", UserController.saveUser)
router.get("/getUser",isAuth, UserController.getUser)
router.post("/saveBalance", UserController.saveBalance)

module.exports = router;