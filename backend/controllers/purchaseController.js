const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Purchase = require("../models/purchaseModel");
const mongoose = require("mongoose");

const getPurchases = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }

  const { sort, pageSize, page, order } = req.query;

  const count = await Purchase.countDocuments({ user: req.user.id });
  const total = await Purchase.aggregate([
    { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
    { $group: { _id: null, total: { $sum: "$value" } } },
  ]);
  const prices = total[0].total;
  const purchases = await Purchase.find({ user: req.user.id })
    .sort({ [sort]: order })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  res.status(200).json({
    purchases,
    count,
    total: prices,
  });
});

const getAllPurchases = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  const purchases = await Purchase.find();
  res.status(200).json(purchases);
});

const getPurchase = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(401);
    throw new Error("Набавка није пронађена");
  }

  const purchase = await Purchase.findById(req.params.id);
  if (!purchase) {
    res.status(404);
    throw new Error("Набавка није пронађена");
  }
  if (!user.isAdmin && purchase.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Нисте ауторизовани");
  }
  res.status(200).json(purchase);
});

const createPurchase = asyncHandler(async (req, res) => {
  const { date, title, status, description, value } = req.body;

  if (!title || !description || !status || !value || !date) {
    res.status(400);
    throw new Error("Молим Вас унесите назив набавке и опис исте");
  }
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  const purchase = await Purchase.create({
    title,
    description,
    user: req.user.id,
    status,
    value,
    date,
  });
  res.status(201).json(purchase);
});

const deletePurchase = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(401);
    throw new Error("Набавка није пронађена");
  }
  const purchase = await Purchase.findById(req.params.id);
  if (!purchase) {
    res.status(404);
    throw new Error("Набавка није пронађена");
  }
  if (purchase.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Нисте ауторизовани");
  }
  try {
    await Purchase.deleteOne({ _id: req.params.id });
  } catch (error) {
    throw new Error(error);
  }

  res.status(200).json({ success: true });
});

const updatePurchase = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Корисник није пронађен");
  }
  const purchase = await Purchase.findById(req.params.id);
  if (!purchase) {
    res.status(404);
    throw new Error("Набавка није пронађена");
  }
  if (purchase.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Нисте ауторизовани");
  }

  const updatedPurchase = await Purchase.findByIdAndUpdate(
    req.params.id,
    req.body,

    { new: true }
  );
  res.status(200).json(updatedPurchase);
});

module.exports = {
  getPurchase,
  getPurchases,
  createPurchase,
  getPurchase,
  deletePurchase,
  updatePurchase,
  getAllPurchases,
};
