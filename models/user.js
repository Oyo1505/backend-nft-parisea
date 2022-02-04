const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  image: {
    type: String,
    default:
      "https://img.myloview.fr/stickers/default-avatar-profile-icon-vector-social-media-user-image-400-205124837.jpg",
  },
  coverImage: {
    type: String,
    default: "https://ansfl.org/wp-content/uploads/cover-default.png",
  },
  id_metamask: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    default: "undefined",
  },
  userName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  follower: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  twitter: String,
  facebook: String,
  instagram: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  nfts_ids_created: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  nfts_ids_owned: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  whishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  bio: String,
  balance: {
    type: Number,
    required: true,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
