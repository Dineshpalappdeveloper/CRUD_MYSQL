const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: 3307,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message); // More specific error message
    return;
  }
  console.log("Connected to the database as id " + db.threadId);
});

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// CRUD Routes

// Create
app.post("/users", (req, res) => {
  const { name, age, roll, photo } = req.body;
  const query =
    "INSERT INTO children (name, age, roll, photo) VALUES (?, ?, ?, ?)";
  db.query(query, [name, age, roll, photo], (err, result) => {
    if (err) {
      console.error("Error inserting user into the database:", err.message);
      res.status(500).send("Error inserting user into the database");
      return;
    }
    res.status(201).send({ id: result.insertId, name, age, roll, photo });
  });
});

// Read all users
app.get("/users", (req, res) => {
  const query = "SELECT * FROM children";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users from the database:", err.message);
      res.status(500).send("Error fetching users from the database");
      return;
    }
    res.status(200).send(results);
  });
});

// Read a single user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM children WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error fetching user from the database:", err.message);
      res.status(500).send("Error fetching user from the database");
      return;
    }
    if (result.length === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.status(200).send(result[0]);
  });
});

// Update
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, roll, photo } = req.body;
  const query =
    "UPDATE children SET name = ?, age = ?, roll = ?, photo = ? WHERE id = ?";
  db.query(query, [name, age, roll, photo, id], (err, result) => {
    if (err) {
      console.error("Error updating user in the database:", err.message);
      res.status(500).send("Error updating user in the database");
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.status(200).send({ id, name, age, roll, photo });
  });
});

// Delete
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM children WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting user from the database:", err.message);
      res.status(500).send("Error deleting user from the database");
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.status(200).send("User deleted successfully");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
