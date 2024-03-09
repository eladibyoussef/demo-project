const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utilities/resetToken");
const sendResetPasswordEmail = require("../services/emailService");

const forgotpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //if the user exists we will generat a token valid for 10 minutes and store it with the user document
    const resetToken = generateToken();
   sendResetPasswordEmail(email, resetToken);
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 600000;
    // we will save the user alomg with the rest token and its expiration date so we can compare it later
    await user.save();
    res.status(200).json({ msg: " reset email password sent successfully" });
  } catch (error) {
    console.log("catched error :", error.message);
  }
};
const resetPassword = async (req, res) => {
  const token = req.params.token;
  const { password, confirmedPassword } = req.body;
  console.log('token sent :',token);
  if (password !== confirmedPassword) {
    res.sent(401).json({ msg: "the passwords do not match , please re-check" });
  }
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      res
        .status(400)
        .json({
          msg: "we are sorry the password reset session  has expired or invalid token",
        });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      user.passwordUpdatedAt = Date.now();
      //save the user withe  the new password and the updated document
      await user.save();

      //let the user sign in automatically after updating the password
      const payload = { id: user.id, name: user.name };

      jwt.sign(
        payload,
        process.env.USER_SECRET,
        { expiresIn: 3600000 },
        (err, token) => {
          // console.log(token);
          res.status(200).json({
            success: true,
            token: 'Bearer ' + token
          });
        }
      );
    }
  } catch (error) {
    console.log(error.messag);
    res.json({ msg: error.message });
  }
};

module.exports = {
  forgotpassword,
  resetPassword,
};
