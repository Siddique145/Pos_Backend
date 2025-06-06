// const User = require("../models/User");
// const bcrypt = require("bcrypt");
// const joi = require("joi");
// const register = async (req, res, next) => {
//   const { error: validationError } = validateUser(req.body);
//   const { name, email, password } = req.body;
//   try {
//     if (validationError) {
//       const error = new Error(validationError.details[0].message);
//       error.statusCode = 400;
//       throw error;
//     }
//     const formatedName = name.toLowerCase();
//     const formatedEmail = email.toLowerCase();
//     const findedUser = await User.findOne({ email: formatedEmail });
//     if (findedUser) {
//       const error = new Error("This Email is Already Registered");
//       error.statusCode = 400;
//       throw error;
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name: formatedName,
//       email: formatedEmail,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     res
//       .status(200)
//       .json({ message: "User Registerd Successfully", status: true });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = register;

// function validateUser(data) {
// const userSchema = joi.object({
//   name: joi.string().min(3).required(),
//   email: joi.string().email().required(),
//   password: joi.string().min(5).max(10).required(),
// });

//   return userSchema.validate(data);
// }
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const register = async (req, res, next) => {
  // Validate input
  const { error: validationError } = validateUser(req.body);
  if (validationError) {
    const error = new Error(validationError.details[0].message);
    error.statusCode = 400;
    return next(error);
  }

  try {
    const { name, email, password } = req.body;

    const username = name.toLowerCase();
    const emailLower = email.toLowerCase();

    // Check if email already exists
    const existingEmail = await User.findOne({ email: emailLower });
    if (existingEmail) {
      const error = new Error("This Email is Already Registered");
      error.statusCode = 400;
      return next(error);
    }

    // Check if username already exists
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      const error = new Error("This Username is Already Taken");
      error.statusCode = 400;
      return next(error);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email: emailLower,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User Registered Successfully", status: true });
  } catch (err) {
    next(err);
  }
};

function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(10).required(),
  });
  return schema.validate(data);
}

module.exports = register;
