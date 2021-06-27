const mongoose = require("mongoose");

const ResearchSchema = new mongoose.Schema({
    title : { type: String, required: true },
    filename: { type: String, required: true },
    approvalStatus: { type: String, required: true},
    paymentStatus: { type: String, required: true},
    filepath: { type: String, required: true},
    submitDate : { type: Date, required: true},
    researcher: {
        userId :{type: String, required:true},
        name: {type:String},
        email :{type:String}
    }
});

const Research = mongoose.model('research', ResearchSchema);

module.exports = Research;