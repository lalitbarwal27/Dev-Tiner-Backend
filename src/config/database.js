const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect(
    "mongodb+srv://lalitbarwal27:lqY1B7MzowgPrYqO@namastenode.arcfx.mongodb.net/devTinder"
  );
};

module.exports = connect;
