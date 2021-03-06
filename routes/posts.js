const router = require("express").Router();
const postModel = require("../models/Post.model");
const uploader = require("../config/cloudinary");
const { Types } = require("mongoose");

// ⬇︎⬇︎⬇︎⬇︎⬇︎　USER PAGE - MY POST ⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎

// DISPLAY ONLY MY POSTS
router.get("/posts/mypost/:id", async (req, res) => {
  try {
    const posts = await postModel
      .find({
        userId: req.params.id,
      })
      .populate("userId");

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
  }
});

// ⬇︎⬇︎⬇︎⬇︎⬇︎　POSTS CRUD ⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎

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

// Detail - GET
router.get("/posts/:id", async (req, res, next) => {
  try {
    const onePost = await postModel.findById(req.params.id).populate("userId");
    res.status(200).json(onePost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// UPDATE - PATCH
router.patch(
  "/posts/update/:id",
  uploader.single("image"),
  async (req, res, next) => {
    try {
      const {
        userId,
        title,
        existingImage,
        description,
        postedTime,
        comments,
      } = req.body;
      let newImage;
      if (req.file) newImage = req.file.path;
      else newImage = existingImage;

      const updatedPost = await postModel
        .findByIdAndUpdate(
          req.params.id,
          {
            userId,
            title,
            image: newImage,
            description,
            postedTime,
            comments,
          },
          { new: true }
        )
        .populate({
          path: "comments",
          populate: {
            path: "userId",
          },
        });
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/posts/market/:limit", async (req, res, next) => {
  try {
    const posts = await postModel
      .find()
      .limit(req.params.limit)
      .populate("userId");
    posts.reverse();
    res.status(200).json(posts);
  } catch (e) {
    next(e);
  }
});

// DELETE
router.post("/posts/delete/:id", async (req, res) => {
  try {
    await postModel.findByIdAndRemove(req.params.id);
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
  }
});

// ⬇︎⬇︎⬇︎⬇︎⬇︎　COMMENT ⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎

// GET - COMMENT
router.get("/posts/comments/:id", async (req, res) => {
  try {
    const comments = await postModel.findById(req.params.id).populate({
      path: "comments",
      populate: {
        path: "userId",
      },
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
  }
});

// CREATE(UPDATE) - COMMENT
router.patch("/posts/comments/:id", async (req, res, next) => {
  try {
    const updatedPost = await postModel
      .findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            comments: {
              comment: req.body.comment,
              userId: Types.ObjectId(req.body.userId),
            },
          },
        },
        { new: true }
      )
      .populate({
        path: "comments",
        populate: {
          path: "userId",
        },
      });
    res.status(201).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

// DELETE(UPDATE) - COMMENT
router.patch("/posts/comments/delete/:id", async (req, res) => {
  try {
    const commentToDelete = await postModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: { _id: req.body.commentId },
        },
      },
      { new: true }
    );
    res.status(200).json(commentToDelete);
  } catch (error) {
    console.error(error);
  }
});

// ⬇︎⬇︎⬇︎⬇︎⬇︎　LIKES ⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎

// GET - LIKE
router.get("/posts/likes/:id/:userId", async (req, res) => {
  try {
    const addedLike = await postModel.findOne({
      _id: req.params.id,
      likes: { $in: req.params.userId },
    });

    if (!addedLike) {
      res.status(201).json({ likeAdded: false });
    } else {
      res.status(201).json({ likeAdded: true });
    }
  } catch (error) {
    console.error(error);
  }
});

// ADD (PATCH) - LIKE
router.patch("/posts/likes/:id", async (req, res, next) => {
  try {
    const addedLike = await postModel.findOne({
      _id: req.params.id,
      likes: { $in: req.body.userId },
    });

    if (!addedLike) {
      const post = await postModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            likes: req.body.userId,
          },
        },
        {
          new: true,
        }
      );
      res.status(201).json({ likeAdded: true, post });
    } else {
      const post = await postModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            likes: req.body.userId,
          },
        },
        { new: true }
      );
      res.status(201).json({ likeAdded: false, post });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
