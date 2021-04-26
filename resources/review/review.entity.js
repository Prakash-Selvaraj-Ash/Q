const mongoose = require("mongoose");

const userRatingSchema = {
    ratedDate: { type: Date, required: true, default: Date.now },
    rating: { type: Number, default: 0 },
    providerId: { type: mongoose.Schema.Types.ObjectId },
    userId: { type: String, required: true }
};

module.exports = mongoose.model('userRating', userRatingSchema);
