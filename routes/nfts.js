const router = require("express").Router();
const nftModel = require("../models/Nft");
const userModel = require("../models/user");
const uploader = require("../config/cloudinary");

//return all nfts
router.get("/nfts", async (req, res, next) => {
  try {
    const nfts = await nftModel.find().populate("creator");
    res.status(200).json(nfts);
  } catch (e) {
    next(e);
  }
});

//return Single nft
router.get("/nfts/:id", async (req, res, next) => {
  try {
    const nft = await nftModel.findById(req.params.id).populate("creator");
    res.status(200).json(nft);
  } catch (e) {
    next(e);
  }
});

router.get("/nfts/single/:id/:userId", async (req, res, next) => {
  try {
    const nft = await nftModel.findById(req.params.id).populate("creator");

    const isItInsideWishlist = await nftModel.findOne({
      _id: req.params.id,
      wishlists: { $in: req.params.userId },
    });
    if (!isItInsideWishlist) {
      res.status(201).json({ nft, cartAdded: false });
    } else {
      res.status(201).json({ nft, cartAdded: true });
    }
  } catch (e) {
    next(e);
  }
});

//get a  NFTs to Marketplace
router.get("/nfts/market/:limit", async (req, res, next) => {
  try {
    const nfts = await nftModel
      .find({ sold: false })
      .limit(req.params.limit)
      .populate("creator");
    nfts.reverse();
    res.status(200).json(nfts);
  } catch (e) {
    next(e);
  }
});

//get a random NFT
router.get("/random-nft", async (req, res, next) => {
  try {
    const nfts = await nftModel.find();
    let randomNumder = Math.floor(Math.random() * nfts.length);
    const nft = await nftModel
      .findById(nfts[randomNumder]._id)
      .populate("creator");
    res.status(200).json(nft);
  } catch (e) {
    next(e);
  }
});
//return list of NFTs owned and created from the user
router.get("/list-nfts/:mode/:id", async (req, res, next) => {
  const { mode, id } = req.params;
  try {
    const nfts = await nftModel.find({ [mode]: id }).populate("creator");
    nfts.reverse();
    res.status(200).json(nfts);
  } catch (e) {
    next(e);
  }
});
//return only nft to sold
router.get("/nfts-sold", async (req, res, next) => {
  try {
    const nfts = await nftModel.find({ sold: true });
    res.status(200).json(nfts);
  } catch (e) {
    next(e);
  }
});

//Resell NFT
router.patch("/resell-nft/:id", async (req, res, next) => {
  try {
    const nft = await nftModel.findByIdAndUpdate(
      req.params.id,
      { sold: false },
      { new: true }
    );
    res.status(200).json(nft);
  } catch (e) {
    next(e);
  }
});
//Buy an NFT
router.patch("/buy-nft/:id/:userId", async (req, res, next) => {
  try {
    const nft = await nftModel.findById(req.params.id).populate("seller");
    const buyer = await userModel.findById(req.params.userId);
    nft.owner = buyer._id;
    nft.sold = true;
    nft.seller = buyer._id;
    buyer.balance = buyer.balance - nft.price;
    console.log(nft.seller.balance);
    await nftModel.findByIdAndUpdate(nft._id, nft, { new: true });
    await userModel.findByIdAndUpdate(buyer._id, buyer, { new: true });
    res.status(200).json({ nft, buyer });
  } catch (e) {
    next(e);
  }
});
//Create an NFT
router.post(
  "/nfts/create-item",
  uploader.single("image"),
  async (req, res, next) => {
    const { title, description, seller, owner, price, creator } = req.body;
    try {
      if (req.file) {
        const image = req.file.path || undefined;

        const nft = await nftModel.create({
          title,
          description,
          seller,
          owner,
          price,
          creator,
          image: req.file.path,
        });
        res.status(200).json(nft);
      }
    } catch (e) {
      next(e);
    }
  }
);

//return NFTs created, owened,  by the current user
router.get("/nfts/:spec/:id", async (req, res, next) => {
  const spec = req.params.spec;
  try {
    const nft = await nftModel.find({ spec: req.params.id });
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
