require("dotenv").config();
require("../../config/mongo");

const userModel = require("../../models/user");

const users = [
  {
    image:
      "https://images.pexels.com/photos/684441/pexels-photo-684441.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    id_metamask: "0x659fC9B0E47D717F7878183ae2f5edceeBA78912",
    name: "Melodie",
    userName: "@melmel",
    email: "mel@gmail.com",
    bio: "Hello World ! 😝",
  },

  {
    image:
      "https://images.pexels.com/photos/684441/pexels-photo-684441.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    coverImage:
      "https://c0.wallpaperflare.com/preview/398/315/676/louvre-museum-paris-at-night.jpg",
    id_metamask: "0xdb44FE57Decb2F43Fc96950d0D32e7A81FbBD976",
    name: "Scoby",
    userName: "@scoby_nft",
    email: "mini@gmail.com",
    bio: "NFTs Collection dropping soon ! 🙀",
  },

  {
    image:
      "https://images.pexels.com/photos/684441/pexels-photo-684441.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    coverImage:
      "https://c0.wallpaperflare.com/preview/398/315/676/louvre-museum-paris-at-night.jpg",
    id_metamask: "0xA244D791c1DA4cbd94Fc937aFddB34Cd7514170a",
    name: "HP",
    userName: "@0y0",
    email: "oyo@gmail.com",
    bio: "J'aime les banques 💸",
  },
];

(async function () {
  try {
    await userModel.deleteMany();
    await userModel.insertMany(users);
    console.log("Created users");
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
