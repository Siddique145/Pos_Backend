// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// // const mongoose = require("mongoose");
// const Port = process.env.PORT;
// const getConnection = require("./utils/getConnection");
// const userRoutes = require("./routes/user");

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => res.send("Express on Vercel"));
// app.use("/user", userRoutes);

// app.use((error, req, res, next) => {
//   const message = error.message || "server error";
//   const statusCode = error.statusCode || 500;
//   res.status(statusCode).json({ message: message });
// });
// getConnection();
// app.listen(Port, () =>
//   console.log("Server is running on this port = " + `${Port}`)
// );


// module.exports = app;


const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
dotenv.config();

const getConnection = require("./utils/getConnection");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("/", (req, res) => res.send("Express on Vercel & Local"));
app.use("/user", userRoutes);

// Error handler
app.use((error, req, res, next) => {
  const message = error.message || "server error";
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message });
});

getConnection();

// ✅ This runs only in local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Local server running on port ${PORT}`);
  });
}

// ✅ This is for Vercel
module.exports = app;
module.exports.handler = serverless(app);
