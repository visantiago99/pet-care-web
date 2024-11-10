const express = require("express");
const router = express.Router();
const petPostController = require("../controllers/petPostController");

router.post("/", petPostController.createPost);
router.get("/", petPostController.getAllPosts);
router.get("/:id", petPostController.getPostById);
router.get("/pet/:petId", petPostController.getPostsByPetId);
router.patch("/:id", petPostController.updatePostById);
router.delete("/:id", petPostController.deletePostById);

module.exports = router;
