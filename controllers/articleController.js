const User = require("../models/User");
const Article = require("../models/Article");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Handlebars = require("handlebars");

exports.homePage = async function (req, res) {
  const articles = await Article.find().limit(3).lean();
  //console.log("The homepage articles are ", articles);
  let loggedIn = res.cookie.loggedIn;
  console.log(res.cookie.loggedIn); //Showing undefined.
  Handlebars.registerHelper("firstFifty", function (numLimit) {
    //console.log(numLimit);
    let contentArray = numLimit.split(" ");
    //console.log(contentArray);
    let finalArr = [];
    for (i = 0; i < 50; i++) {
      finalArr.push(contentArray[i]);
    }
    let theString = finalArr.join(" ");
    return new Handlebars.SafeString(theString);
  });

  res.render("index", { articles });
  //console.log("This is the home page");
};

exports.login = function (req, res) {
  res.render("login");
  console.log("This is the login page");
};

exports.loggedIn = async function (req, res) {
  //console.log(req.body);
  await User.findOne({ username: req.body.username }, function (err, user) {
    //console.log("User found!!", user);
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      //console.log("The password result is", result);
    });
    const token = jwt.sign({ id: user._id }, "Big Secret", {
      expiresIn: "12h",
    });
    //console.log(token);
    console.log(res.cookie);
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
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const salt = Math.sqrt(64);
  await bcrypt.hash(req.body.password, salt, function (err, hash) {
    //console.log("This is the hash ", hash);
    const newUser = new User({
      username: req.body.username,
      password: hash,
    });
    //console.log(newUser);
    newUser.save(function (err, newUser) {
      if (err) return console.error(err);
      //console.log("User was saved");
      res.redirect(301, "/login");
    });
  });
};

exports.viewAll = async function (req, res) {
  const articles = await Article.find().lean();
  res.render("allArticles", { articles });
  //console.log("This is the view all page");
};

exports.bigArticle = function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    if (err) return console.error(err);
    res.render("article", { article });
    //console.log("This is the article page");
  }).lean();
};

exports.createArticle = function (req, res) {
  res.render("create");
  console.log("This is the create article page");
};

exports.createNewArticle = function (req, res) {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
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

exports.logout = function (req, res) {
  res.clearCookie("token");
  res.clearCookie("loggedIn");
  res.redirect("/");
};

exports.notFound = function (req, res) {
  res.render("404");
};
