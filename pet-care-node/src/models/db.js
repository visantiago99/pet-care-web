const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "99711525",
  database: "pet_register",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

module.exports = db;
