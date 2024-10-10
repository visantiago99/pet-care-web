const express = require("express");
const router = express.Router();
const medicalHistoryController = require("../controllers/medicalHistoryController");

router.post("/", medicalHistoryController.createMedicalHistory);

module.exports = router;
