const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 5, maxLength: 50 },
    lastName: { type: String, minLength: 5, maxLength: 50 },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(v) {
        if (!validator.isEmail(v)) {
          throw new Error("Email should be in correct formate");
        }
      },
    },
    password: { type: String, required: true },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      validate(v) {
        if (!["male", "female", "others"].includes(v)) {
          throw new Error("Gender data is not valid");
        }
      },
      minLength: 4,
      maxLength: 6,
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqHWswvbMIMtxVPUmmLU_F0sNrf-l4J5z4w&s",
    },
    about: {
      type: String,
      default: "This is default about us for user",
      minLength: 20,
      maxLength: 200,
    },
    skills: { type: [String] },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.getJwt = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder", {
    expiresIn: "1h",
  });
  return token;
};
userSchema.methods.validatePass = async function (password) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid;
};

// const User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
