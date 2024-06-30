const mysql = require("mysql2");
require("dotenv").config();

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: 3307,
});

// Connect to the database
connection.connect((err) => {
  console.log(process.env.SQL_PASSWORD);
  console.log(process.env.DATABASE_NAME);
  if (err) throw err;
  console.log("Connected to the database.");

  // Execute the CREATE TABLE command
  const sql = `CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    photo VARCHAR(255) NOT NULL
  )`;

  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table created");
  });

  // Close the connection
  connection.end();
});
