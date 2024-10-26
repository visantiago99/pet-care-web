const db = require("./db");

const Pet = {
  create: (data, callback) => {
    const sql =
      "INSERT INTO pets (name, species, breed, age, description, photo, city, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
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
  updateById: (id, data, callback) => {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }

    if (fields.length === 0) {
      return callback(new Error("No fields to update"), null);
    }

    const sql = `UPDATE pets SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    db.query(sql, values, callback);
  },
  deleteById: (id, callback) => {
    const sql = "DELETE FROM pets WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = Pet;
