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

const getLastTags = async (req, res) => {
  try {
    const posts = await Post.find().limit(5).exec(); // get last 5 articles

    const tags = posts
      .map((articleObj) => articleObj.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to find tags" });
  }
};

const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" }
    )
      .populate("user")
      .then((doc) => res.json(doc))
      .catch((err) =>
        res.status(500).json({ message: "failed to find articles" })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to find articles" });
  }
};

const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    Post.findOneAndDelete({ _id: postId })
      .then((doc) => res.json(doc))
      .catch((err) =>
        res.status(500).json({ message: "failed to delete article" })
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to delete article" });
  }
};

const update = async (req, res) => {
  try {
    const postId = req.params.id;

    Post.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    )
      .then((doc) => res.json(doc))
      .catch((err) =>
        res.status(500).json({ message: "failed to delete article" })
      );

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "failed to update article" });
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

module.exports = { create, getAll, getLastTags, getOne, remove, update };
