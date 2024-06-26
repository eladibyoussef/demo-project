const express = require('express')
const passport = require('passport');
// const jwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const Admin = require('./models/admin.model');
const User = require('./models/user.model')
const  {authenticateAdmin} = require('./source/config/adminPassport');
const  {authenticateUser} = require('./source/config/userPassport');


require("dotenv").config();
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const PORT= 3000
const uri = process.env.URI;
mongoose.connect(uri)
const db = mongoose.connection;


//handle events for mongoDB connection to be aware of the connection status
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Connected to MongoDB Atlas!");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());


app.listen(PORT, ()=>{
     console.log(`http://localhost:${PORT}`);
})





