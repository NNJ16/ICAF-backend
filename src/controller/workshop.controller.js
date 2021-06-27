const Workshop = require("../model/workshop.model");
const path = require("path");
const fs = require('fs');

let filePath = "";
let filename = "";

//upload proposal file
const uploadProposal = (req,res)=>{
    if(req.file){
        filePath = req.file.path;
        filename = req.file.filename;
    }else{
        filePath="";
        filename="";
    }
}

//download proposal files
const downloadProposal = async (req,res)=>{
    const file = path.join(__dirname+`../../../files/${req.params.id}`);
    res.sendFile(file);
}

//Create a WorkShop
const createWorkshop = async (req,res)=>{
    if(req.body){
        if(filename){
            const data={
                topic : req.body.topic,
                description : req.body.description,
                approvalStatus : req.body.approvalStatus,
                filename: filename,
                filepath : filePath,
                submitDate : new Date(),
                submitter : req.body.submitter
            }
            const workshop = new Workshop(data);
            filename="";
            await workshop.save()
                .then(data=>res.status(200).send({data:data}))
                .catch(err=>res.send(err));
        }else{

        }
    }
}
//get All Workshops
const getAllWorkshops = async (req, res) => {
    await Workshop.find()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.send(error);
        });
}
//get workshops with userID
const getWorkshopsFromID = async (req, res) => {
    await Workshop.find({'submitter.userId': req.params.id},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
};
//update research with id
const updateWorkshop = async (req,res)=>{
    if(req.body){
        let id = req.body._id;
        if(filename){
            const data={
                topic : req.body.topic,
                description : req.body.description,
                approvalStatus : req.body.approvalStatus,
                filename: filename,
                filepath : filePath,
                submitDate : new Date(),
                submitter : req.body.submitter
            }
            filename="";
            const workshop = await Workshop.findById(id);
            //remove previous submitted file
            fs.unlink(workshop.filepath, (err) => {
                if (err) {
                    throw err;
                }
            });
            await Workshop.findByIdAndUpdate(id,data)
                .then(data=>{
                    res.status(200).send(data)
                })
                .catch(err=>{res.send(err)});
        }
    }
}
//delete Research
const deleteWorkshop = async (req, res) => {
    if (req.params.id) {
        const workshop = await Workshop.findById(req.params.id);
        if(workshop){
            //delete the submitted proposal
            fs.unlink(workshop.filepath, (err) => {
                if (err) {
                    throw err;
                }
            });
            //delete proposal data
            await Workshop.findByIdAndDelete(req.params.id, (err, result) => {
                if (err) return res.status(500).send(err);
                return res.status(200).send(result);
            });
        }
    }
}

module.exports = {
    uploadProposal,
    downloadProposal,
    createWorkshop,
    getWorkshopsFromID,
    getAllWorkshops,
    deleteWorkshop,
    updateWorkshop
}