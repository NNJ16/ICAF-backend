const mongoose = require("mongoose");

const WorkShopSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    description: { type: String, required: true },
    approvalStatus: { type: String, required: true },
    filename: { type: String, required: true },
    filepath: { type: String, required: true},
    submitDate : { type: Date, required: true},
    submitter: {
        userId :{type: String, required:true},
        name: {type:String},
        email :{type:String}
    }
});

const Workshop = mongoose.model('workshop', WorkShopSchema);

module.exports = Workshop;