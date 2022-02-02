require("dotenv").config();
require("../../config/mongo");
const nftModel = require("../../models/Nft");

const nfts = [
  {
    title: "Test",
    description: "une description",
    cid: "x02ds2q1d2qd1",
    token_id: 1,
    category: "Dog",
  },

  {
    title: "Test 2",
    description: "une description",
    cid: "x02ds2q1d2qd1",

    category: "crapaud",
  },
  {
    title: "Test 3",
    description: "une description 3",
    cid: "x02ds2q1d2qd1",
    token_id: 3,
    category: "cat",
  },
];

(async function () {
  try {
    await nftModel.deleteMany();
    await nftModel.insertMany(nfts);
    console.log("nfts created");
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
