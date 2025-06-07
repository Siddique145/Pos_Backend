const express = require("express");
const register = require("../controllers/Register");
const router = express.Router();
const login = require("../controllers/Login");
const forgetPassword = require("../controllers/ForgetPassword");
const verifyOtp = require("../controllers/VerifyOtp");
const getOtpTime = require("../controllers/getOptTime");
const updatePassword = require("../controllers/passwordUpdate")
router.post("/register", register);
router.post("/login", login);
router.post("/forget/password", forgetPassword);
router.post("/verify/otp", verifyOtp);
router.post("/verify/otp/time", getOtpTime);
router.post("/verify/otp/time", getOtpTime);
router.post("/password/update", updatePassword);
module.exports = router;
