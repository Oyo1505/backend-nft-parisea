// require("dotenv").config();
// require("../../config/mongo");

// const commentModel = require("../../models/Comment.model");

// const comments = [
//   {
//     // userId: "",
//     userName: "Mimi",
//     userPfp:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvCJ44jSvkr8W9bYID4eqPeoJctZjBULPDg&usqp=CAU",
//     text: "Wowww",
//     commentedTime: "2022-02-05",
//   },
//   {
//     // userId: "",
//     userName: "Mimi",
//     userPfp:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvCJ44jSvkr8W9bYID4eqPeoJctZjBULPDg&usqp=CAU",
//     text: "Looks so cool!",
//     commentedTime: "2022-02-05",
//   },
//   {
//     // userId: "",
//     userName: "Mimi",
//     userPfp:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvCJ44jSvkr8W9bYID4eqPeoJctZjBULPDg&usqp=CAU",
//     text: "Congrats!",
//     commentedTime: "2022-02-05",
//   },
// ];

// (async function () {
//   try {
//     await commentModel.deleteMany();
//     const commentsCreated = await commentModel.insertMany(comments);
//     console.log("Comments are created >>", commentsCreated);
//     process.exit();
//   } catch (error) {
//     console.error(error);
//   }
// })();
