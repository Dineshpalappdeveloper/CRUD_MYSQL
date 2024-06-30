const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});
const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
