const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const uploader = require("../config/cloudinary");

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
        image,
        coverImage,
        name,
        userName,
        email,
        bio,
        following,
        follower,
        twitter,
        facebook,
        instagram,
        posts,
        nfts_ids_created,
        nfts_ids_owned,
        whishlist,
        balance,
      } = req.body;

      let newImage;
      let newCoverImage;
      if (req.file) {
        newImage = req.file.path;
        newCoverImage = req.file.path;
      } else {
        newImage = image;
        newCoverImage = coverImage;
      }

      const editUser = await userModel.findByIdAndUpdate(
        id,
        {
          image,
          coverImage,
          name,
          userName,
          email,
          bio,
          following,
          follower,
          twitter,
          facebook,
          instagram,
          posts,
          nfts_ids_created,
          nfts_ids_owned,
          whishlist,
          balance,
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
  console.log("HERE ••••••", req.params);
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

      await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { follower: req.params.currentUserId },
        },
        { new: true }
      );
      res.status(201).json({ followedUser: false });
    } else {
      //FOLLOW
      await userModel.findByIdAndUpdate(
        req.params.currentUserId,
        {
          $push: { following: req.params.id },
        },
        { new: true }
      );
      await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: { follower: req.params.currentUserId },
        },
        { new: true }
      );
      res.status(201).json({ followedUser: true });
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
