const { model, Schema } = require("mongoose");

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  userName: String,
  userPfp: String,
  text: String,
  commentedTime: { type: Date, default: Date.now() },
});

const commentModel = model("comment", commentSchema);
module.exports = commentModel;
