const Download = require("../model/download.model");
const path = require("path");
const fs = require('fs');

let filePath = "";
let filename = "";

//upload Documnet file
const uploadDocument = (req,res)=>{
    if(req.file){
        filePath = req.file.path;
        filename = req.file.filename;
    }else{
        filePath="";
        filename="";
    }
}

//download Documnet files
const downloadDocument = async (req,res)=>{
    const file = path.join(__dirname+`../../../files/${req.params.id}`);
    res.sendFile(file);
}

//Create a DownloadDocument
const createDocument = async (req,res)=>{
    if(req.body){
        if(filename){
            const data={
                type : req.body.type,
                description : req.body.description,
                filename: filename,
                filepath : filePath,
                submitDate : new Date()
            }
            const download = new Download(data);
            filename="";
            await download.save()
                .then(data=>res.status(200).send({data:data}))
                .catch(err=>res.send(err));
        }else{

        }
    }
}
//get All Documents
const getAllDocuments = async (req, res) => {
    await Download.find()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.send(error);
        });
}
//get workshops with userID
const getDocumentFromID = async (req, res) => {
    console.log(req.params.id)
    await Download.find({'submitter.userId': req.params.id},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
};
//update research with id
const updateDocument = async (req,res)=>{
    if(req.body){
        let id = req.body._id;
        if(filename){
            const data={
                type : req.body.type,
                description : req.body.description,
                filename: filename,
                filepath : filePath,
                submitDate : new Date()
            }
            filename="";
            const download = await Download.findById(id);
            //remove previous submitted file
            fs.unlink(download.filepath, (err) => {
                if (err) {
                    throw err;
                }
            });
            await Download.findByIdAndUpdate(id,data)
                .then(data=>{
                    res.status(200).send(data)
                })
                .catch(err=>{res.send(err)});
        }
    }
}
//delete Research
const deleteDocument = async (req, res) => {
    if (req.params.id) {
        const download = await Download.findById(req.params.id);
        if(download){
            //delete the submitted proposal
            fs.unlink(download.filepath, (err) => {
                if (err) {
                    throw err;
                }
            });
            //delete proposal data
            await Download.findByIdAndDelete(req.params.id, (err, result) => {
                if (err) return res.status(500).send(err);
                return res.status(200).send(result);
            });
        }
    }
}

module.exports = {
    uploadDocument,
    downloadDocument,
    createDocument,
    getDocumentFromID,
    getAllDocuments,
    deleteDocument,
    updateDocument
}