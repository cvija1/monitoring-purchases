const express = require("express");
const router = express.Router();
const { protect, adminProtect } = require("../middleware/authMiddleware");
const {
  getPurchases,
  createPurchase,
  getPurchase,
  deletePurchase,
  updatePurchase,
  getAllPurchases,
  getDates,
} = require("../controllers/purchaseController");
router.route("/").get(protect, getPurchases).post(protect, createPurchase);
router.route("/admin").get(adminProtect, getAllPurchases);
router.route("/admin/dates").get(adminProtect, getDates);
router
  .route("/:id")
  .get(protect, getPurchase)
  .delete(protect, deletePurchase)
  .put(protect, updatePurchase);
module.exports = router;
