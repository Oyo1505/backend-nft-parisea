const { model, Schema } = require("mongoose");

const nftSchema = new Schema({
  title: String,
  description: String,
  cid: String,
  user_id: { type: Schema.Types.ObjectId, refs: "user" },
  category: String,
});

const nftModel = model("nft", nftSchema);

module.exports = nftModel;
