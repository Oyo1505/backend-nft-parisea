const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

router.get("/connect-wallet/:id", async (req, res, next) => {
  try {
    const user = await userModel.find({ id_metamask: req.params.id });
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
});
router.post("/connect-wallet/:id", async (req, res, next) => {
  try {
    const newUser = {};
    const foundUser = await userModel.findOne({
      id_metamask: req.params.id,
    });
    if (foundUser) {
      res.status(200).json(foundUser);
    } else {
      newUser.id_metamask = req.params.id;
      newUser.balance = 100;
      const user = await userModel.create(newUser);
      res.status(200).json(user);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
