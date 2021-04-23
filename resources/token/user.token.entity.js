const mongoose = require("mongoose");

const UserTokenSchema = new mongoose.Schema({
    tokenNumber: { type: Number },
    userId: { type: String, required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    createdOn: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('userToken', UserTokenSchema);