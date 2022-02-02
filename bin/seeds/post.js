require("dotenv").config();
require("../../config/mongo");

const postModel = require("../../models/Post.model");

const posts = [
  {
    userId: "",
    userName: "Mimi",
    userPfp:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.alamyimages.fr%2Fphotos-images%2Fnft.html%3Fimgt%3D8&psig=AOvVaw2zT8h5aBGmUNhmY84ZyIrH&ust=1643887037941000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJC3_9by4PUCFQAAAAAdAAAAABAQ",
    imgUrl:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bianoti.com%2Fles-plus-grands-proprietaires-de-celebrites-nft-du-bored-ape-yacht-club.html&psig=AOvVaw2zT8h5aBGmUNhmY84ZyIrH&ust=1643887037941000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJC3_9by4PUCFQAAAAAdAAAAABAE",
    description: "I got my first NFT, yayyy! ",
    postedTime: "2022-02-02",
  },
];

(async function () {
  try {
    await postModel.deleteMany();
    const postsCreated = await postModel.insertMany(posts);
    console.log("Posts are created >>", postsCreated);
    process.exit();
  } catch (error) {
    console.error(error);
  }
})();
