const User = require("./../models/User");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");
const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const formatedEmail = email.toLowerCase();
    const findedUser = await User.findOne({ email: formatedEmail });
    if (!findedUser) {
      const error = new Error("This Email is not Registered");
      error.statusCode = 400;
      throw error;
    }
    if (
      findedUser.otp.otp &&
      new Date(findedUser.otp.sendTime).getTime() > new Date().getTime()
    ) {
      const error = new Error(
        `Please wait until ${new Date(
          findedUser.otp.sendTime
        ).toLocaleTimeString()}`
      );
      error.statusCode = 400;
      throw error;
    }

    const token = crypto.randomBytes(32).toString("hex");
    const otp = Math.floor(Math.random() * 90000) + 100000;
    findedUser.otp.otp = otp;
    findedUser.otp.sendTime = new Date().getTime()+1*60*1000;
     
    await findedUser.save();                

    sendMail(otp, formatedEmail);
    res.status(200).json({
      message: "Please Check your Email for Otp",
      status: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = forgetPassword;
