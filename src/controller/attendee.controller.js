const Attendee = require("../model/attendee.model");

//Register as a Attendee | User
const createAttendee = async (req, res) => {
    console.log(req.body);
    if (req.body) {
        const attendee = new Attendee(req.body);
        await attendee.save()
            .then(data => res.status(200).send({data: data}))
            .catch(err => res.status(500).send(err));
    }
}

//get All Attendees
const getAllAttendees = async (req, res) => {
    await Attendee.find()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

//delete Attendees || Admin
const deleteAttendee = async (req, res) => {
    if (req.params.id) {
        await Attendee.findByIdAndDelete(req.params.id, (err, result) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(result);
        });
    }
}

module.exports = {
    createAttendee,
    getAllAttendees,
    deleteAttendee
}