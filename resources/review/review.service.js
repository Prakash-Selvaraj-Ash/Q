const reviewEntitySchema = require('./review.entity');
const totalReviewSchema = require('./review.total.entity');

const reviewService = {
    addReview: async (reviewRequest) => {

        const userReview = await reviewEntitySchema.findOne({ providerId: reviewRequest.providerId, userId: reviewRequest.userId });

        if (userReview) { return; }

        const review = {
            providerId: reviewRequest.providerId,
            rating: reviewRequest.rating,
            userId: reviewRequest.userId
        }

        await reviewEntitySchema.create(review);

        const totalReview = await totalReviewSchema.findOne({ providerId: reviewRequest.providerId });

        totalReview.noOfRated += 1;
        totalReview.rating = (totalUserRating.rating + reviewRequest.rating) / totalUserRating.noOfRated;

        await totalReviewSchema.updateOne(totalReview);
    },

    getReview: async (providerId) => {
        return await totalReviewSchema.findOne({ providerId: providerId });
    }
}

module.exports = reviewService