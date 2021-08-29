const express = require("express");
const url = require("url");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const articleController = require("../controllers/articleController");

module.exports = (app) => {
  app.get("/", articleController.homePage);

  app.get("/login", articleController.login);

  app.get("/register", articleController.register);

  app.post("/register", articleController.newRegister);

  app.get("/viewAll", articleController.viewAll);

  app.get("/article", articleController.bigArticle);

  app.get("/createArticle", articleController.createArticle);

  app.post("/createArticle", articleController.createNewArticle);

  app.get("/editArticle", articleController.editArticle);

  app.get("/searchResults", articleController.searchResults);

  // app.get("/logout", articleController.logout);

  app.get("/*", articleController.notFound);
};

//Logged out = register, login, view all
//Logged in = view all, create new, edit any, delete own only, logout
