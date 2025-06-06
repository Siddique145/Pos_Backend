const User = require("../models/User");
const bcrypt = require("bcrypt");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const formatedEmail = email.toLowerCase();
    const findedUser = await User.findOne({ email: formatedEmail });
    if (!findedUser) {
      const error = new Error("Incorrect Email");
      error.statusCode = 400;
      throw error;
    }

    const isPssMatch = await bcrypt.compare(password, findedUser.password);
    if (!isPssMatch) {
      const error = new Error("Incorrect Password");
      error.statusCode = 400;
      throw error;
    }

    const accessToken = jwt.sign(
      { email: formatedEmail, userId: findedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Successful",
      status: true,
      token: accessToken
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;

function validateLogin(data) {
  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  return loginSchema.validate(data);
}
