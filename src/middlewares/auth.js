const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // read the token from request cookies
    let { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token");
    }
    // validate token
    let decodedMess = await jwt.verify(token, "DEV@Tinder");
    const { _id } = decodedMess;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
};

module.exports = { userAuth };
