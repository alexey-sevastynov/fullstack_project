const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      //necessary
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: { type: String, required: true },
    avatarUrl: String,
  },
  {
    timestamps: true, // new unique date create
  }
);

module.exports = UserSchema;
