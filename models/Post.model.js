const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  title: {type:String},
  image: { type: String, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTsidAbaLbPxZTeyE2TKH5ozutkieNJvJSEQ&usqp=CAU" },
  description: String,
  postedTime: { type: Date, default: Date.now() },
  comments: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      comment: {
        type: String,
      },
      commentedTime: { type: Date, default: Date.now() },
    },
  ],
});

const postModel = model("post", postSchema);
module.exports = postModel;
