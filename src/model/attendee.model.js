const mongoose = require("mongoose");

const AttendeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    paymentStatus: { type: String, required: true},
    conference: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'conferences'}
});

const Attendee = mongoose.model('attendee', AttendeeSchema);
module.exports = Attendee;