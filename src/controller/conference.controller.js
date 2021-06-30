const Conference = require("../model/conference.model");




//Create a conference
const addConference = async (req,res)=>{
    if(req.body){
      
            const data={
                topic : req.body.topic,
                desc : req.body.desc,
                status : req.body.status,
                venue : req.body.venue,
                startDate : req.body.startDate,
                endDate : req.body.endDate,
                organizer : req.body.organizer,
            
            }
            const conference = new Conference(data);
          
            await conference.save()
                .then(data=>res.status(200).send({data:data}))
                .catch(err=>res.send(err));
        
    }
}
//get All Conference
const getAllConference = async (req, res) => {
    await Conference.find()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.send(error);
        });
}
//get Conference with userID
const getConferenceID = async (req, res) => {
    console.log(req.params.id)
    await Conference.find({'submitter.userId': req.params.id},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
};
//update Conference with id
const updateConference = async (req,res)=>{
    if(req.body){
        let id = req.body._id;
      
            const data={
                topic : req.body.topic,
                desc : req.body.desc,
                status : req.body.status,
                venue : req.body.venue,
                startDate : req.body.startDate,
                endDate : req.body.endDate,
                organizer : req.body.organizer
            }
            
            const conference = await Conference.findById(id);
         
            await Conference.findByIdAndUpdate(id,data)
                .then(data=>{
                    res.status(200).send(data)
                })
                .catch(err=>{res.send(err)});
        
    }
}
//delete Research
const deleteConference = async (req, res) => {
    if (req.params.id) {
        const conference = await Conference.findById(req.params.id);
        if(conference){
           
            //delete proposal data
            await Conference.findByIdAndDelete(req.params.id, (err, result) => {
                if (err) return res.status(500).send(err);
                return res.status(200).send(result);
            });
        }
    }
}

module.exports = {
 
    addConference,
    getConferenceID,
    getAllConference,
    deleteConference,
    updateConference
}