const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
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

const User = mongoose.model("User", UserSchema);

module.exports = User;
