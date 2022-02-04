const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

router.get("/connect-wallet/:id", async (req, res, next) => {
  //   console.log("YO");
  try {
    const user = await userModel.find({ id_metamask: req.params.id });
  } catch (e) {
    next(e);
  }
});

router.post("/connect-wallet/:id", async (req, res, next) => {
  console.log("hellooo");
  try {
    const newUser = { ...req.body };
    const foundUser = await userModel.findOne({
      id_metamask: req.params.id,
    });

    console.log(foundUser);
    if (foundUser) {
      res.status(200).json(foundUser);
      console.log("found the user >>>>", foundUser);
    } else {
      newUser.id_metamask = req.params.id;
      await userModel.create(newUser);
      res.status(200).json(newUser);
      console.log("New User >>>>", newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
