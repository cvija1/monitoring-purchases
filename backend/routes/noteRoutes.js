const express = require("express");
const router = express.Router({ mergeParams: true });
const { getNotes, createNote } = require("../controllers/noteController");
const { protect, adminProtect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes).post(adminProtect, createNote);

module.exports = router;
