const express = require('express')
const passport = require('passport');
const app = express();
const adminRoute = require('./routes/adminRoute')
const userRouters = require('./routes/userRoute')
const adminAuth = require('./routes/adminAuthRoute')
const productsRouter = require('./routes/productRoute');
const chatRouter = require('./routes/chatRoute')
const messageRouter = require('./routes/messagesRoute')
const cors = require('cors')
const db = require('./source/config/database')

require("dotenv").config();


const PORT= 3000


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(cors());



function requestLogger(req, res, next) {
     console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
     next();
 }
 
 // Applying the middleware globally to log all requests
 app.use(requestLogger);


app.use('/users', adminRoute)
app.use('/user',userRouters)
app.use('/admin',adminAuth)
app.use('/products',productsRouter)
app.use('/chat', chatRouter)
app.use('/message', messageRouter) 

app.listen(PORT, ()=>{
     console.log(`http://localhost:${PORT}`);
})





