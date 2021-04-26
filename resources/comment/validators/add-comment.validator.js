const providerSchema = require("../../provider/provider.entity");
const commentSchema = require("../comment.entity");

exports.validate = async function(commentRequest) {
  const parentValidation = validateIsParent(
    commentRequest.providerId,
    commentRequest.parentId
  );
  const providerValidation = validateProvider(commentRequest.providerId);
  return await Promise.all([parentValidation, providerValidation]);
};

validateIsParent = async function(providerId, parentId) {
  if (!parentId) {
    return Promise.resolve("valid comment");
  }
  const parentComment = await commentSchema.findById(parentId);
  if (parentComment && parentComment.providerId == providerId) {
    return Promise.resolve("valid comment");
  }
  return Promise.reject(new Error("invalid comment reply or invalid provider reply"));
};

validateProvider = async function(providerId) {
  console.log(providerId);
  if (!providerId) {
    return Promise.reject(new Error("providerId is mandatory to create a comment"));
  }

  const provider = await providerSchema.findById(providerId);
  if (!!provider) {
    return Promise.resolve("valid comment");
  }
  return Promise.reject(new Error("provider not found"));
};
