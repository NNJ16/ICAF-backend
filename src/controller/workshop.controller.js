const Workshop = require("../model/workshop.model");

const createWorkshop = async (req,res)=>{
    if(req.body){
        const workshop = new Workshop(req.body);
        await workshop.save()
            .then(data=>res.status(200).send({data:data}))
            .catch(err=>res.send(err));
    }
}
//get All Attendees
const getAllWorkshops = async (req, res) => {
    await Workshop.find()
        .populate('presenter',"name email")
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

//update research with id
const updateWorkshop = async (req,res)=>{
    console.log(req.body);
    if(req.body){
        let id = req.body._id;
        await Workshop.findByIdAndUpdate(id,req.body)
            .then(data=>{res.status(200).send(data)})
            .catch(err=>{res.status(500).send(err)});
    }
}

//delete Research
const deleteWorkshop = async (req, res) => {
    if (req.params.id) {
        await Workshop.findByIdAndDelete(req.params.id, (err, result) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(result);
        });
    }
}

module.exports = {
    createWorkshop,
    getAllWorkshops,
    deleteWorkshop,
    updateWorkshop
}