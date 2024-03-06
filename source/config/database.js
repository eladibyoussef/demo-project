
require("dotenv").config();
const mongoose = require('mongoose');


const uri = process.env.URI || 'mongodb://localhost:27017/';
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