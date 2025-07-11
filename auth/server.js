require("dotenv").config();

const express = require("express");
const connectToDB = require("./database/db");
const app = express();

//connect to DB
connectToDB();

//connect to port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is connected successfully at port ${PORT}`);
});
