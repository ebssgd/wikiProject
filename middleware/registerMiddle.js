const { check, validationResult } = require("express-validator");

exports.regMid = (req, res) => {
  console.log("This is outside the middle");
  return [
    check("username").notEmpty().isString().withMessage("Need a username."),
    check("password").notEmpty().isString().withMessage("Need a password"),
  ];
};
