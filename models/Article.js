const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const articleSchema = new Schema({
  title: String, //unique, min 5 chars, required
  content: String, //min 20 chars, required
  author: [{ type: Schema.Types.ObjectId, ref: "User" }], //this needs to be the ObjectId of the User
  creationDate: { type: Date, default: Date.now }, //default to Now
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
