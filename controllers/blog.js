const Blog = require("../models/blog");
const Comment = require("../models/comment");
const { User } = require("../models/user");

async function handleBlogCreation(req, res) {
  const { title, body } = req.body;
  const loggedInUser = req.user;
  try {
    if (!req.file || !req.file.filename) {
      throw new Error("Cover Image Is Required");
    }
    const coverImage = req.file.filename;
    const blog = await Blog.create({
      title,
      body,
      coverImage: `/uploads/${coverImage}`,
      developedBy: req.user.id,
    });
    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.log(error);
    return res.render("AddBlog", {
      msg: error.message,
      fullName: loggedInUser?.fullName || undefined,
      formOldData: { title, body },
    });
  }
}

async function handleBlogOpening(req, res) {
  let blogComments;
  const blogId = req.params.blogId;
  const loggedInUser = req.user;
  const blog = await Blog.findOne({ _id: blogId });
  const blogUser = await User.findOne({ _id: blog.developedBy });
  const bgComments = await Comment.find({ blogId })
    .populate("createdBy")
    .sort({ createdAt: -1 });
  if (bgComments.length > 0) {
    blogComments = bgComments;
  }
  return res.status(200).render("Blog", {
    blog,
    blogUser,
    blogComments,
    fullName: loggedInUser?.fullName || undefined,
  });
}

module.exports = { handleBlogCreation, handleBlogOpening };
