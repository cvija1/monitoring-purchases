const mongoose = require("mongoose");
const purchaseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Молим Вас унесите назив набавке"],
    },
    description: {
      type: String,
      required: [true, "Молим Вас унесите опис набавке"],
    },
    status: {
      type: String,
      required: true,
      enum: ["у току", "завршена", "неуспјела"],
      default: "у току",
    },
    value: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: [true, "Молим Вас унесите датум"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purchase", purchaseSchema);
