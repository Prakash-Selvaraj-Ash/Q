const mongoose = require("mongoose");

const TokenArchiveSchema = new mongoose.Schema({
    tokenNumber: { type: Number, required: true },
    userId: { type: String, required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    startedOn: { type: Date, required: true, default: Date.now },
    createdOn: { type: Date, required: true },
    tokenId: { type: mongoose.Schema.Types.ObjectId, required: true },
    timeServed: { type: Number }
});

module.exports = mongoose.model('tokenArchive', TokenArchiveSchema);