require("dotenv").config();

const express = require("express");
const connectDB = require("./database/db.js");

const app = express();
const PORT = process.env.PORT || 3000;

//connect to DB
connectDB();

//middleware -> express.json
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running at Port ${PORT}`);
});
