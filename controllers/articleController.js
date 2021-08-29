const User = require("../models/User");
const Article = require("../models/Article");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.homePage = function (req, res) {
  res.render("index");
  console.log("This is the home page");
};

exports.login = function (req, res) {
  res.render("login");
  console.log("This is the login page");
};

exports.loggedIn = async function (req, res) {
  console.log(req.body);
  await User.findOne({ username: req.body.username }, function (err, user) {
    console.log("User found!!", user);
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      console.log("The password result is", result);
    });
    const token = jwt.sign({ id: user._id }, "Big Secret", {
      expiresIn: "12h",
    });
    console.log(token);
    res.cookie("token", token);
    res.cookie("loggedIn", true);
  });
  res.redirect("/");
};

exports.register = function (req, res) {
  res.render("register");
  console.log("This is the register page");
};

exports.newRegister = async function (req, res) {
  const salt = Math.sqrt(64);
  await bcrypt.hash(req.body.password, salt, function (err, hash) {
    console.log("This is the hash ", hash);
    const newUser = new User({
      username: req.body.username,
      password: hash,
    });
    //console.log(newUser);
    newUser.save(function (err, newUser) {
      if (err) return console.error(err);
      console.log("User was saved");
      res.redirect(301, "/login");
    });
  });
};

exports.viewAll = function (req, res) {
  res.render("all-articles");
  console.log("This is the view all page");
};

exports.bigArticle = function (req, res) {
  res.render("article");
  console.log("This is the article page");
};

exports.createArticle = function (req, res) {
  res.render("create");
  console.log("This is the create article page");
};

exports.createNewArticle = function (req, res) {
  //console.log("The body of code is ", req.body);
  const newArticle = new Article(req.body);
  //console.log(newArticle);
  newArticle.save(function (err, newArticle) {
    if (err) return console.error(err);
    //console.log("Article was saved");
  });
  res.redirect(301, "/createArticle");
};

exports.editArticle = function (req, res) {
  res.render("edit");
  console.log("This is the edit article page");
};

exports.searchResults = function (req, res) {
  res.render("search-results");
  console.log("This is the search results page");
};

// exports.logout = function (req, res) {
//   res.clearCookie("token");
//   res.clearCookie("loggedIn");
//   res.redirect("/");
// };

exports.notFound = function (req, res) {
  res.render("404");
};
