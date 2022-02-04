require("dotenv").config();
require("../../config/mongo");

const userModel = require("../../models/user");

const users = [
  {
    image:
      "https://images.pexels.com/photos/684441/pexels-photo-684441.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    id_metamask: "0xD6Fd92dc982df8b35623F72E71bBD67C834Ba477",
    name: "Melodie",
    userName: "@melmel",
    email: "mel@gmail.com",
    bio: "Hello World ! 😝",
    balance: 50000,
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
    balance: 1000000,
  },

  {
    image:
      "https://images.pexels.com/photos/684441/pexels-photo-684441.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    coverImage:
      "https://c0.wallpaperflare.com/preview/398/315/676/louvre-museum-paris-at-night.jpg",
    id_metamask: "0xcCaE7db21ebAFE2110221ceC7C5b532E37B4F4D9",
    name: "HP",
    userName: "@0y0",
    email: "oyo@gmail.com",
    bio: "J'aime les banques 💸",
    balance: 20000,
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
