const commentSchema = require("./comment.entity");
const providerSchema = require("../provider/provider.entity");
const addCommentValidator = require("./validators/add-comment.validator");
const commentProfile = require('./comment.profile');
const mapper = require("object-mapper");

const commentsService = {
  getCommentsForProvider: async providerId => {
    const comments = await commentSchema.find({ providerId: providerId });
    return mapper(comments, commentProfile.commentMap);
  },

  addComment: async comment => {
    await addCommentValidator
      .validate(comment)
      .then(async () => await processComment(comment))
      .catch(reason => {
        throw new Error(reason);
      });
  },

  likeComment: async likeRequest => {
    await commentSchema.findByIdAndUpdate(likeRequest.id, {
      $inc: { likesCount: 1 }
    });
  },

  likeReply: async likeRequest => {
    const query = { _id: likeRequest.parentId };
    const update = { $inc: { 'replies.$[elem].likesCount': 1 } };
    const options = { new: true, arrayFilters: [{ "elem._id": likeRequest.id }] };
    await commentSchema.findOneAndUpdate(query, update, options);
  }
};

processComment = async comment => {
  const isReply = comment.parentId;
  let createdComment = {};
  if (isReply) {
    const reply = { content: comment.content };
    createdComment = await commentSchema.findByIdAndUpdate(comment.parentId, {
      $push: { replies: reply }
    });
  } else {
    createdComment = await commentSchema.create(comment);
  }

  await providerSchema.findByIdAndUpdate(
    comment.providerId,
    { $inc: { commentsCount: 1 } },
    { new: true }
  );

  return createdComment;
};

module.exports = commentsService;
