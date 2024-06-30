const mongoose = require("mongoose");

const ConnectDb = async (url) => {
  if (url) {
    console.log("tring to connect");
  }
  await mongoose
    .connect(url)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log("failed due to", err);
    });
};
module.exports = ConnectDb;
