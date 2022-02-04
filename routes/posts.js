const router = require("express").Router();
const postModel = require("../models/Post.model");
const uploader = require("../config/cloudinary");

// DISPLAY ALL POSTS
router.get("/posts", async (req, res) => {
  try {
    const posts = await postModel.find().populate("userId");
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
  }
});

// CREATE - POST
router.post(
  "/posts/create",
  uploader.single("image"),
  async (req, res, next) => {
    console.log("hello");
    console.log("req.body : >>>>>", req.body);
    const image =
      req.file?.path ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTsidAbaLbPxZTeyE2TKH5ozutkieNJvJSEQ&usqp=CAU";
    try {
      const createdPost = await postModel.create({ ...req.body, image });
      res.status(201).json(createdPost);
    } catch (error) {
      next(error);
    }
  }
);

// UPDATE - GET
router.get("/posts/:id", async (req, res) => {
  console.log("req.params.id : >>>>>", req.params.id);
  try {
    const onePost = await postModel.findById(req.params.id).populate("userId");
    res.status(200).json(onePost);
  } catch (error) {
    console.error(error);
  }
});

// UPDATE - PATCH
router.patch("/posts/:id", uploader.single("image"), async (req, res, next) => {
  try {
    const {
      userId,
      userName,
      userPfp,
      description,
      postedTime,
      existingImage,
    } = req.body;
    let newImage;
    if (req.file) newImage = req.file.path;
    else newImage = existingImage;

    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.id,
      {
        // userId,
        userName,
        userPfp,
        description,
        postedTime,
        image: newImage,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

// DELETE
router.post("/posts/delete/:id", async (req, res) => {
  try {
    // console.log("req.params.id : >>>>>", req.params.id);
    const postToDelete = await postModel.findByIdAndDelete(req.params.id);
    res.status(200).json(postToDelete);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
