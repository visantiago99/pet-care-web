const Pet = require("../models/petModel");

exports.createPet = (req, res) => {
  // Obtendo os dados do pet do corpo da requisição
  const { name, species, breed, age, description, photo, city, state, phone } = req.body;

  // O user_id vem do token, através do req.user
  const user_id = req.user.userId; // O userId foi salvo no token durante o login

  if (!user_id) {
    return res.status(400).send({ message: "User ID is required." });
  }

  // Dados que serão inseridos no banco de dados
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
    user_id, // Associando o pet ao user_id do token
  ];

  // Chama a função Pet.create para salvar o pet no banco de dados
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
