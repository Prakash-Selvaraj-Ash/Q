const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true, lowercase: true, unique: true },
    type: { type: String, required: true },
    review: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    providerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    availTime: { type: [Number], required: true }
});

module.exports = mongoose.model('doctor', DoctorSchema);