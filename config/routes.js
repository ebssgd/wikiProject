const express = require("express");
const url = require("url");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const articleController = require("../controllers/articleController");
const { check, validationResult } = require("express-validator");

module.exports = (app) => {
  app.get("/", articleController.homePage);

  app.get("/login", articleController.login);

  app.get("/register", articleController.register);

  app.post(
    "/register",
    check("username")
      .notEmpty()
      .isString()
      .withMessage("Username can not be empty"),
    check("password")
      .notEmpty()
      .isString()
      .withMessage("Password can not be empty"),
    articleController.newRegister
  );

  app.get("/viewAll", articleController.viewAll);

  app.get("/article", articleController.bigArticle);

  app.get("/createArticle", articleController.createArticle);

  app.post(
    "/createArticle",
    check("title")
      .notEmpty()
      .isLength(5)
      .withMessage("Title must be at least 5 characters long"),
    check("content")
      .notEmpty()
      .isLength(20)
      .withMessage("Must have at least 20 characters in content"),
    articleController.createNewArticle
  );

  app.get("/editArticle", articleController.editArticle);

  app.get("/searchResults", articleController.searchResults);

  app.get("/logout", articleController.logout);

  app.get("/*", articleController.notFound);
};

//Logged out = register, login, view all
//Logged in = view all, create new, edit any, delete own only, logout
