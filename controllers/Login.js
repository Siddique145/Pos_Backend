const User = require("../models/User");
const bcrypt = require("bcrypt");
const joi = require("joi");

const login = async (req, res, next) => {
  const { error: validationError } = validateLogin(req.body);

  try {
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const { email, password } = req.body;
    const formattedEmail = email.toLowerCase();

    const user = await User.findOne({ email: formattedEmail });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    res.status(200).json({ message: "Login Successful", status: true });
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
