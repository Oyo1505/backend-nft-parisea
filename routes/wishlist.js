const router = require("express").Router();
const nftModel = require("../models/Nft");

// ⬇︎⬇︎⬇︎⬇︎⬇︎　WISHLIST PAGE  ⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎⬇︎

// ADD IN WISHLIST LIST (UPDATE NFT MODEL)

router.patch("/wishlist/:id/:userId", async (req, res, next) => {
  // console.log("req.params.id >>>", req.params.id);
  // console.log("Wishlist : User Id >>>>>", req.body.userId);
  // console.log("Wishlist : NFT Id >>>>>", req.body.nftId);

  try {
    const foundedNft = await nftModel.findOne({
      _id: req.params.id,
      wishlists: req.body.userId,
    });
    console.log("Founded Nft >>>", foundedNft);

    if (!foundedNft) {
      const nft = await nftModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            wishlists: req.body.userId,
          },
        },
        { new: true }
      );
      res.status(201).json({ cartAdded: true, nft });
    } else {
      const nft = await nftModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            wishlists: req.body.userId,
          },
        },
        { new: true }
      );
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
    const addedWishlist = await nftModel.find({ wishlists: req.params.userId });
    // console.log("My id >>> ", req.params.userId);
    // console.log("Wishlist : get >>>>>", addedWishlist);
    res.status(200).json(addedWishlist);
  } catch (error) {
    console.error(error);
  }
});

// DELETE(UPDATE) FROM MY WISHLIST
router.patch("/wishlist/delete/:id/:userId", async (req, res) => {
  try {
    // console.log("NFT id", req.params.id);
    // console.log("User id", req.params.userId);

    const foundedNft = await nftModel.findOne({
      _id: req.params.id,
      wishlists: req.params.userId,
    });

    // console.log("Founded Nft >>>", foundedNft);

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
