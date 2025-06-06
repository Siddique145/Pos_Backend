const mongoose = require("mongoose");
const DbString = process.env.MONGODB_URI;

const getConnection = () => {
  try {
    mongoose
      .connect(DbString)
      .then(() => {
        console.log("Database is Connected");
      })
      .catch(() => {
        console.log("Database failed to Connect");
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getConnection;
