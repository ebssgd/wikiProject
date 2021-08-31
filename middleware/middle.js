const { check, validationResult } = require("express-validator");

exports.regMid = () => {
  console.log("This is outside the middle");
  return [
    check("username").notEmpty().isString().withMessage("Need a username."),
    check("password").notEmpty().isString().withMessage("Need a password"),
  ];
};

exports.artMid = () => {
  return [
    check("title")
      .notEmpty()
      .isLength(5)
      .withMessage("Title must be at least 5 characters long"),
    check("content")
      .notEmpty()
      .isLength(20)
      .withMessage("Must have at least 20 characters in content"),
  ];
};

// exports.loginValidator = (req, res) => {
//     return [
//       body('username')
//         .trim()
//         .not()
//         .isEmpty()
//         .withMessage('Please provide username')
//         .isAlphanumeric()
//         .withMessage('Username should be Alphanumeric')
//         .isLength({ min: 5, max: 20 })
//         .withMessage('Username should be between 5-20 characters'),
//       body('password', 'Check your password')
//         .isAlphanumeric()
//         .isLength({ min: 8, max: 20 }),
//     ];
//   };
