const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = {
  create: (data, callback) => {
    const sql =
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
    db.query(sql, data, callback);
  },
  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ? LIMIT 1";
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("Erro ao buscar email:", err);
        return callback(err, null);
      }
      callback(null, results.length > 0 ? results[0] : null);
    });
  },
  login: (email, password, callback) => {
    User.findByEmail(email, (err, results) => {
      if (err) return callback(err);
      const user = results;
      if (!user) {
        return callback(new Error("Usuário não encontrado"), null);
      }

      bcrypt.compare(password, user.password_hash, (err, isMatch) => {
        if (err) return callback(err);
        if (!isMatch) {
          return callback(new Error("Senha inválida"), null);
        }

        const token = jwt.sign(
          {
            userId: user.user_id,
            username: user.username,
            email: user.email,
          },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );

        callback(null, {
          token,
          username: user.username,
          email: user.email,
        });
      });
    });
  },
};

module.exports = User;
