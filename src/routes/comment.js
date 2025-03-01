const { Router } = require("express");
const { checkAuth } = require("../middlewares/auth");
const { handleAddComment } = require("../controllers/comment");
const commentRouter = Router();

commentRouter.post("/new/:blogId", checkAuth, handleAddComment);

module.exports = commentRouter;
