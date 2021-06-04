const express = require('express');
const router = express.Router();
const WorkshopController = require('../controller/workshop.controller');
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
    router.get('/', WorkshopController.getAllWorkshops);
    router.get('/:id', WorkshopController.getWorkshopsFromID);
    router.post('/upload', upload.single("file"),WorkshopController.uploadProposal);
    router.get('/download/:id', WorkshopController.downloadProposal);
    router.post('/create', WorkshopController.createWorkshop);
    router.put('/update', WorkshopController.updateWorkshop);
    router.delete('/delete/:id', WorkshopController.deleteWorkshop);
    return router;
}
