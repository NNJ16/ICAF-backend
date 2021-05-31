const express = require('express');
const router = express.Router();
const AttendeeController = require('../controller/attendee.controller');

module.exports = function (){
    router.get('/', AttendeeController.getAllAttendees);
    router.post('/create', AttendeeController.createAttendee);
    router.delete('/delete/:id', AttendeeController.deleteAttendee);
    return router;
}
