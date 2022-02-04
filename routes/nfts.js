const router = require("express").Router();
const nftModel = require("../models/Nft");
const uploader = require("../config/cloudinary");
const cloudinary = require("cloudinary");
//return all nfts
router.get("/nfts", async (req, res, next) => {
  try {
    const nfts = await nftModel.find();
    console.log(nfts);
    res.status(200).json(nfts);
  } catch (e) {
    next(e);
  }
});

router.post("/nfts", uploader.single("image"), async (req, res, next) => {
  try {
    if (req.file) {
      const res = await nftModel.create({
        title: req.body.title,
        description: req.body.description,
        image: req.file.path,
        price: req.body.price,
        seller: req.body.owner,
        creator: req.body.creator,
      });

      res.status(200).json(res);
    }
  } catch (e) {
    next(e);
  }
});

//return On nft
router.get("/nfts/:id", async (req, res, next) => {
  try {
    const nft = await nftModel.findById(req.params.id);
    res.status(200).json(nft);
  } catch (e) {
    next(e);
  }
});

//update
router.patch("/nfts-edit/:id", async (req, res, next) => {
  try {
    const nft = await nftModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(nft);
  } catch (e) {
    next(e);
  }
});

//delete nfts

router.get("/nfts/delete/:id", async (req, res, next) => {
  try {
    const nft = await nftModel.findByIdAndDelete(req.params.id);
    res.status(200).json(nft);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
