const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.registerUser = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  User.findByEmail(email, (err, existingUser) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erro ao verificar email no banco.", error: err });
    }

    if (existingUser) {
      return res.status(400).json({ message: "O email já está cadastrado." });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erro ao criptografar senha.", error: err });
      }

      const data = [username, email, hash];
      User.create(data, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Erro ao registrar usuário.", error: err });
        }

        res.status(201).json({
          message: "Usuário registrado com sucesso!",
          userId: result.insertId,
        });
      });
    });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.login(email, password, (err, result) => {
    if (err) return res.status(400).json({ message: err.message });

    const { token, username, email: userEmail } = result;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "Lax",
    });

    res.status(200).json({
      message: "Login realizado com sucesso!",
      username,
      email: userEmail,
      token,
    });
  });
};
