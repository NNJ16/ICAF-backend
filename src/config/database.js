const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/icafdb";

const connectDB = async () => {
    await mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
    console.log("Database Connected");
}

module.exports = connectDB;