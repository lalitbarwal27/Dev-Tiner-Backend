const express = require("express");

const app = express();
app.use("/test", (req, res) => {
  res.send("Hello from the test route");
});

app.use("/", (req, res) => {
  res.send("Hello from the Dashboard route");
});

app.use("/hello", (req, res) => {
  res.send("Hello from the hello route");
});

app.listen(7777, () => {
  console.log("Server is listening on port 7777");
});
