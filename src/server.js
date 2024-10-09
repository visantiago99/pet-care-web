const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const app = express();
const port = 3000;

// Configuração do MySQL
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.post("/pets", upload.single("photo"), (req, res) => {
  const { name, species, breed, age, medical_history } = req.body;
  const photo = req.file ? req.file.filename : null;

  const sql =
    "INSERT INTO pets (name, species, breed, age, medical_history, photo) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, species, breed, age, medical_history, photo],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send("Pet registered!");
    }
  );
});

app.get("/pets", (req, res) => {
  const sql = "SELECT * FROM pets";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.get("/pets/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT FROM pets WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

app.delete("/pets/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM pets WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Animal não encontrado.");
    }
    res.send("Animal deletado com sucesso!");
  });
});

app.post("/medical-history", (req, res) => {
  const { pet_id, appointment_date, appointment_time, reason, notes } =
    req.body;

  if (!pet_id || !appointment_date || !appointment_time || !reason) {
    return res
      .status(400)
      .send("Todos os campos obrigatórios devem ser preenchidos.");
  }

  const query =
    "INSERT INTO medical_history (pet_id, appointment_date, appointment_time, reason, notes) VALUES (?, ?, ?, ?, ?)";
  const values = [pet_id, appointment_date, appointment_time, reason, notes];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Erro ao inserir consulta médica:", err);
      return res.status(500).send("Erro ao inserir consulta médica.");
    }
    res.status(201).send("Consulta médica criada com sucesso.");
  });
});
