exports.homePage = function (req, res) {
  res.render("index");
  console.log("This is the home page");
};

exports.login = function (req, res) {
  res.render("login");
  console.log("This is the login page");
};

exports.register = function (req, res) {
  res.render("register");
  console.log("This is the register page");
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
