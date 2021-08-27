exports.homepage = function (req, res) {
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
