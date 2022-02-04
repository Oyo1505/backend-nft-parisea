require("dotenv").config();
require("../../config/mongo");
const nftModel = require("../../models/Nft");

const nfts = [
  {
    title: "Test",
    description: "une description",
    cid: "x02ds2q1d2qd1",
    price: 2,
    image:
      "https://www.nftculture.com/wp-content/uploads/2021/05/Bored-Ape-NFT-Bored-Ape-Yacht-Club-NFT-Culture.png",
    token_id: 1,
    category: "Dog",
  },

  {
    title: "Test 2",
    description: "une description",
    image:
      "https://news.artnet.com/app/news-upload/2021/08/Yuga-Labs-Bored-Ape-Yacht-Club-7940.jpg",
    price: 2,
    category: "crapaud",
  },
  {
    title: "Test 3",
    description: "une description 3",
    image:
      "https://uploads-ssl.webflow.com/5ead65b4cd1146b85071bfdf/608ff2a12bc39c3ff457ae36_Bored%20Ape%208622-%20Image%202.png",
    price: 2,
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
