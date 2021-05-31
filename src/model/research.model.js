const mongoose = require("mongoose");

const ResearchSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    approvalStatus: { type: String, required: true},
    paymentStatus: { type: String, required: true},
    filepath: { type: String, required: true},
    researcher: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'users'}
});

const Research = mongoose.model('research', ResearchSchema);

module.exports = Research;