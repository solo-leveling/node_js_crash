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

    const newUser = await User.create({
      name: "Hein Htet 1123",
      email: "heinhtet03@gmail.com",
      age: 335,
      isActive: true,
      tags: ["clone", "fake"],
    });

    // const newUser = new User({
    //   name: "Hein Htet 01",
    //   email: "heinhtet01@gmail.com",
    //   age: 25,
    //   isActive: true,
    //   tags: ["clone", "fake", "unreal"],
    // });

    // await newUser.save();

    // const allUsers = await User.find({
    //   name: "Hein Htet",
    // });
    // console.log(allUsers);

    console.log("created new user successfully", newUser);

    //select
    // const getSelectedUser = await User.find().select("name email -_id");
    // console.log(getSelectedUser);

    const updateUser = await User.findByIdAndUpdate(
      newUser._id,
      {
        $set: { age: 100 },
        $push: { tags: "updated" },
      },
      { new: true }
    );
    console.log(updateUser);

    // count, select, delete, find the first one, find with type
  } catch (e) {
    console.log("Error ->" + e);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExamples();
