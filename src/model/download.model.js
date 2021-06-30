const mongoose = require("mongoose");

const DownloadSchema = new mongoose.Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    filename: { type: String, required: true },
    filepath: { type: String, required: true},
    submitDate : { type: Date, required: true}
});

const Download = mongoose.model('download', DownloadSchema);

module.exports = Download;