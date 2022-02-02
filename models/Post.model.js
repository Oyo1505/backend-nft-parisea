const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  userName: String,
  userPfp: String,
  imgUrl: { type: String, required: true },
  description: String,
  postedTime: { type: Date, default: Date.now() },
});

module.exports = model("post", postSchema);
