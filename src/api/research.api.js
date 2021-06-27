const express = require('express');
const router = express.Router();
const ResearchController = require('../controller/research.controller');
const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./files");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"~"+file.originalname);
    }
});
const upload = multer({storage:fileStorageEngine})

module.exports = function (){
    router.get('/', ResearchController.getAllResearches);
    router.get('/:id', ResearchController.getResearchesFromID);
    router.post('/upload', upload.single("file"),ResearchController.uploadProposal);
    router.get('/download/:id', ResearchController.downloadProposal);
    router.post('/create', ResearchController.createResearch);
    router.delete('/delete/:id',ResearchController.deleteResearch);
    router.put('/update',ResearchController.updateResearch);
    router.patch('/update/payment/:id',ResearchController.updatePaymentStatus);
    return router;
}


