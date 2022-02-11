const router = require("express").Router();
const nftModel = require("../models/Nft");

// ⬇︎⬇︎⬇︎⬇︎⬇︎　WISHLIST PAGE  ⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎

// ADD IN WISHLIST LIST (UPDATE NFT MODEL)

router.patch("/wishlist/:id/:userId", async (req, res, next) => {
  try {
    const foundedNft = await nftModel.findOne({
      _id: req.params.id,
      wishlists: req.body.userId,
    });
    if (!foundedNft) {
      const nft = await nftModel
        .findByIdAndUpdate(
          req.params.id,
          {
            $push: {
              wishlists: req.body.userId,
            },
          },
          { new: true }
        )
        .populate("creator");
      res.status(201).json({ cartAdded: true, nft });
    } else {
      const nft = await nftModel
        .findByIdAndUpdate(
          req.params.id,
          {
            $pull: {
              wishlists: req.body.userId,
            },
          },
          { new: true }
        )
        .populate("creator");
      res.status(201).json({ cartAdded: false, nft });
    }
  } catch (error) {
    console.log("Wrong way", error);
    next(error);
  }
});

// DISPLAY MY WISHLIST

router.get("/wishlist/:userId", async (req, res) => {
  try {
    const addedWishlist = await nftModel
      .find({ wishlists: req.params.userId })
      .populate("creator");
    res.status(200).json(addedWishlist);
  } catch (error) {
    console.error(error);
  }
});

// DELETE(UPDATE) FROM MY WISHLIST
router.patch("/wishlist/delete/:id/:userId", async (req, res) => {
  try {
    const foundedNft = await nftModel.findOne({
      _id: req.params.id,
      wishlists: req.params.userId,
    });
    await nftModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          wishlists: req.params.userId,
        },
      },
      { new: true }
    );
    res.status(201).json(foundedNft);
  } catch (error) {
    console.log("Wrong way", error);
  }
});

module.exports = router;
