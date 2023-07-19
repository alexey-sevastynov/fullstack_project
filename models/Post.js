const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      //necessary
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: { type: Array, default: [] },
    viewsCount: {
      type: Number,
      default: 0, // default value
    },
    imageBase64: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // new unique date create
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
