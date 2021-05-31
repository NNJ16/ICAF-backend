const express = require('express');
const router = express.Router();
const ResearchController = require('../controller/research.controller');

module.exports = function (){
    router.get('/', ResearchController.getAllResearches);
    router.post('/create', ResearchController.createResearch);
    router.delete('/delete/:id',ResearchController.deleteResearch);
    router.put('/update',ResearchController.updateResearch);
    return router;
}


