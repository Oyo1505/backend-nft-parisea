const { model, Schema } = require("mongoose");
  
const nftSchema = new Schema({
  title: String, 
  description: String,
  image: { type: String, require: true },
  seller: { type: Schema.Types.ObjectId, ref: "user" },
  owner: { type: Schema.Types.ObjectId, ref: "user" },
  price: { type: Number, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "user" },
  category: String,
  sold: { type: Boolean, default: false },
  wishlists: [{ type: Schema.Types.ObjectId, ref: "user" }],
});

const nftModel = model("nft", nftSchema);

module.exports = nftModel;
