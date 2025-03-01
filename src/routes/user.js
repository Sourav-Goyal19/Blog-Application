const { Router } = require("express");
const {
  handleSignUp,
  handleSignIn,
  handleSignOut,
  handleProfileImage,
} = require("../controllers/user");
const { checkAuth } = require("../middlewares/auth");

const userRouter = Router();

userRouter
  .post("/signup", handleSignUp)
  .post("/signin", handleSignIn)
  .get("/signout", handleSignOut)
  .post("/profile", checkAuth, handleProfileImage);

module.exports = userRouter;
