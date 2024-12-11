const PetPost = require("../models/petPostModel");

exports.createPost = (req, res) => {
  const { pet_id, content, photo, user_id } = req.body;
  const data = [pet_id, content, photo, user_id];

  PetPost.create(data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: "Post created!", result });
  });
};

exports.getAllPosts = (req, res) => {
  PetPost.findAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getPostById = (req, res) => {
  const { id } = req.params;
  PetPost.findById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send("Post not found.");
    res.status(200).json({ message: "Post found", result: result[0] });
  });
};

exports.getPostsByPetId = (req, res) => {
  const { petId } = req.params;
  PetPost.findByPetId(petId, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(results);
  });
};

exports.updatePostById = (req, res) => {
  const { id } = req.params;
  const postData = {};

  for (const [key, value] of Object.entries(req.body)) {
    if (value !== undefined) {
      postData[key] = value;
    }
  }

  PetPost.updateById(id, postData, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0)
      return res.status(404).send("Post not found.");
    res.status(200).send({ message: "Post updated successfully" });
  });
};

exports.deletePostById = (req, res) => {
  const { id } = req.params;
  PetPost.deleteById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0)
      return res.status(404).send("Post not found.");
    res.status(200).send({ message: "Post deleted successfully", result });
  });
};
