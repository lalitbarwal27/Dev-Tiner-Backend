const mongoose = require("mongoose");
const validator = require("validator");

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

const User = mongoose.model("User", UserSchema);

module.exports = User;
