const express = require("express");
const profileRouter = express.Router();
const { userAuthentication } = require("../middleware/auth");
const { userProfileUpdateValidation } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");

profileRouter.get(
  "/profile/view",
  userAuthentication,
  async (req, res, next) => {
    try {
      const user = req.user;
      if (user) {
        res.send(user);
      } else {
        res.status(400).send("No user find");
      }
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  }
);

profileRouter.patch(
  "/profile/edit",
  userAuthentication,
  async (req, res, next) => {
    try {
      const isValid = userProfileUpdateValidation();

      if (!isValid) {
        throw new Error("Cannot update Profile");
      }

      const loggedInUser = req.user;

      Object.keys(req.body).forEach(
        (item) => (loggedInUser[item] = req.body[item])
      );

      await loggedInUser.save();

      res.send(
        `${loggedInUser.firstName}, your profile has been updated successfully`
      );
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }
  }
);

profileRouter.patch(
  "/profile/updatePassword",
  userAuthentication,
  async (req, res, next) => {
    try {
      const loggedInUser = req.user;
      const { existingPassword, newPassword } = req.body;
      const isPasswordMatched = await loggedInUser.hashPassword(
        existingPassword
      );

      if (!isPasswordMatched) {
        throw new Error(`Password doesn't Mactch`);
      }

      if (!validator.isStrongPassword(newPassword)) {
        throw new Error("New Password is not strong");
      }

      const newHashPassword = await bcrypt.hash(newPassword, 10);

      loggedInUser.password = newHashPassword;
      await loggedInUser.save();

      res.send("Password updated successfully");
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);
module.exports = profileRouter;
