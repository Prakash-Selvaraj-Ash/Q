const util = require('../utils/util');
const reviewService = require("./review.service");
const httpStatusCodes = require("http-status-codes");

const reviewsController = {
    getreviewsForProvider: async (req, res) => {
        try {
            const reviews = await reviewService.getreviewsForProvider(
                req.query.providerId
            );
            return res.status(httpStatusCodes.OK).json({ reviews });
        } catch (err) {
            return util.logAndReturnError(err, res);
        }
    },

    addReview: async (req, res) => {
        try {
            await reviewService.addReview(req.body);
            return res.status(httpStatusCodes.OK).json({});
        }
        catch (e) {
            return util.logAndReturnError(e, res);
        }
    }
}

module.exports = reviewsController;