const User = require("../model/user.model");

//Register a User | guest
const createUser = async (req,res)=>{
    if(req.body){
        let email = req.body.email;
        await User.findOne({email:email},async (err,result)=>{
            if(err){
                console.log(err);
            }else{
                if(!result){
                    const user = new User(req.body);
                    await user.save()
                        .then(data=>res.status(200).send(data))
                        .catch(err=>res.send(err));
                }else{
                    res.send({message:"User Already Exist"});
                }
            }
        });
    }
}

//login Validate
const validateUser = async (req,res)=>{
    let email = req.body.email;
     await User.findOne({email:email},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            const user = result;
            res.send(user);
        }
    });
}

//get All Users
const getAllUsers = async (req, res) => {
    await User.find()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

//delete User
const deleteUser = async (req, res) => {
    if (req.params.id) {
        await User.findByIdAndDelete(req.params.id, (err, result) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(result);
        });
    }
}

module.exports = {
    createUser,
    deleteUser,
    getAllUsers,
    validateUser
}