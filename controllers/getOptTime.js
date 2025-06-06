// const User = require("../models/User");

// const getOtpTime = async (req, res, next) => {
//   const { token } = req.body;
//   try {
//     const findedUser = await User.findOne({ "otp.token": token });
//     if (!findedUser) {
//       const error = new Error("Something went wrong!");
//       error.statusCode = 400;
//       throw error;
//     }
//     res.status(200).json({
//       message: "Success",
//       status: true,
//       sendTime: findedUser.otp.sendTime,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = getOtpTime;
const User = require("../models/User");

const getOtpTime = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      status: false,
      message: "Token is required.",
    });
  }

  try {
    const findedUser = await User.findOne({ "otp.token": token }).select("otp");

    if (!findedUser) {
      return res.status(400).json({
        status: false,
        message: "Invalid or expired OTP token.",
      });
    }

    return res.status(200).json({
      message: "OTP time fetched successfully.",
      status: true,
      sendTime: findedUser.otp?.sendTime || null,
    });

  } catch (error) {
    console.error("Error fetching OTP time:", error);
    return res.status(500).json({
      status: false,
      message: "Server error while fetching OTP time.",
    });
  }
};

module.exports = getOtpTime;
