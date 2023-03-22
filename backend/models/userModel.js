const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    surname: {
      type: String,
      required: [true, "Please add an surname"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
    },
    username: {
      type: String,
      required: [true, "Please add username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    status: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
