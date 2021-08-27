const express = require("express");
const url = require("url");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const articleController = require("../controllers/articleController");

module.exports = (app) => {
  app.get("/", function (req, res) {
    res.render("index");
    console.log("This is the home page");
  }); //articleController.homePage

  app.get("/login", function (req, res) {
    res.render("login");
    console.log("This is the login page");
  }); //articleController.login

  app.get("/register", function (req, res) {
    res.render("register");
    console.log("This is the register page");
  }); //articleController.register

  app.get("/viewAll", function (req, res) {
    res.render("all-articles");
    console.log("This is the view all page");
  });
};

//Logged out = register, login, view all
//Logged in = view all, create new, edit any, delete own only, logout
