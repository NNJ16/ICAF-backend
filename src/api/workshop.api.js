const express = require('express');
const router = express.Router();
const WorkshopController = require('../controller/workshop.controller');

module.exports = function (){
    router.post('/', WorkshopController.getAllWorkshops);
    router.post('/create', WorkshopController.createWorkshop);
    router.put('/update', WorkshopController.updateWorkshop);
    router.delete('/delete/:id', WorkshopController.deleteWorkshop);
    return router;
}
