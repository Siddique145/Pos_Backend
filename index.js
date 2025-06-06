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
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// app.use("/user", userRoutes);




// app.use((error,req,res,next)=>{
//   const message = error.message || "server error"
//   const statusCode = error.statusCode || 500 
//   res.status(statusCode).json({message:message})

// })
// getConnection();
// app.listen(Port, () =>
//   console.log("Server is running on this port = " + `${Port}`)
// );
// api/index.js
const express = require("express");
const cors = require("cors");
const getConnection = require("../utils/getConnection");
const userRoutes = require("../routes/user");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect DB (only once)
getConnection();

app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  const message = error.message || "Server error";
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message });
});

module.exports = app; // ✅ DO NOT use app.listen()
