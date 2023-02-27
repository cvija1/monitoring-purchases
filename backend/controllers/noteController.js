const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Note = require("../models/noteModel");
const Purchase = require("../models/purchaseModel");

const getNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  const purchase = await Purchase.findById(req.params.purchaseId);
  if (!req.user.isAdmin || purchase.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Нисте ауторизовани");
  }
  const notes = await Note.find({ purchase: req.params.purchaseId });
  res.status(200).json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }

  if (!req.user.isAdmin) {
    res.status(401);
    throw new Error("Нисте ауторизовани");
  }

  const note = await Note.create({
    purchase: req.params.purchaseId,
    text: req.body.text,
    isAdmin: true,
    adminId: req.user.id,
    user: req.user.id,
  });
  res.status(200).json(note);
});

module.exports = {
  getNotes,
  createNote,
};
