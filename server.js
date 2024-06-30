const express = require("express");
const cors = require("cors");
const PORT = 4000;
const bodyParser = require("body-parser");
const ConnectDb = require("./db/connection");
const UserModel = require("./model/userModel");
const productModel = require("./model/product");
const app = express();
require("dotenv").config();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);
const startConnection = async () => {
  await ConnectDb(process.env.MONGO_URL);

  app.listen(PORT, () => {
    console.log(`server is runing on port ${PORT}`);
  });
};
app.get("/", (req, res) => {
  res.send("welcome in India");
});
app.post("/api/form", async (req, res) => {
  try {
    const response = await UserModel.create(req.body);
    res.status(201).send({ message: "user Created", data: response });
  } catch (error) {
    res.status(400).send({ error: error.messase });
  }
});
app.get("/api/products", async (req, res) => {
  try {
    let data = await productModel.find();
    res.status(200).send({ Message: "Data Fetched", data: data });
  } catch (error) {
    res.status().send({ error: error.message });
  }
});
startConnection();
