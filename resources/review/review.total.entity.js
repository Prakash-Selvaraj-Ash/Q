const mongoose = require('mongoose');

const totalProviderRating = {
    providerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    noOfRated: { type: Number, required: true, default: 1 },
    rating: { type: Number, default: 0, required: true },
    userId: { type: String, required: true }
}

module.exports = mongoose.model('totalProviderRating', totalProviderRating);
