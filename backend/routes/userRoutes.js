const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  verifyUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

//ova / oznacava da ce nam vratiti Register na routeu koji
//je def na serveru
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/confirm/:confirmationCode", verifyUser);

module.exports = router;
