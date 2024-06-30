const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  roll: {
    type: Number,
    require: true,
  },
  photo: {
    type: String,
    require: true,
  },
});
const userModel = mongoose.model("children", userSchema);
module.exports = userModel;
