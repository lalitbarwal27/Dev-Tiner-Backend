const express = require("express");
const requestRouter = express.Router();
const { userAuthentication } = require("../middleware/auth");

requestRouter.post(
  "/sendConnectionRequest",
  userAuthentication,
  async (req, res, next) => {
    try {
      const user = req.user;
      if (user) {
        res.send(user.firstName + "Connection request sent");
      } else {
        res.status(400).send("No user find");
      }
    } catch (err) {
      res.status(400).send("Something went wrong");
    }
  }
);

module.exports = requestRouter;
