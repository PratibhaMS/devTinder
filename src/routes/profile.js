const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const {
  validateEditProfile,
  validateForgetPassword,
} = require("../utils/validation");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User does not exit");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} ,your profile Updated Successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    validateForgetPassword(req);
    const { password, oldPassword } = req.body;
    const user = req.user;
    const isoldPasswordVerified = await user.validatePass(oldPassword);
    // console.log(isoldPasswordVerified);
    if (!isoldPasswordVerified) {
      throw new Error("Invalid Old Password");
    }
    let passwordHash = await bcrypt.hash(password, 10);
    const updateNewPassword = await User.updateOne(
      { _id: user._id },
      { password: passwordHash }
    );
    res.send("Password Updated Successfully");
  } catch (error) {
    res.status(400).send("Something went wrong " + error.message);
  }
});

module.exports = profileRouter;
