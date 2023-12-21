const { Router } = require("express");
const blogRouter = Router();
const { checkAuth } = require("../middlewares/auth");
const {
  handleBlogCreation,
  handleBlogOpening,
} = require("../controllers/blog");

blogRouter
  .post("/create", checkAuth, handleBlogCreation)
  .get("/:blogId", checkAuth, handleBlogOpening);

module.exports = blogRouter;
