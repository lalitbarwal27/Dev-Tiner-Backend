const express = require("express");
const { authMiddleware } = require("./utils/middleware");
const app = express();
const connect = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res, next) => {
  //Creating a new instanse of User model
  const user = new User({
    firstName: "Lalit",
    lastName: "Barwal",
    age: 26,
    email: "lalitbarwal27@gmail.com",
    gender: "Male",
    password: "Lalit@27",
  });

  try {
    await user.save();
    res.status(200).send("User saved successfully");
  } catch (err) {
    res.status(400).send("Error in Saving User" + err.message);
  }
});

connect()
  .then(() => {
    console.log("connected To Database successfully");
    app.listen(7777, () => {
      console.log("Server is listening on port 7777");
    });
  })
  .catch((err) => {
    console.log("Cannot connect to database");
  });
