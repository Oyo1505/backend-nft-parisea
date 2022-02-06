const router = require("express").Router();
const postModel = require("../models/Post.model");
const userModel = require("../models/user");
const commentModel = require("../models/Comment.model");
const uploader = require("../config/cloudinary");
const { Types } = require("mongoose");

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

// Detail - GET
router.get("/posts/:id", async (req, res, next) => {
  console.log("req.params.id : >>>>>", req.params.id);
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
  }
);

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

// ⬇︎⬇︎⬇︎⬇︎⬇︎　COMMENT ⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎

// GET - COMMENT
// router.get("/comments", async (req, res, next) => {
//   try {
//     const commentedUserId = await postModel.findById(req.params.id);
//     res.status(200).json(commentedUserId.comment.length);
//   } catch (error) {
//     next(error);
//   }
// });

// CREATE&UPDATE - COMMENT
router.patch("/posts/:id/comments", async (req, res, next) => {
  console.log("req.body : >>>>>", req.body);
  try {
    const updqtedPost = await postModel.findByIdAndUpdate(
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
    );
    res.status(201).json(updqtedPost);
  } catch (error) {
    console.log("Wrong way", error);
    next(error);
  }
});

// ⬇︎⬇︎⬇︎⬇︎⬇︎　LIKES ⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎

// router.get("/like/:id", async (req, res, next) => {
//   try {
//     const postUserId = await PostModel.findById(req.params.id);
//     res.status(200).json(postUserId.likes.length);
//   } catch (e) {
//     next(e);
//   }
// });

// router.post("/addlike/:id", async (req, res, next) => {
//   try {
//     const foundLike = await PostModel.findOne({
//       _id: req.body.postId,
//       likes: { $in: req.body.currentUserId },
//     });
//     if (foundLike) {
//       //unlike
//       await PostModel.findByIdAndUpdate(
//         req.body.postId,
//         {
//           $pull: { likes: req.body.currentUserId },
//         },
//         {
//           new: true,
//         }
//       );
//       res.status(201).json({ likedPost: false });
//     } else {
//       // like
//       await PostModel.findByIdAndUpdate(
//         req.body.postId,
//         {
//           $push: { likes: req.body.currentUserId },
//         },
//         {
//           new: true,
//         }
//       );
//       res.status(201).json({ likedPost: true });
//     }
//   } catch (e) {
//     next(e);
//   }
// });

module.exports = router;
