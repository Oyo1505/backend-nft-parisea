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
    console.log(singleUser);
    res.status(200).json(singleUser);
  } catch (e) {
    next(e);
  }
});

// EDIT USER
router.patch(
  "/users/edit/:id",
  uploader.single("image"),
  uploader.single("coverImage"),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const { image, coverImage, name, userName, email, bio } = req.body;
      let newImage;
      if (req.file) {
        newImage = req.file.path;
      } else {
        newImage = image;
      }
      console.log(req.body);
      const editUser = await userModel.findByIdAndUpdate(
        id,
        {
          image,
          coverImage,
          name,
          userName,
          email,
          bio,
        },
        { new: true }
      );
      console.log("ko", editUser);
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
