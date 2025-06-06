const express = require("express");
const register = require("../controllers/Register");
const router = express.Router();
const login = require("../controllers/Login");
router.post("/register", register);
router.post("/login", login);

module.exports = router;
