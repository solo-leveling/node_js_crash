const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://heinhtet1999:heinhtet1999@cluster00.h4pyor0.mongodb.net/"
  )
  .then(() => console.log("Database connected successfully"))
  .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createAt: { type: Date, default: Date.now },
});

//create user model
const User = mongoose.model("User", userSchema);

async function runQueryExamples() {
  try {
    //create a new document

    // const newUser = await User.create({
    //   name: "Hein Htet",
    //   email: "heinhtet00@gmail.com",
    //   age: 25,
    //   isActive: true,
    //   tags: ["clone", "fake", "unreal"],
    // });

    // const newUser = new User({
    //   name: "Hein Htet 01",
    //   email: "heinhtet01@gmail.com",
    //   age: 25,
    //   isActive: true,
    //   tags: ["clone", "fake", "unreal"],
    // });

    // await newUser.save();

    const allUsers = await User.find({
      name: "Hein Htet",
    });
    console.log(allUsers);

    // console.log("created new user successfully", newUser);
  } catch (e) {
    console.log("Error ->" + e);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExamples();
