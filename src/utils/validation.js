const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid !");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid !");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter strong password!");
  }
};
const validateLogin = (req) => {
  const { emailId, password } = req.body;
  if (!emailId || !password) {
    throw new Error("email and password details are required !");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid !");
  }
};
const validateEditProfile = (req) => {
  const allowedEditField = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditField.includes(field)
  );
  return isEditAllowed;
};

const validateForgetPassword = (req) => {
  const { password } = req.body;
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};

module.exports = {
  validateSignUpData,
  validateLogin,
  validateEditProfile,
  validateForgetPassword,
};
