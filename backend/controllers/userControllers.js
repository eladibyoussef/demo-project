// const mongoose = require('mongoose');
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//registration and login to be added by youssef
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const newUser = new User({
        name: name,
        email: email,
        password: password,
      });
      const savedUser = await newUser.save();
      console.log("savedUser:",savedUser);
      if (savedUser) {
        res.status(201).json({ msg: "success", user: savedUser });
      } else {
        res
          .status(500)
          .json({ msg: "something went wrong , please try again later " });
      }
    } else {
      res.status(500).json({ message: "please try other credentials" });
    }
  } catch (error) {
    res.status(401).json({ msg: error.msg });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ msg: "invalid crediantials" });
    } else {
      const passMatch = await bcrypt.compare(password, user.password);
      if (passMatch) {
        const payload = { id: user.id, name: user.name };
        // console.log(payload);
        // console.log('user secret',process.env.USER_SECRET);
        jwt.sign(
          payload,
          process.env.USER_SECRET,
          { expiresIn: 3600000 },
          (err, token) => {
            // console.log(token);
            res.status(200).json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log("fatal error ", error);
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const { email, name } = req.body;
  const id = req.params.id;
  console.log(id);
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { email: email, name: name }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user profile
const deleteUserProfile = async (req, res) => {
  const { email, name } = req.body;
  const id = req.params.id;
  try {
    const user = await User.findOneAndDelete(
      { _id: id },
      { email: email, name: name }
    );
    console.log(user);

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logOutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "logged out successfully " });
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  registerUser,
  loginUser,
  logOutUser,
};