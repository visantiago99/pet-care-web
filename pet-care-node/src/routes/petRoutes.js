const express = require("express");
// const multer = require("multer");
const router = express.Router();
const petController = require("../controllers/petController");
const { authenticateToken } = require("../middleware/authMiddleware");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });

// const upload = multer({ storage: storage });

router.post(
  "/",
  /*upload.single("photo"),*/ authenticateToken,
  petController.createPet
);
router.get("/", petController.getAllPets);
router.get("/:id", petController.getPetById);
router.get("/user/:user_id", petController.getPetsByUserId);
router.patch("/:id", authenticateToken, petController.updatePetById);
router.delete("/:id", authenticateToken, petController.deletePetById);

module.exports = router;
