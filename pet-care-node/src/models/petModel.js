const db = require("./db");

const Pet = {
  create: (data, callback) => {
    const sql =
      "INSERT INTO pets (name, species, breed, age, medical_history, photo) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, data, callback);
  },
  findAll: (callback) => {
    const sql = "SELECT * FROM pets";
    db.query(sql, callback);
  },
  findById: (id, callback) => {
    const sql = "SELECT * FROM pets WHERE id = ?";
    db.query(sql, [id], callback);
  },
  deleteById: (id, callback) => {
    const sql = "DELETE FROM pets WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = Pet;
