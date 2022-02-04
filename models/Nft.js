const { model, Schema } = require("mongoose");

const nftSchema = new Schema({
  title: String,
  description: String,
  image: { type: String, require: true },
  seller: { type: Schema.Types.ObjectId, refs: "user" },
  owner: { type: Schema.Types.ObjectId, refs: "user" },
  price: { type: Number, required: true },
  creator: { type: Schema.Types.ObjectId, refs: "user" },
  category: String,
});

const nftModel = model("nft", nftSchema);

module.exports = nftModel;
