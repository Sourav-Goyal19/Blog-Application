const { Router } = require("express");
const Blog = require("../models/blog");
const staticRouter = Router();

staticRouter
  .get("/", async (req, res) => {
    const user = req.user;
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.status(200).render("Home", {
      fullName: user?.fullName || undefined,
      blogs: allBlogs,
    });
  })
  .get("/signup", (req, res) => {
    return res.status(200).render("Signup");
  })
  .get("/signin", (req, res) => {
    return res.status(200).render("Signin");
  })
  .get("/new-blog", (req, res) => {
    const user = req.user;
    return res.status(200).render("AddBlog", {
      fullName: user?.fullName || undefined,
    });
  })
  .get("/profile", (req, res) => {
    const user = req.user;
    return res.status(200).render("AddProfile", {
      fullName: user?.fullName || undefined,
      profileImageUrl: user?.profileImageUrl,
    });
  });

module.exports = staticRouter;
