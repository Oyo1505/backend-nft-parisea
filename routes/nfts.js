const router = require("express").Router();
const nftModel = require("../models/Nft");

//return all nfts
router.get("/nfts", async (req, res, next) => {
  try {
    const nfts = await nftModel.find();
    console.log(nfts)
    res.status(200).json(nfts);
  } catch (e) {
    next(e);
  }
});

router.post("/nfts", async (req, res, next) => {
  try {
    const res = await nftModel.create(req.body);
    res.status(200).json(res);
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
router.patch("/nfts/:id", async (req, res, next) => {
  console.log("updatge")
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