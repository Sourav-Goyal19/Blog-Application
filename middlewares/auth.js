const { getUser } = require("../service/auth");

const restrictToLoggedIn = (req, res, next) => {
  const userToken = req.cookies?.token;
  if (!userToken) return res.redirect("/signin");
  const user = getUser(userToken);
  if (!user) return res.redirect("/signin");
  req.user = user;
  next();
};

const checkAuth = (req, res, next) => {
  const userToken = req.cookies?.token;
  const user = getUser(userToken);
  req.user = user;
  next();
};

module.exports = { restrictToLoggedIn, checkAuth };
