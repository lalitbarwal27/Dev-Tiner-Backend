const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuthentication = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid tokens");
    }

    const decodedValue = await jwt.verify(token, "DevTinder@786");

    const { _id } = decodedValue;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("here");
    res.status(400).send("ERROR:" + err.message);
  }
};

module.exports = {
  userAuthentication,
};
