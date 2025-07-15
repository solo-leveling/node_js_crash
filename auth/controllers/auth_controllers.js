const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//register auth
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    //check user is already registered or not
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email is already existed.",
      });
    }

    //hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user and save
    const createNewUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await createNewUser.save();
    if (createNewUser) {
      res.status(200).json({
        success: true,
        message: "User created successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Error, can't create account",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "SOmething wrong",
    });
    console.log("Registration error", e);
  }
};

//login auth
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Username is incorrect.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect.",
      });
    }

    //create user token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something wrong with server.",
    });
    console.log("Login error", e);
  }
};

module.exports = { registerUser, loginUser };
