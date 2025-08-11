const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check User
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(401)
        .json({ success: false, message: "Email already registered" });

    // Hash password
    const hashPassword = bcrypt.hashSync(password, 12);

    // Save User in Database
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // Generate Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    // Set Cookie
    res.cookie("token", token);

    // Send Response
    res.status(201).json({
      success: true,
      message: "User registered sucessfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error while user register:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = { registerUser };
