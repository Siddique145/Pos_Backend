const User = require("../models/User");
const bcrypt = require("bcrypt");

const updatePassword = async (req, res, next) => {
  const { password, confirmPassword, token } = req.body;
  try {
    const findedUser = await User.findOne({ "otp.token": token });

    if (!findedUser) {
      const error = new Error("Invalid or expired token");
      error.statusCode = 400;
      throw error;
    }
    if (
      new Date(findedUser.otp.sendTime).getTime() + 5 * 60 * 1000 <
      new Date().getTime()
    ) {
      const error = new Error("Password reset token has expired");
      error.statusCode = 400;
      throw error;
    }

    if (password !== confirmPassword) {
      const error = new Error("Confirm Password does not match!");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    findedUser.password = hashedPassword;
    findedUser.otp = {
      sendTime: null,
      token: null,
    };
    await findedUser.save();
    res.status(200).json({
      message: "Password updated successfully",
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updatePassword;
