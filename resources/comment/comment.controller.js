const commentService = require("./comment.service");
const httpStatusCodes = require("http-status-codes");

const commentsController = {
  getCommentsForProvider: async (req, res) => {
    try {
      const comments = await commentService.getCommentsForProvider(
        req.query.providerId
      );
      return res.status(httpStatusCodes.OK).json({ comments });
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message
      });
    }
  },

  createComment: async (req, res) => {
    try {
      const createCommentRequest = req.body;
      console.log(createCommentRequest);

      const createdComment = await commentService.addComment(
        createCommentRequest
      );
      return res.status(httpStatusCodes.CREATED).json({ createdComment });
    } catch (err) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        error: err.message
      });
    }
  }
};

module.exports = commentsController
