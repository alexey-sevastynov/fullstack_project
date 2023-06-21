const Post = require("../models/Post");

const getAll = async (req, res) => {
  try {
    const posts = await Post.find().populate("user").exec(); // find all-Object information about user

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to find articles" });
  }
};

const create = async (req, res) => {
  try {
    const doc = new Post({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to create article" });
  }
};

module.exports = { create, getAll };
