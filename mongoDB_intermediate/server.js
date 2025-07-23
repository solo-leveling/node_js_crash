require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// connect to mongoose DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo db connected successfully"))
  .catch((e) => console.log(e));

//use middlewares
app.use(express.json());

//port
const Port = process.env.PORT;
app.listen(Port, () => {
  console.log(`Server is running at port ${Port}`);
});
