const express = require('express');
const router = express.Router();
const ConferenceController = require('../controller/conference.controller');
const multer = require("multer");


module.exports = function (){
    router.get('/', ConferenceController.getAllConference);
    router.get('/:id', ConferenceController.getConferenceID);
    router.post('/create', ConferenceController.addConference);
    router.put('/update', ConferenceController.updateConference);
    router.delete('/delete/:id', ConferenceController.deleteConference);
    return router;
}