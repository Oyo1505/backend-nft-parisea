const router = require("express").Router();
const postModel = require("../models/Post.model");
const uploader = require("../config/cloudinary");

// DISPLAY ALL
router.get("/posts", async (req, res, next) => {
  console.log("WORKING?");
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
  }
});

// CREATE - POST
router.post("/posts"),
  uploader.single("image"),
  async (req, res, next) => {
    const image = req.file?.path || undefined;
    try {
      const createdPost = await postModel.create({ ...req.body, image });
      res.status(201).json(createdPost);
    } catch (error) {
      next(error);
    }
  };

// UPDATE - GET
router.get("/posts/:id"),
  async (req, res) => {
    try {
      const onePost = await postModel.findById(req.params.id);
      res.status(200).json(onePost);
    } catch (error) {
      console.error(error);
    }
  };

// UPDATE - PATCH
router.patch("/posts/:id"),
  uploader.single("image"),
  async (req, res, next) => {
    try {
      const updatedPost = await postModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  };

// DELETE
router.get("/posts/:id", async (req, res) => {
  try {
    const postToDelete = await postModel.findByIdAndDelete(req.params.id);
    res.status(200).json(postToDelete);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
