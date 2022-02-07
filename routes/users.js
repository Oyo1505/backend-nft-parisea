const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const uploader = require("../config/cloudinary");

function imageEditForm(file) {
  //if(file)
}

// DISPLAY USERS
router.get("/users", async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
});

// EDIT - GET
router.get("/users/:id", async (req, res, next) => {
  try {
    const singleUser = await userModel.findById(req.params.id);
    res.status(200).json(singleUser);
  } catch (e) {
    next(e);
  }
});

router.get("/users/edit/:id", async (req, res, next) => {
  try {
    const singleUser = await userModel.findById(req.params.id);
    res.status(200).json(singleUser);
  } catch (e) {
    next(e);
  }
});

// EDIT USER
router.patch(
  "/users/edit/:id",
  uploader.fields([
    {
      name: "image",
    },
    {
      name: "coverImage",
    },
  ]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        name,
        userName,
        email,
        bio,
        image,
        coverImage,
        twitter,
        facebook,
        instagram,
      } = req.body;

      let newImage;
      let newCoverImage;

      // if (req.files && req.files.image > 0) {
      //   newImage = req.files.image[0].path;
      // } else {
      //   newImage = image;
      //   console.log(newImage, "esle");
      // }
      // if (req.files && req.files.coverImage.length > 0) {
      //   newCoverImage = req.files.coverImage[0].path;
      // } else {
      //   newCoverImage = coverImage;
      //   console.log(newImage, "esqdqssle");
      // }

      const editUser = await userModel.findByIdAndUpdate(
        id,
        {
          image: newImage,
          coverImage: newCoverImage,
          name,
          userName,
          email,
          bio,
          twitter,
          facebook,
          instagram,
        },
        { new: true }
      );

      res.status(200).json(editUser);
    } catch (e) {
      next(e);
    }
  }
);

router.get("/follower/:id/:currentUserId", async (req, res, next) => {
  try {
    const follower = await userModel.findOne({
      _id: req.params.id,
      follower: { $in: req.params.currentUserId },
    });
    res.status(200).json(follower ? true : false);
  } catch (e) {
    next(e);
  }
});

router.patch("/add-follow/:id/:currentUserId", async (req, res, next) => {
  try {
    const foundedFollower = await userModel.findOne({
      _id: req.params.id,
      follower: { $in: req.params.currentUserId },
    });
    if (foundedFollower) {
      //UNFOLLOW
      await userModel.findByIdAndUpdate(
        req.params.currentUserId,
        {
          $pull: { following: req.params.id },
        },
        { new: true }
      );

      const user = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { follower: req.params.currentUserId },
        },
        { new: true }
      );
      res.status(201).json({ followedUser: false, user });
    } else {
      //FOLLOW
      await userModel.findByIdAndUpdate(
        req.params.currentUserId,
        {
          $push: { following: req.params.id },
        },
        { new: true }
      );
      const user = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: { follower: req.params.currentUserId },
        },
        { new: true }
      );
      res.status(201).json({ followedUser: true, user });
    }
  } catch (e) {
    next(e);
  }
});

// DELETE
router.get("/users/:id", async (req, res) => {
  try {
    const userDelete = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json(userDelete);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
