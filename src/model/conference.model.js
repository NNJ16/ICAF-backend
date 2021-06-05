const mongoose = require("mongoose");

const ConferenceSchema = new mongoose.Schema({

    topic: { type: String, required: true },
    desc: { type: String, required: true },
    status: { type: String, required: true },
    venue : { type: String, required: true },
    startDate : { type: String, required: true},
    endDate : { type: String, required: true},
    organizer: {type: String, required:true},
       
    
});

const Conference = mongoose.model('Conference', ConferenceSchema);

module.exports = Conference;