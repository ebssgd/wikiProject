const express = require("express");
const url = require("url");

const bodyParser = require("body-parser");
const articleController = require("../controllers/articleController");
const registerMiddle = require("../middleware/registerMiddle");
const { body, validationResult } = require("express-validator");

module.exports = (app) => {
  app.get("/", articleController.homePage);

  app.get("/login", articleController.login);

  app.post("/login", articleController.loggedIn);

  app.get("/register", articleController.register);

  app.post(
    "/register",
    body("password").isLength({ min: 5 }),
    articleController.newRegister
  );

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
