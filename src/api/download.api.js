const express = require('express');
const router = express.Router();
const DownloadController = require('../controller/download.controller');
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
    router.get('/', DownloadController.getAllDocuments);
    router.get('/:id', DownloadController.getDocumentFromID);
    router.post('/upload', upload.single("file"),DownloadController.uploadDocument);
    router.get('/download/:id', DownloadController.downloadDocument);
    router.post('/create', DownloadController.createDocument);
    router.put('/update', DownloadController.updateDocument);
    router.delete('/delete/:id', DownloadController.deleteDocument);
    return router;
}