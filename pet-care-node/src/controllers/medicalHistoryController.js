const MedicalHistory = require("../models/medicalHistoryModel");

exports.createMedicalHistory = (req, res) => {
  const { pet_id, appointment_date, appointment_time, reason, notes } =
    req.body;

  if (!pet_id || !appointment_date || !appointment_time || !reason) {
    return res
      .status(400)
      .send("Todos os campos obrigatórios devem ser preenchidos.");
  }

  const data = [pet_id, appointment_date, appointment_time, reason, notes];

  MedicalHistory.create(data, (err, result) => {
    if (err) return res.status(500).send("Erro ao inserir consulta médica.");
    res.status(201).send("Consulta médica criada com sucesso.");
  });
};
