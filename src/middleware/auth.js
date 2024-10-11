const authMiddleware = (req, res, next) => {
  const token = "xyz";

  if (token === "xyz") {
    next();
  } else {
    res.send("UnAuthorized request");
  }
};

module.exports = {
  authMiddleware,
};
