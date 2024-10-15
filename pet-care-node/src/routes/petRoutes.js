const express = require("express");
// const multer = require("multer");
const router = express.Router();
const petController = require("../controllers/petController");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });

// const upload = multer({ storage: storage });

router.post("/", /*upload.single("photo"),*/ petController.createPet);
router.get("/", petController.getAllPets);
router.get("/:id", petController.getPetById);
router.patch("/:id", petController.updatePetById);
router.delete("/:id", petController.deletePetById);

module.exports = router;
