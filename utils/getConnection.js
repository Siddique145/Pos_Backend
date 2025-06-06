const mongoose = require("mongoose");
const DbString = process.env.MONGODB_URI;

const getConnection = () => {
  try {
    mongoose
      .connect(DbString)
      .then((connection) => {
        console.log("Database is Connected");
      })
      .catch((error) => {
        console.log("Database failed to Connect");
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getConnection