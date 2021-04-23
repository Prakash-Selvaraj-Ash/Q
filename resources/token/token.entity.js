const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
    tokenNumber: { type: Number },
    lastWaitingTime: { type: Number, default: 0 },
    avgWaitingTime: { type: Number, default: 0},
    providerId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('token', TokenSchema);