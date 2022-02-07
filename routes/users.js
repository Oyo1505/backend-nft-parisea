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
    if (req.files) {
      console.log("req.cover >>>>>>>>>>>>>", req.files.coverImage);
      console.log("req.cover >>>>>>>>>>>>>", req.files.image);
    }

    try {
      const { id } = req.params;
      const {
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
      console.log("image +++++", image);
      console.log("coverImage +++++", coverImage);

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
