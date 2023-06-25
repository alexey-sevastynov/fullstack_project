const { body } = require("express-validator");

const registerValidator = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("fullName").isLength({ min: 3 }),
  body("avatarUrl").optional().isURL(),
];
const loginValidator = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];
const postCreatedValidation = [
  body("title").isLength({ min: 3 }).isString(),
  body("text").isLength({ min: 3 }).isString(),
  body("tags").optional().isString(),
  body("imageUrl").optional().isString(),
];

module.exports = { registerValidator, loginValidator, postCreatedValidation };
