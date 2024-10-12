const validator = require("validator");
const userSignUpValidation = (req) => {
  const { firstName, lastName, password, email } = req.body;

  if (!firstName || !lastName) {
    throw new Error("FirstName is required");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("FirstName length is not correct");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is weak");
  }
};

const userSignInValidation = (req) => {
  const { email } = req.body;

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
};

const userProfileUpdateValidation = (req) => {
  const ALLOWED_FIELDS = ["photoUrl", "skills", "age", "about"];

  const isAllowed = Object.keys(body).every((item) =>
    ALLOWED_FIELDS.includes(item)
  );

  return isAllowed;
};
module.exports = {
  userSignUpValidation,
  userSignInValidation,
  userProfileUpdateValidation,
};
