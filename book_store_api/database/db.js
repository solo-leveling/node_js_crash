const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://heinhtet1999:heinhtet1999@cluster0.knozcyj.mongodb.net/"
    );
    console.log("DB connected successfully");
  } catch (e) {
    console.error("DB connection failed", e);
    process.exit(1);
  }
};

module.exports = connectDB;
