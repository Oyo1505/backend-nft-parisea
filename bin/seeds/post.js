require("dotenv").config();
require("../../config/mongo");

const postModel = require("../../models/Post.model");

const posts = [
  {
    // userId: "",
    userName: "Mimi",
    userPfp:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvCJ44jSvkr8W9bYID4eqPeoJctZjBULPDg&usqp=CAU",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTsidAbaLbPxZTeyE2TKH5ozutkieNJvJSEQ&usqp=CAU",
    description: "I got my first NFT, yayyy! ",
    postedTime: "2022-02-02",
  },
];

(async function () {
  try {
    await postModel.deleteMany();
    const postsCreated = await postModel.insertMany(posts);
    // console.log("Posts are created >>", postsCreated);
    process.exit();
  } catch (error) {
    console.error(error);
  }
})();
