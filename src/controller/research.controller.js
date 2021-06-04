const Research = require("../model/research.model");

//create research | user
const createResearch = async (req,res)=>{
    if(req.body){
        const research = new Research(req.body);
        await research.save()
            .then(data=>res.status(200).send({data:data}))
            .catch(err=>res.send(err));
    }
}
//get All Attendees
const getAllResearches = async (req, res) => {
    await Research.find({})
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

//update research with id
const updateResearch = async (req,res)=>{
    if(req.body){
        let id = req.body._id;
        await Research.findByIdAndUpdate(id,req.body)
            .then(data=>{res.status(200).send(data)})
            .catch(err=>{res.status(500).send(err)});
    }
}

//delete Research
const deleteResearch = async (req, res) => {
    if (req.params.id) {
        await Research.findByIdAndDelete(req.params.id, (err, result) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(result);
        });
    }
}

module.exports = {
    createResearch,
    getAllResearches,
    deleteResearch,
    updateResearch
}