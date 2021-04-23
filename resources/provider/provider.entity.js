const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
    name: { type: String, required: true, lowercase: true },
    type: { type: String, required: true },
    subType: { type: String },
    commentsCount: { type: Number, default: 0 },
    review: { type: Number, default: 0 },
    location: { type: [Number], required: true },
    userId: { type: String, required: true },
    imageUrl: { type: String },
    maxToken: { type: Number, default: 50 },
    availTime: { type: [Number], required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId },
});

ProviderSchema.index({ name: 1, userId: 1 }, { unique: true })

module.exports = mongoose.model('provider', ProviderSchema);