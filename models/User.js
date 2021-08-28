const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Article = require("./Article");

const userSchema = new Schema({
  username: String, //unique, required
  password: String, //required
  createdArticles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
