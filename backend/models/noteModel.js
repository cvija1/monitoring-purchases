const mongoose = require("mongoose");
const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    purchase: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Purchase",
    },
    text: {
      type: String,
      required: [true, "Молим Вас оставите неки коментар"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    adminId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
