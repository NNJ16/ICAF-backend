const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const connectDB = require("./src/config/database");
const ResearchAPI = require("./src/api/research.api");
const WorkshopAPI = require("./src/api/workshop.api");
const AttendeeAPI = require("./src/api/attendee.api");
const UserAPI = require("./src/api/user.api");

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
    res.send("Hello Node!");
});

app.use("/research", ResearchAPI());
app.use("/workshop", WorkshopAPI());
app.use("/attendee", AttendeeAPI());
app.use("/user", UserAPI());

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});