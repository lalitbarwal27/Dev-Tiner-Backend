const express = require("express");
const {
  userSignUpValidation,
  userSignInValidation,
} = require("./utils/validation");
const app = express();
const connect = require("./config/database");
const User = require("./models/user");

const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res, next) => {
  //Creating a new instanse of User model

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

app.post("/login", async (req, res, next) => {
  //Creating a new instanse of User model

  try {
    userSignInValidation(req);

    const { password, email } = req.body;

    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      throw new Error("Invalid Credentials");
    }

    const matched = await bcrypt.compare(password, userExist.password);
    if (matched) {
      res.status(200).send("Logged in Successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error in Login" + err.message);
  }
});

app.get("/user", async (req, res, next) => {
  const email = req.body.email;
  console.log(email);
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.send(user);
    } else {
      res.status(400).send("No user find");
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res, next) => {
  const email = req.body.email;
  console.log(email);
  try {
    const users = await User.find({});
    if (users) {
      res.send(users);
    } else {
      res.status(400).send("No user find");
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res, next) => {
  const id = req.body.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.send(deletedUser);
    } else {
      res.status(400).send("No user find");
    }
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

app.patch("/user/:userId", async (req, res, next) => {
  const id = req.params;

  const body = req.body;

  try {
    const ALLOWED_FIELDS = ["photoUrl", "skills", "age", "about"];

    Object.keys(body).every((item) => {
      if (!ALLOWED_FIELDS.includes(item)) {
        throw new Error("Update failed");
      }
    });

    if (body.skills.length > 5) {
      throw new Error("Update failed:Only 5 skills can be added");
    }
    const updatedUser = await User.findByIdAndUpdate(id, body);
    if (updatedUser) {
      res.send(updatedUser);
    } else {
      res.status(400).send("No user find");
    }
  } catch (err) {
    res.status(400).send("Something went wrong " + err.message);
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
