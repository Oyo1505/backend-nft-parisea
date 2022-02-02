const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  userName: String,
  userPfp: String,
  image: { type: String, required: true },
  description: String,
  postedTime: { type: Date, default: Date.now() },
});

const postModel = model("post", postSchema);
module.exports = postModel;
