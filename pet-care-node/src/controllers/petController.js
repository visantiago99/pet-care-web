const Pet = require("../models/petModel");

exports.createPet = (req, res) => {
  const { name, species, breed, age, medical_history, photo } = req.body;
  const data = [name, species, breed, age, medical_history, photo];

  Pet.create(data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send("Pet registered!");
  });
};

exports.getAllPets = (req, res) => {
  Pet.findAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getPetById = (req, res) => {
  const { id } = req.params;
  Pet.findById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

exports.updatePetById = (req, res) => {
  const { id } = req.params;
  const petData = {};

  for (const [key, value] of Object.entries(req.body)) {
    if (value !== undefined) {
      petData[key] = value;
    }
  }

  Pet.updateById(id, petData, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json({ message: "Pet updated successfully" });
  });
};

exports.deletePetById = (req, res) => {
  const { id } = req.params;
  Pet.deleteById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0)
      return res.status(404).send("Animal não encontrado.");
    res.send("Animal deletado com sucesso!");
  });
};
