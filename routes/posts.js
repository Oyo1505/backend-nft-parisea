const router = require("express").Router();
const postModel = require("../models/Post.model");
const userModel = require("../models/user");
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
    console.log("Post create req.body : >>>>>", req.body);
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
  console.log("Post detail req.params.id : >>>>>", req.params.id);
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
    console.log("Post delete req.params.id : >>>>>", req.params.id);
    const postToDelete = await postModel.findByIdAndDelete(req.params.id);
    res.status(200).json(postToDelete);
  } catch (error) {
    console.error(error);
  }
});

// ⬇︎⬇︎⬇︎⬇︎⬇︎　COMMENT ⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎

// GET - COMMENT
// router.get("/posts/:id/comments", async (req, res) => {
//   try {
//     const comments = await postModel.find().populate("userId");
//     res.status(200).json(comments);
//   } catch (error) {
//     console.error(error);
//   }
// });

// // CREATE&UPDATE - COMMENT
// router.post("/posts/:id/comments", async (req, res, next) => {
//   console.log("req.params.id : >>>>>", req.params.id);
//   console.log("req.body : >>>>>", req.body.id);
//   try {
//     const updatedPost = await postModel.findByIdAndUpdate(
//       req.params.id,
//       {
//         $push: {
//           comments: {
//             comment: req.body.comment,
//             userId: Types.ObjectId(req.body.userId),
//           },
//         },
//       },
//       { new: true }
//     );
//     res.status(201).json(updatedPost);
//   } catch (error) {
//     console.log("Wrong way", error);
//     next(error);
//   }
// });

// ⬇︎⬇︎⬇︎⬇︎⬇︎　LIKES ⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎

// router.get("/like/:id", async (req, res, next) => {
//   try {
//     const postUserId = await postModel.findById(req.params.id);
//     res.status(200).json(postUserId.likes.length);
//   } catch (e) {
//     next(e);
//   }
// });

// router.post("/addlike/:id", async (req, res, next) => {
//   try {
//     const foundLike = await postModel.findOne({
//       _id: req.body.postId,
//       likes: { $in: req.body.currentUserId },
//     });
//     if (foundLike) {
//       //unlike
//       await postModel.findByIdAndUpdate(
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
//       await postModel.findByIdAndUpdate(
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
