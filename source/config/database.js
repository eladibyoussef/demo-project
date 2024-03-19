
require("dotenv").config();
const mongoose = require('mongoose');


const uri = process.env.URI ;
mongoose.connect(uri)
const db = mongoose.connection;


//handle events for mongoDB connection to be aware of the connection status
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to MongoDB Atlas!");
});


module.exports = db;
