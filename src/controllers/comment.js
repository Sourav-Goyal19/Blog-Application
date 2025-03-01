const Comment = require("../models/comment");

async function handleAddComment(req, res) {
  const blogId = req.params.blogId;
  const { content } = req.body;
  const userId = req?.user?.id;
  const userName = req.user.fullName;
  console.log(req.user);
  const comment = await Comment.create({
    content,
    blogId,
    createdBy: userId,
    userName,
  });
  return res.redirect(`/blog/${blogId}`);
}

module.exports = { handleAddComment };
