const express = require('express');
const route = require('.');
const router = express.Router();
const BangDiemController = require("../controllers/BangDiemController");
const isAuth = require('../middlewares/authMiddleware')

router.post("/saveBangDiem", BangDiemController.saveBangDiem)
router.get("/getBangDiem",isAuth, BangDiemController.getBangDiem)

module.exports = router; 