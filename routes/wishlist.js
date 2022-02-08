const router = require("express").Router();
const NftModel = require("../models/Nft");
const UserModel = require("../models/user");
const uploader = require("../config/cloudinary");

// DISPLAY ALL WISH LIST
router.get("/wishlist", async (req, res) => {
  try {
    const posts = await UserModel.find().populate("nft");
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
  }
});

// ADD WISHLIST - CREATE
router.post("/wishlist/add/:id", async (req, res, next) => {
  console.log("Wishlist added! req.params.id : >>>>>", req.params.id);

  try {
    const addedList = await postModel.create(rea.body);
    res.status(201).json(addedList);
  } catch (error) {
    next(error);
  }
});
