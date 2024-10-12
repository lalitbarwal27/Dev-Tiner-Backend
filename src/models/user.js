const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("EMail is not valid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Password is Not Strong");
      }
    },
  },
  gender: {
    type: String,
    validate(value) {
      if (!value.includes[("Male", "Female", "Others")]) {
        throw new Error("Gender is not accepted");
      }
    },
  },
  age: {
    type: Number,
  },
  about: {
    type: String,
    default: "A new user has been added",
  },
  skills: {
    type: [String],
  },
  photoUrl: {
    type: String,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("PhotoUrl is incorrect");
      }
    },
  },
});

UserSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DevTinder@786", {
    expiresIn: "1d",
  });

  return token;
};

UserSchema.methods.hashPassword = async function (passwordInputByUser) {
  const user = this;

  const isValid = await bcrypt.compare(passwordInputByUser, user.password);

  return isValid;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
