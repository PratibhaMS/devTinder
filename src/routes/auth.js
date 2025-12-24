const express = require("express");
const authRouter = express.Router();
const { validateSignUpData, validateLogin } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // encrypt the password
    let passwordHash = await bcrypt.hash(password, 10);
    // creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User singup Successfully");
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    validateLogin(req);
    let { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePass(password);
    if (isPasswordValid) {
      // create a JWT token
      const token = await user.getJwt();
      // add token to cookie and send response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000),
      });
      res.send("Login Successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("LogOut Successfully");
});

module.exports = authRouter;
