const db = require("./db");

const MedicalHistory = {
  create: (data, callback) => {
    const sql =
      "INSERT INTO medical_history (pet_id, appointment_date, appointment_time, reason, notes) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, data, callback);
  },
};

module.exports = MedicalHistory;
