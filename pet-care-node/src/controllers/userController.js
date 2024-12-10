const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.registerUser = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Erro ao criptografar senha.", error: err });

    const data = [username, email, hash];
    User.create(data, (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ message: "Email ou username já cadastrado." });
        }
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
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.login(email, password, (err, result) => {
    if (err) return res.status(400).json({ message: err.message });

    const token = result.token;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "Lax",
    });

    res.status(200).json({
      message: "Login realizado com sucesso!",
      token: result.token,
    });
  });
};
