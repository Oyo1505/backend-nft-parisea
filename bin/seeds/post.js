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
    likes: null,
    comments: [
      {
        // userId: "",
        userName: "cc",
        userPfp:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvCJ44jSvkr8W9bYID4eqPeoJctZjBULPDg&usqp=CAU",
        comment: "Wowww",
        commentedTime: "2022-02-05",
      },
      {
        // userId: "",
        userName: "bb",
        userPfp:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvCJ44jSvkr8W9bYID4eqPeoJctZjBULPDg&usqp=CAU",
        comment: "222",
        commentedTime: "2022-02-05",
      },
      {
        // userId: "",
        userName: "aa",
        userPfp:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvCJ44jSvkr8W9bYID4eqPeoJctZjBULPDg&usqp=CAU",
        comment: "33333",
        commentedTime: "2022-02-05",
      },
    ],
  },

  {
    // userId: "",
    userName: "Mimi",
    userPfp:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvCJ44jSvkr8W9bYID4eqPeoJctZjBULPDg&usqp=CAU",
    image:
      "https://1.bp.blogspot.com/-69ZojM6CpIQ/YKv7OGItmAI/AAAAAAAAAj8/a6yw6uxggOgVAVmeH_TP3T2XrtadaTPBgCLcBGAsYHQ/w870-h870/Arabian-Camel-10224.jpg",
    description: "I got my second NFT, yayyy! ",
    postedTime: "2022-02-03",
    likes: null,
  },
  {
    // userId: "",
    userName: "Mimi",
    userPfp:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvCJ44jSvkr8W9bYID4eqPeoJctZjBULPDg&usqp=CAU",
    image:
      "https://lh3.googleusercontent.com/awS86uOxTzXBq2KueD_sBimR9OsTPuB6tmm7T822Ye-JBAJrMCw6TiSQcol_3Dd5A59gjycolX8rDjez9P4uNJeDEKkdVA72dkEk",
    description: "I got my third NFT, yayyy! ",
    postedTime: "2022-02-04",
    likes: null,
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
