const express = require("express");
const router = express.Router();
const { protect, adminProtect } = require("../middleware/authMiddleware");
const noteRouter = require("./noteRoutes");
const {
  getPurchases,
  createPurchase,
  getPurchase,
  deletePurchase,
  updatePurchase,
  getAllPurchases,
} = require("../controllers/purchaseController");
router.use("/:purchaseId/notes", noteRouter);
router.route("/").get(protect, getPurchases).post(protect, createPurchase);
router.route("/admin").get(adminProtect, getAllPurchases);
router
  .route("/:id")
  .get(protect, getPurchase)
  .delete(protect, deletePurchase)
  .put(protect, updatePurchase);
module.exports = router;
