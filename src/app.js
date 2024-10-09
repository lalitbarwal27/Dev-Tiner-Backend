const express = require("express");

const app = express();

// here ? means that b is optional

app.get("/ab?c", (req, res) => {
  res.send("Getting User details");
});

// here * means that in place of * anything can come in route

app.get("/ab*cd", (req, res) => {
  res.send("Getting User details");
});

// here + means that you can add any number of b but should end with c

app.get("/ab+c", (req, res) => {
  res.send("Getting User details");
});

//to get params in the route

app.get("/user/:userId/:password", (req, res) => {
  console.log(req.params);
  res.send("Getting User details");
});

//to get querry in the route
app.get("/user", (req, res) => {
  console.log(req.query);
  res.send("Getting User details");
});

//Get Method

app.get("/user", (req, res) => {
  res.send("Getting User details");
});

//Post Method

app.post("/user", (req, res) => {
  res.send("Posting User details");
});

//Delete Method

app.delete("/user", (req, res) => {
  res.send("Deleting User details");
});

//Put Method

app.put("/user", (req, res) => {
  res.send("Updating User details");
});

//Patch Method

app.patch("/user", (req, res) => {
  res.send("Updating using patch User details");
});

app.use("/hello", (req, res) => {
  res.send("Hello from the hello route");
});

app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
