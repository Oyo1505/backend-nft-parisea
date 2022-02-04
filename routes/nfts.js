const router = require("express").Router();
const nftModel = require("../models/Nft");
const uploader = require("../config/cloudinary");

//return all nfts
router.get("/nfts", async (req, res, next) => {
  try {
    const nfts = await nftModel.find();
    res.status(200).json(nfts);
  } catch (e) {
    next(e);
  }
});

router.post("/nfts/create-item", uploader.single("image"), async (req, res, next) => {
 
  const image = req.file?.path || undefined;
  try {
    
      const nft = await nftModel.create({
        ...req.body, image
      });
      res.status(200).json(nft);
  } catch (e) {
    next(e);
  }
});

//return Single nft
router.get("/nfts/:id", async (req, res, next) => {
  try {
    const nft = await nftModel.findById(req.params.id);
    res.status(200).json(nft);
  } catch (e) {
    next(e);
  }
});
//return NFTs created, owened,  by the current user 
router.get("/nfts/:spec/:id", async (req, res, next) => {
  const spec = req.params.spec
  try {
    const nft = await nftModel.find({ spec : req.params.id});
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

router.post("/nfts/delete/:id", async (req, res, next) => {
  try {
    const nft = await nftModel.findByIdAndDelete(req.params.id);
    res.status(200).json(nft);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
