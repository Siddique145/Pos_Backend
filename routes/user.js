const express = require("express");
const register = require("../controllers/Register");
const router = express.Router();
const login = require("../controllers/Login");
const forgetPassword = require("../controllers/ForgetPassword");
const verifyOtp = require("../controllers/VerifyOtp");
const getOtpTime = require("../controllers/getOptTime");
router.post("/register", register);
router.post("/login", login);
router.post("/forget/password", forgetPassword);
router.post("/verify/otp", verifyOtp);
router.post("/verify/opt/time", getOtpTime);

module.exports = router;
