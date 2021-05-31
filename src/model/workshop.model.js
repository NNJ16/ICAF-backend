const mongoose = require("mongoose");

const WorkShopSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    description: { type: String, required: true },
    approvalStatus: { type: String, required: true },
    filepath: { type: String, required: true},
    presenter: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'users'}
});

const Workshop = mongoose.model('workshop', WorkShopSchema);

module.exports = Workshop;