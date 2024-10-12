const express = require("express");
const {
  userSignInValidation,
  userSignUpValidation,
} = require("../utils/validation");

const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/auth/signup", async (req, res, next) => {
  try {
    userSignUpValidation(req);
    const { firstName, lastName, password, email } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await user.save();
    res.status(200).send("User saved successfully");
  } catch (err) {
    res.status(400).send("Error in Saving User" + err.message);
  }
});

authRouter.post("/auth/login", async (req, res, next) => {
  //Creating a new instanse of User model

  try {
    userSignInValidation(req);
    const { password, email } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      throw new Error("Invalid Credentials");
    }
    const matched = await userExist.hashPassword(password);
    if (matched) {
      const jwtToken = await userExist.getJWT();
      res.cookie("token", jwtToken, { expires: new Date(Date.now() + 900000) });
      res.status(200).send("Logged in Successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error in Login" + err.message);
  }
});

authRouter.post("/auth/logout", (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Successfully logout");
});

module.exports = authRouter;
