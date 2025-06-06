require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const Port = process.env.PORT;
const getConnection = require("./utils/getConnection");
const userRoutes = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("/", (req, res) => res.send("Express on Vercel"));
app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  const message = error.message || "server error";
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({ message: message });
});
getConnection();
app.listen(Port, () =>
  console.log("Server is running on this port = " + `${Port}`)
);
