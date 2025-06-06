const mongoose = require("mongoose");

const getConnection = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("❌ MONGODB_URI is not defined in .env file");
    return;
  }

  try {
    await mongoose.connect(uri); // No need for options now
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ Database Connection Failed", error.message);
  }
};

module.exports = getConnection;
