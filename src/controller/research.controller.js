const Research = require("../model/research.model");
const fs = require('fs');
const path = require("path");

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

//create research | user
const createResearch = async (req,res)=>{
    if(req.body){
        if(filename){
            const data={
                title : req.body.title,
                paymentStatus : req.body.paymentStatus,
                approvalStatus : req.body.approvalStatus,
                filename: filename,
                filepath : filePath,
                submitDate : new Date(),
                researcher : req.body.researcher
            }
            const workshop = new Research(data);
            filename="";
            await workshop.save()
                .then(data=>res.status(200).send({data:data}))
                .catch(err=>res.send(err));
        }else{

        }
    }
}
//approve or reject research details | reviewer
const updateApprovalStatus = async (req,res)=>{
    if(req.body) {
        let id = req.body.id;
        let status = req.body.status;
        await Research.findByIdAndUpdate(id,{approvalStatus:status})
            .then((result)=>{
                res.status(200).send(result);
            })
            .catch(err=>console.log(err))
    }
}

//get All Researches
const getAllResearches = async (req, res) => {
    await Research.find({})
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

//get researches with userID
const getResearchesFromID = async (req, res) => {
    await Research.find({'researcher.userId': req.params.id},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
};

const updatePaymentStatus = async (req,res)=>{
    if(req.params.id){
        await Research.findByIdAndUpdate(req.params.id,{paymentStatus:"paid"})
            .then((result)=>{
                res.status(200).send(result);
            })
            .catch(err=>console.log(err))
    }
}

//update research with id
const updateResearch = async (req,res)=>{
    if(req.body){
        let id = req.body._id;
        if(filename){
            const data={
                title : req.body.title,
                paymentStatus : req.body.paymentStatus,
                approvalStatus : req.body.approvalStatus,
                filename: filename,
                filepath : filePath,
                submitDate : new Date(),
                researcher : req.body.researcher
            }
            filename="";
            const research = await Research.findById(id);
            //remove previous submitted file
            fs.unlink(research.filepath, (err) => {
                if (err) {
                    throw err;
                }
            });
            await Research.findByIdAndUpdate(id,data)
                .then(data=>{
                    res.status(200).send(data)
                })
                .catch(err=>{res.send(err)});
        }
    }
}

//delete Research
const deleteResearch = async (req, res) => {
    if (req.params.id) {
        const research = await Research.findById(req.params.id);
        if(research){
            //delete the submitted proposal
            fs.unlink(research.filepath, (err) => {
                if (err) {
                    throw err;
                }
            });
            //delete proposal data
            await Research.findByIdAndDelete(req.params.id, (err, result) => {
                if (err) return res.status(500).send(err);
                return res.status(200).send(result);
            });
        }
    }
}

module.exports = {
    createResearch,
    uploadProposal,
    downloadProposal,
    getAllResearches,
    getResearchesFromID,
    deleteResearch,
    updateResearch,
    updatePaymentStatus,
    updateApprovalStatus
}