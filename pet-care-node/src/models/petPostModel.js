const db = require("./db");

const PetPost = {
  create: (data, callback) => {
    const sql =
      "INSERT INTO pet_posts (pet_id, content, photo) VALUES (?, ?, ?)";
    db.query(sql, data, callback);
  },
  findAll: (callback) => {
    const sql = "SELECT * FROM pet_posts";
    db.query(sql, callback);
  },
  findById: (id, callback) => {
    const sql = "SELECT * FROM pet_posts WHERE post_id = ?";
    db.query(sql, [id], callback);
  },
  findByPetId: (petId, callback) => {
    const sql = "SELECT * FROM pet_posts WHERE pet_id = ?";
    db.query(sql, [petId], callback);
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

    const sql = `UPDATE pet_posts SET ${fields.join(", ")} WHERE post_id = ?`;
    values.push(id);

    db.query(sql, values, callback);
  },
  deleteById: (id, callback) => {
    const sql = "DELETE FROM pet_posts WHERE post_id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = PetPost;
