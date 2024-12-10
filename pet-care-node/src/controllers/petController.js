const Pet = require("../models/petModel");

exports.createPet = (req, res) => {
  const { name, species, breed, age, description, photo, city, state, phone } =
    req.body;

  const user_id = req.user.userId;

  if (!user_id) {
    return res.status(400).send({ message: "User ID is required." });
  }

  const data = [
    name,
    species,
    breed,
    age,
    description,
    photo,
    city,
    state,
    phone,
    user_id,
  ];

  Pet.create(data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({
      message: "Pet registered!",
      result,
    });
  });
};

exports.getAllPets = (req, res) => {
  Pet.findAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getPetsByUserId = (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).send({ message: "User ID is required." });
  }

  Pet.findAllByUserId(user_id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) {
      return res.status(404).json({ message: "No pets found for this user." });
    }
    res.status(200).json(results);
  });
};

exports.getPetById = (req, res) => {
  const { id } = req.params;
  Pet.findById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({
      message: "Pet found",
      result: result[0],
    });
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
    res.status(200).send({
      message: "Animal deletado com sucesso!",
      result,
    });
  });
};
