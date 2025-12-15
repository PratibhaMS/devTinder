const mongoose = require("mongoose");
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

// const User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
